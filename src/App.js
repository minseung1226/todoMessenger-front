import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ChatPage from "./pages/Chatpage/Chatpage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import CreateRoomPage from "./pages/CreateRoom/CreateRoomPage";
import UserSearchPage from "./pages/UserSearchPage/UserSearchPage";
import RootPage from "./pages/RootPage/RootPage";
import { SocketProvider } from "./socket/SocketProvider";
function App() {

  const isLoggenIn=()=>{
    const token=sessionStorage.getItem("jwtToken");

    return token;
  }


  
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<LoginPage/>}/>
      <Route exact path="/join" element={<JoinPage/>}/>

      {isLoggenIn()&&(
        <SocketProvider>
          <Route exact path="/home" element={<RootPage/>}/>
          <Route exact path="/room/:roomId" element={<ChatPage/>}/>
          <Route exact path="/createRoom" element={<CreateRoomPage/>}/>
          <Route exact path="/user/search" element={<UserSearchPage/>}/>
        </SocketProvider>
      )}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
