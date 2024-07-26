import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import FormFieldProfile from '@/components/FormFieldProfile';
import RadioCheck from '@/components/RadioCheck';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/interface';
import { saveUserData, uploadImage } from '@/config/authApi';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState<User | null>(null);
  const [initialAvatar, setInitialAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {

      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData) as User;
        setForm(user);
        setInitialAvatar(user.avatar);
      }
    }
    fetchData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setForm({ ...form, avatar: result.assets[0].uri } as User);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: '#FF8C00', // Màu nền vàng
      },
      headerTintColor: '#fff', // Màu chữ trắng
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const saveChanges = async () => {
    if (!form) {
      return;
    }

    const { fullName, phoneNumber, email, languages, gender, hometown, hobbies, avatar } = form;

    // Kiểm tra thông tin người dùng
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim() || !languages.length || !gender.trim() || !hometown.trim() || !hobbies.length) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    // Lưu thông tin người dùng vào cơ sở dữ liệu
    try {
      // If avatar has changed, upload the new avatar
      let avatarUrl = avatar;
      if (avatar !== initialAvatar) {
        const uploadResponse = await uploadImage(avatar);
        avatarUrl = uploadResponse.data.url;
      }

      // Save user data with the possibly updated avatar URL
      await saveUserData({ ...form, avatar: avatarUrl });
      await AsyncStorage.setItem('user', JSON.stringify({ ...form, avatar: avatarUrl }));
      Alert.alert('Success', 'Profile updated successfully');
      router.back()
    } catch (error) {
      console.error('Error saving user data', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  if (!form) {
    return (
      <View className='flex items-center justify-center'>
        <Text className='text-xl text-black'>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['right', 'bottom', 'left']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={pickImage} className="items-center mb-4">
          <Image source={{ uri: form.avatar }} className="w-24 h-24 rounded-full border-2 border-black-200" />
          <Text className="text-blue-500 text-base mt-2">Change Avatar</Text>
        </TouchableOpacity>
        <View className="mb-4">
          <FormFieldProfile
            title="Fullname"
            value={form.fullName}
            placeholder="Enter your fullname"
            handleChangeText={(text) => setForm({ ...form, fullName: text })}
            otherStyles={''}
            secureTextEntry={false}         
          />

          <FormFieldProfile
            title="Phone"
            value={form.phoneNumber}
            placeholder="Enter your phone number"
            handleChangeText={(text) => setForm({ ...form, phoneNumber: text })}
            otherStyles={'mt-5'}
            secureTextEntry={false}          
          />

         <FormFieldProfile
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles={'mt-5'}
            secureTextEntry={false}          
          />

          <FormFieldProfile
            title="Language"
            value={form.languages.join(', ')}
            placeholder="Enter your language"
            handleChangeText={(text) => setForm({ ...form, languages: text.split(',').map(lang => lang.trim()) })}
            otherStyles={'mt-5'}
            secureTextEntry={false}
          />

          <Text className="text-lg text-black font-Nbold mt-5">Gender:</Text>
          <View className='flex flex-row justify-around'>
            <RadioCheck
              title='Male'
              onChange={(e) => setForm({ ...form, gender: 'nam' })}
              value='Male'
              selectedValue={form.gender === 'nam' ? 'Male' : 'Female'}
            />

            <RadioCheck
              title='Female'
              onChange={(e) => setForm({ ...form, gender: 'nu' })}
              value='Female'
              selectedValue={form.gender === 'nu' ? 'Female' : 'Male'}
            />
          </View>

          <FormFieldProfile 
            title="Hometown"
            value={form.hometown}
            placeholder="Enter your hometown"
            handleChangeText={(text) => setForm({ ...form, hometown: text })}
            otherStyles={'mt-5'}
            secureTextEntry={false}
          />

          <FormFieldProfile
            title="Interests"
            value={form.hobbies.join(', ')}
            placeholder="Enter your interests"
            handleChangeText={(text) => setForm({ ...form, hobbies: text.split(',').map(hobby => hobby.trim()) })}
            otherStyles={'mt-5'}
            secureTextEntry={false}          
          />

          <View className={`bg-white mt-5`}>
              <Text className="text-xl font-bold mb-2">About me</Text>
              <TextInput
                value={form.describe}
                placeholder="Say something about you"
                onChangeText={(text) => setForm({ ...form, describe : text })}
                className="h-45 px-2 rounded-lg border-2 border-gray-700 shadow-lg text-lg"
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
              />
          </View>
        </View>
        <CustomButton 
          title='Save Changes'
          handlePress={saveChanges}
          containerStyles='mt-5 py-3 rounded-full items-center bg-orange-500'
          textStyles='text-white font-bold text-lg'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
