import {  StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
   <>
   <Stack  >
    <Stack.Screen name="success" options={ { headerShown:false } } />
    <Stack.Screen name="cancel" options={ { headerShown:false } } />
   </Stack>
   <StatusBar barStyle={"light-content"} />
   </>
  )
}