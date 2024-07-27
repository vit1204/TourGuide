import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useNavigation, useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { Chat, resultMessage } from '@/types/chat';
import { getAllChatByUserId } from '@/config/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '@/components/MessageComponent';
import { getDetailChat, sendMessage } from '@/config/chatApi';
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen: React.FC = () => {
    const navigation = useNavigation();
    const { chatId, userName, userId } = useLocalSearchParams();
    const [messages, setMessages] = useState<resultMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [nowId, setNowId] = useState('');

    const flatListRef = useRef<FlatList>(null);

    useLayoutEffect(() => {
        navigation.setOptions({ 
            title: userName as string,
            headerRight: () => (
                <Pressable onPress={() => router.push(`/subSite/create?chatId=${chatId}&userId=${userId}&nowId=${nowId}&userName=${userName}`)}>
                    <FontAwesome name="plus" size={24} color="black" />
                </Pressable>
            ),
        });
    }, [navigation, userName]);

    const getNowId = async () => {
        try {
            const value = await AsyncStorage.getItem("nowId");
            console.log('VALUE: ', JSON.parse(value as string));
            if (value !== null) {
                setNowId(JSON.parse(value as string));
            }
        } catch (error) {
            console.error("Error while loading nowId!");
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getNowId();
        }, [])
      );

    const fetchChatHistory = async () => {
        const data : Chat = await getDetailChat(chatId as string);
        if (data) {
            setMessages(data.messages);
        }
    };
    useEffect(() => {
        // if (chatId) {
        //     fetchChatHistory();
        // }
        const intervalId = setInterval(() => {
             if (chatId) {
            fetchChatHistory();
        }
        },2000)
        return () => clearInterval(intervalId)
    }, [nowId, chatId]);

    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleNewMessage = async () => {
        if (!newMessage) {
            return;
        }
        await sendMessage(chatId as string, nowId as string, newMessage);
        setNewMessage('');
        fetchChatHistory();
    };

    const handleReload = () => {
        if (nowId) {
            fetchChatHistory();
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