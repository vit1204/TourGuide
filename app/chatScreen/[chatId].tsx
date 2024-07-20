import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';
import io from 'socket.io-client';

// Khai báo kiểu dữ liệu cho message
interface Message {
  _id: string;
  senderId: string;
  message: string;
  // Các trường dữ liệu khác của message 
}

const socket = io('http://your-backend-url'); // Thay thế bằng địa chỉ backend của bạn

const ChatScreen = () => {
    const pathname = usePathname();
    const [chatId, setChatId] = useState('');
    // const { chatId } = route.params as { chatId: string }; // Lấy chatId từ route params
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Lấy lịch sử trò chuyện từ API
        const fetchChatHistory = async () => {
        try {
            const response = await fetch(`http://your-backend-url/${chatId}`); // Thay thế bằng API endpoint và chatId
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
        };

        fetchChatHistory();

        // Lắng nghe sự kiện tin nhắn mới
        socket.on('new-message', (message: Message) => {
        // Cập nhật danh sách tin nhắn với tin nhắn mới
        setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
        socket.disconnect();
        };
    }, [chatId]);

    const handleSendMessage = async () => {
        try {
        // Gửi tin nhắn mới đến server
        await fetch('http://your-backend-url/send-message', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            chatId,
            senderId: 'your-user-id', // Thay thế bằng userId của bạn
            message: newMessage,
            }),
        });

        setNewMessage('');
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <View style={styles.container}>
        <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
            <View style={styles.message}>
                <Text>{item.senderId}: {item.message}</Text>
            </View>
            )}
        />
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Nhập tin nhắn..."
            />
            <Button title="Gửi" onPress={handleSendMessage} />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    // Áp dụng Tailwind CSS ở đây
  },
  inputContainer: {
    // Áp dụng Tailwind CSS ở đây
  },
  input: {
    // Áp dụng Tailwind CSS ở đây
  },
});

export default ChatScreen;