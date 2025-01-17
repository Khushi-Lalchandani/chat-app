export interface Message {
  name: string;
  message: string;
  email: string;
  time?: Date;
  messageSent?: boolean;
  messageReceived?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  sent: Message[];

  received: Message[];
  profile_photo: string;
}
