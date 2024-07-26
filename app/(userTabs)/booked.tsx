import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Tour } from "@/types/interface";
import { getUserById, getAllTourByUserId } from "@/config/authApi";
import { ScrollView, Text, View } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import TourUserDetail from "@/components/TourUserDetail";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Tab = createMaterialTopTabNavigator();

const TourDetail = () => {
  const navigation = useNavigation();

  const { user, setUser } = useGlobalContext();

  const [currentTour, setCurrentTour] = useState<any>(null);
  const [customer, setCustomer] = useState<User | null>(null);
  const [guide, setGuide] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGuide, setIsLoadingGuide] = useState(true);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tour List",
      headerStyle: {
        backgroundColor: "#FF8C00", // Màu nền vàng
      },
      headerTintColor: "#fff", // Màu chữ trắng
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, [navigation]);

  const getCurrentTour = async () => {
    try {
      const tourData = await getAllTourByUserId(user._id);
      if (tourData) {
        setCurrentTour(tourData.Tour);
      } else {
        console.log("No current tour found");
      }
    } catch (error) {
      console.error("Error getting current tour", error);
    } finally {
      setIsLoading(false); //Sau khi xử lý dữ liệu, set isLoading thành false
    }
  };
  useEffect(() => {
    getCurrentTour();
  }, []);

  const getCurrentGuide = async () => {
    try {
      if (currentTour) {
        const guideId = currentTour.map(
          (tour: { guide_id: any }) => tour.guide_id
        );
        const guideData = await getUserById(guideId[0]);
        if (guideData.userDetial.role === "guide") {
          setGuide(guideData.userDetial as User);
        }
      } else {
        console.log("No guide found");
      }
    } catch (error) {
      console.error("Error getting guide data", error);
    } finally {
      setIsLoadingGuide(false); //Sau khi xử lý dữ liệu, set isLoadingGuide thành false
    }
  };

  useEffect(() => {
    if (currentTour) {
      getCurrentGuide();
    }
  }, [currentTour]);

  const getCurrentCustomer = async () => {
    try {
      if (user) {
        setCustomer(user);
      }
    } catch (error) {
      console.error("Error getting customer data", error);
    } finally {
      setIsLoadingCustomer(false); //Sau khi xử lý dữ liệu, set isLoadingCustomer thành false
    }
  };
  useEffect(() => {
    if (currentTour) {
      getCurrentCustomer();
    }
  }, [currentTour]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Detail Tour",
      headerStyle: {
        backgroundColor: "#FF8C00", // Màu nền vàng
      },
      headerTintColor: "#fff", // Màu chữ trắng
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, [navigation]);

  const actitivy = currentTour?.filter(
    (tour: { status: string }) => tour.status === "activity"
  );

  const upcoming = currentTour?.filter(
    (tour: { status: string }) => tour.status === "upcoming"
  );

  if (isLoading || isLoadingGuide || isLoadingCustomer) {
    return (
      <View className="h-full w-full flex items-center justify-center">
        <Text className="flex items-center justify-center">Loading...</Text>
      </View>
    ); // Nếu isLoading là true, hiển thị thông báo tải
  }

  return (
    <SafeAreaView className="flex-1 h-full bg-white ">
      <Text
        onPress={async () => {
          await getCurrentTour();
          await getCurrentGuide();
          await getCurrentCustomer();
        }}
        className="text-black text-[20px]"
      >
        {" "}
        Reload{" "}
      </Text>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#FF8C00",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: {
            backgroundColor: "#FF8C00",
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarStyle: {
            marginTop: 0,
            marginBottom: 40,
          },
        }}
      >
        <Tab.Screen name="Active Tour ">
          {() => (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
              {actitivy?.length === 0 ?? [] ? (
                <EmptyState
                  title="No Tour Found"
                  subtitle="No upcoming tours found"
                />
              ) : (
                <ScrollView>
                  {actitivy?.map(
                    (item: { _id: React.Key | null | undefined }) => (
                      <View key={item._id}>
                        <TourUserDetail
                          tour={item as any}
                          guide={guide as User}
                          customer={customer as User}
                        />
                      </View>
                    )
                  )}
                </ScrollView>
              )}
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen name="Unpaid Tour">
          {() => (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
              {upcoming?.length === 0 ?? [] ? (
                <EmptyState
                  title="No Tour Found"
                  subtitle="No upcoming tours found"
                />
              ) : (
                <ScrollView>
                  {upcoming?.map(
                    (item: { _id: React.Key | null | undefined }) => (
                      <View key={item._id}>
                        <TourUserDetail
                          tour={item as any}
                          guide={guide as User}
                          customer={customer as User}
                        />
                      </View>
                    )
                  )}
                </ScrollView>
              )}
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TourDetail;
