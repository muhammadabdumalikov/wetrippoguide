import { TextStyle } from 'react-native';

export const theme = {
  colors: {
    primary: '#6C63FF', // Modern purple
    secondary: '#4ECDC4', // Fresh teal
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#2D3436',
    textSecondary: '#636E72',
    error: '#FF6B6B',
    success: '#00B894',
    border: '#DFE6E9',
    inputBackground: '#F1F3F4',
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
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
  },
}; 