import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { Tour } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TourItem = ({tour}: {tour: Tour}) => {

    const startDate = new Date(tour.startTime);
    const endDate = new Date(tour.endTime);

    const getMonthName = (date: Date) => {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[date.getMonth()];
      };
    
      
      const toDetailTour = async () => {
        try {
            await AsyncStorage.setItem('currentTour', JSON.stringify(tour));
            router.push('/subSite/detail-tour');
        } catch (error) {
            console.error('Error storing current tour', error);
        }
    }
    


    return (
        <View className='mt-3 mb-3 p-1'>
            <View className="flex-col py-1 px-1 rounded-lg border-gray-700 border-2">
                <View className="flex-row items-center justify-between py-4 px-2">
                    <View className="bg-[#F2F2F2] rounded-lg py-1 px-3">
                        <Text className="text-base font-bold text-center">{getMonthName(startDate).slice(0, 3)}</Text>
                        <Text className="text-3xl font-bold text-center text-[#FFC626]">{startDate.getDate()}</Text>
                    </View>

                    <View className='flex-row justify-between items-center'>
                        <View className="py-1 px-2 flex-col">
                            <Text className="text-base  text-center">{startDate.toLocaleTimeString()}</Text>
                            <Text className="text-xl font-bold text-center text-black">{tour.Tuorlocation[0]}</Text>
                        </View>

                        <Ionicons name="arrow-forward" size={16} color="black" className="mx-2" />

                        <View className="py-1 px-2 flex-col">
                            <Text className="text-base text-center">{endDate.toLocaleTimeString()}</Text>
                        <Text className="text-xl font-bold text-center text-black">{tour.Tuorlocation[1]}</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-lg font-bold text-center text-blue_text">{tour.price / 1000}K</Text>
                    </View>
                </View>

                <View className="flex-row justify-between px-4">
                    <Text className="text-gray-700">0h30m</Text>
                    <Text className="text-gray-700">Viet Nguyen</Text>
                    <Text className="text-gray-700">#tour123</Text>
                </View>
            </View>

            <CustomButton 
                title='Detail'
                handlePress={toDetailTour}
                containerStyles='bg-blue_text rounded-lg py-2 px-4 mt-1'
                textStyles='text-white font-bold text-center text-lg'
            />
        </View>
    )
}

export default TourItem