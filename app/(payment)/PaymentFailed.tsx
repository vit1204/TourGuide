import { Image, View, Text, TouchableOpacity , ScrollView} from "react-native"
import images from "@/constants/images"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"

import Icon from "@/constants/Icon"

const SuccesPayment = () => {
    return(
        <SafeAreaView className=" bg-white h-full">
            <ScrollView>
        <View className="flex flex-col justify-center items-center mb-[100px] mr-[20px] " >
            <Image width={200} className="mb-[30px]"  source={Icon.sad} />

            <View className=" ml-[30px]" >
            <Text className="text-[34px] font-Nbold mb-[15px] " >  Failed</Text>
            <Text className="ml-[30px] text-[20px] "> Payment </Text>
            </View>
        </View>

        <TouchableOpacity onPress={() => router.navigate("home")}  className="p-5 bg-primary mx-20  rounded-3xl " >
            <Text className="text-center text-white text-[20px]" > Home </Text>
        </TouchableOpacity>
                </ScrollView>
        </SafeAreaView>
    )
}

export default SuccesPayment;