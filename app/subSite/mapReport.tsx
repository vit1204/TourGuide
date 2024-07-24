import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import * as Location from 'expo-location';
import { markers } from '@/assets/markers';

const INITIAL_REGION = {
    latitude: 21.028511,
    longitude: 105.804817,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function MapReport() {
    const navigation = useNavigation();
    const mapRef = useRef<MapView>(null);
    const [region, setRegion] = useState<Region | null>(null);
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    useEffect(() => {
        navigation.setOptions({
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
                zoom: 10,
            }, { duration: 3000 });
        }
    };

    const onRegionChange = (region: Region) => {
        console.log('Region changed', region);
    };

    const calloutPressed = (ev: any) => {
        console.log(ev);
    };

    const onMarkerSelected = (marker: any) => {
        Alert.alert(marker.name);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Your location',
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
        <View style={{ flex: 1 }}>
            <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={region || INITIAL_REGION}
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                onRegionChangeComplete={onRegionChange}
            >
                {/* {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={marker.name}
                        coordinate={marker}
                        onPress={() => onMarkerSelected(marker)}
                    >
                        <Callout onPress={calloutPressed}>
                            <View style={{ padding: 10 }}>
                                <Text style={{ fontSize: 24 }}>Hello</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))} */}
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
            </MapView>
        </View>
    );
}
