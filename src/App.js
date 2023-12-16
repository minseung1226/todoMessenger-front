import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ChatPage from "./pages/Chatpage/Chatpage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import CreateRoomPage from "./pages/CreateRoom/CreateRoomPage";
function App() {



  
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<LoginPage/>}/>
      <Route exact path="/join" element={<JoinPage/>}/>
      <Route exact path="/rooms" element={<RoomListPage/>}/>
      <Route exact path="/room/:roomId" element={<ChatPage/>}/>
      <Route exact path="/createRoom" element={<CreateRoomPage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
