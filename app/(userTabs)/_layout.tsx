import { Tabs } from "expo-router";
import { View , Image, ImageSourcePropType, Text, StyleSheet} from "react-native";

import icons from "../../constants/Icon"
import { ReactElement, ReactNode } from "react";



interface TabIconProps {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
    return (
        <View className="items-center justify-center gap-1 " >
            <Image   source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6   "    />
            <Text className={` ${focused ? 'font-semibold' : 'font-normal' } text-xs text-center mr-[2px] `} > {name}  </Text>
        </View>
    );
};


const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ tabBarShowLabel: false }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                  
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return(
                             <TabIcon icon={icons.home}
                       color={color}
                       name="Home" focused={focused}
                       />
                        )         
                    },
               
                }}
            />
            <Tabs.Screen name="booked" options={{
                title: "Booked",
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return(
                         <TabIcon icon={icons.suitcase}
                   color={color}
                   name="Booked" focused={focused}
                   />
                    )         
                },
            }} />

             <Tabs.Screen 
                    name='message'
                    options={{
                        title: 'Message',
                        headerShown: false,
                    
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.message}
                                color={color}
                                name='Message'
                                focused={focused}
                            />
                        )
                    }}
                />
             <Tabs.Screen name="profile" options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return(
                         <TabIcon icon={icons.profile}
                   color={color}
                   name="Profile" focused={focused}
                   />
                    )         
                },
            }}  />
         </Tabs>
    )
}

export default TabsLayout;