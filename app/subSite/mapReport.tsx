import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import * as Location from 'expo-location';

const INITIAL_REGION = {
    latitude: 16.0697491382831,
    longitude: 108.23841026052833,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

export default function MapReport() {
    const navigation = useNavigation();
    const mapRef = useRef<MapView>(null);
    const [region, setRegion] = useState<Region | null>(INITIAL_REGION);
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        const getLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
            const currentRegion = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
            setRegion(currentRegion);
            mapRef.current?.animateToRegion(currentRegion, 1000);
        };

        getLocationPermission();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: 'Your location',
            headerStyle: {
                backgroundColor: '#FF8C00', // Màu nền vàng
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: () => (
                <TouchableOpacity onPress={focusMap}>
                    <View style={{ padding: 10 }}>
                        <Text>Focus</Text>
                    </View>
                </TouchableOpacity>
            ),
        });
    }, [navigation, currentLocation]);

    const focusMap = () => {
        if (currentLocation) {
            mapRef.current?.animateCamera({
                center: {
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                },
                zoom: 20,
            }, { duration: 2000 });
        }
    };

    const onRegionChange = (region: Region) => {
        console.log('Region changed', region);
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={region || INITIAL_REGION}
                region={region || INITIAL_REGION}
                showsUserLocation
                showsMyLocationButton
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                ref={mapRef}
                // onRegionChangeComplete={onRegionChange}
            >
                {currentLocation && (
                    <Marker
                        title="Your Location"
                        coordinate={{
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        }}
                    >
                        <Callout>
                            <View style={{ padding: 10 }}>
                                <Text style={{ fontSize: 24 }}>This is your location</Text>
                            </View>
                        </Callout>
                    </Marker>
                )}
                {/* {renderMarkers()} */}
            </MapView>
        </View>
    );
}
