import { Alert } from 'react-native';

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
  message?: string;
}

export const handleError = (error: ErrorResponse, defaultMessage = 'Something went wrong. Please try again.') => {
  console.error('Error:', error);

  // Handle API validation errors
  if (error.response?.data?.errors) {
    const errorMessages = Object.values(error.response.data.errors).flat();
    Alert.alert(
      'Validation Error',
      errorMessages.join('\n'),
      [{ text: 'OK' }],
      { cancelable: true }
    );
    return;
  }

  // Handle API error messages
  if (error.response?.data?.message) {
    Alert.alert(
      'Error',
      error.response.data.message,
      [{ text: 'OK' }],
      { cancelable: true }
    );
    return;
  }

  // Handle network errors
  if (error.message?.includes('Network Error')) {
    Alert.alert(
      'Connection Error',
      'Please check your internet connection and try again.',
      [{ text: 'OK' }],
      { cancelable: true }
    );
    return;
  }

  // Handle default error
  Alert.alert(
    'Error',
    defaultMessage,
    [{ text: 'OK' }],
    { cancelable: true }
  );
}; 