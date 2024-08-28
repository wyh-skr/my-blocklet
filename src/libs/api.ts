import { createAxios } from '@blocklet/js-sdk';
import { notification } from 'antd';

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
  // baseURL: 'https://bbqa67k5tn5d76nb4oi3yg3wn6ydsxj4hqbmlauzw7q.did.abtnet.io',
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    const data = response.data || {};
    if (data.code !== 0) {
      notification.error({
        message: 'Server Error',
        description: data.message || 'Unknown Error',
      });
      return;
    }
    return data.result;
  },
  (error) => {
    notification.error({
      message: 'Server Error',
      description: error?.message || 'Unknown Error',
    });
  },
);

export default api;
