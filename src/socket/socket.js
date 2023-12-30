import io from "socket.io-client";

let socket =null;

export const connect=()=>{
    socket=io("http://localhost:5001",{
        reconnection: true,      // 자동 재연결 활성화
        reconnectionDelay: 10000, // 재연결 시도 간의 지연 시간 (밀리초)
        reconnectionAttempts: 10 // 최대 재연결 시도 횟수
    });
}

export const disconnect=()=>{
    socket.disconnect();
    socket=null;
}

export const getSocket=()=>{
    return socket;
}