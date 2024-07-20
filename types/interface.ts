import { Message } from '@/types/Messages'

export interface User {
    _id: string;
    avatar: string;
    fullName: string;
    phoneNumber: string;
    userName: string;
    email: string;
    password: string;
    workLocation: string[];
    role: string;
    salt: string;
    gender: string;
    hometown: string;
    hobbies: string[];
    forgetPasswordToken: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    freeTime: number;
    freeTimeBegin: string;
    price: number;
    age: number;
    describe: string;
    languages: string[];
}

export interface Tour {
    _id: string;
    user_id: string;
    guide_id: string;
    Tuorlocation: string[];
    schedule: string;
    numberUser: number;
    startTime: Date;
    endTime: Date;
    tourType: string;
    price: number;
    status: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
// export interface Message {Cha
//     _id: string
//     text: string
//     time: string
//     user_id: string
// }

export interface Chat {
    _id: string,
    user_id: string,
    guide_id: string,
    messages: Message[],
    status: string,
    deleted: boolean,
    createdAt: Date,
    updaetAt: Date,
    __v: number
}

export interface MessageComponentProps {
    item: {
        message: string;
        user: string;
        timestamp: { hour: string, mins: string };
        chatId: string;
        senderId: string;
    };
    user: string;
}