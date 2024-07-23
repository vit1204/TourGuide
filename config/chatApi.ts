import { resultMessage } from "@/types/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const sendMessage = async (chatId: string, senderId: string, message: string) => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        const dataToSend = {
            chatId: chatId,
            senderId : senderId,
            message: message,
        }
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/chat/send-message`, dataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error in api: ',error);
        throw new Error((error as any).response?.data?.message || 'Get user failed');
    }
}