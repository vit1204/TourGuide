import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import TourItem from '@/components/TourItem';

const HomeTg = () => {

  const [User, setUser] = useState({
    
  })

  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
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
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <StatusBar style="light" backgroundColor="#FF8C00" />
        <View>
          <View className='bg-primary px-2 flex-row text-center items-center justify-between rounded-b-3xl'>
            <View className='flex-row items-center'>
              <Image
                source={images.logo}
                className='w-10 h-10 rounded-full mr-2'
                />
              <Text className="text-blue_text font-extrabold text-xl">Byte Undefined</Text>
            </View>

            <View className="mb-4 flex-col items-center mr-2">
              <Text className="text-black text-base mt-4">Welcome Back</Text>
              <Text className="text-xl text-blue_text font-extrabold">Ho Thanh Tien</Text>
            </View>
          </View>
        </View>

        <View className='flex-col px-4'>
          <View className='flex-col items-center mb-6 mt-10'>
            <Text className="text-5xl font-extrabold">Hi, Tien!</Text>
            <Text className="text-gray-500 text-lg">#hothanhtien123</Text>
            <Text className="text-4xl font-bold mt-2">10,500</Text>
            <Text className="text-gray-500 text-lg">Current Points</Text>
          </View>
          
          <View className="bg-white rounded-lg shadow-md p-2 mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-extrabold text-2xl">Tour Activity</Text>
            </View>

            <Text className="bg-yellow-100 rounded-lg py-2 px-4 mb-2 text-center">
              <Text className="text-blue_text font-bold text-center">Today: {currentDate}</Text>
            </Text>

            <TourItem />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeTg