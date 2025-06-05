import { TextStyle } from 'react-native';

export const theme = {
  colors: {
    primary: '#050544', // Navy Black
    secondary: '#F7B500', // Orange for main action
    background: '#F7F7F7', // Light gray background
    surface: '#FFFFFF', // Card background
    text: '#222B45', // Main text
    textSecondary: '#8F9BB3', // Secondary text
    error: '#FF6B6B',
    success: '#00B894',
    border: '#E4E9F2', // Subtle gray border
    inputBackground: '#F7F9FC', // Input field background
    errorLight: '#FFEAEA',
    shadow: '#000000',
    white: '#FFFFFF',
    lightGray: '#eeeeee',
    darkGray: '#bbbbbb',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
    } as TextStyle,
    h2: {
      fontSize: 24,
      fontWeight: '600',
    } as TextStyle,
    h3: {
      fontSize: 20,
      fontWeight: '600',
    } as TextStyle,
    body: {
      fontSize: 16,
      fontWeight: '400',
    } as TextStyle,
    caption: {
      fontSize: 14,
      fontWeight: '400',
    } as TextStyle,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    circle: 9999,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 2,
    },
  },
}; 