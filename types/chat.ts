export interface Message {
    senderId: string;
    message: string;
    timestamp: string; // or Date, depending on your server implementation
  }
  export interface resultMessage {
    sender_id: string,
    message: string,
    _id: string,
    deleted: boolean,
    createdAt: string,
    updatedAt: string
  }
  
  export interface Chat {
    _id: string,
    user_id: string,
    guide_id: string,
    messages: resultMessage[],
    status: string,
    deleted: boolean,
    createdAt: Date,
    updaetAt: Date,
    __v: number
  }