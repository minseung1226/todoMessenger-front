import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ChatPage from "./pages/Chatpage/Chatpage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import RootPage from "./pages/RootPage/RootPage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage/ProfileUpdatePage";
function App() {


  
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/" element={<LoginPage/>}/>
      <Route  path="/join" element={<JoinPage/>}/>
      <Route  path="home" element={<RootPage/>}/>
      <Route  path="room/:roomId" element={<ChatPage/>}/>
      <Route path="user/update" element={<ProfileUpdatePage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
