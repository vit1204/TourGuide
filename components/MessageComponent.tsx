import React from 'react';
import { View, Text } from 'react-native';
import { resultMessage } from '@/types/chat';
import { format, parseISO } from 'date-fns';

interface MessageComponentProps {
    message: resultMessage;
    userId: string;
}


const MessageComponent: React.FC<MessageComponentProps> = ({ message, userId }) => {
    const isCurrentUser = message.sender_id !== userId;
    const formattedTime = `${format(parseISO(message.createdAt), ' HH:mm dd-MM-yyyy')}`;

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
            <Text style={{ fontSize: 10, textAlign: 'right', marginTop: 5 }}>{formattedTime}</Text>
        </View>
    );
};

export default MessageComponent;
