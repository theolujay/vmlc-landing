/**
 * Extracts a user-friendly error message from an API error response.
 * Handles both general detail/message fields and Django-style field-specific errors.
 * Prioritizes specific field errors over general messages.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractErrorMessage = (errorData: any): string => {
  if (!errorData || typeof errorData !== 'object') {
    return 'Something went wrong. Please try again.';
  }

  // 1. Django Rest Framework non_field_errors
  if (
    errorData.non_field_errors &&
    Array.isArray(errorData.non_field_errors) &&
    errorData.non_field_errors.length > 0
  ) {
    return errorData.non_field_errors[0];
  }

  // 2. Handle field-specific errors from errors object: { "errors": { "email": ["error message"] } }
  if (errorData.errors && typeof errorData.errors === 'object') {
    for (const key in errorData.errors) {
      if (Array.isArray(errorData.errors[key]) && errorData.errors[key].length > 0) {
        const errorMsg = errorData.errors[key][0];
        if (typeof errorMsg === 'string') {
          return errorMsg;
        }
      }
    }
  }

  // 3. Handle field-specific errors directly on errorData: { "email": ["error message"] }
  for (const key in errorData) {
    // Skip known top-level fields that aren't field errors if they are arrays (though unlikely)
    if (key === 'errors' || key === 'non_field_errors') continue;

    if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
      const errorMsg = errorData[key][0];
      if (typeof errorMsg === 'string') {
        return errorMsg;
      }
    }
  }

  // 4. Direct detail or message fields (fallback)
  if (errorData.detail && typeof errorData.detail === 'string') {
    return errorData.detail;
  }
  if (errorData.message && typeof errorData.message === 'string') {
    return errorData.message;
  }

  return 'Something went wrong. Please try again.';
};
    
    /**
     * Returns a specific error message for network/server connection issues.
     * Distinguishes between "No Internet" and "Server Unreachable".
     */
    export const handleNetworkError = (): string => {
      if (!navigator.onLine) {
        return 'You are offline. Please check your internet connection.';
      }
      return "Something's not right on our end. Please try again...";
    };
    