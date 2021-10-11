import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io(`${process.env.REACT_APP_WS_SERVER as string}`, {
  transports: ['websocket', 'polling'],
});
export const SocketContext = createContext({} as Socket);
