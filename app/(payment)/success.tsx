import  {WebView}  from 'react-native-webview';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SuccesPayment = () => {
    return(
     <>
             <WebView source={{ uri: 'https://www.facebook.com/TienHoWeb/' }} style={{ flex: 1 }} />
       </>
    )
}

export default SuccesPayment;