import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ChatPage from "./pages/Chatpage/Chatpage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import RootPage from "./pages/RootPage/RootPage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage/ProfileUpdatePage";
import MessageAlertWindow from "./pages/MessageAlertWindow/MessageAlertWindow";
import Test1 from "./test/Test1";
import Test2 from "./test/Test2";
function App() {


  
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/" element={<LoginPage/>}/>
      <Route  path="/join" element={<JoinPage/>}/>
      <Route  path="/home" element={<RootPage/>}/>
      <Route  path="/room/:roomId" element={<ChatPage/>}/>
      <Route path="/user/update" element={<ProfileUpdatePage/>}/>
      <Route path="/message/:chatId" element={<MessageAlertWindow/>}/>
      <Route path="/test1" element={<Test1/>}/>
      <Route path="/test2/*" element={<Test2/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
