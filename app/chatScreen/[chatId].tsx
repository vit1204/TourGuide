// 

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import io from 'socket.io-client';
import { Message, Chat } from '@/types/chat';
import { getAllChatByUserId } from '@/config/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '@/components/MessageComponent';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import socket from '@/utils/socket';

// const socket = io(`http://51.79.173.117:3000`);

// Ensure this is the correct backend address

const ChatScreen: React.FC = () => {
    const navigation = useNavigation();
    const { chatId, userName, userId } = useLocalSearchParams();  
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState("");

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUser(value);
            }
        } catch (error) {
            console.error("Error while loading username!");
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: userName as string });
        getUsername();
    }, []);

    const fetchChatHistory = async () => {
        try {
            const data = await getAllChatByUserId(chatId as string || '');
            if (data.messages) {
                setMessages(data.messages);
            } else {
                console.log('No messages found');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchChatHistory();
    }, [chatId]);

    useEffect(() => {
        if (chatId) {
            // Join chat room
            socket.emit('joinChat', chatId as string);
    
            // Confirm the join
            socket.on('joinedChat', (chatId: string) => {
                console.log(`Successfully joined chat ${chatId}`);
            });
    
            // Handle new messages
            socket.on('newMessage', (message: Message) => {
                console.log('Received new message: ', message);
                setMessages((prevMessages) => [...prevMessages, message]);
            });
    
            return () => {
                socket.off('newMessage');
                socket.off('joinedChat');
            };
        }
    }, [chatId]);

    const sendMessage = () => {
        console.log('Sending message:', newMessage); // Log message content
        socket.emit('sendMessage', {
            chatId,
            senderId: userId, // Replace with actual sender ID
            message: newMessage,
        });
        setNewMessage('');
    };
    
    const handleNewMessage = () => {
        if (!newMessage) {
            return;
        }   
        // Send message to server via socket
        sendMessage();
    
        // Update UI immediately
        setMessages((prevMessages) => [...prevMessages, {
            senderId: userId,
            message: newMessage,
            timestamp: new Date().toISOString(),
        }as Message]);
        setNewMessage('');
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `${userName as string}`,
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
        <View className="flex-1">
            <View className="flex-1 p-4">
                {messages.length > 0 ? (
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <MessageComponent
                                message={item}
                                userId={userId as string}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text className="text-center text-gray-500">No messages yet</Text>
                )}
            </View>

            <View className="flex-row items-center p-4 border-t border-gray-200">
                <TextInput
                    className="flex-1 bg-gray-200 p-2 rounded-lg"
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                />
                <Pressable
                    className="ml-2 p-2 bg-blue-500 rounded-full"
                    onPress={handleNewMessage}
                >
                    <Text className="text-white text-lg">SEND</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ChatScreen;