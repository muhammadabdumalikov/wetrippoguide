import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme/theme';
import {useTranslation} from 'react-i18next';
import {useLanguage} from '../../localization/LanguageContext';

const LanguageSettingsScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {currentLanguage, setLanguage} = useLanguage();

  const languages = [
    {code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English'},
    {code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿', nativeName: 'O\'zbek tili'},
    {code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский язык'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings.language')}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Icon
            name="translate"
            size={32}
            color={theme.colors.primary}
            style={styles.infoIcon}
          />
          <Text style={styles.description}>
            {t('settings.selectLanguage')}
          </Text>
        </View>

        <View style={styles.languageList}>
          {languages.map((language, index) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                currentLanguage === language.code && styles.selectedLanguage,
                index === languages.length - 1 && styles.lastItem,
              ]}
              onPress={() => setLanguage(language.code as 'en' | 'uz' | 'ru')}>
              <View style={styles.languageInfo}>
                <View style={styles.flagContainer}>
                  <Text style={styles.flag}>{language.flag}</Text>
                </View>
                <View style={styles.languageTextContainer}>
                  <Text
                    style={[
                      styles.languageName,
                      currentLanguage === language.code && styles.selectedText,
                    ]}>
                    {language.name}
                  </Text>
                  <Text
                    style={[
                      styles.nativeName,
                      currentLanguage === language.code && styles.selectedText,
                    ]}>
                    {language.nativeName}
                  </Text>
                </View>
              </View>
              {currentLanguage === language.code && (
                <View style={styles.checkmarkContainer}>
                  <Icon
                    name="check-circle"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.circle,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  infoCard: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoIcon: {
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  languageList: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  selectedLanguage: {
    backgroundColor: theme.colors.primaryLight,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.circle,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  flag: {
    fontSize: 24,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  nativeName: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  checkmarkContainer: {
    width: 40,
    alignItems: 'center',
  },
});

export default LanguageSettingsScreen; 