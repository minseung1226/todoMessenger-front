import React,{useEffect,useState,useRef} from "react";
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import "./ChatPageStyle.css"
import {useParams,useNavigate} from "react-router-dom"
import { getSocket } from "../../socket/socket";
import { Dropdown,Image } from "react-bootstrap";
import AlertOkModal from "../../components/AlertOkModal/AlertOkModal";
const ChatPage=()=>{

    const token=localStorage.getItem("jwtToken");
    const [roomName,setRoomName]=useState("");
    const [user,setUser]=useState('');
    const [messageList,setMessageList]=useState([]);
    const [message,setMessage]=useState("");
    const {roomId}=useParams();
    const navigate=useNavigate();
    const socket=getSocket(token);
    const messagesEndRef = useRef(null);

    const [alertIsOpen,setAlertIsOpen]=useState(false);

    const leaveRoom=()=>{
      socket.emit("leaveRoom",token,roomId,(res)=>{
        setAlertIsOpen(false);
        window.electron.closeWindow();
      })
    }


    useEffect(()=>{
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messageList])
    useEffect(()=>{
        socket.emit("getAllChatsAndUser",roomId,token,(res)=>{
          console.log("res=",res);
            setUser(res.user);
            setMessageList(res.chats);
            setRoomName(res.roomName.roomName);
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

    const formatRoomName = (roomName) => {
      const filterNameArr = roomName.split(",")
          .filter(name => name !== user.name && name !== "");

      const filterRoomName = filterNameArr.join(",");

      return filterRoomName?.length > 15 ? filterRoomName.slice(0, 15) + "..." : filterRoomName
  }
    return(
        <div>
        <div className="room-container">
        {/* nav 이부분 추가  */}
            <nav>
               <div className='nav-title'><strong>{formatRoomName(roomName)}</strong></div>

               <div>
               <Dropdown>
                  <Dropdown.Toggle as="div">
                      <Image src="/menu.png" className="menu-img"></Image>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <div onClick={()=>setAlertIsOpen(true)}>채팅방 나가기</div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
               </div>
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


        <AlertOkModal message="채팅방을 나가시겠습니까?"
                      isOpen={alertIsOpen}
                      onClose={()=>setAlertIsOpen(false)}
                      success={leaveRoom}/>
      </div>
    );
}

export default ChatPage;