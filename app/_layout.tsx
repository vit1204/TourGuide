import {  SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontLoaded,error] = useFonts({
    "NeueMontreal-Regular" : require("../assets/fonts/NeueMontreal-Regular.ttf"),
    "NeueMontreal-Bold" : require("../assets/fonts/NeueMontreal-Bold.ttf"),
    "NeueMontreal-Light" : require("../assets/fonts/NeueMontreal-Light.ttf"),
    "NeueMontreal-Medium" : require("../assets/fonts/NeueMontreal-Medium.ttf"),
  });

  useEffect( () => {
    if(error){
 throw error
    }

   if(fontLoaded) {
      SplashScreen.hideAsync()
    } 

  },[fontLoaded,error]);

  if (!fontLoaded) {
    return null;
  }

  if (!fontLoaded && !error) {
    return null;
  }

  

  return (
    <Stack>
      <Stack.Screen name="index" options={ { headerShown:false } } />
      <Stack.Screen name="(auth)" options={ { headerShown:false } } />
      <Stack.Screen name="(tabs)" options={ { headerShown:false } } />
      <Stack.Screen name="(tabs-tg)" options={ { headerShown:false } } />
      <Stack.Screen name="(searchTourguide)" options={{headerShown:false}} />
    </Stack>
  );
}


export default RootLayout;