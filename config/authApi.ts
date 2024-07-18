// authApi.ts
import { User } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const getUserById = async (userId: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Get user failed');
  }

}

export const saveUserData = async (user: User) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.put(`${BASE_URL}/user/${user._id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Save user failed');
  }
}

// axios.defaults.headers.common['Authorization'] = Bearer ${localStorage.getItem('authToken')};
