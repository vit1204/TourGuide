import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TourDetailForm from '@/components/TourDetailForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Tour } from '@/types/interface';
import { getUserById } from '@/config/authApi';
import { router } from 'expo-router';

const TourDetail = () => {
  console.log('VAO TOUR DETAIL');
  const navigation = useNavigation();

  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [customer, setCustomer] = useState<User | null>(null);
  const [guide, setGuide] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentTour = async () => {
      try {
        console.log('Vao day nhe');
        const tourData = await AsyncStorage.getItem('currentTour');
        console.log('TOIUR DÂTTA; ', tourData);
        if (tourData) {
          const parsedTour = JSON.parse(tourData) as Tour;
          setCurrentTour(parsedTour);
        } else {
          console.log('No current tour found');
        }

      } catch (error) {
        console.error('Error getting current tour', error);
      }
    };
    getCurrentTour();

    const getCurrentGuide = async () => {
      try {
        const guideData = await AsyncStorage.getItem('user');
        if (guideData) {
          setGuide(JSON.parse(guideData) as User);
        } else {
          console.log('No guide found');
        }
      } catch (error) {
        console.error('Error getting guide data', error);
      }
    };
    getCurrentGuide();
  }, []);

  useEffect(() => {
    const getCurrentCustomer = async () => {
      try {
        if (currentTour) {
          const customerData = await getUserById(currentTour.guide_id as string);
          if (customerData) {
            setCustomer(customerData as User);
          } else {
            console.log('No customer found');
          }
        }
      } catch (error) {
        console.error('Error getting customer data', error);
      }
    };

    if (currentTour) {
      getCurrentCustomer();
    } else {
      console.log('No current tour found - deo co tua nao')
    }
  }, [currentTour]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Detail Tour',
      headerStyle: {
        backgroundColor: '#FF8C00', // Màu nền vàng
      },
      headerTintColor: '#fff', // Màu chữ trắng
      headerTitleStyle: {
        fontWeight: 'bold' ,
      },
    });
  }, [navigation]);

  return (
    <TourDetailForm tour={currentTour as Tour} guide={guide as User} customer={customer as User} />
  );
};

export default TourDetail;
