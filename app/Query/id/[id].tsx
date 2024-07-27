import { Link, router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/Icon";
import images from "@/constants/images";
import StarRating from "react-native-star-rating-widget";
import { PropsWithChildren, useEffect, useState } from "react";
import { set } from "date-fns";
import { getUserById, startChat } from "@/config/authApi";
import { User } from "@/types/interface";
import { useGlobalContext } from "@/context/GlobalProvider";

type Props = PropsWithChildren<{
  text: string | undefined;
  numberOfLines: number;
}>;

const ReadMoreText = ({ text = '', numberOfLines }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="mb-[10px]">
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        className="text-[14px]"
      >
        {text}
      </Text>
      <TouchableOpacity onPress={toggleReadMore}>
        <Text className="text-primary text-[15px]">
          {isExpanded ? "Read Less" : "Read More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TourguideList = () => {
  const { id } = useLocalSearchParams();
  const {user} = useGlobalContext()
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      if(id){
  const userInfo =  await getUserById(id)
     if(userInfo){
         setUserData(userInfo.userDetial)
     }
      }
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser()
  },[])

  const handleRent = async () => {
    try {
      const chatId = await startChat(user._id, userData?._id);
      if(chatId){

                router.push(`/chatScreen/${chatId.chatId}?userName=${userData?.fullName}&userId=${userData?._id}`);
             
      }
    } catch (error) {
      console.log(error)
    }
  }



  const texts = [
    {
      id: 1,
      text: "This is a limited edition item only available at large stores, so I bought it without being able to see it in person. The fabric is thin and soft. Many jackets come with a hood, but this one doesn't. I don't use a hood, and it looks neater without one. It's also nice that you can tighten the hem. It would have been even better if it came with a drawstring bag or something and was pocketable. I would have liked it to have water repellency and UV protection",
    },
  ];



  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-[32px] gap-[16px]">
          <View className=" flex flex-row items-center justify-around mb-[50px] ">
            <View className="flex flex-row items-center">
              <Image source={Icon.leftArrow} className="right-[120px]  " />
              <Text className="text-[17px] font-semibold"> Detail </Text>
            </View>
          </View>

          <View className="flex flex-row items-center justify-between">
            <Image width={150} height={200} resizeMode="contain" source={{uri:userData?.avatar}} />
            <View>
              <Text className="text-[24px] font-semibold mb-[13px]">
                {" "}
                {userData?.fullName} {" "}
              </Text>
              <View className="flex flex-row items-center">
                <Image source={Icon.locate} />
                <Text className="text-gray text-[16px] font-Nmedium ">
                  {" "}
                   {userData?.workLocation[0]} , VietNam{" "}
                </Text>
              </View>
            </View>
          </View>

          <Image  className="w-full h-[180px] " resizeMode="contain"  source={{uri: userData?.imageAuthenGuide}} />

          <View className="mb-[30px]">
            <Text className="text-[20px] font-Nmedium "> Description </Text>
            <ReadMoreText text={userData?.describe} numberOfLines={5} />
          </View>

          <View>
            <Text className="text-[20px]"> Customer Reviews </Text>
            <View className="flex flex-row items-center">
              <StarRating
                starSize={15}
                rating={4.5}
                onChange={() => console.log("heeeh")}
              />
              <Text> (4.8) </Text>
            </View>
            <View className="flex-row my-5   items-center justify-center">
              <View className="flex-1 h-[1px]   bg-primary" />
            </View>

            <View>
              {texts.map((item, index) => (
                <View key={index}>
                  <ReadMoreText text={item.text} numberOfLines={5} />
                  <Text className="text-[13px] text-gray">June 27,2024 </Text>

                  {index < texts.length - 1 && (
                    <View className="flex-row my-5 items-center justify-center">
                      <View className="flex-1 h-[1px] bg-primary" />
                    </View>
                  )}
                </View>
              ))}
            </View>


             <View className="mt-[30px]">
            <Text className="text-[20px] font-Nmedium "> Policy </Text>
           <View className="flex justify-start flex-wrap items-center pt-2 flex-row ">
            <Text> Yes, I understand and agree to the  </Text> 
            <Link href="http://51.79.173.117:3002/dieukhoan/" className="text-primary text-[18px]"> Travel Companions Agreement</Link>
           </View>
          </View>
          </View>
        </View>
        <View>
          <View className="flex-row my-5 items-center justify-center">
            <View className="flex-1 h-[1px] bg-black" />
          </View>

          <View className="flex flex-row items-center justify-between ">
            <View className="flex flex-col gap-2">
              <Text className="text-[20px] font-Nmedium">Price</Text>
              <Text className="text-[20px] font-Nmedium text-primary">
                {" "}
                {userData?.price} VND{" "}
              </Text>
            </View>

            <TouchableOpacity onPress={handleRent} >
              <View className="w-[200px] h-[40px] bg-primary rounded-xl flex flex-row items-center justify-center ">
                <Text className="text-white"> Rent </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TourguideList;
