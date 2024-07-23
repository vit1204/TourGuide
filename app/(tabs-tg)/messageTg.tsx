import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getAllChatByUserId } from '@/config/authApi';
import { Chat, User } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatComponent from '@/components/ChatComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import socket from '@/utils/socket';

// const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;

const MessageScreen = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData) as User);
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const fetchChats = async (userId: string) => {
    try {
      const data = await getAllChatByUserId(userId);
      setChats(data.allChat);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Socket connected');
  //     setIsSocketConnected(true);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Socket disconnected');
  //     setIsSocketConnected(false);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  useEffect(() => {
    if (user  ) {
      fetchChats(user._id);
    }
  }, [user]);

  if (isLoading) {
    return (
      <View className="h-full w-full flex items-center justify-center">
        <Text className="flex items-center justify-center">
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex w-full h-full">
        <View className="flex-1 bg-white">
          <View className="p-4 bg-primary_darker">
            <Text className="text-2xl font-bold text-white">Message</Text>
          </View>

          <View className="p-4">
            <TextInput
              placeholder="Search"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </View>

          {chats.length > 0 ? (
            <FlatList
              data={chats}
              keyExtractor={(item) => item._id}
              renderItem={({ item }: { item: Chat }) => <ChatComponent chat={item} />}
            />
          ) : (
            <View className="flex-1 flex items-center justify-center">
              <Text className="text-gray-500 text-lg">
                You don't have any chat room
              </Text>
              <Text className="text-gray-400">
                Start a new conversation
              </Text>
            </View>
          )}
        </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
