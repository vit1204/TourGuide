// authApi.ts
import { Tour, User } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import FormData from 'form-data';


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

export const getUserById = async (userId: string | string[]) => {
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

export const startChat = async (userId: string, guideId: string | undefined) => {
  try {
        const token = await AsyncStorage.getItem('authToken');

    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/chat/start-chat`, 
      {
      userId,
      guideId,
    }, {headers:{ Authorization: `Bearer ${token}`}
    },
  );
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Start failed');
  }
};

export const saveUserData = async (user: User) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    const dataUserUpdate = {
      avatar: user.avatar,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      languages : user.languages,
      gender: user.gender,
      hometown: user.hometown,
      hobbies: user.hobbies,
      describe: user.describe
    }
    
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user/update/${user._id}`, dataUserUpdate, {
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


export const getAllTourByUserId = async (userId: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/tour/getAllTourByUserId/${userId}`, {
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

export const uploadImage = async (imageUri: string ) => {
  try {
    const formData = new FormData();
    const filename = imageUri.split('/').pop();
    const match = filename ? /\.(\w+)$/.exec(filename) : null;
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('images', {
      uri: imageUri,
      name: filename,
      type,
    });

    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/upload/uploadImage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error in api: ', error);
      throw new Error((error as any).response?.data?.message || 'Upload image failed');
    }
  } catch (error) {
    console.log('Error in api: ', error);
    throw new Error('Upload image failed');
  }
};

export const getAllChatByUserId = async(userId : string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/chat/getChatByuser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Get chat failed');
  }
}

export const getUsersByGuideId = async (guideId: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/chat/getChatByuser/${guideId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Get users failed');
  }
}

export const createTour = async (tour : Tour) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const dataUpdate = {
      userId: tour.user_id,
      guideId: tour.guide_id,
      Tuorlocation: tour.Tuorlocation,
      schedule: tour.schedule,
      numberUser: tour.numberUser,
      startTime: tour.startTime.toString(),
      endTime: tour.endTime.toString(),
      tourType: "khám phá",
      price: (tour.price)
    }
    console.log('DATA Update: ', dataUpdate);
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/tour/createTour`, dataUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error in api: ',error);
    throw new Error((error as any).response?.data?.message || 'Get users failed');
  };
}



// axios.defaults.headers.common['Authorization'] = Bearer ${localStorage.getItem('authToken')};
// axios.defaults.headers.common['Authorization'] = Bearer ${localStorage.getItem('authToken')};
