import React,{useEffect,useState} from "react";
import {Button} from "@mui/base/Button"
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import "./ChatPageStyle.css"
import {useParams,useNavigate} from "react-router-dom"
import { getSocket } from "../../socket/socket";
const ChatPage=()=>{
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=sessionStorage.getItem("jwtToken");
    const [user,setUser]=useState('');
    const [messageList,setMessageList]=useState([]);
    const [message,setMessage]=useState("");
    const {roomId}=useParams();
    const navigate=useNavigate();
    const socket=getSocket();
    useEffect(()=>{
        socket.emit("getAllChatsAndUser",roomId,token,(res)=>{
            setUser(res.user);
            setMessageList(res.chats);
        });

        socket.on("message",(res)=>{
            console.log("메시지 받기 완료 res=",res)
            setMessageList((prevState)=>prevState.concat(res));
        });


    },[]);



    const sendMessage=(event)=>{
      event.preventDefault();
      
      socket.emit("sendMessage",message,roomId,(res)=>{
            console.log("메시지 전송 시작 message=",message)
            if(!res.ok){
                console.log("error message=",res.error);
            }
            setMessage("");
        })
    }

    const leaveRoom=()=>{
        navigate("/hoom");
    }

    return(
        <div>
        <div className="App">
        {/* nav 이부분 추가  */}
            <nav>
              <Button onClick={leaveRoom} className='back-button'>←</Button>
              <div className='nav-user'>{user.name}</div>
            </nav>
          <div>
            {messageList.length > 0 ? (
              <MessageContainer messageList={messageList} user={user} />
            ) : null}
          </div>
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    );
}

export default ChatPage;