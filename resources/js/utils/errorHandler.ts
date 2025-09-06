import { toast } from 'react-toastify';

interface ApiError {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
      error_key?: string;
      error?: string;
    };
  };
}

export const _catchErrors = (error: ApiError): Record<string, string[]> | null => {
  let errorsData: Record<string, string[]> | string | undefined;

  if (error.response?.data?.errors) {
    errorsData = error.response.data.errors;
  }

  if (error.response?.data?.error_key) {
    toast.error(error.response.data.error_key.replace('_', ' '), { position: 'top-center' });
    return null;
  }

  if (error.response?.data?.error) {
    errorsData = error.response.data.error.replace('_', ' ');
    toast.error(errorsData, { position: 'top-center' });
    return null;
  }

  if (errorsData && typeof errorsData !== 'string') {
    for (const key in errorsData) {
      if (Object.prototype.hasOwnProperty.call(errorsData, key)) {
        const messages = errorsData[key];
        if (messages && messages.length > 0) {
          toast.error(messages[0], { position: 'top-center' });
        }
      }
    }

    return { ...errorsData };
  }

  return null;
};
