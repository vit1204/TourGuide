

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import icon from "../constants/Icon"
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles: string; // Explicitly define the type as string
  [key: string]: any; // Allow any other props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}  `}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className=" bg-white w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base "
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
            source={!showPassword ? icon.eye: icon.eyeHide }
              
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;