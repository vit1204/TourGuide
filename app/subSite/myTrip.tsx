import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TourItem from '@/components/TourItem';
import EmptyState from '@/components/EmptyState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tour } from '@/types/interface';
import { useFocusEffect } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

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

  const [tours, setTours] = useState<Tour[]>([]);

  const fetchTours = async () => {
    try {
      const toursData = await AsyncStorage.getItem('tours');
      if (toursData) {
        setTours(JSON.parse(toursData));
      } else {
        console.log('No tours data found')
      }
    } catch (error) {
      console.error('Error fetching tours from storage', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchTours();
    }, [])
  );

  const upcomingTours = tours.filter(tour => tour.status === 'upcoming');
  const pastTours = tours.filter(tour => tour.status === 'past');

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
            marginTop: 0,
          },
        }}
      >
        <Tab.Screen name="Upcoming">
          {() => (
            <FlatList
              data={upcomingTours}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <TourItem tour={item} />}
              contentContainerStyle={{ alignItems: 'center' }}
              ListEmptyComponent={() => (
                <EmptyState 
                    title='No Tour Found'
                    subtitle='No upcoming tours found'
                />
              )}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => (
            <FlatList
              data={pastTours}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <TourItem tour={item} />}
              contentContainerStyle={{ alignItems: 'center' }}
              ListEmptyComponent={() => (
                <EmptyState 
                    title='No Tour Found'
                    subtitle='No past tours found'
                />
              )}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MyTrips;