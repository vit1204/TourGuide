import { Text, TouchableOpacity, View,  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "react-native";
import { Link, router } from "expo-router";

export default function App() {
   
  function Navigate(){
    router.navigate("login")
  }

  return (
    <SafeAreaView >
      <View >
        <Text className="text-center text-3xl font-Nbold text-black">Byte Undefined</Text>
        <Image  style={ { width:350, height:400, resizeMode:"contain", alignSelf:"center" }} source={require("../assets/images/logo.png")} />
             <Text className="text-center font-bold text-xl mb-[10px] " > Find Great Tour Guide </Text>
             <Text className=" font-medium ml-[65px] w-[70%] flex items-center justify-center flex-wrap text-center " > Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dolore ducimus  </Text>  

  <TouchableOpacity  onPress={Navigate}  className=" ml-[10px]  w-[95%] rounded-3xl pt-4 pb-4 flex items-center justify-center mt-[30px] bg-primary" >
 
    <Text className=" text-black text-center font-Nmedium text-[20px] ">Log In</Text>
  </TouchableOpacity>


   <TouchableOpacity className="mt-[20px] ">

   <View className="flex flex-row justify-center items-center gap-1 " >
    <Text>
      Don't have an account?
    </Text>
     <Link className="text-primary_darker" href="/register" >
      Signup
     </Link>

   </View>
    
       </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
