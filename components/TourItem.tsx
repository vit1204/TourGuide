import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const TourItem = () => {
  return (
    <View className='mb-6'>
        <View className="flex-col py-2 px-2 rounded-lg border-gray-700 border-2">
            <View className="flex-row items-center justify-between py-4 px-2">
                <View className="bg-[#F2F2F2] rounded-lg py-1 px-3">
                    <Text className="text-base font-bold text-center">July</Text>
                    <Text className="text-3xl font-bold text-center text-[#FFC626]">12</Text>
                </View>

                <View className='flex-row justify-between items-center'>
                    <View className="py-1 px-2 flex-col">
                        <Text className="text-base  text-center">9:15 am</Text>
                        <Text className="text-xl font-bold text-center text-black">Son Tra</Text>
                    </View>

                    <Ionicons name="arrow-forward" size={16} color="black" className="mx-2" />

                    <View className="py-1 px-2 flex-col">
                        <Text className="text-base text-center">9:15 am</Text>
                    <Text className="text-xl font-bold text-center text-black">Son Tra</Text>
                    </View>
                </View>

                <View>
                    <Text className="text-lg font-bold text-center text-blue_text">120K vnd</Text>
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
            handlePress={() => router.replace('../detail/detailTour')}
            containerStyles='bg-blue_text rounded-lg py-2 px-4 mt-1'
            textStyles='text-white font-bold text-center text-lg'
        />
    </View>
  )
}

export default TourItem