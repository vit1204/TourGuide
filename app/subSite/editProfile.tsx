import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import FormFieldProfile from '@/components/FormFieldProfile';
import { fetchHometowns, fetchLanguages } from '@/config/fetchSubInfo';
import RadioCheck from '@/components/RadioCheck';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/interface';
import { saveUserData } from '@/config/authApi';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState<User | null>(null);

  const [languages, setLanguages] = useState([]);
  const [hometowns, setHometowns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const hometownsData = await fetchHometowns();
      setHometowns(hometownsData);
  
      const languagesData = await fetchLanguages();
      setLanguages(languagesData);

      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setForm(JSON.parse(userData));
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

    if (!result.canceled) {
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

    const { fullName, phoneNumber, email, languages, gender, hometown, hobbies } = form;

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
      await saveUserData(form);
      await AsyncStorage.setItem('user', JSON.stringify(form));
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
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
          <Image source={{ uri: form.avatar }} className="w-24 h-24 rounded-full" />
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
              onChange={(e) => setForm({ ...form, gender: e })}
              value='Male'
              selectedValue={form.gender}
            />

            <RadioCheck
              title='Female'
              onChange={(e) => setForm({ ...form, gender: e })}
              value='Female'
              selectedValue={form.gender}
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
        </View>
        <TouchableOpacity
          className="bg-orange-500 py-3 rounded-full items-center"
          onPress={saveChanges}
        >
          <Text className="text-white font-bold text-lg">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
