import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { Tour } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUTCDateString } from '@/utils/getUTCDateString';
import { reportTour } from '@/utils/reportTour';

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

     // Hàm tính toán thời gian chênh lệch
     const getDuration = (start: Date, end: Date) => {
        const diffInMs = end.getTime() - start.getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        return { hours: diffInHours, minutes: diffInMinutes };
    };

    const duration = getDuration(startDate, endDate);  
    
      
    const toDetailTour = async () => {
        try {
            await AsyncStorage.setItem('currentTour', JSON.stringify(tour));
            router.push('/subSite/detail-tour');
        } catch (error) {
            console.error('Error storing current tour', error);
        }
    }
    
    const handleReportTour = () => {
        Alert.alert(
          "Report Tour",
          "Are you sure you want to report this tour?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: async () => {
                try {
                  await reportTour(tour);
                } catch (error) {
                  console.error('Error reporting tour:', error);
                }
              }
            }
          ]
        );
      }

    return (
        <View className='mt-3 mb-3 p-1 w-full'>
            <View className="flex-col py-1 px-1 rounded-lg border-gray-700 border-2">
                <View className="flex-row items-center justify-between py-4 px-2">
                    <View className="bg-[#F2F2F2] rounded-lg py-1 px-3">
                        <Text className="text-base font-bold text-center">{getMonthName(startDate).slice(0, 3)}</Text>
                        <Text className="text-3xl font-bold text-center text-[#FFC626]">{startDate.getUTCDate()}</Text>
                    </View>

                    <View className='flex-row justify-between items-center'>
                        <View className="py-1 px-2 flex-col">
                            <Text className="text-base  text-center">
                                {startDate.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    timeZone: 'UTC'
                                })}
                            </Text>
                            <Text className="text-xl font-bold text-center text-black">{tour.Tuorlocation[0]}</Text>
                        </View>

                        <Ionicons name="arrow-forward" size={16} color="black" className="mx-2" />

                        <View className="py-1 px-2 flex-col">
                            <Text className="text-base text-center">
                                {endDate.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    timeZone: 'UTC'
                                })}
                            </Text>
                        <Text className="text-xl font-bold text-center text-black">{tour.Tuorlocation[1]}</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-lg font-bold text-center text-blue_text">{tour.price.toLocaleString('vi-VN')}</Text>
                    </View>
                </View>

                <View className="flex-row justify-between px-4">
                    <Text className="text-gray-700">{`${duration.hours}h ${duration.minutes}m`}</Text>
                    <Text className="text-gray-700">{tour.tourType}</Text>
                    <Text className="text-gray-700">Total Guide: {tour.numberUser}</Text>
                </View>
            </View>

            <CustomButton 
                title='Detail'
                handlePress={toDetailTour}
                containerStyles='bg-blue_text rounded-lg py-2 px-4 mt-1'
                textStyles='text-white font-bold text-center text-lg'
            />
            {tour.status === 'activity' && (
               <CustomButton 
                title='Report'
                handlePress={handleReportTour}
                containerStyles='bg-blue_text rounded-lg py-2 px-4 mt-1'
                textStyles='text-white font-bold text-center text-lg'
                />
            )}
            
        </View>
    )
}

export default TourItem