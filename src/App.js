import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ChatPage from "./pages/Chatpage/Chatpage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import CreateRoomPage from "./pages/CreateRoom/CreateRoomPage";
import UserSearchPage from "./pages/UserSearchPage/UserSearchPage";
import RootPage from "./pages/RootPage/RootPage";
import { useEffect } from "react";
function App() {


  
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/" element={<LoginPage/>}/>
      <Route  path="/join" element={<JoinPage/>}/>
      <Route  path="home" element={<RootPage/>}/>
      <Route  path="room/:roomId" element={<ChatPage/>}/>
      <Route  path="createRoom" element={<CreateRoomPage/>}/>
      <Route  path="user/search" element={<UserSearchPage/>}/>
      
      </Routes>
    </BrowserRouter>

  );
}

export default App;
