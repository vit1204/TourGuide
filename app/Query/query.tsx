import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import Icon from "@/constants/Icon";
import { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useFocusEffect, usePathname } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EmptyState from "@/components/EmptyState";
import GuideList from "@/components/GuideList";
import RNPickerSelect from "react-native-picker-select";



const Tab = createMaterialTopTabNavigator();


const TourguideList = () => {
const navigation  = useNavigation()
const [numColumns, setNumColumns] = useState(2);

  const { place, setPlace, date, setDate } = useGlobalContext();
    const [userData, setUserData] = useState<any[]>([]);
  const pathname = usePathname();
  const [filterQuery, setFilterQuery] = useState({
    workLocation: place,
    freeTimeBegin: date,
        price: "low_to_high", // Default sorting

  });

  React.useLayoutEffect(() => {
     navigation.setOptions({
      title: 'Guide List',
      headerStyle: {
        backgroundColor: '#FF8C00', // Màu nền vàng
      },
      headerTintColor: '#fff', // Màu chữ trắng
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
    
  },[navigation])


  const getGuideBySearch = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/userHome/search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            workLocation: filterQuery.workLocation,
            freeTimeBegin: filterQuery.freeTimeBegin,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error in api: ", error);
      throw new Error(
        (error as any).response?.data?.message || "Get all tour failed"
      );
    }
  };


  async function fetchUser() {
    try {
      const response = await getGuideBySearch();
      if (response) {
           const sortedData = sortUserData(response.guides, filterQuery.price);
        setUserData(sortedData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleChange = (id: string) => {
    if (pathname.startsWith("/Query ")) {
      router.setParams({ id });
    } else router.push(`/Query/id/${id}`);
  };

  const sortUserData = (data: any[], sortOrder: string) => {
    return data.sort((a, b)  => {
      if (sortOrder === "low_to_high") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };


useEffect(() => {
  fetchUser()
},[])

  useEffect(() => {
    setUserData((prevData) => sortUserData([...prevData], filterQuery.price));
  }, [filterQuery.price]);

  const handleSortChange = (value : any) => {
    setFilterQuery((prev) => ({ ...prev, price: value }));
    console.log(value)
  };


const local = userData.filter(user => user.role === 'local')
const guide = userData.filter(user => user.role === 'guide')


  return (
    <SafeAreaView className="flex-1 bg-white h-full" >

      <View className="mt-4 flex flex-row items-center justify-around mb-[40px] ">
        <View className="flex flex-row items-center ">
          <Image source={Icon.filter} />
          <Text> Filter </Text>
        </View>
        <View className="flex flex-row items-center ">
          <Image source={Icon.price} />
          <RNPickerSelect
         onValueChange={(value) => handleSortChange(value)}
            items={[
              { label: "Price: low to high", value: "low_to_high" },
              { label: "Price: high to low", value: "high_to_low" },
            ]}
          />
        </View>
      </View>

       <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF8C00',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {
            backgroundColor: '#FF8C00',
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            marginTop: 0,
            marginBottom: 40
          },
        }}
      >
         <Tab.Screen name="Professional Guide">
      {() => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {guide.length === 0 ? (
            <EmptyState
              title="No Tour Found"
              subtitle="No upcoming tours found"
            />
          ) : (
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {guide.map((item) => (
                <View key={item._id} style={{ marginBottom: 30 }}>
                  <GuideList userData={item} handleChange={handleChange} />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </Tab.Screen>
    
        <Tab.Screen name="Local Guide">
           {() => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {local.length === 0 ? (
            <EmptyState
              title="No Tour Found"
              subtitle="No upcoming tours found"
            />
          ) : (
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {local.map((item) => (
                <View key={item._id} style={{ marginBottom: 30 }}>
                  <GuideList userData={item} handleChange={handleChange} />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
        </Tab.Screen>
      </Tab.Navigator>


     
    </SafeAreaView>
  );
};

export default TourguideList;
