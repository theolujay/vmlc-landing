/**
 * Extracts a user-friendly error message from an API error response.
 * Handles both general detail/message fields and Django-style field-specific errors.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractErrorMessage = (errorData: any): string => {
  if (!errorData || typeof errorData !== 'object') {
    return 'Something went wrong. Please try again.';
  }

  // Direct detail or message fields
  if (errorData.detail && typeof errorData.detail === 'string') {
    return errorData.detail;
  }
  if (errorData.message && typeof errorData.message === 'string') {
    return errorData.message;
  }

  // Django Rest Framework non_field_errors
  if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors) && errorData.non_field_errors.length > 0) {
    return errorData.non_field_errors[0];
  }

  // Handle field-specific errors: { "email": ["error message"] }
  for (const key in errorData) {
    if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
      const errorMsg = errorData[key][0];
      if (typeof errorMsg === 'string') {
        return errorMsg;
      }
    }
  }

  return 'Something went wrong. Please try again.';
};
