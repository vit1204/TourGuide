import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import io from 'socket.io-client';
import { Message } from '@/types/Messages';
import { getAllChatByUserId } from '@/config/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '@/components/MessageComponent';
import { MessageComponentProps, Chat } from '@/types/interface';

const socket = io('http://51.79.173.117:3000/apis '); 

// Ensure this is the correct backend address

const ChatScreen: React.FC = () => {
    const navigation = useNavigation();
    const { chatId, userName } = useLocalSearchParams();  
    const [chatMessages, setChatMessages] = useState<MessageComponentProps[]>([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
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
            const messages: MessageComponentProps[] = data.allChat.flatMap((chat: Chat) =>
                chat.messages.map((msg: Message) => ({
                    item: {
                        message: msg.text,
                        user: msg.user_id,
                        timestamp: { 
                            hour: new Date(msg.time).getHours().toString().padStart(2, '0'),
                            mins: new Date(msg.time).getMinutes().toString().padStart(2, '0')
                        },
                        chatId: chat._id,
                        senderId: msg.user_id
                    },
                    user: msg.user_id
                }))
            );

            setChatMessages(messages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchChatHistory();
    }, [chatId]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');
            socket.emit('joinRoom', chatId);
        });

        socket.on('newMessage', (newMessage: Message) => {
            const newMsg = {
                item: {
                    message: newMessage.text,
                    user: newMessage.user_id,
                    timestamp: { 
                        hour: new Date(newMessage.time).getHours().toString().padStart(2, '0'),
                        mins: new Date(newMessage.time).getMinutes().toString().padStart(2, '0')
                    },
                    chatId,
                    senderId: newMessage.user_id
                },
                user: newMessage.user_id
            };
            setChatMessages((prevMessages) => [...prevMessages, newMsg as MessageComponentProps]);
        });

        return () => {
            socket.off('newMessage');
            socket.emit('leaveRoom', chatId);
        };
    }, [chatId]);

    const handleNewMessage = () => {
        if (!message) {
            return;
        }
        const hour = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;
        const mins = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;

        const newMessage = {
            chatId,
            senderId: user,
            message,
            time: new Date()
        };

        // Send message to server via socket
        socket.emit('sendMessage', newMessage);

        // Update UI immediately
        setChatMessages((prevMessages) => [
            ...prevMessages, 
            {
                item: {
                    message,
                    user,
                    timestamp: { hour, mins },
                    chatId,
                    senderId: user
                },
                user: user
            } as MessageComponentProps
        ]);
        setMessage('');
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
          title : `Hồ Thành Tiến`,
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
                {chatMessages.length > 0 ? (
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <MessageComponent item={item.item} user={user} />
                        )}
                        keyExtractor={(item, index) => `${item.item.chatId}-${index}`}
                    />
                ) : (
                    <Text className="text-center text-gray-500">No messages yet</Text>
                )}
            </View>

            <View className="flex-row items-center p-4 border-t border-gray-200">
                <TextInput
                    className="flex-1 bg-gray-200 p-2 rounded-lg"
                    value={message}
                    onChangeText={setMessage}
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
