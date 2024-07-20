import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MessageComponentProps {
    item: {
        message: string;
        user: string;
        timestamp: { hour: string, mins: string };
        chatId: string;
        senderId: string;
    };
    user: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ item, user }) => {
    const isCurrentUser = item.senderId === user;
    const formattedTime = `${item.timestamp.hour}:${item.timestamp.mins}`;

    return (
        <View className={`flex ${isCurrentUser ? 'items-end' : 'items-start'} mb-2`}>
            <View className="flex-row items-center">
                <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color="black"
                    className="mr-2"
                />
                <View className={`p-2 rounded-lg ${isCurrentUser ? 'bg-green-200' : 'bg-gray-200'}`}>
                    <Text className="text-black">{item.message}</Text>
                </View>
            </View>
            <Text className="ml-10 text-xs text-gray-500">{formattedTime}</Text>
        </View>
    );
};

export default MessageComponent;
