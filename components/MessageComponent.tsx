import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '@/types/chat';

import { format, parseISO } from 'date-fns';

const MessageComponent = ({ message, userId } : {message : Message, userId: string}) => {
    const isCurrentUser = message.senderId === userId;
    const formattedTime = `${format(parseISO(message.timestamp), 'yyyy-MM-dd HH:mm:ss')}`;

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
                    <Text className="text-black">{message.message}</Text>
                </View>
            </View>
            <Text className="ml-10 text-xs text-gray-500">{formattedTime}</Text>
        </View>
    );
};

export default MessageComponent;