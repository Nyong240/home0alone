import React from "react"
import socketio from "socket.io-client";


export const flask_adress = '172.30.1.46';
export const socket = socketio.connect("http://localhost:3001/");
export const SocketContext = React.createContext();