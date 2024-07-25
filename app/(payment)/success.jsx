import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const SuccesPayment = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.successMessage}> thanh toan success </Text>
      <WebView source={{ uri:  'https://www.facebook.com/TienHoWeb/' }} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  successMessage: {
    padding: 10,
    backgroundColor: '#d4edda',
    color: '#155724',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuccesPayment;