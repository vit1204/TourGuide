import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersByGuideId, getUserById, createTour } from '@/config/authApi';
import { Tour, User } from '@/types/interface';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { sendMessage } from '@/config/chatApi';

const CreateTourScreen: React.FC = () => {
  const navigation = useNavigation();
  const { chatId, userId, nowId, userName } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [customers, setCustomers] = useState<User[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>(userId as string);
  const [form, setForm] = useState<Tour>({
    _id: '',
    user_id: '',
    guide_id: '',
    Tuorlocation: ['', ''],
    schedule: '',
    numberUser: 1,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    tourType: '',
    price: 100000,
    status: '',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  });
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData) as User;
          setUser(parsedUser);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserIds = async () => {
      if (user) {
        try {
          const { allChat } = await getUsersByGuideId(user._id);
          const userIdsData = allChat.map((chat: { user_id: string }) => chat.user_id);
          setUserIds(userIdsData);
        } catch (error) {
          console.error('Error fetching user IDs', error);
        } finally {
          setIsLoading2(false);
        }
      }
    };

    fetchUserIds();
  }, [user]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (userIds.length > 0) {
        try {
          const customersData = await Promise.all(userIds.map(async (userId: string) => {
            const userInfo = await getUserById(userId);
            return userInfo.userDetial as User;
          }));

          const validCustomers = customersData.filter((customer) => customer !== null);
          setCustomers(validCustomers);
        } catch (error) {
          console.error('Error fetching customers', error);
        } finally {
          setIsLoading3(false);
        }
      }
    };

    fetchCustomers();
  }, [userIds]);

  const handleInputChange = (field: keyof Tour, value: any) => {
    if (field === 'Tuorlocation') {
      setForm(prevForm => {
        const newLocation = [...prevForm.Tuorlocation];
        newLocation[value.index] = value.text;
        return { ...prevForm, Tuorlocation: newLocation };
      });
    } else if (field === 'numberUser' || field === 'price') {
      const numericValue = parseInt(value, 10);
      setForm(prevForm => ({
        ...prevForm,
        [field]: isNaN(numericValue) ? 0 : numericValue,
      }));
    } else {
      setForm(prevForm => ({ ...prevForm, [field]: value }));
    }
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleStartDateChange = (event: any, selectedDate: Date | undefined) => {
    hideStartDatePicker();
    if (selectedDate) {
      setForm(prevForm => ({ ...prevForm, startTime: selectedDate }));
    }
  };

  const handleEndDateChange = (event: any, selectedDate: Date | undefined) => {
    hideEndDatePicker();
    if (selectedDate) {
      setForm(prevForm => ({ ...prevForm, endTime: selectedDate }));
    }
  };

  const handleSubmit = async () => {
    
    const data = {
      ...form,
      user_id: userId as string,
      guide_id: user?._id ?? '',
    };

    const requiredFields = ['Tuorlocation', 'schedule', 'numberUser', 'price'];
    for (const field of requiredFields) {
      const value = form[field as keyof Tour];
      if (!value || (Array.isArray(value) && value.some(item => !item))) {
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ các trường');
        return;
      }
    }

    try {
      const hello = await createTour(data);
      const newTour : Tour = hello.tour as Tour;
      Alert.alert('Tour created successfully');

      const tourDetails = `
        Tour-ID: ${newTour._id}
        Location: ${newTour.Tuorlocation.join(', ')}
        Schedule: ${newTour.schedule}
        Number of Users: ${newTour.numberUser}
        Start Time: ${newTour.startTime}
        End Time: ${newTour.endTime}
        Price: ${newTour.price}
        Schedule: ${newTour.schedule}
        PAYMENT IN HERE
      `;
      await sendMessage(chatId as string, user?._id as string, tourDetails);

      navigation.goBack();
      router.push(`/chatScreen/${chatId}?userName=${userName}&userId=${userId}`);
    } catch (error) {
      console.error('Error creating tour', error);
      Alert.alert('Error creating tour', 'An error occurred while creating the tour.');
    } finally {
      // setForm({
      //   _id: '',
      //   user_id: '',
      //   guide_id: '',
      //   Tuorlocation: ['', ''],
      //   schedule: '',
      //   numberUser: 1,
      //   startTime: new Date(Date.now()),
      //   endTime: new Date(Date.now()),
      //   tourType: '',
      //   price: 100000,
      //   status: '',
      //   deleted: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   __v: 0,
      // });
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create new Tour',
      headerStyle: {
        backgroundColor: '#FF8C00', // Màu nền vàng
      },
      headerTintColor: '#fff', // Màu chữ trắng
      headerTitleStyle: {
        fontWeight: 'bold' ,
      },
    });
  }, [navigation]);

  if (isLoading || isLoading2 || isLoading3) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4" edges={['right', 'bottom', 'left']}>
      <ScrollView>
        {/* <Text className="text-2xl font-semibold mb-4">Create Tour</Text> */}
        <View className="mb-4">
          <Text className="mb-2">Select Customer:</Text>
          <TextInput 
            value={userName as string}
            editable={false}
            className='border border-gray-300 mb-4 p-2 rounded bg-white text-black font-bold'
          />
        </View>

        <View className="mb-4">
          <Text className='mb-2 text-lg font-semibold text-gray-700'>Location 1</Text>
          <TextInput
            value={form.Tuorlocation[0]}
            onChangeText={(text) => handleInputChange('Tuorlocation', { index: 0, text })}
            placeholder="Enter the start location"
            className='border border-gray-300 mb-4 p-2 rounded bg-white'
          />
        </View>

        <View className="mb-4">
          <Text className='mb-2 text-lg font-semibold text-gray-700'>Location 2</Text>
          <TextInput
            value={form.Tuorlocation[1]}
            onChangeText={(text) => handleInputChange('Tuorlocation', { index: 1, text })}
            placeholder="Enter the destination"
            className='border border-gray-300 mb-4 p-2 rounded bg-white'
          />
        </View>


        <View className="mb-4">
          <Text className='mb-2 text-lg font-semibold text-gray-700'>Total Guests</Text>
          <TextInput
            value={form.numberUser.toString()}
            onChangeText={(text) => handleInputChange('numberUser', text)}
            placeholder="Enter the number of guests"
            keyboardType="numeric"
            className='border border-gray-300 mb-4 p-2 rounded bg-white'
          />
        </View>

        <View className="mb-4">
          <Text className='mb-2 text-lg font-semibold text-gray-700'>Start Date</Text>

          <TouchableOpacity 
            onPress={() => setStartDatePickerVisibility(true)} 
            className='border border-gray-300 mb-4 p-2 rounded bg-gray-200 items-center'
          >
            <Text>{form.startTime.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {isStartDatePickerVisible && (
            <DateTimePicker
            value={form.startTime}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              setStartDatePickerVisibility(false);
              if (selectedDate) {
                handleInputChange('startTime', selectedDate);
              }
            }}
            />
          )}
        </View>

        <View className="mb-4">
          <Text className='mb-2 text-lg font-semibold text-gray-700'>End Date</Text>

          <TouchableOpacity 
            onPress={() => setEndDatePickerVisibility(true)} 
            className='border border-gray-300 mb-4 p-2 rounded bg-gray-200 items-center'
          >
            <Text>
              {form.endTime.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {isEndDatePickerVisible && (
            <DateTimePicker
            value={form.endTime}
            mode="date"
            display="default"
            minimumDate={form.startTime}
            onChange={(event, selectedDate) => {
              setEndDatePickerVisibility(false);
              if (selectedDate) {
                handleInputChange('endTime', selectedDate);
              }
            }}
            />
          )}
        </View>

        <View className="mb-4">
          <Text className='mb-2 text-lg font-semibold text-gray-700'>Price per person</Text>
          <TextInput
            value={form.price.toString()}
            onChangeText={(text) => handleInputChange('price', text)}
            placeholder="Enter the price"
            keyboardType="numeric"
            className='border border-gray-300 mb-4 p-2 rounded bg-white'
          />
        </View>

        <View className="mb-4">
          <Text className='mb-2 text-lg font-semibold text-gray-700'>Schedule</Text>
          <TextInput
            value={form.schedule}
            onChangeText={(text) => handleInputChange('schedule', text)}
            placeholder="Enter the schedule"
            className='border border-gray-300 mb-4 p-2 rounded bg-white h-45'
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>
        
        <CustomButton 
          title='Create Tour'
          handlePress={handleSubmit} 
          containerStyles='mt-5 py-3 rounded-full items-center bg-orange-500'
          textStyles='text-white font-bold text-lg'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 2,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});


export default CreateTourScreen;