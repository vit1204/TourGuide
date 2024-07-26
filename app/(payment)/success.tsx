import  {WebView}  from 'react-native-webview';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SuccesPayment = () => {
    return(
     <>
             <WebView source={{ uri: 'http://51.79.173.117:3001/success/' }} style={{ flex: 1 }} />
       </>
    )
}

export default SuccesPayment;