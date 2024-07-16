// authApi.ts
import axios from 'axios';

const BASE_URL = 'http://51.79.173.117:3000/apis';

export const login = async (userName: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Login failed');
  }
};

// axios.defaults.headers.common['Authorization'] = Bearer ${localStorage.getItem('authToken')};
