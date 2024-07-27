import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { Link, router } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import * as ImagePicker from 'expo-image-picker';
import FormField from '../../components/FormField';
import RadioCheck from '@/components/RadioCheck';
import { register } from '@/config/authApi';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '@/constants';

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    fullName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    password: "",
    languages: "",
    hometown: "",
    workLocation: "",
    hobbies: "",
  });

  const [subForm, setSubForm] = useState({
    idCardImage: '',
    agreeToTerms: false,
  });

  const pickImage = async () => {
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setSubForm({ ...subForm, idCardImage: result.assets[0].uri });
    }
  };

  async function handleRegister() {
    try {
      const res = await register({ ...form, ...subForm });
      console.log(res);
      if (res) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA300', dark: '#FFA300' }}
      headerImage={
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
          Sign up
        </Text>
      }>
      <View className='bg-white h-full'>

        <FormField
          title="Username"
          value={form.userName}
          handleChangeText={(e: any) => setForm({ ...form, userName: e })}
          otherStyles="mt-7"
          placeholder={"Enter your username"}
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
          placeholder={"Enter your password"}
        />
        <FormField
          title="Fullname"
          value={form.fullName}
          handleChangeText={(e: any) => setForm({ ...form, fullName: e })}
          otherStyles="mt-7"
          placeholder={"Enter your fullname"}
        />
        <FormField
          title="Phone number"
          value={form.phoneNumber}
          handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e })}
          otherStyles="mt-7"
          placeholder={"Enter your phone number"}
        />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e: any) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
          placeholder={"Enter your email"}
        />
        <FormField
          title="Languages"
          value={form.languages}
          handleChangeText={(e: any) => setForm({ ...form, languages: e })}
          otherStyles="mt-7"
          placeholder={"Enter your languages"}
        />
        <FormField
          title="Hometown"
          value={form.hometown}
          handleChangeText={(e: any) => setForm({ ...form, hometown: e })}
          otherStyles="mt-7"
          placeholder={"Enter your hometown"}
        />
        <FormField
          title="Hobbies"
          value={form.hobbies}
          handleChangeText={(e: any) => setForm({ ...form, hobbies: e })}
          otherStyles="mt-7"
          placeholder={"Enter your hobbies"}
        />
        <FormField
          title="Work Location"
          value={form.workLocation}
          handleChangeText={(e: any) => setForm({ ...form, workLocation: e })}
          otherStyles="mt-7 mb-7"
          placeholder={"Enter your work location"}
        />

        <View className={`space-y-2`}>
          <Text className="text-base text-black font-pmedium">Gender</Text>
          <View className='flex flex-row justify-around'>
            <RadioCheck title='Male'
              onChange={(e: any) => setForm({ ...form, gender: e })}
              value='nam'
              selectedValue={form.gender}
            />
            <RadioCheck title='Female'
              onChange={(e: any) => setForm({ ...form, gender: e })}
              value='nữ'
              selectedValue={form.gender}
            />
          </View>
        </View>

        <View className="mt-7">
          <Text className="text-base text-black font-pmedium">Upload ID/Authentication Card</Text>
          
          <TouchableOpacity onPress={pickImage} className="mt-3 p-4 bg-gray-200 rounded-lg flex items-center justify-center">
            {subForm.idCardImage ? (
              <Image 
                source={{ uri: subForm.idCardImage }}
                className='w-full h-64 rounded-2xl'
                resizeMode='cover'
            />
            ): (
              <View className='w-full h-12 px-4 bg-black-100 rounded-2xl justify-center items-center
                border-black-200 flex-row space-x-2'>
                  <Image 
                    source={icons.upload}
                    className='w-5 h-5'
                    resizeMode='contain'
                  />
                  
                  <Text className='text-gray-100 text-sm font-pmedium'>
                    Choose a file
                  </Text>
                </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 flex-row items-center">
          <TouchableOpacity onPress={() => setSubForm({ ...subForm, agreeToTerms: !subForm.agreeToTerms })} className="mr-2">
            <View className={`w-6 h-6 ${subForm.agreeToTerms ? 'bg-primary' : 'bg-white'} border-2 border-primary rounded flex items-center justify-center`}>
              {subForm.agreeToTerms && <Ionicons name="checkmark" size={20} color="white" />}
            </View>
          </TouchableOpacity>
          <Text className="text-base text-black">
            I agree to the <Link href="http://51.79.173.117:3002/dieukhoan/" className="text-primary">Terms and Conditions</Link>
          </Text>
        </View>

        <TouchableOpacity onPress={handleRegister} className="ml-[10px] w-[95%] rounded-3xl pt-4 pb-4 flex items-center justify-center mt-[30px] bg-primary">
          <Text className="text-white text-center font-Nmedium text-[20px]">Sign up</Text>
        </TouchableOpacity>

        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Already have an account?
          </Text>
          <Link
            href="/login"
            className="text-lg font-psemibold text-primary"
          >
            Login
          </Link>
        </View>
      </View>
    </ParallaxScrollView>
  );
}
