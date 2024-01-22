import React,{useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderSearchBar from "../../components/HeaderSearchBar/HeaderSearchBar";
import CreateRoomModal from "../../components/CreateRoomModal/CreateRoomModal";
import ImgGroup from "../../components/ImgGroup/ImgGroup";

// 채팅창 목록
const RoomListPage=({roomList,friendList,socket})=>{
    const token=localStorage.getItem('jwtToken');
    const [rooms,setRooms]=useState(roomList);
    const navigate=useNavigate("");
    const [createRoomModalisOpen,setCreateRoomModalisOpen]=useState(false);
    useEffect(()=>{
        setRooms(roomList);

    },[roomList]);


    return (
        <div className="room-body mt-3">
            <HeaderSearchBar title="채팅 ▼" allData={roomList} setSearchResult={rooms}>
            <div>메렁</div>
            <div>
            <button onClick={()=>setCreateRoomModalisOpen(true)}>채팅방 생성</button>
            </div>
            </HeaderSearchBar>
            <CreateRoomModal token={token} friendList={friendList} 
                            createRoomModalisOpen={createRoomModalisOpen}
                            socket={socket}
                            onClose={()=>setCreateRoomModalisOpen(false)}
                            />
            {rooms?.length > 0 ? (
                rooms.map((room) => (
                    <div className="room-list" key={room._id} onClick={() => window.electron.send("open-chat-room",room._id)}>
                        <ImgGroup members={room.members}/>
                        <div className="room-title">
                            {/* <img src="/profile.jpeg"/> */}
                            <strong>{room.roomName?.length>15?room.roomName.slice(0,15)+"...":room.roomName}</strong>
                        </div>
                        <div>{room.chat}</div>
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