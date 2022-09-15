import { io } from 'socket.io-client';

const socket = io('ws://10.32.60.13:4000');
console.log(socket);
export default socket;
