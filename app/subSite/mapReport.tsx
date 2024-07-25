import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import * as Location from 'expo-location';

const INITIAL_REGION = {
    latitude: 16.0697491382831,
    longitude: 108.23841026052833,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

interface MarkerData {
    latitude: number;
    longitude: number;
    title: string;
    description?: string;
}

const predefinedMarkers: MarkerData[] = [
    {
        latitude: 16.0697148,
        longitude: 108.237133,
        title: 'Đà Nẵng',
        description: 'Thành phố biển xinh đẹp',
    },
    {
        latitude: 16.0697491382831,
        longitude: 108.23841026052833,
        title: 'Nhu Minh Plaza Danang Hotel',
        description: 'Địa điểm của bạn hiện tại',
    },
];

export default function MapReport() {
    const navigation = useNavigation();
    const mapRef = useRef<MapView>(null);
    const [region, setRegion] = useState<Region | null>(null);
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
                zoom: 10,
            }, { duration: 3000 });
        }
    };

    const onRegionChange = (region: Region) => {
        console.log('Region changed', region);
    };

    const renderMarkers = () => {
        return predefinedMarkers.map((marker, index) => (
            <Marker
                key={index}
                title={marker.title}
                description={marker.description}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            >
                <Callout>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 24 }}>{marker.title}</Text>
                        {marker.description && <Text>{marker.description}</Text>}
                    </View>
                </Callout>
            </Marker>
        ));
    };

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
                {renderMarkers()}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
