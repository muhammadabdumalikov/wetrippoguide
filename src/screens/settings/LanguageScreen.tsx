import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, ListItem, Radio} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  {code: 'en', name: 'English', nativeName: 'English'},
  {code: 'es', name: 'Spanish', nativeName: 'Español'},
  {code: 'fr', name: 'French', nativeName: 'Français'},
  {code: 'de', name: 'German', nativeName: 'Deutsch'},
  {code: 'it', name: 'Italian', nativeName: 'Italiano'},
  {code: 'pt', name: 'Portuguese', nativeName: 'Português'},
  {code: 'ru', name: 'Russian', nativeName: 'Русский'},
  {code: 'zh', name: 'Chinese', nativeName: '中文'},
  {code: 'ja', name: 'Japanese', nativeName: '日本語'},
  {code: 'ko', name: 'Korean', nativeName: '한국어'},
];

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // TODO: Implement language change logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Language</Text>
          {languages.map(language => (
            <ListItem
              key={language.code}
              containerStyle={styles.listItem}
              onPress={() => handleLanguageSelect(language.code)}>
              <Icon name="language" size={24} color={theme.colors.primary} />
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>
                  {language.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>
                  {language.nativeName}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Radio
                checked={selectedLanguage === language.code}
                onPress={() => handleLanguageSelect(language.code)}
                checkedColor={theme.colors.primary}
              />
            </ListItem>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Icon name="info" size={24} color={theme.colors.primary} />
          <Text style={styles.infoText}>
            Changing the language will update the app's interface language. Some
            content may still appear in the original language.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  listItem: {
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.sm,
  },
  listItemTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  listItemSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primaryLight,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  infoText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    flex: 1,
  },
});

export default LanguageScreen;
