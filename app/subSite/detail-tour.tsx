import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TourDetailForm from '@/components/TourDetailForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Tour } from '@/types/interface';
import { getUserById } from '@/config/authApi';
import { Text, View } from 'react-native';

const TourDetail = () => {
  const navigation = useNavigation();

  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [customer, setCustomer] = useState<User | null>(null);
  const [guide, setGuide] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentTour = async () => {
      try {
        const tourData = await AsyncStorage.getItem('currentTour');
        if (tourData) {
          const parsedTour = JSON.parse(tourData) as Tour;
          setCurrentTour(parsedTour);
        } else {
          console.log('No current tour found');
        }
      } catch (error) {
        console.error('Error getting current tour', error);
      } finally {
        setIsLoading(false); //Sau khi xử lý dữ liệu, set isLoading thành false
      }
    };

    getCurrentTour();
  }, []);

  useEffect(() => {
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

    if (currentTour) {
      getCurrentGuide();
    }
  },[currentTour])

  useEffect(() => {
    const getCurrentCustomer = async () => {
      try {
        if (currentTour) {
          const customerData = await getUserById(currentTour.guide_id as string);
          if (customerData) {
            setCustomer((customerData.userDetial) as User);
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

  if (isLoading) {
    console.log('TOUR Before', currentTour);
    console.log('GUIDE Before', guide);
    console.log('CUSTOMER Before', customer);
    return (
      <View>
        <Text className='flex items-center justify-center'>
          Loading...
        </Text>
      </View>
    ); // Nếu isLoading là true, hiển thị thông báo tải
  }

  return (
    <TourDetailForm 
      tour={currentTour as Tour} 
      guide={guide as User} 
      customer={customer as User} 
    />
  );
};

export default TourDetail;
