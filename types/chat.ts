export interface Message {
    senderId: string;
    message: string;
    timestamp: string; // or Date, depending on your server implementation
  }
  
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