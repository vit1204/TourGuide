import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '@/constants';
import TourItem from '@/components/TourItem';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { Tour, User } from '@/types/interface';
import { getAllTourByGuideId } from '@/config/authApi';

const HomeTg = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  const [activeTours, setActiveTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  const fetchTours = useCallback(async () => {
    if (user) {
      try {
        const data = await getAllTourByGuideId(user._id);
        setTours(data.Tour);
        await AsyncStorage.setItem('tours', JSON.stringify(data.Tour));
      } catch (error) {
        console.error('Error fetching tour data', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  useEffect(() => {
    const activeToursList = tours.filter(tour => tour.status === 'activity');
    setActiveTours(activeToursList);

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
    const intervalId = setInterval(updateDate, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [tours]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>No user data found</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <StatusBar style="light" backgroundColor="#FF8C00" />
        <View className="bg-primary_darker px-2 flex-row items-center justify-between rounded-b-3xl">
          <View className="flex-row items-center">
            <Image source={images.logo} className="w-10 h-10 rounded-full mr-2" />
            <Text className="text-blue_text font-extrabold text-xl">Byte Undefined</Text>
          </View>
          <View className="mb-4 flex-col items-center mr-2">
            <Text className="text-black text-base mt-4">Welcome Back</Text>
            <Text className="text-lg text-blue_text font-extrabold">{user.fullName}</Text>
          </View>
        </View>

        <View className="flex-col px-4">
          <View className="flex-col items-center mb-6 mt-10">
            <Text className="text-4xl font-extrabold">Hi, {user.userName}!</Text>
            <Text className="text-gray-500 text-lg">#{user.userName}</Text>
          </View>

          <View className="bg-white rounded-lg shadow-md p-2 mb-6">
            <Text className="font-extrabold text-2xl mb-2">Tour Activity</Text>
            <Text className="bg-yellow-100 rounded-lg py-2 px-4 mb-4 text-center">
              <Text className="text-blue_text font-bold">Today: {currentDate}</Text>
            </Text>

            {activeTours.length > 0 ? (
              activeTours.map(tour => <TourItem key={tour._id} tour={tour} />)
            ) : (
              <Text>No active tours</Text>
            )}
          </View>

          <TouchableOpacity
            className="bg-white flex-row items-center justify-between border-b border-gray-200 py-3 px-4"
            onPress={() => router.push('/subSite/myTrip')}
          >
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={24} color="black" />
              <Text className="ml-3 text-black text-base">My Trips</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTg;
