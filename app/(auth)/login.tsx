import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { Link, router } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';


import FormField from '../../components/FormField'

export default function HomeScreen() {

    const [form,setForm] = useState({
        email: "",
        password: ""
    })
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
            title="Email"
            value={form.email}
            handleChangeText={(e:any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder={"Enter your email"}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7 mb-7"
            placeholder={"Enter your password"}
          />


          
          <TouchableOpacity className=" ml-[10px]  w-[95%] rounded-3xl pt-4 pb-4 
                      flex items-center justify-center mt-[30px] bg-primary" >
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
