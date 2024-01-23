import React,{useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderSearchBar from "../../components/HeaderSearchBar/HeaderSearchBar";
import CreateRoomModal from "../../components/CreateRoomModal/CreateRoomModal";
import ImgGroup from "../../components/ImgGroup/ImgGroup";

// 채팅창 목록
const RoomListPage=({roomList,friendList,user,socket,})=>{
    const token=localStorage.getItem('jwtToken');
    const [rooms,setRooms]=useState(roomList);
    const navigate=useNavigate("");
    const [createRoomModalisOpen,setCreateRoomModalisOpen]=useState(false);
    useEffect(()=>{
        setRooms(roomList);

    },[roomList]);

    const formatRoomName=(roomName)=>{
        const filterNameArr=roomName.split(",")
                              .filter(name=>name!==user.name && name!=="");
        
        const filterRoomName=filterNameArr.join(",");

        return filterRoomName?.length>15?filterRoomName.slice(0,15)+"...":filterRoomName
    }

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
                            <strong>{formatRoomName(room.roomName)}</strong>
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