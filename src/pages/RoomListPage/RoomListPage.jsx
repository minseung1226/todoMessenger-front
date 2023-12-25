import React,{useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import { getSocket } from "../../socket/socket";
// 채팅창 목록
const RoomListPage=()=>{
    const server_url=process.env.REACT_APP_SERVER_URL
    const token=sessionStorage.getItem('jwtToken');
    const [rooms,setRooms]=useState([]);
    const navigate=useNavigate("");
    const socket=getSocket();

    useEffect(()=>{
        fetch(`${server_url}/rooms`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
                ,"Authorization":`Bearer ${token}`
            },
            
        }).then(res=>res.json())
        .then(data=>{
            console.log("room=",data);
            setRooms(data.chatRoomsInfo);
        })
        .catch(err=>console.log(err.message));
    },[token,server_url])

    const moveToChat=(rid)=>{
        navigate(`/room/${rid}`);
    };

    return (
        <div className="room-body">
            <div className="room-nav">채팅 ▼</div>
            <button onClick={()=>navigate("/createRoom")}>채팅방 생성</button>
            <button onClick={()=>navigate("/friends")}>친구목록</button>

            
            {rooms?.length > 0 ? (
                rooms.map((room) => (
                    <div className="room-list" key={room._id} onClick={() => moveToChat(room._id)}>
                        <div className="room-title">
                            {/* <img src="/profile.jpeg"/> */}
                            <p>{room.roomName?
                            room.roomName:room.members
                                                    .slice(0,3)
                                                    .map(members=>members.name)
                                                    .join(`, `)
                                                    +(room.members.length>3?`...`:"")}</p>
                        </div>
                        <div className="member-number">{room?.members?.length}</div>
                    </div>
                ))
            ) : (
                <div>No rooms available.</div>
            )}
        </div>
    );
};

export default RoomListPage;