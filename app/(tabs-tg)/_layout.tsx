import { Tabs } from "expo-router";
import { Image, Text, View, ImageSourcePropType } from "react-native";

import icons from '../../constants/Icon';

const TabIcon = ({
    icon, 
    color, 
    name, 
    focused
} : {
    icon: ImageSourcePropType,
    color: string,
    name: string,
    focused: boolean
}) => {
    return (
      <View className="items-center justify-center gap-2"> 
        <Image 
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-6 h-6"
        />
        <Text  style={{color : color}} className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs` }>
          {name}
        </Text>
      </View>
    );
  }

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84,
                    }
                }}
            >
                <Tabs.Screen 
                    name='homeTg'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.home}
                                color={color}
                                name='Home'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen 
                    name='messageTg'
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
                <Tabs.Screen 
                    name='create'
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.plus}
                                color={color}
                                name='Create'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen 
                    name='paymentTg'
                    options={{
                        title: 'Payment',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.payment}
                                color={color}
                                name='Payment'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen 
                    name='profileTg'
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon 
                                icon={icons.profile}
                                color={color}
                                name='Profile'
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout