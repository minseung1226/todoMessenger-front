import React,{useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import CreateChatModal from "../../components/CreateChatModal/CreateChatModal";
// 채팅창 목록
const RoomListPage=()=>{
    const server_url=process.env.REACT_APP_SERVER_URL
    const token=sessionStorage.getItem('jwtToken');
    const [rooms,setRooms]=useState([]);
    const [showModal,setShowModal]=useState(false);

    const createRoom=(roomName)=>{
        fetch(`${server_url}/createRoom`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                roomName:roomName,
            }),
        }).then(res=>res.json())
        .then(data=>{
            if(data.ok){
                navigate(`/room/${data.roomId}`);
            }else{
                console.log("Err=",data.error);
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
    })
    
    
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
                            <p>{room.room}</p>
                        </div>
                        <div className="member-number">{room.members.length}</div>
                    </div>

                ))
            :null}
        </div>
    );
};

export default RoomListPage;