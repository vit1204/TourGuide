import { Image, Text, View } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <View className="justify-center items-center px-4">
        <Image 
            source={images.empty}
            className="w-[270px] h-[215px] mt-10"
            resizeMode='contain'
        />
        <Text className="text-2xl font-psemibold text-black mt-2">
            {title}
        </Text>
        <Text className="font-pmedium text-sm text-gray-100 mt-0.5">
            {subtitle}
        </Text>
    </View>
  )
}

export default EmptyState