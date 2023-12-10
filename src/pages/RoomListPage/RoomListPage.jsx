import React,{useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import CreateChatModal from "../../components/CreateChatModal/CreateChatModal";
import { getSocket } from "../../socket/socket";
// 채팅창 목록
const RoomListPage=()=>{
    const server_url=process.env.REACT_APP_SERVER_URL
    const token=sessionStorage.getItem('jwtToken');
    const [rooms,setRooms]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const socket=getSocket();

    const createRoom=(roomName)=>{
        
        socket.emit(`createRoom`,token,roomName,(res)=>{
            if(res.ok){
                navigate(`/room/${res.roomId}`);
            }else{
                console.log("err=",res.err);
            }
        })
        
    }

    useEffect(()=>{
        fetch(`${server_url}/rooms`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
                ,"Authorization":`Bearer ${token}`
            },
            
        }).then(res=>res.json())
        .then(data=>{

            setRooms(data.rooms);
        })
        .catch(err=>console.log(err.message));
    },[token,server_url])
    
    
    const navigate=useNavigate();

    const moveToChat=(rid)=>{
        navigate(`/room/${rid}`);
    };

    return(
        <div className="room-body">
            <div className="room-nav">채팅 ▼</div>
            <button onClick={()=>setShowModal(true)}>채팅방 생성</button>
            <CreateChatModal show={showModal}
                             onClose={()=>setShowModal(false)}
                             onCreate={createRoom}/>
            {rooms.length>0
                ?rooms.map((room)=>(
                    <div
                        className="room-list"
                        key={room._id}
                        onClick={()=>moveToChat(room._id)}
                    >
                        <div className="room-title">
                            {/* <img src="/profile.jpeg"/> */}
                            <p>{room.roomName}</p>
                        </div>
                        <div className="member-number">{room.members.length}</div>
                    </div>

                ))
            :null}
        </div>
    );
};

export default RoomListPage;