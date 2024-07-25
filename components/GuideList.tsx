import { Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "@/constants/Icon";
import StarRating from "react-native-star-rating-widget";
import { PropsWithChildren, useState } from "react";
import { images } from "@/constants";

type Props = PropsWithChildren<{
  userData : any,
  handleChange: (id: string) => void
}> 

const GuideList = ( {userData, handleChange} : Props ) => {


    
  return (
<TouchableOpacity onPress={() => handleChange(userData._id)} >
        <View>
      <View >
        <Image source={{uri:userData.avatar}} style={{ width: 200, height: 200 }}resizeMode="contain"  />

        <Image
          className="absolute bottom-[-10px] left-[130px] bg-white rounded-[50%]   w-10 h-10"
          source={Icon.heart}
        />
      </View>
      <StarRating style={{
        backgroundColor:'#fff'
      }} starSize={16} rating={4.5} onChange={() => console.log("heeeh") } />
    
          <Text className="text-gray text-[11px] mb-[10px] " > {userData.languages[0]} </Text>
      <Text className="text-black  text-[16px] font-Nbold mb-[3px]" > {userData.fullName} </Text>
      <Text className="font-NRegular text-stone-600 mb-6  " > {userData.price}VND/h </Text>


</View>
</TouchableOpacity>
   
  );
};

export default GuideList;
 