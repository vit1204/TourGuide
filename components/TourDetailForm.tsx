import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Tour, User } from '@/types/interface';

const TourDetailForm = ({tour, guide, customer}: {tour: Tour, guide: User, customer: User}) => {
  console.log('currentTour - tour', tour);
  console.log('guide', guide);
  console.log('customer', customer);
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
                <Text className="text-sm">Da Nang, Viet Nam</Text>
                <Text className="text-2xl font-bold">{}</Text>
              </View>
              <FontAwesome name="arrow-right" size={24} color="black" />
              <View className="items-center">
                <Text className="text-sm">Da Nang, Viet Nam</Text>
                <Text className="text-2xl font-bold">{}</Text>
              </View>
            </View>

            <View className="items-center mb-4">
              <Text className="text-base">Date</Text>
              <Text className="text-lg font-bold">{new Date(tour.startTime).toDateString()}</Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="items-center">
                <Text className="text-base">Start</Text>
                <Text className="text-lg font-bold">{new Date(tour.startTime).toLocaleTimeString()}</Text>
              </View>
              <View className="items-center">
                <Text className="text-base">End</Text>
                <Text className="text-lg font-bold">{new Date(tour.endTime).toLocaleTimeString()}</Text>
              </View>
            </View>

            <View className="items-center mb-4">
              <Text className="text-2xl font-bold">Price</Text>
              <Text className="text-3xl font-bold">130.000 vnd</Text>
            </View>
          </View>

          <View className="flex-row justify-around w-4/5 mt-10">
            <TouchableOpacity className="bg-red-200 p-4 rounded-full w-2/5 items-center">
              <Text className="text-red-700 font-bold text-lg">REPORT</Text>
            </TouchableOpacity>
            {/* {tour.status === 'activity' && (
            <View className="flex-row justify-around w-4/5 mt-10">
              <TouchableOpacity 
                className="bg-green-200 p-4 rounded-full w-2/5 items-center"
                onPress={handleEndTour}
              >
                <Text className="text-green-700 font-bold text-lg">END</Text>
              </TouchableOpacity>
            </View>
          )}

          {tour.status === 'upcoming' && (
            <View className="flex-row justify-around w-4/5 mt-10">
              <TouchableOpacity 
                className="bg-blue-200 p-4 rounded-full w-2/5 items-center"
                onPress={handleCancelTour}
              >
                <Text className="text-blue-700 font-bold text-lg">CANCEL</Text>
              </TouchableOpacity>
            </View>
          )} */}
            <TouchableOpacity className="bg-yellow-200 p-4 rounded-full w-2/5 items-center">
              <Text className="text-yellow-700 font-bold text-lg">COMMENT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 items-center py-10">
          <View className="bg-white shadow-lg w-11/12 p-8 rounded-lg border-gray-700 border-2">
            <Text className="text-2xl font-bold mb-4">Tour Guide Details</Text>
            <View className="mb-4">
              <Text className="text-base font-semibold">Name</Text>
              <Text>Ho Thanh Tien</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Gender</Text>
              <Text>Male</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Phone Number</Text>
              <Text>+84 123 456 789</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Email</Text>
              <Text>guide@example.com</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Experience</Text>
              <Text>5 years</Text>
            </View>
          </View>

          <View className="bg-white shadow-lg w-11/12 p-8 rounded-lg border-gray-700 border-2 mt-6">
            <Text className="text-2xl font-bold mb-4">Customer Details</Text>
            <View className="mb-4">
              <Text className="text-base font-semibold">Name</Text>
              <Text>Viet Nguyen</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Date of Birth</Text>
              <Text>01/01/2000</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Gender</Text>
              <Text>Male</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Nationality</Text>
              <Text>Vietnamese</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Language</Text>
              <Text>Vietnamese</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-semibold">Phone Number</Text>
              <Text>+84 123 456 789</Text>
            </View>
          </View>

          <View className="bg-white shadow-lg w-11/12 p-8 rounded-lg border-gray-700 border-2 mt-6">
            <Text className="text-2xl font-bold mb-4">Tour Description</Text>
            <Text className="text-base">
              This tour takes you through the beautiful sights of Da Nang. Starting from Son Tra, the tour covers various locations including Location 1, Location 2, and Location 3. Enjoy the scenic beauty and explore the culture and history of each spot. The tour is designed for adventure seekers and offers a mix of excitement and relaxation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TourDetailForm