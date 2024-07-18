import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Tour, User } from '@/types/interface';
import * as Location from 'expo-location';
import { reportTour } from '@/utils/reportTour';

const TourDetailForm = ({tour, guide, customer}: {tour: Tour, guide: User, customer: User}) => {

  const handleEndTour = () => {
    Alert.alert(
      "End Tour",
      "Are you sure you want to end this tour?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // Handle ending the tour
          }
        }
      ]
    );
  };

  const handleCancelTour = () => {
    Alert.alert(
      "Cancel Tour",
      "Are you sure you want to cancel this tour?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // Handle cancelling the tour
          }
        }
      ]
    );
  };

  const handleReportTour = () => {
    Alert.alert(
      "Report Tour",
      "Are you sure you want to report this tour?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await reportTour(tour);
            } catch (error) {
              console.error('Error reporting tour:', error);
            }
          }
        }
      ]
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white h-full" edges={['right', 'bottom', 'left']}>

      <ScrollView>
        <View className="flex-1 items-center py-10">
          <View className="bg-white shadow-lg w-11/12 p-8 rounded-lg border-gray-700 border-2">
            <View className="flex-row justify-between items-center mb-">
              <Image source={images.logo} className="w-12 h-12" />
              <Text className="text-lg font-bold">Byte Undefined</Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="items-center">
                <Text className="text-base font-semibold">Tour guide</Text>
                <Text>{guide?.fullName}</Text>
              </View>

              <View className="items-center">
                <Text className="text-base font-semibold">Customer</Text>
                <Text>{customer?.fullName}</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="items-center">
                <Text className="text-sm">Viet Nam</Text>
                <Text className="text-2xl font-bold">{tour.Tuorlocation[0]}</Text>
              </View>
              <FontAwesome name="arrow-right" size={24} color="black" />
              <View className="items-center">
                <Text className="text-sm">Viet Nam</Text>
                <Text className="text-2xl font-bold">{tour.Tuorlocation[1]}</Text>
              </View>
            </View>


            <View className="flex-row justify-between mb-4">
              <View className="items-center">
                <Text className="text-xl font-bold">Start</Text>
                <Text className="text-lg">{new Date(tour.startTime).toLocaleTimeString()}</Text>
                <Text className="text-base">{new Date(tour.startTime).toDateString()}</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold">End</Text>
                <Text className="text-lg">{new Date(tour.endTime).toLocaleTimeString()}</Text>
                <Text className="text-base">{new Date(tour.startTime).toDateString()}</Text>
              </View>
            </View>

            <View className="items-center flex-row mt-5">
              <Text className="text-2xl font-bold">Price:   </Text>
              <Text className="text-2xl font-bold">{tour.price.toLocaleString('vi-VN')} VND</Text>
            </View>
          </View>

          <View className="flex-row justify-between w-11/12 mt-10 space-x-3">
              <TouchableOpacity 
                className="bg-red-200 py-6 px-3 rounded-lg flex-1 items-center border border-red-300 shadow-sm active:bg-red-300"
                onPress={handleReportTour}
              >
                  <Text className="text-red-700 font-bold text-lg">REPORT</Text>
              </TouchableOpacity>

              {tour.status === 'activity' && (
                  <TouchableOpacity
                      className="bg-green-200 py-6 px-3 rounded-lg flex-1 items-center border border-green-300 shadow-sm active:bg-green-300"
                      onPress={handleEndTour}
                  >
                      <Text className="text-green-700 font-bold text-lg">END</Text>
                  </TouchableOpacity>
              )}

              {tour.status === 'upcoming' && (
                  <TouchableOpacity
                      className="bg-blue-200 py-6 px-3 rounded-lg flex-1 items-center border border-blue-300 shadow-sm active:bg-blue-300"
                      onPress={handleCancelTour}
                  >
                      <Text className="text-blue-700 font-bold text-lg">CANCEL</Text>
                  </TouchableOpacity>
              )}

              <TouchableOpacity className="bg-yellow-200 py-6 px-3 rounded-lg flex-1 items-center border border-yellow-300 shadow-sm active:bg-yellow-300">
                  <Text className="text-yellow-700 font-bold text-lg">COMMENT</Text>
              </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 items-center py-10">
          <View className="bg-white shadow-lg w-11/12 p-8 rounded-lg border-gray-700 border-2">
            <Text className="text-2xl font-bold mb-4">Tour Guide Details</Text>
            <View className="mb-4">
              <Text className="text-base font-semibold">Name</Text>
              <Text>{guide.fullName}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Age</Text>
              <Text>{guide.age}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Gender</Text>
              <Text>{guide.gender === 'nam' ? 'Male' : 'Female' }</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Phone Number</Text>
              <Text>{guide.phoneNumber}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Email</Text>
              <Text>{guide.email}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Hometown</Text>
              <Text>{guide.hometown}</Text>
            </View>
          </View>

          <View className="bg-white shadow-lg w-11/12 p-8 rounded-lg border-gray-700 border-2 mt-6">
            <Text className="text-2xl font-bold mb-4">Customer Details</Text>
            <View className="mb-4">
              <Text className="text-base font-semibold">Name</Text>
              <Text>{customer.fullName}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Age</Text>
              <Text>{customer.age}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Gender</Text>
              <Text>{customer.gender === 'nam' ? 'Male' : 'Female' }</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Phone Number</Text>
              <Text>{customer.phoneNumber}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Email</Text>
              <Text>{customer.email}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Hometown</Text>
              <Text>{customer.hometown}</Text>
            </View>
          </View>

          <View className="bg-white shadow-lg w-11/12 p-8 rounded-lg border-gray-700 border-2 mt-6">
            <Text className="text-2xl font-bold mb-4">Tour Description</Text>
            <Text className="text-base">
              {tour.schedule}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TourDetailForm