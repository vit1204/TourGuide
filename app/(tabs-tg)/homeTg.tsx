import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import TourItem from '@/components/TourItem';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { User } from '@/types/interface';

const HomeTg = () => {

  const [user, setUser] = useState<User | null>(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData) as User);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUser();

    const updateDate = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setCurrentDate(date.toLocaleDateString('en-US', options));
    };
    updateDate();
    const intervalId = setInterval(updateDate, 1000 * 60); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
      <StatusBar style="light" backgroundColor="#FF8C00" />
        <View>
          <View className='bg-primary_darker px-2 flex-row text-center items-center justify-between rounded-b-3xl'>
            <View className='flex-row items-center'>
              <Image
                source={images.logo}
                className='w-10 h-10 rounded-full mr-2'
                />
              <Text className="text-blue_text font-extrabold text-xl">Byte Undefined</Text>
            </View>

            <View className="mb-4 flex-col items-center mr-2">
              <Text className="text-black text-base mt-4">Welcome Back</Text>
              <Text className="text-lg text-blue_text font-extrabold">{user?.fullName}</Text>
            </View>
          </View>
        </View>

        <View className='flex-col px-4'>
          <View className='flex-col items-center mb-6 mt-10'>
            <Text className="text-4xl font-extrabold">Hi, {user.userName}!</Text>
            <Text className="text-gray-500 text-lg">#{user.userName}</Text>
          </View>
          
          <View className="bg-white rounded-lg shadow-md p-2 mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-extrabold text-2xl">Tour Activity</Text>
            </View>

            <Text className="bg-yellow-100 rounded-lg py-2 px-4 mb-4 text-center">
              <Text className="text-blue_text font-bold text-center">Today: {currentDate}</Text>
            </Text>

            <TourItem />
          </View>

          {/* Mục My Trips */}
          <TouchableOpacity className="bg-white flex-row items-center justify-between border-b border-gray-200 py-3 px-4"
            onPress={() => router.push('/subSite/myTrip')}>
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={24} color="black" />
              <Text className="ml-3 text-black text-base">My Trips</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* Mục Travel Settings */}
          <TouchableOpacity className="bg-white flex-row items-center justify-between border-b border-gray-200 py-3 px-4">
            <View className="flex-row items-center">
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text className="ml-3 text-black text-base">Travel Settings</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeTg