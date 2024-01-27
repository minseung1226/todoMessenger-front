import { ListGroup, Image, Modal, Button,Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../socket/socket";
import "../../styles/common.css"
import "./CreateRoomModal.css";
import HeaderSearchBar from "../HeaderSearchBar/HeaderSearchBar";
import SearchInput from "../searchInput/SearchInput";

const CreateRoomModal = ({ token, friendList, createRoomModalisOpen, onClose, socket }) => {
    const [checkedState, setCheckedState] = useState({});
    const server_url = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate("");
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        setFriends(friendList);
    }, [friendList]);

    const handleCheckboxChange = (friendId) => {
        setCheckedState(prevState => ({
            ...prevState,
            [friendId]: !prevState[friendId]
        }));

        console.log("checkedState=",checkedState)
    };

    useEffect(()=>{
        
        console.log("checkedState=",checkedState)
    },[checkedState])

    const handleSubmit = () => {

        const selectFriendId = friends.
            filter(friend => checkedState[friend._id])
            .map(friend => friend._id);
        socket.emit("createChatRoom", token, selectFriendId, (res) => {
            if (res.ok) {
                setCheckedState({});
                window.electron.send("open-chat-room", res.roomId);
                onClose();
            }
        })
    }

    const closeModal = () => {
        onClose();
        setCheckedState({});
    }


    return (
        <div>
            <Modal show={createRoomModalisOpen} onHide={closeModal} className="create-room-modal"
                backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <div className="title"><strong>대화상대 선택</strong></div>
                </Modal.Header>

                <Modal.Body className="modal-body">
                    <div className="search-input">
                    <SearchInput allData={friendList} setSearchResult={setFriends} />
                    </div>
                    <ListGroup className="friend-list">
                        {friends && friends.map((friend, index) => (
                            <ListGroup.Item key={friend._id} className="d-flex align-items-center no-border friend-profile"
                                onClick={() => handleCheckboxChange(friend._id)}>

                                <Image src="/profile.jpeg" className="profile-img" roundedCircle />
                                <div className="flex-grow-1 ml-2">
                                    <div><strong>{friend.name}</strong></div>
                                </div>

                                <div className="flex-shrink-0">
                                    <Form.Check aria-label="option 1"
                                        type="radio"
                                        className="ml-auto"
                                        value={friend._id}
                                        checked={checkedState[friend._id] || false}
                                        onChange={() => { }}
                                    />

                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-dark" onClick={closeModal}>닫기</Button>
                    <Button
                        onClick={handleSubmit} variant="outline-dark">확인</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}


export default CreateRoomModal;