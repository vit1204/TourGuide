import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router, usePathname } from "expo-router";
import { Chat, User } from "@/types/interface";
import { Message } from "@/types/Messages";
import { getUserById } from "@/config/authApi";
import { resultMessage } from "@/types/chat";

const ChatComponent = ({ chat }: { chat: Chat }) => {
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
            // const lastMessage: resultMessage = {
            //     sender_id: lastMessageData.sender_id,
            //     message: lastMessageData.message,
            //     deleted: lastMessageData.deleted,
            //     createdAt: lastMessageData.createdAt,
            //     updatedAt: lastMessageData.updatedAt,
            // };
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
                    source={{ uri: user.avatar }}
                    className='w-12 h-12 rounded-full mr-4'
                />
                <View className="flex flex-1 flex-row justify-between">
                    <View>
                        <Text className="font-bold text-lg">{user.fullName}</Text>
                        <Text className="text-gray-600">
                            {messages?.message ? messages.message : "Tap to start chatting"}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-gray-400">
                            {messages?.createdAt ? messages.createdAt : "now"}
                        </Text>
                    </View>
                </View>
            </Pressable>
        )
    );
};

export default ChatComponent;