import axios from 'axios';

const axiosConfig = axios.create({
  // baseURL: process.env.baseUrl,
  baseURL: 'http://localhost:8080/'
});

axiosConfig.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axiosConfig.defaults.headers.common['Content-Type'] = 'application/json';
axiosConfig.defaults.headers.common['Accept'] = 'application/json';

const fetchCsrfToken = async () => {
  try {
    const response = await axiosConfig.get('/csrf-token');
    return response.data.csrf_token;
  } catch (error) {
    throw error;
  }
};

axiosConfig.interceptors.request.use(
  async (config: any) => {
    // const csrf_token = await fetchCsrfToken();
    // Add CSRF token to headers for every request
    // config.headers['X-CSRF-TOKEN'] = await fetchCsrfToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;

const axiosConfigForGAuth = axios.create();
axiosConfigForGAuth.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';

export { axiosConfigForGAuth };
