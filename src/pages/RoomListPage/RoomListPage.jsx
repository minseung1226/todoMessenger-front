import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImgGroup from "../../components/ImgGroup/ImgGroup";
import RoomType from "../../enums/RoomType";
import SearchInput from "../../components/searchInput/SearchInput";

// 채팅창 목록
const RoomListPage = ({ roomList, user, roomType }) => {
    const [rooms, setRooms] = useState(roomList);
    const [filterRooms, setFilterRooms] = useState("");
    const navigate = useNavigate("");
    useEffect(() => {

        if (roomList.length < 1 || roomType === RoomType.all_room) {
            setRooms(roomList);
            return;
        }
        else if (roomType === RoomType.group_room) {
            setRooms(roomList.filter(room => room?.members?.length >= 2));
        } else {
            setRooms(roomList.filter(room => room?.members?.length <= 1));
        }


    }, [roomList, roomType]);

    useEffect(() => {
        setFilterRooms(rooms);
    }, [rooms])

    const formatRoomName = (roomName) => {
        const filterNameArr = roomName.split(",")
            .filter(name => name !== user.name && name !== "");

        const filterRoomName = filterNameArr.join(",");

        return filterRoomName?.length > 15 ? filterRoomName.slice(0, 15) + "..." : filterRoomName
    }

    const formatChat=(chat)=>{
        if(!chat) return;
        return chat?.length>20?chat.slice(0,20)+"...":chat.slice(0,20)
    }

    return (
        <div className="room-body">
            <SearchInput allData={rooms} setSearchResult={setFilterRooms} />

            <div className="room-list">
                {filterRooms?.length > 0 ? (
                    filterRooms.map((room) => (
                        <div className="room" key={room._id} onDoubleClick={() => navigate(`/home/${room._id}`)}>
                            <ImgGroup members={room.members} />
                            <div className="room-content">
                                <div className="room-title">
                                    <strong>{formatRoomName(room.name)}</strong>
                                    <span className="user-count">{room?.members?.length}</span>
                                </div>
                                <div className="room-chat">{formatChat(room.chat)}</div>
                            </div>
                            {room?.unreadCount>0&&
                            <div className="circle">
                                {room.unreadCount}
                                </div>}
                        </div>
                    ))
                ) : (
                    <div>No rooms available.</div>
                )}
            </div>
        </div>
    );
};

export default RoomListPage;