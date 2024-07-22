import { View, Image, Text } from "react-native"


const Logo = () => {
    return(
        <View className="flex items-center flex-row" >
            <Image className="w-[60px] h-[55px]" source={require('../assets/images/logo.png')} />
            <Text className="font-Nbold text-[15px]" > Byte Undefined </Text>
        </View>
    )
}

export default Logo