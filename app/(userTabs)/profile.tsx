import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '@/context/GlobalProvider';

const TourGuideProfile = () => {

  const {user,setUser} = useGlobalContext()

  if (!user) {
    return (
      <View className='flex items-center justify-center'>
        <Text className='text-xl text-black'>Loading...</Text>
      </View>
    );
  }

  const languages = Array.isArray(user.languages) ? user.languages.join(', ') : user.languages;
  const hobbies = Array.isArray(user.hobbies) ? user.hobbies.join(', ') : user.hobbies;

  const handleEditProfile = () => {
    router.push('../subSite/editProfile');
  };
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
        <View className="items-center mb-8">
          <Image
            source={{ uri: user.avatar }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold mb-2">{user.fullName}</Text>
          <Text className="text-base text-gray-800 mb-4">{user.hometown}</Text>
          <View className="flex-row items-center mb-4">
            <FontAwesome name="star" size={24} color="orange" />
            <Text className="text-lg font-bold ml-2">4.8</Text>
            <Text className="text-base text-gray-600 ml-1">(230)</Text>
          </View>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg text-black font-Nbold mb-1 mr-10">Phone:</Text>
          <Text className="text-base text-gray-600">{user.phoneNumber}</Text>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg text-black font-Nbold mb-1 mr-10">Email:</Text>
          <Text className="text-base text-gray-600">{user.email}</Text>
        </View>

        <View className="mb-4  flex-row items-center">
          <Text className="text-lg text-black font-Nbold mb-1 mr-5">Language:</Text>
          <Text className="text-base text-gray-600">{languages}</Text>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg text-black font-Nbold mb-1 mr-10">Gender:</Text>
          <Text className="text-base text-gray-600">{user.gender}</Text>
        </View>

        <View className="mb-4 flex-row items-center">
          <Text className="text-lg text-black font-Nbold mb-1 mr-5">Interests:</Text>
          <Text className="text-base text-gray-600">{hobbies}</Text>
        </View>

        <View className="mb-4 flex-col items-start">
          <Text className="text-lg text-black font-Nbold mb-1 mr-5">Describe:</Text>
          <Text className="text-base text-gray-600 flex-1">{user.describe}</Text>
        </View>


        <TouchableOpacity
          className="bg-orange-500 py-3 rounded-full items-center"
          onPress={handleEditProfile}
        >
          <Text className="text-white font-bold text-lg">Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TourGuideProfile;
