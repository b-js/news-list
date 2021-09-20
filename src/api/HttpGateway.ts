import { api } from 'boot/axios';
import { Notify } from 'app/node_modules/quasar';

// export const request = axios.create({
//   baseURL: String(process.env.PROXY_URL), // url = base url + request url
//   timeout: 30000,
//   paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'indices' }),
//   // withCredentials: true, // send cookies when cross-domain requests
// });
//
// Request interceptors

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
