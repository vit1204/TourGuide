import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import FormFieldProfile from '@/components/FormFieldProfile';

import { fetchHometowns, fetchLanguages } from '@/config/fetchSubInfo';
import RadioCheck from '@/components/RadioCheck';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    avatar: 'https://via.placeholder.com/150',
    fullname: 'Nguyen Van A',
    phone: '+ 84 123-456-789',
    email: 'nguyenvana@example.com',
    language: 'Vietnamese',
    gender: 'Female',
    hometown: 'Da Nang, Vietnam',
    interests: 'Traveling, Cooking'
  });

  const [languages, setLanguages] = useState([]);
  const [hometowns, setHometowns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const hometownsData = await fetchHometowns();
      setHometowns(hometownsData);
  
      const languagesData = await fetchLanguages();
      setLanguages(languagesData);
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
      setForm({ ...form, avatar: result.assets[0].uri });
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
    const { fullname, phone, email, language, gender, hometown, interests } = form;

    // Kiểm tra thông tin người dùng
    if (!fullname.trim() || !phone.trim() || !email.trim() || !language.trim() || !gender.trim() || !hometown.trim() || !interests.trim()) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    // Lưu thông tin người dùng
    navigation.goBack();
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
            value={form.fullname}
            placeholder="Enter your fullname"
            handleChangeText={(text) => setForm({ ...form, fullname: text })}
            otherStyles={''}
            secureTextEntry={false}         
          />

          <FormFieldProfile
            title="Phone"
            value={form.phone}
            placeholder="Enter your phone number"
            handleChangeText={(text) => setForm({ ...form, phone: text })}
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
            value={form.language}
            placeholder="Enter your language"
            handleChangeText={(text) => setForm({ ...form, language: text })}
            otherStyles={'mt-5'}
            secureTextEntry={false}
          />

          <Text className="text-lg text-black font-Nbold">Gender:</Text>
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
            value={form.interests}
            placeholder="Enter your interests"
            handleChangeText={(text) => setForm({ ...form, interests: text })}
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
