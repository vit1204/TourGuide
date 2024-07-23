import { io } from 'socket.io-client';

const SOCKET_URL = 'http://51.79.173.117:3000'; // Replace with your server URL
const socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 3,
    timeout: 10000
});

socket.on('connect_error', (err) => {
    console.error(`Connection Error: ${err.message}`);
});

socket.on('connect_timeout', () => {
    console.error('Connection Timeout');
});

export default socket;
