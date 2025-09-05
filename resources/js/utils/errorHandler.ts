import { toast } from 'react-toastify';

// Axios-like API error
interface ApiError {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
      error_key?: string;
      error?: string;
    };
  };
};

/**
 * Global error handler
 * @param error API or Axios error
 * @returns Parsed validation errors (if any) or null
 */
export const _catchErrors = (error: ApiError): Record<string, string[]> | null => {
  let errorsData: Record<string, string[]> | string | undefined;

  // Validation errors
  if (error.response?.data?.errors) {
    errorsData = error.response.data.errors;
  }

  // Generic error_key
  if (error.response?.data?.error_key) {
    toast.error(error.response.data.error_key.replace('_', ' '), {
      position: 'top-center',
    });
    return null;
  }

  // Generic error
  if (error.response?.data?.error) {
    errorsData = error.response.data.error.replace('_', ' ');
    toast.error(errorsData as string, {
      position: 'top-center',
    });
    return null;
  }

  // Show all validation errors
  if (errorsData && typeof errorsData !== 'string') {
    Object.keys(errorsData).forEach((key) => {
      const [first] = errorsData![key];
      toast.error(first, {
        position: 'top-center',
      });
    });
  }

  // Return parsed validation errors for further processing
  if (errorsData && typeof errorsData !== 'string') {
    return JSON.parse(JSON.stringify(errorsData));
  }

  return null;
};
