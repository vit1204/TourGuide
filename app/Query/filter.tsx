import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"

import ListItem from "@/components/ListItem"
import { useGlobalContext } from "@/context/GlobalProvider"
import { router } from "expo-router"


const Filter = () => {
    const {languages,gender,setGender,setLanguages} = useGlobalContext()
    return(
        <>
        <View className="w-full h-[160px] bg-primary">
            <Text className="text-center text-[20px] text-black font-Nmedium mt-[90px]" >Filter</Text>
        </View>
        <SafeAreaView className="h-full">
            <View className="mt-[50px]">
                <Text className="mb-[20px] text-[25px] ml-[20px] font-Nbold">  </Text>
                <View className="flex flex-row items-center justify-around">
                    <ListItem selectedValue={languages} title="<18" value="U18" onChange={(e) => setLanguages(e) } />
                        <ListItem selectedValue={languages} title="English" value="English" onChange={(e) => setLanguages(e) } />
                             <ListItem selectedValue={languages} title="Chinese" value="Chinese" onChange={(e) => setLanguages(e) } />
                </View>
            </View>

             <View className="mt-[20px] mb-[200px]">
                <Text className="mb-[20px] text-[25px] ml-[20px] font-Nbold"> Gender </Text>
                <View className="flex flex-row items-center justify-evenly">
                    <ListItem selectedValue={gender} title="Male" value="nam" onChange={(e) => setGender(e) } />
                        <ListItem selectedValue={gender} title="Female" value="nữ" onChange={(e) => setGender(e) } />
                            
                </View>
            </View>
            <TouchableOpacity onPress={() => router.push("Query/query")} >
                <View className="flex items-center justify-center">
                <View className="w-[150px] h-[50px] bg-primary rounded-2xl">
                    <Text className="text-center mt-[10px] text-[18px] font-Nmedium text-white" > Apply </Text>
                </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    )
}

export default Filter;