import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router, usePathname } from "expo-router";
import { Chat, User } from "@/types/interface";
import { Message } from "@/types/Messages";
import { getUserById } from "@/config/authApi";
import { resultMessage } from "@/types/chat";
import { format, parseISO } from 'date-fns';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatComponent = ({ chat, user_Id }: { chat: Chat, user_Id: string }) => {
    const navigation = useNavigation();
    const pathname = usePathname();
    const [messages, setMessages] = useState<resultMessage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useLayoutEffect(() => {
        if (chat.messages.length === 0) {
            setMessages(null);
        } else {
            const lastMessageData = chat.messages[chat.messages.length - 1];
            setMessages(lastMessageData as unknown as resultMessage);
        }
    }, [chat]);

    const fetchGuide = async () => {
        try {
            const data = await getUserById(chat.user_id);
            if (data && data.userDetial) {
                setUser(data.userDetial as User);
            } else {
                console.log('No user found');
            }
        } catch (error) {
            console.error('Error fetching user data', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chat) {
            fetchGuide();
        }
    }, [chat]);

    const handleNavigation = (chatId: string, userName: string, userId: string ) => {
        router.push(`/chatScreen/${chatId}?userName=${userName}&userId=${userId}`);
    };

    const truncateMessage = (message: string, maxLength: number) => {
        return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
    };

    const formatTime = (createdAt: string) => {
        try {
            return format(parseISO(createdAt), 'yyyy-MM-dd');
        } catch (error) {
            console.error('Error parsing date', error);
            return 'Invalid date';
        }
    };

    const formattedTime = messages?.createdAt ? formatTime(messages.createdAt) : 'now';

    if (isLoading) {
        return (
            <View className="h-full w-full flex items-center justify-center">
                <Text className="flex items-center justify-center">
                    Loading...
                </Text>
            </View>
        ); // Nếu isLoading là true, hiển thị thông báo tải
    }

    return (
        user && (
            <Pressable className="flex flex-row p-4 items-center" onPress={() => handleNavigation(chat._id, user.fullName, user._id)}>
                <Image 
                    source={{ uri: user?.avatar ? user.avatar : 'https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_2.jpg'}}
                    className='w-12 h-12 rounded-full mr-3'
                />
                <View className="flex flex-1 flex-row justify-between">
                    <View>
                        <Text className="font-bold text-lg">{user.fullName}</Text>
                        <Text className="text-gray-600">
                            {messages?.message ? truncateMessage(messages.message, 40) : "Tap to start chatting"}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-gray-400">
                            {formattedTime}
                        </Text>
                    </View>
                </View>
            </Pressable>
        )
    );
};

export default ChatComponent;