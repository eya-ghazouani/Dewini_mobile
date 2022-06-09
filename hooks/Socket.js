import io from "socket.io-client";
const sockets = io('http://192.168.43.49:3000');
export default sockets;
