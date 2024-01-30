import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderSearchBar from "../../components/HeaderSearchBar/HeaderSearchBar";
import CreateRoomModal from "../../components/CreateRoomModal/CreateRoomModal";
import ImgGroup from "../../components/ImgGroup/ImgGroup";
import { Image } from "react-bootstrap";
import RoomType from "../../enums/RoomType";
import SearchInput from "../../components/searchInput/SearchInput";

// 채팅창 목록
const RoomListPage = ({ roomList, friendList, user, socket,roomType }) => {
    const token = localStorage.getItem('jwtToken');
    const [rooms, setRooms] = useState(roomList);
    const [filterRooms,setFilterRooms]=useState("");
    const navigate = useNavigate("");
    const [createRoomModalisOpen, setCreateRoomModalisOpen] = useState(false);
    useEffect(() => {
        
        if(roomList.length<1 || roomType===RoomType.all_room){
            setRooms(roomList);
            return ;
        }
        else if(roomType===RoomType.group_room){
            setRooms(roomList.filter(room=>room?.members?.length>=2));
        }else{
            setRooms(roomList.filter(room=>room?.members?.length<=1));
        }
        

    }, [roomList,roomType]);

    useEffect(()=>{
        setFilterRooms(rooms);
    },[rooms])

    const formatRoomName = (roomName) => {
        const filterNameArr = roomName.split(",")
            .filter(name => name !== user.name && name !== "");

        const filterRoomName = filterNameArr.join(",");

        return filterRoomName?.length > 15 ? filterRoomName.slice(0, 15) + "..." : filterRoomName
    }

    return (
        <div className="room-body">
            <SearchInput allData={rooms} setSearchResult={setFilterRooms}/>
            {/* <div>
                    <Image src="/roomPlus.png" className="icon-img room-plus-img"
                        onClick={() => setCreateRoomModalisOpen(true)} />

                </div>
            <CreateRoomModal token={token} friendList={friendList}
                createRoomModalisOpen={createRoomModalisOpen}
                socket={socket}
                onClose={() => setCreateRoomModalisOpen(false)}
            /> */}
            {filterRooms?.length > 0 ? (
                filterRooms.map((room) => (
                    <div className="room-list" key={room._id} onDoubleClick={() => window.electron.send("open-chat-room", room._id)}>
                        <ImgGroup members={room.members} />
                        <div className="room-content">
                            <div className="room-title">
                                {/* <img src="/profile.jpeg"/> */}
                                <strong>{formatRoomName(room.name)}</strong>
                                <span className="user-count">{room?.members?.length}</span>
                            </div>
                            <div className="room-chat">{room.chat}</div>
                        </div>
                        {/* <div className="member-number">{room?.members?.length}</div> */}
                    </div>
                ))
            ) : (
                <div>No rooms available.</div>
            )}
        </div>
    );
};

export default RoomListPage;