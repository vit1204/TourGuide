import { View, Text,  Image, TextInput, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/constants/Icon";
import { Link, router } from "expo-router";

const Home = () => {
    const handlePress = () => {
        router.navigate("/list")
    }

    return(
        <>
        <SafeAreaView className="bg-blue_dark h-[150px] " >        
        <View className="flex items-center justify-center " > 
            <Text className="font-Nbold text-white text-2xl text-center mt-4 " >
                Byte Undefined
            </Text>
             {/* <Image source={ Icon.chat } className="w-6 h-6" /> */}
        </View>
      
        </SafeAreaView>
          <View className=" flex justify-center items-center mt-[40px] " >
            <View className=" w-[370px] h-auto rounded border-[6px] border-yellow-300 flex flex-col divide-y-[0.4px] divide-gray-400 " >
                <View className="w-full h-[60px] flex flex-row items-center bg-white ">
                    <Image source={Icon.search} className=" mx-1 w-5 h-5"/>
                    <TextInput placeholder="Search" className="flex-1 ml-[6px] h-10 px-2" />
                    
                </View>
                <View className="w-full h-[60px] flex flex-row items-center bg-white ">
                    <Image source={Icon.calendar} className=" mx-1  w-5 h-5" />
                    <TextInput placeholder="Time" className="flex-1 ml-[7px] h-10 px-2" />
                    
                </View>
                <View className="w-full h-[40px] flex flex-row items-center bg-white ">
                    <TouchableOpacity onPress={handlePress} className=" w-full bg-primary h-full" >
                        
                        <Text className=" font-Nregular text-base text-white text-center mt-[5px]"> Search </Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
          </>
    )
}

export default Home;