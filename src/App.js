import "./App.css";
import socket from "./server";
import { useEffect,useState } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ChatPage from "./pages/Chatpage/Chatpage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
function App() {
  const [user,setUser]=useState(null);
  const [room,setRoom]=useState([]);

  useEffect(()=>{
    socket.on("rooms",(res)=>{
      setRoom(res);
    });
    askUserName();
  },[]);

  const askUserName=()=>{
    const userName=prompt("이름 ");

    socket.emit("login",userName,(res)=>{
      if(res?.ok){
        setUser(res.data);
      };
    });
    };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<RoomListPage rooms={room}/>}/>
        <Route exact path="/room/:id" element={<ChatPage user={user}/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;