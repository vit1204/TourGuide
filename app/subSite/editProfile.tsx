import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import FormFieldProfile from '@/components/FormFieldProfile';

import { fetchHometowns, fetchLanguages } from '@/config/fetchSubInfo';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150');
  const [fullname, setFullname] = useState('Nguyen Van A');
  const [phone, setPhone] = useState('+ 84 123-456-789');
  const [email, setEmail] = useState('nguyenvana@example.com');
  const [language, setLanguage] = useState('Vietnamese');
  const [gender, setGender] = useState('Female');
  const [hometown, setHometown] = useState('Da Nang, Vietnam');
  const [interests, setInterests] = useState('Traveling, Cooking');

  const [languages, setLanguages] = useState([]);
  const [hometowns, setHometowns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data1 = await fetchHometowns();
      setHometowns(data1);
  
      const data2 = await fetchLanguages();
      setLanguages(data2);
    }
    fetchData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.
    launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
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

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const saveChanges = async () => {
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
          <Image source={{ uri: avatar }} className="w-24 h-24 rounded-full" />
          <Text className="text-blue-500 text-base mt-2">Change Avatar</Text>
        </TouchableOpacity>
        <View className="mb-4">
          <FormFieldProfile
            title="Fullname"
            value={fullname}
            placeholder="Enter your fullname"
            handleChangeText={setFullname}
            otherStyles={''} secureTextEntry={false}         
          />

          <FormFieldProfile
            title="Phone"
            value={phone}
            placeholder="Enter your phone number"
            handleChangeText={setPhone} otherStyles={'mt-5'} secureTextEntry={false}          
          />

         <FormFieldProfile
            title="Email"
            value={email}
            placeholder="Enter your email"
            handleChangeText={setEmail} 
            otherStyles={'mt-5'} 
            secureTextEntry={false}          
          />

          <FormFieldProfile
            title="Language"
            value={language}
            placeholder="Enter your language"
            handleChangeText={setLanguage}
            otherStyles={'mt-5'} 
            secureTextEntry={false}
          />

          <Text className="text-lg text-black font-Nbold">Language:</Text>
          <TextInput
            className="border border-gray-300 py-2 px-4 rounded mb-4"
            value={language}
            onChangeText={setLanguage}
          />

          <Text className="text-lg text-black font-Nbold">Gender:</Text>
          <TextInput
            className="border border-gray-300 py-2 px-4 rounded mb-4"
            value={gender}
            onChangeText={setGender}
          />
          <Text className="text-lg text-black font-Nbold">Hometown:</Text>
          <TextInput
            className="border border-gray-300 py-2 px-4 rounded mb-4"
            value={hometown}
            onChangeText={setHometown}
          />
          <FormFieldProfile
            title="Interests"
            value={interests}
            placeholder="Enter your interests"
            handleChangeText={setInterests} 
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
