import { router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import GlobalProvider from '../context/GlobalProvider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          router.replace("login");
        } else {
          router.replace("home");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setIsReady(true);
      }
    };

    checkToken();
  }, []);

  const [fontsLoaded, fontsError] = useFonts({
    "NeueMontreal-Regular": require("../assets/fonts/NeueMontreal-Regular.ttf"),
    "NeueMontreal-Bold": require("../assets/fonts/NeueMontreal-Bold.ttf"),
    "NeueMontreal-Light": require("../assets/fonts/NeueMontreal-Light.ttf"),
    "NeueMontreal-Medium": require("../assets/fonts/NeueMontreal-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsError) {
      throw fontsError;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (

    <GlobalProvider>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(userTabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Query/query" options={{ headerShown: false }} />
        <Stack.Screen name="Query/id/[id]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>


  );
};

export default RootLayout;
