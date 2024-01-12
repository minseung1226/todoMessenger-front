import React,{useState,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";
import { getSocket } from "../../socket/socket";
import {Row,Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderSearchBar from "../../components/HeaderSearchBar/HeaderSearchBar";

// 채팅창 목록
const RoomListPage=({roomList})=>{
    const token=localStorage.getItem('jwtToken');
    const [rooms,setRooms]=useState(roomList);
    const navigate=useNavigate("");
    const socket=getSocket(token);

    useEffect(()=>{
        setRooms(roomList);
    },[roomList]);

    const moveToChat=(rid)=>{
        window.electron.send("open-chat-room",rid);
        //navigate(`/room/${rid}`);
    };

    return (
        <div className="room-body mt-3">
            <HeaderSearchBar title="채팅 ▼" allData={roomList} setSearchResult={rooms}>
            <div>메렁</div>
            <div>
            <button onClick={()=>window.electron.send("create-chat-room")}>채팅방 생성</button>
            </div>
            </HeaderSearchBar>
            {/* <Row>
                <Col md={6} className="d flex align-items-center">
            <h5>채팅 ▼</h5>
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center">

            <div>메렁</div>
            <div>
            <button onClick={()=>navigate("/createRoom")}>채팅방 생성</button>
            </div>
            </Col>
            </Row> */}
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