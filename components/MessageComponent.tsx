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
    const isCurrentUser = message.sender_id !== userId;
    const formattedTime = `${format(parseISO(message.createdAt), ' HH:mm dd-MM-yyyy')}`;
    const idTour = message.message && message.message.includes('Tour-ID: ')
    ? message.message
        .split('Tour-ID: ')[1]
        .split(' ')[0]
        .trim()
    : '';


    return (
        <View
            style={{
                alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                backgroundColor: isCurrentUser ? '#DCF8C6' : '#ECECEC',
                borderRadius: 10,
                padding: 10,
                marginVertical: 5,
                maxWidth: '80%',
            }}
        >
            <Text>{message.message}</Text>
            {message.message.includes('PAYMENT IN HERE') && (
                <Pressable
                    className='bg-blue-700 p-2 border mt-5'
                    onPress={() => {
                        console.log('Payment button pressed: ', idTour);
                        // router.replace(`/payment/${idTour}`);
                    }}
                >
                    <Text className='text-white font-Nbold text-center'>Payment</Text>
                </Pressable>
            )}
            <Text style={{ fontSize: 10, textAlign: 'right', marginTop: 5 }}>{formattedTime}</Text>
        </View>
    );
};

export default MessageComponent;
