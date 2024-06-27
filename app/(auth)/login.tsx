import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from '../../components/FormField'

const Login = () => {

    const [form,setForm] = useState({
        email: "",
        password: ""
    })
    function handleLogin(){
        console.log(form)
    }
 
    return(
        <SafeAreaView className="bg-blue_dark h-full" >
       <ScrollView>
        <View
          className="w-full flex justify-center items-center px-4 "
          style={{
            minHeight: Dimensions.get("window").height - 200,
          }}
        >
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

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
            otherStyles="mt-7"
            placeholder={"Enter your password"}
          />

          <Text onPress={handleLogin} >

          </Text>


          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/register"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
        </SafeAreaView>
    )
}

export default Login;