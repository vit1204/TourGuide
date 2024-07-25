import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { resultMessage } from '@/types/chat';
import { format, parseISO } from 'date-fns';
import { router } from 'expo-router';

interface MessageComponentProps {
    message: resultMessage;
    userId: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message, userId }) => {
    const isCurrentUser = message.sender_id !==  userId; 
    const formattedTime = `${format(parseISO(message.createdAt), ' HH:mm dd-MM-yyyy')}`;
    const idTour = message.message && message.message.includes('Tour-ID: ')
        ? message.message
            .split('Tour-ID: ')[1]
            .split(' ')[0]
            .trim()
        : '';

    return (
        <View
            className={`${
                isCurrentUser ? 'self-end bg-green-100' : 'self-start bg-gray/20'
            } rounded-lg p-4 my-2 max-w-4/5`}
        >
            <Text>{message.message}</Text>
            {message.message.includes('PAYMENT IN HERE') && (
                <Pressable
                    className="bg-blue-700 p-2 rounded border border-blue-800 mt-2"
                    onPress={() => {
                        console.log('Payment button pressed: ', idTour);
                        if (idTour) {
                            // router.replace(`/payment/${idTour}`);
                        }
                    }}
                >
                    <Text className="text-white font-bold text-center">Payment</Text>
                </Pressable>
            )}
            <Text className="text-xs text-right mt-2">{formattedTime}</Text>
        </View>
    );
};

export default MessageComponent;