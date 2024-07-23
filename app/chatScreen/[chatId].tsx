import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Message, Chat, resultMessage } from '@/types/chat';
import { getAllChatByUserId } from '@/config/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '@/components/MessageComponent';
import socket from '@/utils/socket';
import { sendMessage } from '@/config/chatApi';

const ChatScreen: React.FC = () => {
    const navigation = useNavigation();
    const { chatId, userName, userId } = useLocalSearchParams();  
    const [messages, setMessages] = useState<resultMessage[]>([]);
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
            if (data.message) {
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

    // useEffect(() => {
    //     if (chatId) {
    //         // Join chat room
    //         socket.emit('joinChat', chatId);
    
    //         // Confirm the join
    //         socket.on('joinedChat', (chatId: string) => {
    //             console.log(`Successfully joined chat ${chatId}`);
    //         });
    
    //         // Handle new messages
    //         socket.on('newMessage', (message: resultMessage) => {
    //             console.log('Received new message: ', message);
    //             setMessages((prevMessages) => [...prevMessages, message]);
    //         });
    
    //         return () => {
    //             socket.off('connect');
    //             socket.off('newMessage');
    //             // socket.off('joinedChat');
    //         };
    //     }
    // }, [chatId]);

    // const sendMessage = useCallback(() => {
    //     if (newMessage.trim()) {
    //       socket.emit('sendMessage', { chatId, senderId : userId, message: newMessage });
    //       setNewMessage('');
    //     } else {
    //         console.log('Cannot send empty message');
    //     }
    //   }, [newMessage, chatId, userId]);
    
    const handleNewMessage = async () => {
        if (!newMessage) {
            return;
        }   
        console.log("CHAT ID: ", chatId);
        console.log('SENDER ID: ', userId);
        console.log('Message :', newMessage);
        // Send message to server via socket
        await sendMessage(chatId as string, userId as string, newMessage)
        // Append message to local stateresultMessage = {}
        const newMsg : resultMessage = {
            sender_id: userId as string,
            message: newMessage,
            _id: "",
            deleted: false,
            createdAt: "",
            updatedAt: ""
        }
        setMessages((prevMessages) => [...prevMessages, newMsg]);
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