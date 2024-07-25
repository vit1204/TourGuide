import  {WebView}  from 'react-native-webview';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SuccesFailed = () => {
  return (
    <>
      <WebView
        source={{ uri: "https://www.facebook.com/" }}
        style={{ flex: 1 }}
      />
    </>
  );
};

export default SuccesFailed;
