import * as SMS from 'expo-sms';

export const sendSMS = async (phoneNumber: string, message: string): Promise<void> => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync(
      [phoneNumber],
      message
    );
    if (result === 'sent') {
      console.log('Message sent successfully');
    } else {
      console.log('Failed to send message');
    }
  } else {
    console.error('SMS is not available on this device');
  }
};
