import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TourItem from '@/components/TourItem';
import EmptyState from '@/components/EmptyState';

const Tab = createMaterialTopTabNavigator();

const trips = [
  {
    id: 1,
    date: 'July 12',
    startTime: '9:15 am',
    endTime: '9:45 am',
    location: 'Son Tra',
    price: '$13',
    guide: 'Viet Nguyen',
    duration: '0h30m',
    tourCode: 'Tour 13'
  },
  {
    id: 2,
    date: 'July 12',
    startTime: '9:15 am',
    endTime: '9:45 am',
    location: 'Son Tra',
    price: '$13',
    guide: 'Viet Nguyen',
    duration: '0h30m',
    tourCode: 'Tour 13'
  },
  {
    id: 3,
    date: 'July 12',
    startTime: '9:15 am',
    endTime: '9:45 am',
    location: 'Son Tra',
    price: '$13',
    guide: 'Viet Nguyen',
    duration: '0h30m',
    tourCode: 'Tour 13'
  },
  {
    id: 4,
    date: 'July 12',
    startTime: '9:15 am',
    endTime: '9:45 am',
    location: 'Son Tra',
    price: '$13',
    guide: 'Viet Nguyen',
    duration: '0h30m',
    tourCode: 'Tour 13'
  },
  {
    id: 5,
    date: 'July 12',
    startTime: '9:15 am',
    endTime: '9:45 am',
    location: 'Son Tra',
    price: '$13',
    guide: 'Viet Nguyen',
    duration: '0h30m',
    tourCode: 'Tour 13'
  }
  // Thêm nhiều chuyến đi nếu cần
];

interface Trip {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  price: string;
  guide: string;
  duration: string;
  tourCode: string;
}

const TripCard = ({ trip, isUpcoming }: { trip: Trip; isUpcoming: boolean }) => (
  <View className="bg-white shadow-lg w-11/12 p-4 rounded-lg border-gray-700 border-2 my-2">
    <View className="flex-row justify-between items-center">
      <Text className="text-lg font-bold">{trip.date}</Text>
      <Text className="text-2xl font-bold">{trip.price}</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-base">{trip.startTime} -{'->'} {trip.endTime}</Text>
      <Text className="text-base">{trip.location}</Text>
    </View>
    <Text className="text-base">Guide: {trip.guide}</Text>
    <Text className="text-base">Duration: {trip.duration}</Text>
    <Text className="text-base">Tour Code: {trip.tourCode}</Text>
    <TouchableOpacity className="bg-yellow-200 p-2 rounded-full w-full items-center mt-2">
      <Text className="text-yellow-700 font-bold text-lg">{isUpcoming ? 'Cancel tour' : 'Detail past tour'}</Text>
    </TouchableOpacity>
    {isUpcoming && (
      <TouchableOpacity className="bg-red-200 p-2 rounded-full w-full items-center mt-2">
        <FontAwesome name="trash" size={24} color="red" />
      </TouchableOpacity>
    )}
  </View>
);

const UpcomingTrips = () => (
  <FlatList
    data={trips}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <TourItem trip={item} isUpcoming={true} />}
    contentContainerStyle={{ alignItems: 'center' }}
    ListEmptyComponent={() => (
      <EmptyState 
          title='No Tour Found'
          subtitle='No Tour found for this state'
      />
    )}
  />
);

const PastTrips = () => (
  <FlatList
    data={trips}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <TourItem trip={item} isUpcoming={false} />}
    contentContainerStyle={{ alignItems: 'center' }}
    ListEmptyComponent={() => (
      <EmptyState 
          title='No Tour Found'
          subtitle='No Tour found for this state'
      />
    )}
  />
);

const MyTrips = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Detail Tour',
      headerStyle: {
        backgroundColor: '#FF8C00', // Màu nền vàng
      },
      headerTintColor: '#fff', // Màu chữ trắng
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  return (
      <SafeAreaView className="flex-1 bg-white h-full" edges={['right', 'bottom', 'left']}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#FF8C00',
              tabBarInactiveTintColor: 'gray',
              tabBarIndicatorStyle: {
                backgroundColor: '#FF8C00',
              },
              tabBarLabelStyle: {
                fontWeight: 'bold',
              },
              tabBarStyle: {
                marginTop: 0, // Loại bỏ margin trên của TabBar
              },
            }}
          >
            <Tab.Screen name="Upcoming" component={UpcomingTrips} />
            <Tab.Screen name="Past" component={PastTrips} />
          </Tab.Navigator>
      </SafeAreaView>
  );
};

export default MyTrips;
