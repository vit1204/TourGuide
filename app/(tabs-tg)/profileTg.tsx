import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/interface';
import { useGlobalContext } from '@/context/GlobalProvider';

const TourGuideProfile = () => {
  const [userNow, setUserNow] = useState<User | null>(null);
  const { user, setUser } = useGlobalContext();
  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUserNow(JSON.parse(userData) as User);
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Error during logout', error);
      Alert.alert('Logout failed', 'There was an error during logout.');
    }
  };

  if (!userNow) {
    return (
      <View className='flex items-center justify-center h-full'>
        <Text className='text-xl text-black'>Loading...</Text>
      </View>
    );
  }

  const languages = Array.isArray(userNow.languages) ? userNow.languages.join(', ') : userNow.languages;
  const hobbies = Array.isArray(userNow.hobbies) ? userNow.hobbies.join(', ') : userNow.hobbies;

  const handleEditProfile = () => {
    router.push('../subSite/editProfile');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 bg-primary_darker relative mb-3">
          <Text className="text-2xl font-Nbold text-white">Profile</Text>
          <TouchableOpacity
            className="absolute top-4 right-4 p-2 rounded-full bg-blue"
            onPress={handleLogout}
          >
            <FontAwesome name="sign-out" size={24} color="black" />
          </TouchableOpacity>
        </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="items-center mb-6">
          <Image
            source={{ uri: userNow.avatar }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold mb-1">{userNow.fullName}</Text>
          <Text className="text-base text-gray-800 mb-2">{userNow.hometown}</Text>
          <View className="flex-row items-center">
            <FontAwesome name="star" size={24} color="orange" />
            <Text className="text-lg font-bold ml-2">{userNow.rating}</Text>
            <Text className="text-base text-gray-600 ml-1">(230)</Text>
          </View>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg text-black font-Nbold mr-10">Age:</Text>
          <Text className="text-base text-gray-600">{userNow.age}</Text>
        </View>

        <View className="mb-4  flex-row items-center">
          <Text className="text-lg text-black font-bold mr-5">Phone:</Text>
          <Text className="text-base text-gray-600">{userNow.phoneNumber}</Text>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg text-black font-bold mr-7">Email:</Text>
          <Text className="text-base text-gray-600">{userNow.email}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-bold">Languages:</Text>
          <Text className="text-base text-gray-600">{languages}</Text>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg text-black font-bold mr-5">Gender:</Text>
          <Text className="text-base text-gray-600">{userNow.gender}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-bold">Work Locations:</Text>
          <Text className="text-base text-gray-600">{userNow.workLocation.join(', ')}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-bold">Interests:</Text>
          <Text className="text-base text-gray-600">{hobbies}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-bold">Describe:</Text>
          <Text className="text-base text-gray-600">{userNow.describe}</Text>
        </View>

        <View className="mb-6">
          <Image
            source={{ uri: userNow.imageCCCD }}
            className="w-full h-48 rounded-lg"
          />
        </View>

        <View className="mb-6">
          <Image
            source={{ uri: userNow.imageAuthenGuide }}
            className="w-full h-[530px] rounded-lg"
          />
        </View>

        <TouchableOpacity
          className="bg-orange-500 py-3 rounded-full items-center mb-6"
          onPress={handleEditProfile}
        >
          <Text className="text-white font-bold text-lg">Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TourGuideProfile;
