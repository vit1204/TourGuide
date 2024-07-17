// src/screens/TourDetail.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import TourDetailForm from '@/components/TourDetailForm';

const TourDetail = () => {
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
    <TourDetailForm />
  );
};

export default TourDetail;