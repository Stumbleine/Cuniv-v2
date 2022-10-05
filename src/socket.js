import { io } from 'socket.io-client';

const socket = io('ws://192.168.88.205:4000');
export default socket;
