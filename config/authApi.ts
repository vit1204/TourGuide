// authApi.ts
import { User } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export const login = async (userName: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
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
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/user/${userId}`, {
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
    const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/user/${user._id}`, user, {
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

export const register = async (user: any) => {
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`, user);
    return response;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Register failed');
  }
}

export const getAllTourByGuideId = async (userId: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/tour/getAllTourByGuideId/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Get all tour failed');
  }
}

export const getAllTourGuide = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/userHome`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Get all tour failed');
  }
}


// axios.defaults.headers.common['Authorization'] = Bearer ${localStorage.getItem('authToken')};