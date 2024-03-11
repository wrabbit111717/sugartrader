const BASE_URL = 'http://localhost:8080'; // Replace with your API base URL

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, options);
  const data = await response.json();
  console.log(data, 'res');
  return data;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const apiService = {
  request: async <T>(url: string, method: HttpMethod, data?: object): Promise<T> => {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return fetchJson(url, options);
  },
  get: <T>(url: string): Promise<T> => apiService.request(url, 'GET'),
  post: <T>(url: string, data: object): Promise<T> => apiService.request(url, 'POST', data),
  put: <T>(url: string, data: object): Promise<T> => apiService.request(url, 'PUT', data),
  delete: <T>(url: string): Promise<T> => apiService.request(url, 'DELETE'),
  // Add other HTTP methods as needed
};

export default apiService;