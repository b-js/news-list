import { api } from 'boot/axios';
import { Notify } from 'app/node_modules/quasar';

// Response interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    Notify.create({
      type: 'negative',
      message: 'Error',
      timeout: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default api;
