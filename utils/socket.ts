import { io } from 'socket.io-client';

const SOCKET_URL = 'http://51.79.173.117:3000';

// Replace with your server URL
const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    timeout: 10000
});

// const socket = io(SOCKET_URL);

socket.on('connect', () => {
    console.log('Socket connected');
});

socket.on('connect_error', (err: any) => {
    console.error(`Connection Error: ${err.message}`);

    // the reason of the error, for example "xhr poll error"
    console.log(err.message);

    // some additional description, for example the status code of the initial HTTP response
    console.log(err.description);

    // some additional context, for example the XMLHttpRequest object
    // console.log(err.context);
});

socket.on('connect_timeout', () => {
    console.error('Connection Timeout');
});

// socket.on('disconnect', () => {
//     console.log('Socket disconnected');
// });

export default socket;
