import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Chat, resultMessage } from '@/types/chat';
import { getAllChatByUserId } from '@/config/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '@/components/MessageComponent';
import { sendMessage } from '@/config/chatApi';
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen: React.FC = () => {
    const navigation = useNavigation();
    const { chatId, userName, userId } = useLocalSearchParams();

    const [messages, setMessages] = useState<resultMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [nowId, setNowId] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const flatListRef = useRef<FlatList>(null);

    useLayoutEffect(() => {
        navigation.setOptions({ title: userName as string });
    }, [navigation, userName]);

    const getNowId = async () => {
        try {
            const value = await AsyncStorage.getItem("nowId");
            if (value !== null) {
                setNowId(value);
            }
        } catch (error) {
            console.error("Error while loading nowId!");
        }
    };

    useEffect(() => {
        getNowId();
    }, []);

    const fetchChats = async (userId: string) => {
        try {
            const data = await getAllChatByUserId(userId);
            setChats(data.allChat);
        } catch (error) {
            console.error("Error fetching chats: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (nowId) {
            fetchChats(userId as string);
        }
    }, [nowId, userId]);

    useEffect(() => {
        const fetchChatHistory = () => {
            const chat = chats.find(chat => chat._id === chatId as string);
            if (chat) {
                setMessages(chat.messages);
            }
        };

        if (chats.length > 0) {
            fetchChatHistory();
        }
    }, [chats, chatId]);

    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleNewMessage = async () => {
        if (!newMessage) {
            return;
        }

        await sendMessage(chatId as string, userId as string, newMessage);
        setNewMessage('');
        fetchChats(userId as string);
    };

    const handleReload = () => {
        if (nowId) {
            fetchChats(userId as string);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${userName as string}`,
            headerStyle: {
                backgroundColor: '#FF8C00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });
    }, [navigation, userName]);

    return (
        <View className="flex-1">
            <View className="flex-1 p-4">
                {messages.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={({ item }) => (
                            <MessageComponent
                                message={item}
                                userId={userId as string}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
                <Pressable
                    className="ml-2 p-2 bg-gray-200 rounded-full"
                    onPress={handleReload}
                >
                    <FontAwesome name="refresh" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    );
};

export default ChatScreen;
