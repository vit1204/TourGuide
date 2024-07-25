import { Image, View, Text, TouchableOpacity } from "react-native"
import images from "@/constants/images"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"

const SuccesPayment = () => {
    return(
        <SafeAreaView className="mt-[200px]">
        <View className="flex flex-col justify-center items-center mb-[100px] mr-[20px] " >
            <Image className="mb-[30px]"  source={images.bags} />

            <View className=" ml-[30px]" >
            <Text className="text-[34px] font-Nbold mb-[15px] " >  Success</Text>
            <Text className="ml-[30px] text-[20px] "> Payment </Text>
            </View>
        </View>

        <TouchableOpacity onPress={() => router.navigate("home")}  className="p-5 bg-primary mx-20  rounded-3xl " >
            <Text className="text-center text-white text-[20px]" > Home </Text>
        </TouchableOpacity>
                
        </SafeAreaView>
    )
}

export default SuccesPayment;