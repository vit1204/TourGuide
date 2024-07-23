import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Tour, User } from '@/types/interface';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersByGuideId, getUserById, createTour } from '@/config/authApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';

const CreateTourScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState<User | null>(null);
  const [customers, setCustomers] = useState<User[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
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
      const numericValue = parseInt(value);
      setForm({ ...form, [field]: isNaN(numericValue) ? 0 : numericValue });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleConfirm = async () => {
    if (!selectedCustomer) {
      Alert.alert('Please select a customer');
      return;
    }

    const requiredFields = ['Tuorlocation', 'schedule', 'numberUser', 'price', 'tourType'];
    for (const field of requiredFields) {
      const value = form[field as keyof Tour];
      if (!value || (Array.isArray(value) && value.some(item => !item))) {
        Alert.alert('Lỗi', 'Vui lòng điền tất cả các trường');
        return;
      }
    }

    const data = {
      ...form,
      user_id: selectedCustomer,
      guide_id: user?._id || '',
    };

    try {
      await createTour(data);
      Alert.alert('Tour created successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating tour', error);
      Alert.alert('Error creating tour', 'An error occurred while creating the tour.');
    } finally {
      setForm({
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
    }
  };

  if (isLoading || isLoading2 || isLoading3) {
    return (
      <View className='h-full w-full justify-center items-center bg-gray-100'>
        <Text className='text-lg text-gray-600'>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View className=' mb-4'>
          <Text className='text-4xl font-bold text-primary_darker text-gray-800 text-center'>Create New Tour</Text>
        </View>

        <Text className='mb-2 text-lg font-semibold text-gray-700'>Customer</Text>
        <Picker
          selectedValue={selectedCustomer}
          onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
          className='mb-4 bg-white'
        >
          <Picker.Item label="Select a customer..." value="" />
          {customers.map(customer => (
            <Picker.Item key={customer._id} label={customer.fullName} value={customer._id} />
          ))}
        </Picker>

        <Text className='mb-2 text-lg font-semibold text-gray-700'>Location - FROM</Text>
        <TextInput
          value={form.Tuorlocation[0]}
          onChangeText={(text) => handleInputChange('Tuorlocation', { index: 0, text })}
          placeholder="Enter the start location"
          className='border border-gray-300 mb-4 p-2 rounded bg-white'
        />

        <Text className='mb-2 text-lg font-semibold text-gray-700'>Location - TO</Text>
        <TextInput
          value={form.Tuorlocation[1]}
          onChangeText={(text) => handleInputChange('Tuorlocation', { index: 1, text })}
          placeholder="Enter the destination"
          className='border border-gray-300 mb-4 p-2 rounded bg-white'
        />

        <Text className='mb-2 text-lg font-semibold text-gray-700'>Total Guests</Text>
        <TextInput
          value={form.numberUser.toString()}
          onChangeText={(text) => handleInputChange('numberUser', text)}
          placeholder="Enter the number of guests"
          keyboardType="numeric"
          className='border border-gray-300 mb-4 p-2 rounded bg-white'
        />

        <Text className='mb-2 text-lg font-semibold text-gray-700'>Price</Text>
        <TextInput
          value={form.price.toString()}
          onChangeText={(text) => handleInputChange('price', text)}
          placeholder="Enter the price"
          keyboardType="numeric"
          className='border border-gray-300 mb-4 p-2 rounded bg-white'
        />


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
        {/* <Text className='mb-2 text-lg font-semibold text-gray-700'>Tour Type</Text>
        <TextInput
          value={form.tourType}
          onChangeText={(itemValue) => handleInputChange('tourType', itemValue)}
          placeholder="Enter the tour type"
          className='border border-gray-300 mb-4 p-2 rounded bg-white'
        /> */}

        <CustomButton 
          title='Confirm' 
          handlePress={handleConfirm} 
          containerStyles='p-4 rounded-lg'
          textStyles='text-white text-center font-bold text-lg'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  }
});

export default CreateTourScreen;
