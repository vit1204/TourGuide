import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useFocusEffect, usePathname } from 'expo-router';
import io from 'socket.io-client';
import { getAllChatByUserId } from '@/config/authApi';
import { Chat, User } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Khai báo kiểu dữ liệu cho chat

const socket = io('http://your-backend-url'); // Thay thế bằng địa chỉ backend của bạn

const MessageScreen = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const [chats, setChats] = useState<Chat[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );


  const fetchChats = async () => {
    try {
      const data = await getAllChatByUserId(user?._id || '');
      setChats(data.allChat);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchChats();
    }, [user])
  );

    // Lắng nghe sự kiện tin nhắn mới
    socket.on('new-message', (message: sttring[]) => { // Thay thế 'any' bằng kiểu dữ liệu của message
      // Cập nhật danh sách trò chuyện với tin nhắn mới
      setChats((prevChats) => {
        // ... logic cập nhật danh sách, ví dụ:
        const updatedChats = prevChats.map(chat => {
          if (chat._id === message.chatId) {
            return { ...chat, messages: [...chat.messages, message] };
          }
          return chat;
        });
        return updatedChats;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChatPress = (chatId: string) => {
    // Chuyển hướng đến ChatScreen với chatId
    router.push(`/chatScreen/${chatId}`); 
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatPress(item._id)}>
            <View style={styles.chatItem}>
              <Text>{/* Hiển thị tên người dùng hoặc thông tin khác */}</Text>
              <Text>{/* Hiển thị tin nhắn cuối cùng */}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    // Áp dụng Tailwind CSS ở đây
  },
});

export default MessageScreen;