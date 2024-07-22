import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { Link, router } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, getUserById } from '../../config/authApi';
import { jwtDecode } from 'jwt-decode';


import FormField from '../../components/FormField'
import { useGlobalContext } from '@/context/GlobalProvider';
import { User } from '@/types/interface';

export default function HomeScreen() {
  const {user,setUser} = useGlobalContext() 
    const [form,setForm] = useState({
        userName: "",
        password: ""
    })
    const handleLogin = async () => {
      try {
        const data = await login(form.userName, form.password);
        await AsyncStorage.setItem('authToken', data.token);
    
        // Decode token để lấy userId
        const decodedToken: any = jwtDecode(data.token);
        const userId = decodedToken.id;
    
         // Gọi API để lấy thông tin người dùng
        const userInfo = await getUserById(userId);
        setUser(userInfo.userDetial  as User);
        await AsyncStorage.setItem('user', JSON.stringify(userInfo.userDetial));
        setUser(userInfo.userDetial  as User);
        await AsyncStorage.setItem('username', JSON.stringify(userInfo.userDetial.fullName))

        await AsyncStorage.setItem('roleUser', JSON.stringify(data.role));
    
        if (data.role === 'user') {
          router.replace('/home');
        } else if (data.role === 'guide') {
          console.log('Vao Tour Guide');
          router.replace('/homeTg');
        } else {
          Alert.alert('Invalid role');
        }
      } catch (error: any) {
        console.log(error);
        Alert.alert('Login failed', error.message);
      }
    };
    

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA300', dark: '#FFA300' }}
      headerImage={
       <Text style={{ fontSize:32, fontWeight: 'bold' }} >
          Log in
       </Text>
      }>

        <View className='bg-white h-full'  >  
          <FormField
            title="userName"
            value={form.userName}
            handleChangeText={(e:any) => setForm({ ...form, userName: e })}
            otherStyles="mt-7"
            placeholder={"Enter your userName"}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7 mb-7"
            placeholder={"Enter your password"}
          />


          
          <TouchableOpacity className=" ml-[10px]  w-[95%] rounded-3xl pt-4 pb-4 
                  flex items-center justify-center mt-[30px] bg-primary"
                      onPress={handleLogin} >
              <Text className=" text-white text-center font-Nmedium text-[20px] ">Sign In</Text>
          </TouchableOpacity>
          
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/register"
              className="text-lg font-psemibold text-primary"
            >
              Signup
            </Link>
          </View>
        </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});


