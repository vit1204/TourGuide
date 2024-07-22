import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://51.79.173.117:3000'; // Replace with your server URL
// const socket = io(SOCKET_URL);
const socket : Socket = io(SOCKET_URL);

export default socket;
