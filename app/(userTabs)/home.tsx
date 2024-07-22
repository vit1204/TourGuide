import { View, Text,  Image, TextInput, TouchableOpacity, Platform, Alert } from "react-native"
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Logo from "@/components/Logo";
import {useState} from "react"
import Icon from "@/constants/Icon";
import DateTimePickerModal from "react-native-modal-datetime-picker";


import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { User } from "@/types/interface";


const TableSearch = () => {
 
   const {place,setPlace,date,setDate} = useGlobalContext()

 
  const [show, setShow] = useState(false);


  const  [text, setText] = useState('')

  const onChange = (even:any,selectedDate:Date) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios');

   setDate(currentDate)

   let tempDate = new Date(currentDate)
   let fDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear()
    setText(fDate)  
  };
const onConfirm = (selectedDate:Date) => {
  onChange(null,selectedDate);
  console.log(selectedDate)

  hideMode();
}
  const hideMode = () => {
    setShow(false);
  }

  const showMode = () => {
    setShow(true);
   
  };
  
  function handleNavigate(){
    router.push("/Query/query")
  }
  
  return (
    <View className="flex justify-center items-center mt-[40px]">
      <View className="w-[370px] h-auto rounded border-[6px] border-yellow-300 flex flex-col divide-y-[0.4px] divide-gray-400">
        <View className="w-full h-[60px] flex flex-row items-center bg-white">
          <Image source={Icon.search} className="mx-1 w-5 h-5" />
          <TextInput value={place} onChangeText={(e) => setPlace(e) } placeholder="Search" className="flex-1 ml-[6px] h-10 px-2" />
        </View>

        <TouchableOpacity onPress={showMode}>
          <View className="w-full h-[60px] flex flex-row items-center bg-white">
            <Image source={Icon.calendar} className="mx-1 w-5 h-5" />
            <TextInput value={text}  placeholder="Time" className="flex-1 ml-[7px] h-10 px-2" />
          </View>
        </TouchableOpacity>

        <View className="w-full h-[40px] flex flex-row items-center bg-white">
          <TouchableOpacity onPress={handleNavigate}    
             
            className="w-full bg-primary h-full">
            <Text className="font-Nregular text-base text-white text-center mt-[5px]"> Search </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
    
      isVisible={show}
      is24Hour={true}
        mode="date"
        onConfirm={onConfirm}
        onCancel={hideMode}
      />
    </View>
  );
};



const Home = () => {
    const {user} = useGlobalContext()
    return(
        <ParallaxScrollView headerBackgroundColor={{ light: '#FFA300', dark: '#FFA300' }} headerImage={
            <View style={{display:"flex", alignItems:'center', flexDirection:'row', gap:50 }} >
                <Logo />
                <View>
                    <Text style={{ fontSize:14 }}> Welcome Back </Text>
                    <Text style={{ fontSize:24 }} > {(user as User).userName} </Text>
                </View>
            </View>
        } >
                 <View className="h-full bg-white">
                    <TableSearch />
                 
        </View>
        
      

        

        </ParallaxScrollView>
    
      
          
        
    )
}

export default Home;