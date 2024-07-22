import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading} : {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
})  => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={` rounded-xl justify-center items-center ${
          title === 'Report' ? 'bg-red-700' : 'bg-primary'
        }
            ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}

    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton