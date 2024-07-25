import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Tour, User } from '@/types/interface';
import { reportTour } from '@/utils/reportTour';
import { getUTCDateString } from '@/utils/getUTCDateString';
import axios from 'axios';
import { useConfirmPayment} from "@stripe/stripe-react-native"

interface TourDetailFormProps {
  tour: {
    Tuorlocation: string[];
    startTime: string;
    endTime: string;
    numberUser: number;
    price: number;
    status: string;
    schedule: string;
    user_id: string;
    guide_id: string;
    tourType: string;
  };
  guide: User;
  customer: User;
}

const TourDetailForm = ({tour, guide, customer}: TourDetailFormProps) => {
  
  const {confirmPayment, loading:loadingPay} = useConfirmPayment()

  const [items, setItems ] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [twoEmpty, setTwoEmpty] = useState({
    name: "",
    description:""
  })

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
              await reportTour(tour as Object );
            } catch (error) {
              console.error('Error reporting tour:', error);
            }
          }
        }
      ]
    );
  }


  if (tour.status === 'upcoming' && items.length === 0) {
    setItems([{
      name: tour.tourType,
         description: tour.Tuorlocation[0],
      quantity: quantity,
      price: tour.price
    }]);
  }
  
  const handlePayment = async () => {
    try {
       if(tour){
      console.log({
        items,
         user_id: tour.user_id,
         guide_id: tour.guide_id,
         description: tour.schedule
      })
      const response  = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/stripe/createSessionPayment`, {
        items: items,
         user_id: tour.user_id,
         guide_id: tour.guide_id,
         description: tour.schedule
      })
      console.log(response)
      if (response.data) {
             console.log(response.data)
             Linking.openURL(response.data.url)
    
      } else {

        console.error('Unexpected response status:', response.status);
      }

    }
      
    } catch (error) {
      console.log(error)
    }
   
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
                <Text className="text-lg">
                  {new Date(tour.startTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'UTC'
                  })}</Text>
                <Text className="text-base">{getUTCDateString(new Date(tour.startTime))}</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold">End</Text>
                <Text className="text-lg">
                  {new Date(tour.endTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'UTC'
                  })}
                </Text>
                <Text className="text-base">{getUTCDateString(new Date(tour.endTime))}</Text>
              </View>
            </View>

            <View className="items-center flex-row mt-5">
              <Text className="text-xl font-bold">Total Guide:   </Text>
              <Text className="text-xl ">{tour.numberUser === 1 ? `${tour.numberUser} person` : `${tour.numberUser} people`}</Text>
            </View>
            
            <View className="items-center flex-row mt-5">
              <Text className="text-2xl font-bold">Price:   </Text>
              <Text className="text-2xl font-bold">{tour.price.toLocaleString('vi-VN')} VND</Text>
            </View>
          </View>

          <View className="flex-row justify-between w-11/12 mt-10 space-x-3">
          {tour.status === 'activity' && (
             <TouchableOpacity 
                className="bg-red-200 py-6 px-3 rounded-lg flex-1 items-center border border-red-300 shadow-sm active:bg-red-300"
                onPress={handleReportTour}
              >
                  <Text className="text-red-700 font-bold text-lg">REPORT</Text>
              </TouchableOpacity>

          )}
             

              {tour.status === 'activity' && (
                  <TouchableOpacity
                      className="bg-green-200 py-6 px-3 rounded-lg flex-1 items-center border border-green-300 shadow-sm active:bg-green-300"
                      onPress={handleEndTour}
                  >
                      <Text className="text-green-700 font-bold text-lg">END</Text>
                  </TouchableOpacity>
              )}

              {tour.status === 'upcoming' && (
                <>
                  <TouchableOpacity
                      className="bg-primary py-6 px-3 rounded-lg flex-1 items-center border border-blue-300 shadow-sm active:bg-blue-300"
                      onPress={handlePayment}
                  >
                      <Text className="text-white font-bold text-lg">Pay</Text>
                  </TouchableOpacity>
              </>
              )}
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