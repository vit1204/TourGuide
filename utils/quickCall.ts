import {
    Linking,
    Platform,
} from 'react-native';

  
export  const dialCall = (number: string) => {
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
      Linking.openURL(phoneNumber);
};