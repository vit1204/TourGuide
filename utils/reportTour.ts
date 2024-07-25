import * as Location from 'expo-location';
import axios from 'axios';
import { Alert } from 'react-native';
import { Tour } from '@/types/interface';

export const reportTour = async (tour: Object) => {
  try {
    // Request location permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    console.log("LOCATION: ", location);
    const { latitude, longitude } = location.coords;

    // Convert coordinates to address
    // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
    // const address = response.data.results[0]?.formatted_address;

    // Prepare data
    const data = {
      tour,
      location: {
        latitude,
        longitude
      }
    };

    console.log(data);

    // Send data to server
    // await axios.post('YOUR_SERVER_ENDPOINT', data);

    Alert.alert('Report submitted successfully');
  } catch (error) {
    console.error('Error reporting tour:', error);
    Alert.alert('Error reporting tour. Please try again later.');
  }
};
