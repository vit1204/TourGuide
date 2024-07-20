import { useLocalSearchParams } from "expo-router"
import { View,Text, Image, TouchableOpacity} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "@/constants/Icon"
import images from "@/constants/images"
import { login, getUserById } from "@/config/authApi"
import StarRating from "react-native-star-rating-widget"
import { PropsWithChildren, useState } from "react"


type Props = PropsWithChildren<{
    text:string,
    numberOfLines:number
}>

const ReadMoreText = ({ text, numberOfLines } : Props ) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Text numberOfLines={isExpanded ? undefined : numberOfLines}  className="text-[14px]" >
        {text}
      </Text>
      <TouchableOpacity onPress={toggleReadMore}>
        <Text className="text-primary text-[15px]" >
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};





const TourguideList = () => {

   const {id}   = useLocalSearchParams()
     const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...";


    return(
       <SafeAreaView  >
  <View className="p-[32px] gap-[16px]" >

    <View className=" flex flex-row items-center justify-around mb-[50px] ">
      <View className="flex flex-row items-center">
        <Image source={Icon.leftArrow}  className="right-[120px]  " />
        <Text className="text-[17px] font-semibold" > Detail </Text>
      </View>
    </View>

<View className="flex flex-row items-center justify-between" >
    <Image source={images.ava} />
    <View>
        <Text className="text-[26px] font-semibold mb-[13px]" > Nguyen Van Anh </Text>
        <View className="flex flex-row items-center" >
            <Image source={Icon.locate} />
            <Text className="text-gray text-[16px] font-Nmedium " > Da Nang, VietNam </Text>
        </View>
    </View>
</View>

<View className="flex flex-row items-center" >
  <StarRating  starSize={15} rating={4.5} onChange={() => console.log("heeeh") } />
    <Text> (4.8) </Text>
    </View>
       
<View className="flex-row m-5  items-center justify-center px-[20px]">
  <View className="flex-1 h-[1px] bg-primary" />
</View>

<View className="mb-[50px]" >
    <Text className="text-[16px] font-Nmedium " > Description </Text>
     <ReadMoreText text={loremIpsum} numberOfLines={5} />
</View>



<View className="flex flex-row items-center justify-between" >
   <Text className="text-[18px] font-Nmedium">
    Pick the day
   </Text>
   <View className="w-[115px] h-[28px] border-primary border-[2px] rounded-xl flex flex-row items-center justify-evenly " >
    <Image source={Icon.add} />
    <Text>1</Text>
    <Image source={Icon.minus} />
 

   </View>

</View>

    </View>





</SafeAreaView>


    )
}

export default TourguideList

