import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { Link, router } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';


import FormField from '../../components/FormField'
import RadioCheck from '@/components/RadioCheck';
import { register } from '@/config/authApi';

export default function Register() {

    const [form,setForm] = useState({
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
    })

   async  function handleRegister(){
     try {
    
    
      const res = await register(form)
      console.log(res)
      if(res.status === 200){
        router.push('/login')
      }
     } catch (error) {
      console.log(error)
     }
    }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA300', dark: '#FFA300' }}
      headerImage={
       <Text style={{ fontSize:32, fontWeight: 'bold' }} >
        Sign up
       </Text>
      }>
              <View className='bg-white h-full'  >  

  <FormField
            title="Username"
            value={form.userName}
            handleChangeText={(e:any) => setForm({ ...form, userName: e })}
            otherStyles="mt-7"
            
            placeholder={"Enter your username"}
          />
            <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7 "
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
            handleChangeText={(e:any) => setForm({ ...form, email: e })}
            otherStyles="mt-7 "
            keyboardType="email-address"
            placeholder={"Enter your email"}
          />
           <FormField
            title="Languages"
            value={form.languages}
            handleChangeText={(e:any) => setForm({ ...form, languages: e })}
            otherStyles="mt-7 "
            placeholder={"Enter your languages"}
          />

           <FormField
            title="Hometown"
            value={form.hometown}
            handleChangeText={(e:any) => setForm({ ...form, hometown: e })}
            otherStyles="mt-7 "
            placeholder={"Enter your hometown"}
          />
           <FormField
            title="Hobbies"
            value={form.hobbies}
            handleChangeText={(e:any) => setForm({ ...form, hobbies: e })}
            otherStyles="mt-7"
            
            placeholder={"Enter your hobbies"}
          />
           <FormField
            title="Work Location"
            value={form.workLocation}
            handleChangeText={(e:any) => setForm({ ...form, workLocation: e })}
            otherStyles="mt-7 mb-7"
            placeholder={"Enter your work location"}
          />
           
        
  <View className={`space-y-2  `}>

<Text className="text-base text-black font-pmedium">Gender</Text>
<View className='flex flex-row justify-around'>


        <RadioCheck title='Male'
          onChange={(e:any) => setForm({ ...form, gender: e })}
          value='Male'
          selectedValue={ form.gender  }
        />

           <RadioCheck title='Female'
          onChange={(e:any) => setForm({ ...form, gender: e })}
          value='Female'
          selectedValue={ form.gender  }
        />
        </View>
        </View>

    
           <TouchableOpacity onPress={handleRegister}  className=" ml-[10px]  w-[95%] rounded-3xl pt-4 pb-4 flex items-center justify-center mt-[30px] bg-primary" >

    <Text className=" text-white text-center font-Nmedium text-[20px] ">Sign up</Text>
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  
});
