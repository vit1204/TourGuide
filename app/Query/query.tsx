import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "@/constants/Icon";
import RNPickerSelect from "react-native-picker-select";
import GuideList from "@/components/GuideList";
import { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { redirect } from "react-router-native";
import { router, usePathname } from "expo-router";

const TourguideList = () => {
  const { place, setPlace, date, setDate } = useGlobalContext();

  const pathname = usePathname();

  const [filterQuery, setFilterQuery] = useState({
    workLocation: place,
    freeTimeBegin: date,
  });

  const [userData, setUserData] = useState<any[]>([]);

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

  // Fetch data from API
  async function fetchUser() {
    try {
      const response = await getGuideBySearch();

      if (response) {
        setUserData(response.guides);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (id: string) => {
    if (pathname.startsWith("/Query ")) {
      router.setParams({ id });
    } else router.push(`/Query/id/${id}`);
  };

  return (
    <SafeAreaView>
      <View className="mt-4 flex flex-row items-center justify-around mb-[40px] ">
        <View className="flex flex-row items-center ">
          <Image source={Icon.filter} />
          <Text> Filter </Text>
        </View>
        <View className="flex flex-row items-center ">
          <Image source={Icon.price} />
          <RNPickerSelect
            onValueChange={(value) => {
              setFilterQuery((prev) => ({ ...prev, price: value }));
            }}
            items={[
              { label: "Price: low to high", value: "low_to_high" },
              { label: "Price: high to low", value: "high_to_low" },
            ]}
            placeholder={{ label: "Price: low to high", value: "low_to_high" }}
          />
        </View>
      </View>

      <ScrollView>
        <View className="flex flex-row items-center justify-around flex-wrap">
          {userData.map((user, index) => (
            <GuideList
              handleChange={() => handleChange(user._id)}
              key={index}
              userData={user}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TourguideList;
