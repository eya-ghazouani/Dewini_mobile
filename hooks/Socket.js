import io from "socket.io-client";
const sockets = io('http://192.168.43.49:4000');
export default sockets;
