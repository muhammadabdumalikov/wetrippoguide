import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  Pressable,
  Switch,
} from 'react-native';
import {theme} from '../../theme/theme';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useContentLanguage} from '../../localization/ContentLanguageContext';
import Modal from 'react-native-modal';
import {launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {apiRequest} from '../../utils/api';

interface TourFormData {
  title: {
    en: string;
    uz: string;
    ru: string;
  };
  description: {
    en: string;
    uz: string;
    ru: string;
  };
  status: number;
  location: number;
  price: number;
  sale_price: number;
  duration: string;
  start_date: string;
  seats: number;
  files: Array<{
    type: string;
    url: string;
    name: string;
    size: number;
    isMain?: boolean;
  }>;
  route_json: Array<{
    title: string;
    description: string;
  }>;
  includes: Array<{
    title: {
      en: string;
      uz: string;
      ru: string;
    };
    included: boolean;
  }>;
}

const MAX_IMAGES = 4;
const windowWidth = Dimensions.get('window').width;
const slotWidth = (windowWidth - theme.spacing.lg * 2 - theme.spacing.md) / 2;
const slotHeight = slotWidth * 0.8;

const CreateTourScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {contentLanguage, setContentLanguage} = useContentLanguage();

  const [formData, setFormData] = useState<TourFormData>({
    title: {en: '', uz: '', ru: ''},
    description: {en: '', uz: '', ru: ''},
    status: 1,
    location: 0,
    price: 0,
    sale_price: 0,
    duration: '',
    start_date: '',
    seats: 0,
    files: [],
    route_json: [{title: '', description: ''}],
    includes: [{title: {en: '', uz: '', ru: ''}, included: true}],
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    images: false,
    includes: false,
    price: false,
    seats: false,
    tourDate: false,
  });

  const addRoutePoint = () => {
    setFormData({
      ...formData,
      route_json: [...formData.route_json, {title: '', description: ''}],
    });
  };

  const updateRoutePoint = (
    index: number,
    field: 'title' | 'description',
    value: string,
  ) => {
    const newRoute = [...formData.route_json];
    newRoute[index] = {...newRoute[index], [field]: value};
    setFormData({...formData, route_json: newRoute});
  };

  const addInclude = () => {
    setFormData({
      ...formData,
      includes: [
        ...formData.includes,
        {title: {en: '', uz: '', ru: ''}, included: true},
      ],
    });
  };

  const updateInclude = (
    index: number,
    field: 'en' | 'uz' | 'ru',
    value: string,
  ) => {
    const newIncludes = [...formData.includes];
    newIncludes[index] = {
      ...newIncludes[index],
      title: {...newIncludes[index].title, [field]: value},
    };
    setFormData({...formData, includes: newIncludes});
  };

  const handleFileUpload = async () => {
    if (formData.files.length >= MAX_IMAGES) return;
    const status = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    if (status === RESULTS.GRANTED) {
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 1,
          quality: 0.8,
        },
        response => {
          if (response.didCancel || response.errorCode) return;
          const asset = response.assets && response.assets[0];
          if (asset && asset.uri) {
            const newFile = {
              type: asset.type || 'image',
              url: asset.uri,
              name: asset.fileName || `image_${Date.now()}`,
              size: asset.fileSize || 0,
              isMain: formData.files.length === 0, // First image is main by default
            };
            setFormData({
              ...formData,
              files: [...formData.files, newFile].slice(0, MAX_IMAGES),
            });
          }
        },
      );
    }
  };

  const setMainImage = (index: number) => {
    const newFiles = formData.files.map((file, idx) => ({
      ...file,
      isMain: idx === index,
    }));
    setFormData({...formData, files: newFiles});
  };

  const openDatePicker = () => {
    setTempDate(
      formData.start_date ? new Date(formData.start_date) : new Date(),
    );
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (selectedDate: Date) => {
    setFormData({
      ...formData,
      start_date: selectedDate.toISOString(),
    });
    setDatePickerVisible(false);
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = async () => {
    // Validation
    const hasValidInclude = formData.includes.some(
      item => item.included && item.title[contentLanguage],
    );
    const newErrors = {
      title: !formData.title[contentLanguage],
      description: !formData.description[contentLanguage],
      images: formData.files.length === 0,
      includes: !hasValidInclude,
      price: !formData.price || formData.price <= 0,
      seats: !formData.seats || formData.seats <= 0,
      tourDate: !formData.start_date,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }
    try {
      console.log(formData);
      await apiRequest('/admin/tour/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error creating tour:', error);
    }
  };

  const handlePreviewImage = (url: string) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Card: Images */}
          <View style={styles.card}>
            <View style={styles.cardSectionHeader}>
              <Text style={styles.cardSectionTitle}>{t('tour.images')}</Text>
            </View>
            {/* Thumbnails row */}
            <View style={[styles.uploadThumbnailRow]}>
              {[...Array(MAX_IMAGES)].map((_, i) => {
                const file = formData.files[i];
                if (file) {
                  return (
                    <View key={i} style={styles.uploadThumbnailSlot}>
                      <TouchableOpacity
                        style={styles.uploadThumbnailImageWrapper}
                        onPress={() => handlePreviewImage(file.url)}
                        activeOpacity={0.9}>
                        <Image
                          source={{uri: file.url}}
                          style={styles.uploadThumbnailImage}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          style={styles.uploadThumbnailDeleteButton}
                          onPress={() => {
                            const newFiles = formData.files.filter(
                              (_, idx) => idx !== i,
                            );
                            // If we're deleting the main image, make the first remaining image the main one
                            if (file.isMain && newFiles.length > 0) {
                              newFiles[0].isMain = true;
                            }
                            setFormData({...formData, files: newFiles});
                          }}>
                          <Icon
                            name="close-circle"
                            size={24}
                            color={theme.colors.error}
                          />
                        </TouchableOpacity>
                        <Pressable
                          style={styles.mainImageButton}
                          onPress={() => setMainImage(i)}>
                          <Icon
                            name={file.isMain ? 'image' : 'image-outline'}
                            size={24}
                            color={
                              file.isMain
                                ? theme.colors.secondary
                                : theme.colors.textSecondary
                            }
                          />
                        </Pressable>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.uploadThumbnailSlot,
                        errors.images && i === 0 && styles.errorBorder,
                      ]}
                      onPress={handleFileUpload}
                      activeOpacity={0.7}>
                      <Icon
                        name="cloud-upload-outline"
                        size={32}
                        color={theme.colors.textSecondary}
                      />
                      <Text style={styles.uploadSlotText}>Upload</Text>
                      <Text style={styles.uploadSlotSubText}>
                        (345x255+ / 1MB)
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>

          <View style={styles.languageSelectorRow}>
            <TouchableOpacity
              style={[
                styles.langButton,
                contentLanguage === 'en' && styles.activeLang,
              ]}
              onPress={() => setContentLanguage('en')}>
              <Text
                style={[
                  styles.langText,
                  contentLanguage === 'en' && styles.activeLangText,
                ]}>
                EN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langButton,
                contentLanguage === 'uz' && styles.activeLang,
              ]}
              onPress={() => setContentLanguage('uz')}>
              <Text
                style={[
                  styles.langText,
                  contentLanguage === 'uz' && styles.activeLangText,
                ]}>
                UZ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langButton,
                contentLanguage === 'ru' && styles.activeLang,
              ]}
              onPress={() => setContentLanguage('ru')}>
              <Text
                style={[
                  styles.langText,
                  contentLanguage === 'ru' && styles.activeLangText,
                ]}>
                RU
              </Text>
            </TouchableOpacity>
          </View>

          {/* Card: Basic Info */}
          <View style={styles.card}>
            <View style={styles.cardSectionHeader}>
              <Text style={styles.cardSectionTitle}>{t('tour.basicInfo')}</Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('tour.title')} *</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.title && {borderColor: theme.colors.error},
                ]}
                value={formData.title[contentLanguage]}
                onChangeText={text => {
                  setFormData({
                    ...formData,
                    title: {...formData.title, [contentLanguage]: text},
                  });
                  if (errors.title) setErrors({...errors, title: false});
                }}
                placeholder={t('tour.title')}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('tour.description')} *</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  errors.description && {borderColor: theme.colors.error},
                ]}
                value={formData.description[contentLanguage]}
                onChangeText={text => {
                  setFormData({
                    ...formData,
                    description: {
                      ...formData.description,
                      [contentLanguage]: text,
                    },
                  });
                  if (errors.description)
                    setErrors({...errors, description: false});
                }}
                placeholder={t('tour.description')}
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Card: Pricing */}
          <View style={styles.card}>
            <View style={styles.cardSectionHeader}>
              <Text style={styles.cardSectionTitle}>{t('tour.pricing')}</Text>
            </View>
            <View style={styles.row}>
              <View
                style={[
                  styles.inputGroup,
                  {flex: 1, marginRight: theme.spacing.sm},
                ]}>
                <Text style={styles.inputLabel}>{t('tour.price')} *</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.price && {borderColor: theme.colors.error},
                  ]}
                  value={formData.price.toString()}
                  onChangeText={text => {
                    setFormData({...formData, price: parseFloat(text) || 0});
                    if (errors.price) setErrors({...errors, price: false});
                  }}
                  keyboardType="numeric"
                  placeholder={t('tour.price')}
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>
              <View
                style={[
                  styles.inputGroup,
                  {flex: 1, marginLeft: theme.spacing.sm},
                ]}>
                <Text style={styles.inputLabel}>{t('tour.salePrice')}</Text>
                <TextInput
                  style={styles.input}
                  value={formData.sale_price.toString()}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      sale_price: parseFloat(text) || 0,
                    })
                  }
                  keyboardType="numeric"
                  placeholder={t('tour.salePrice')}
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>
            </View>
          </View>

          {/* Card: Schedule */}
          <View style={styles.card}>
            <View style={styles.cardSectionHeader}>
              <Text style={styles.cardSectionTitle}>{t('tour.schedule')}</Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('tour.tourDate')}</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={openDatePicker}
                activeOpacity={0.8}>
                <Text style={styles.inputText}>
                  {formData.start_date
                    ? formatDate(formData.start_date)
                    : t('tour.selectDate')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('tour.seats')}</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.seats && {borderColor: theme.colors.error},
                ]}
                value={formData.seats.toString()}
                onChangeText={text => {
                  setFormData({...formData, seats: parseInt(text) || 0});
                  if (errors.seats) setErrors({...errors, seats: false});
                }}
                keyboardType="numeric"
                placeholder={t('tour.seats')}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
          </View>

          {/* Card: Route Points */}
          <View style={styles.card}>
            <View style={styles.cardSectionHeaderRow}>
              <Text style={styles.cardSectionTitle}>
                {t('tour.routePoints')}
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addRoutePoint}>
                <Icon name="add" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
            {formData.route_json.map((point, index) => (
              <View key={index} style={styles.routePointCard}>
                <View style={styles.routePointHeader}>
                  <Text style={styles.inputLabel}>{t('tour.pointTitle')}</Text>
                  <TouchableOpacity
                    style={styles.routeDeleteButton}
                    onPress={() => {
                      const newRoute = formData.route_json.filter(
                        (_, i) => i !== index,
                      );
                      setFormData({...formData, route_json: newRoute});
                    }}>
                    <Icon name="close" size={20} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  value={point.title}
                  onChangeText={text => updateRoutePoint(index, 'title', text)}
                  placeholder={t('tour.pointTitle')}
                  placeholderTextColor={theme.colors.textSecondary}
                />
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {t('tour.pointDescription')}
                  </Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={point.description}
                    onChangeText={text =>
                      updateRoutePoint(index, 'description', text)
                    }
                    placeholder={t('tour.pointDescription')}
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline
                    numberOfLines={2}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Card: What's Included */}
          <View style={styles.card}>
            <View style={styles.cardSectionHeaderRow}>
              <Text style={styles.cardSectionTitle}>
                {t('tour.whatsIncluded')}
              </Text>
              <TouchableOpacity style={styles.addButton} onPress={addInclude}>
                <Icon name="add" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
            {formData.includes.map((include, index) => (
              <View
                key={index}
                style={[
                  styles.includeItem,
                  errors.includes &&
                    (!include.included || !include.title[contentLanguage]) && {
                      borderColor: theme.colors.error,
                      borderWidth: 2,
                    },
                ]}>
                <View style={styles.inputGroupRow}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    value={include.title[contentLanguage]}
                    onChangeText={text => {
                      updateInclude(index, contentLanguage, text);
                      if (errors.includes)
                        setErrors({...errors, includes: false});
                    }}
                    placeholder={`${t('tour.item')} ${index + 1}`}
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                  <Switch
                    value={include.included}
                    onValueChange={value => {
                      const newIncludes = [...formData.includes];
                      newIncludes[index].included = value;
                      setFormData({...formData, includes: newIncludes});
                      if (errors.includes)
                        setErrors({...errors, includes: false});
                    }}
                    style={styles.includeSwitch}
                    thumbColor={
                      include.included ? theme.colors.white : theme.colors.white
                    }
                    trackColor={{
                      false: theme.colors.border,
                      true: theme.colors.secondary,
                    }}
                  />
                  <TouchableOpacity
                    style={styles.includeDeleteButton}
                    onPress={() => {
                      const newIncludes = formData.includes.filter(
                        (_, i) => i !== index,
                      );
                      setFormData({...formData, includes: newIncludes});
                    }}>
                    <Icon name="close" size={20} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* <View style={{height: theme.spacing.xl}} /> */}

          {/* Sticky Create Tour Button */}
          <View style={styles.stickyButtonContainer}>
            <TouchableOpacity
              style={styles.createTourButton}
              onPress={handleSubmit}>
              <Text style={styles.createTourButtonText}>
                {t('common.createTour')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Date Picker Modal */}
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={tempDate}
          onConfirm={handleDateConfirm}
          onCancel={handleDateCancel}
          display="default"
        />

        {/* Image Preview Modal */}
        <Modal
          isVisible={previewVisible}
          onBackdropPress={() => setPreviewVisible(false)}
          style={styles.previewModal}
          backdropOpacity={0.9}>
          <View style={styles.previewContainer}>
            {previewImage && (
              <Image
                source={{uri: previewImage}}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={styles.previewCloseButton}
              onPress={() => setPreviewVisible(false)}>
              <Icon name="close" size={32} color={theme.colors.background} />
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  cardSectionHeader: {
    marginBottom: theme.spacing.md,
  },
  cardSectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  cardSectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontWeight: '700',
  },
  uploadThumbnailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    paddingHorizontal: 0,
  },
  uploadThumbnailSlot: {
    width: slotWidth,
    height: slotHeight,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  uploadThumbnailImageWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadThumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.md,
  },
  uploadThumbnailDeleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.circle,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    padding: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  inputText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  addButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.xs,
    marginTop: -theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  routePointCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  routePointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  routeDeleteButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  includeItem: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  inputGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  includeDeleteButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  languageSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  langButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.xs,
  },
  activeLang: {
    backgroundColor: theme.colors.secondary,
  },
  langText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeLangText: {
    color: theme.colors.surface,
  },
  stickyButtonContainer: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    backgroundColor: theme.colors.background,
    // padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  createTourButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  createTourButtonText: {
    ...theme.typography.h3,
    color: theme.colors.surface,
    fontWeight: '700',
  },
  previewModal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    backgroundColor: theme.colors.text,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 320,
    height: 320,
    borderRadius: theme.borderRadius.md,
  },
  previewCloseButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.circle,
    padding: theme.spacing.sm,
  },
  mainImageButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.circle,
    padding: 4,
  },
  uploadSlotText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  uploadSlotSubText: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  includeSwitch: {
    marginHorizontal: theme.spacing.sm,
  },
  errorBorder: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
});

export default CreateTourScreen;
