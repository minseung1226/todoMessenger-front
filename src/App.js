import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import RootPage from "./pages/RootPage/RootPage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage/ProfileUpdatePage";
import MessageAlertWindow from "./pages/MessageAlertWindow/MessageAlertWindow";

function App() {


  
  return (
    <BrowserRouter>
      <Routes>
      <Route  path="/" element={<LoginPage/>}/>
      <Route  path="/join" element={<JoinPage/>}/>
      <Route  path="/home/*" element={<RootPage/>}/>
      <Route path="/user/update" element={<ProfileUpdatePage/>}/>
      <Route path="/message/:chatId" element={<MessageAlertWindow/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
