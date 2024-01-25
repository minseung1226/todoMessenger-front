import React,{useEffect,useState,useRef} from "react";
import {Button} from "@mui/base/Button"
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import "./ChatPageStyle.css"
import {useParams,useNavigate} from "react-router-dom"
import { getSocket } from "../../socket/socket";
const ChatPage=()=>{

    const token=localStorage.getItem("jwtToken");
    const [user,setUser]=useState('');
    const [messageList,setMessageList]=useState([]);
    const [message,setMessage]=useState("");
    const {roomId}=useParams();
    const navigate=useNavigate();
    const socket=getSocket(token);
    const messagesEndRef = useRef(null);


    useEffect(()=>{
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messageList])
    useEffect(()=>{
        socket.emit("getAllChatsAndUser",roomId,token,(res)=>{
            setUser(res.user);
            setMessageList(res.chats);
        });

        socket.on("message",(res)=>{
            setMessageList((prevState)=>prevState.concat(res));
        });


    },[roomId,token,socket]);



    const sendMessage=(event)=>{
      event.preventDefault();
      
      socket.emit("sendMessage",message,roomId,token,(res)=>{
            if(!res.ok){
                console.log("error message=",res.error);
            }
            setMessage("");
        })
    }


    return(
        <div>
        <div className="room-container">
        {/* nav 이부분 추가  */}
            <nav>
               <div className='nav-user'>{user.name}</div>
            </nav>
          <div className="message-view-container">
            {messageList?.length > 0 ? (
              <MessageContainer messageList={messageList} user={user} />
            ) : null}
           <div ref={messagesEndRef} />
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