import { router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import GlobalProvider from "../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
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

  if (!fontsLoaded) {
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
        <Stack.Screen name="(tabs-tg)" options={{ headerShown: false }} />
        <Stack.Screen name="(userTabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Query/query" options={{ headerShown: false }} />
        <Stack.Screen name="Query/filter" options={{ headerShown: false }} />
        <Stack.Screen name="Query/id/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="(payment)" options={{ headerShown: false }} />
        <Stack.Screen
          name="chatScreen/[chatId]"
          options={{ headerShown: true, headerBackTitleVisible: false }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
