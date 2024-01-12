import { ListGroup, Image, Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../socket/socket";
import "../../styles/common.css"
import "./CreateRoomModal.css";
import HeaderSearchBar from "../HeaderSearchBar/HeaderSearchBar";
import SearchInput from "../searchInput/SearchInput";

const CreateRoomModal = ({ token, friendList, createRoomModalisOpen, onClose }) => {
    const [checkedState, setCheckedState] = useState({});
    const server_url = process.env.REACT_APP_SERVER_URL;
    const socket = getSocket(token);
    const navigate = useNavigate("");
    const [friends,setFriends]=useState([]);

    useEffect(()=>{
        console.log(friendList);
        setFriends(friendList);
    },[friendList]);

    const handleCheckboxChange = (friendId) => {
        setCheckedState(prevState => ({
            ...prevState,
            [friendId]: !prevState[friendId]
        }));
    };

    const handleSubmit = () => {

        const selectFriendId = friends.filter(friend => checkedState[friend._id]);

        socket.emit("createChatRoom",token,selectFriendId,(res)=>{
            if(res.ok){
                setCheckedState({});
                window.electron.send("open-chat-room",res.roomId);
                onClose();
            }
        })
    }
        

    return (
        <div>
            <Modal show={createRoomModalisOpen} onHide={onClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <div className="title"><strong>대화상대 선택</strong></div>
                </Modal.Header>

                <Modal.Body className="modal-body">
                <SearchInput allData={friendList} setSearchResult={setFriends}/>
                    <ListGroup className="friend-list">
                        {friends&&friends.map((friend, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-center no-border"
                                onClick={() => handleCheckboxChange(friend._id)}>
                               
                                    <Image src="/profile.jpeg" className="profile-img" roundedCircle />
                                    <div className="flex-grow-1 ml-2">
                                        <div><strong>{friend.name}</strong></div>
                                    </div>
                                
                                <div className="flex-shrink-0">
                                <input
                                    className="ml-auto"
                                    type="checkbox"
                                    value={friend._id}
                                    checked={checkedState[friend._id] || false}
                                    onChange={() => { }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-dark" onClick={onClose}>닫기</Button>
                    <Button onClick={handleSubmit} variant="outline-dark">확인</Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
}


export default CreateRoomModal;