
import React from 'react'
import { Stack } from 'expo-router'

export default function SearchLayout() {
  return (
   <>
   <Stack >
    <Stack.Screen name="list" options={ { headerShown:false } } />
   </Stack>
   
   </>
  )
}