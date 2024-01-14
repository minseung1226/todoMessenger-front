import io from "socket.io-client";

let socket =null;

export const connect=(token)=>{
    socket=io("http://localhost:5001");
    socket.on("connect",()=>{
        socket.emit("userIdJoin",token);
    })
    
}

export const disconnect=()=>{
    socket.disconnect();
    socket=null;
}


export const getSocket=(token)=>{
    if(!socket){
        connect(token);
    }
    return socket;
}