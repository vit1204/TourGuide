import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const TourGuideProfile = () => {
  const [tourGuide, setTourGuide] = useState({
    avatar: 'https://via.placeholder.com/150', // Ảnh đại diện mặc định
    fullName: 'Ho Thanh Tien',
    phoneNumber: '+84 123 456 789',
    email: 'hothanhtien@gmail.com',
    language: 'Tiếng Việt, English',
    gender: 'Nam',
    hometown: 'Quảng Bình',
    interests: 'Du lịch, Ẩm thực, Văn hóa'
  });

  const handleEditProfile = () => {
    router.push('../subSite/editProfile');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="items-center mb-8">
          <Image
            source={{ uri: tourGuide.avatar }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold mb-2">{tourGuide.fullName}</Text>
          <Text className="text-base text-gray-600 mb-4">{tourGuide.hometown}</Text>
          <View className="flex-row items-center mb-4">
            <FontAwesome name="star" size={24} color="orange" />
            <Text className="text-lg font-bold ml-2">4.8</Text>
            <Text className="text-base text-gray-600 ml-1">(230)</Text>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-Nbold mb-1">Phone:</Text>
          <Text className="text-base text-gray-600">{tourGuide.phoneNumber}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-Nbold mb-1">Email:</Text>
          <Text className="text-base text-gray-600">{tourGuide.email}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-Nbold mb-1">Language:</Text>
          <Text className="text-base text-gray-600">{tourGuide.language}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-Nbold mb-1">Gender:</Text>
          <Text className="text-base text-gray-600">{tourGuide.gender}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-black font-Nbold mb-1">Interests:</Text>
          <Text className="text-base text-gray-600">{tourGuide.interests}</Text>
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
