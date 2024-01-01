import io from "socket.io-client";

let socket =null;

export const connect=()=>{
    socket=io("http://localhost:5001");
}

export const disconnect=()=>{
    socket.disconnect();
    socket=null;
}

export const getSocket=()=>{
    if(!socket){
        socket=io("http://localhost:5001");
    }
    return socket;
}