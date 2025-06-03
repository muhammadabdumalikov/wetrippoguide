import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme/theme';
import {useTranslation} from 'react-i18next';
import {useLanguage} from '../../localization/LanguageContext';
import {SettingsStackParamList} from '../../navigation/types';

type LanguageScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  'Language'
>;

const LanguageScreen = () => {
  const navigation = useNavigation<LanguageScreenNavigationProp>();
  const {t} = useTranslation();
  const {currentLanguage} = useLanguage();

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'en':
        return 'English';
      case 'uz':
        return 'O\'zbekcha';
      case 'ru':
        return 'Русский';
      default:
        return 'English';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => navigation.navigate('LanguageSettings')}>
          <View style={styles.languageInfo}>
            <Icon name="translate" size={24} color={theme.colors.primary} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{t('settings.language')}</Text>
              <Text style={styles.subtitle}>
                {getLanguageName(currentLanguage)}
              </Text>
            </View>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
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
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: theme.spacing.md,
  },
  title: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
});

export default LanguageScreen;
