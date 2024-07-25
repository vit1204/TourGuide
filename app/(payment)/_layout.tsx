import {  StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
   <>
   <Stack  >
    <Stack.Screen name="PaymentSucess" options={ { headerShown:false } } />
    <Stack.Screen name="PaymentFailed" options={ { headerShown:false } } />
   </Stack>
   <StatusBar barStyle={"light-content"} />
   </>
  )
}