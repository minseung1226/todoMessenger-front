import React, { useEffect, useRef, useState } from "react";
import CurrentView from "../../enums/CurrentView";
import { Container, Row, Col, Dropdown, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListPage from "../RoomListPage/RoomListPage";
import FriendListPage from "../FriendListPage/FriendListPage";
import "./RootPageStyle.css";
import { getSocket, disconnect } from "../../socket/socket";
import { Route, Routes, useNavigate } from "react-router-dom";
import RoomType from "../../enums/RoomType";
import CreateRoomModal from "../../components/CreateRoomModal/CreateRoomModal";
import UserSearchModal from "../../components/UserSearchModal/UserSearchModal";
import ChatPage from "../Chatpage/Chatpage";
import CustomCalendar from "../../components/Calendar/CustomCalendar";
const RootPage = () => {
    const [currentView, setCurrentView] = useState(CurrentView.friendList);
    const [friendList, setFriendList] = useState([]);
    const [newFriendList, setNewFriendList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [user, setUser] = useState("");
    const token = localStorage.getItem("jwtToken");
    const socket = getSocket(token);
    let timeoutId = useRef(null);
    const server_url = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate("");
    const [friendImg, setFriendImg] = useState("/friend.png");
    const [roomImg, setRoomImg] = useState("/room.png");
    const [roomType, setRoomType] = useState(RoomType.calendar);
    const [createRoomModalisOpen, setCreateRoomModalisOpen] = useState(false);
    const [userSearchModalIsOpen, setUserSearchModalIsOpen] = useState(false);
    // user를 offline으로 바꾸고 localStorage 비우기
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            logout();
        });

        return () => {
            window.removeEventListener('beforeunload', () => {
                logout();
            });
        };
    }, []);

    //친구 조회 
    const getFriendList = () => {
        socket.emit("friendList", token, (res) => {
            setFriendList(res.friendList);
        });
    }

    const getRoomList = () => {
        socket.emit("roomList", token, (res) => {
            setRoomList(res.chatRoomListInfo);

        })
    }

    //채팅방이 생성되었을 때 채팅방 받기
    useEffect(() => {
        socket.on("messageAlert", (res) => {
            window.electron.send("message-alert", res._id);
        })
        socket.on("refreshRoomList", () => {
            getRoomList();
        })

        socket.on("refreshUser", async () => {

            socket.emit("findUser", token, (res) => {
                setUser({ ...res.user });
            })
        })

        socket.emit("findUser", token, (res) => {
            setUser(res.user);
        })

        socket.on("openRoom", async (roomId) => {
            navigate(`/home/${roomId}`);
        })

    }, [socket])

    //5분에 한번씩 친구 조회
    useEffect(() => {
        getFriendList();

        const interval = setInterval(() => {
            getFriendList();
        }, 360000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

        // 채팅방 조회
        getRoomList();

        //친구 추가 시 server에서 보내는 데이터 newFriendList에 추가
        socket.on("newFriend", (data) => {
            setNewFriendList(prevFriends => [...prevFriends, data.newFriend]);
            getFriendList();

            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            //5분뒤 데이터 초기화
            timeoutId.current = setTimeout(() => {
                setNewFriendList([]);
            }, 360000)
        });

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }

    }, [socket, token]);

    const logout = () => {
        fetch(`${server_url}/logout`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        }).then(res => res.json())
            .then(res => {
                localStorage.removeItem("jwtToken");
                disconnect();
                navigate("/");
            });


    }

    //img 변경
    useEffect(() => {
        if (currentView === CurrentView.roomList) {
            setRoomImg("/clickRoom.png");
            setFriendImg("/friend.png");
        } else {
            setRoomImg("/room.png");
            setFriendImg("/clickFriend.png");
        }
    }, [currentView]);

    const div_btn_className = (room_type) => {
        return roomType === room_type ?
            "div-btn is-active" : "div-btn"
    }
    return (
        <Container fluid className="root-container">

            <Row >
                <Col xs={6} className="friend-list-col">
                    <FriendListPage friendList={friendList}
                        newFriendList={newFriendList} user={user}
                        socket={socket} />
                </Col>

                <Col className="right-col">
                    <div className="header-bar">
                        <div>
                            <span
                                className={div_btn_className(RoomType.calendar)}
                                onClick={() => {
                                    setRoomType(RoomType.calendar);
                                    navigate("/home")
                                }}>
                                캘린더</span>
                            <span
                                className={div_btn_className(RoomType.all_room)}
                                onClick={() => {
                                    setRoomType(RoomType.all_room);
                                    navigate("/home/rooms")
                                }}>
                                전체 채팅</span>

                            <span className={div_btn_className(RoomType.normal_room)}
                                onClick={() => {
                                    setRoomType(RoomType.normal_room);
                                    navigate("/home/rooms")
                                }}>
                                일반 채팅</span>
                            <span className={div_btn_className(RoomType.group_room)}
                                onClick={() => {
                                    setRoomType(RoomType.group_room);
                                    navigate("/home/rooms")
                                }}>
                                그룹 채팅</span>
                        </div>
                        <div>
                            <span className="header-img-span">
                                <Image src="/roomPlus.png" className="icon-img room-plus-img"
                                    onClick={() => setCreateRoomModalisOpen(true)} /></span>
                            <span className="header-img-span">
                                <Image src="/friendPlus.png"
                                    className="friend-plus icon-img"
                                    onClick={() => setUserSearchModalIsOpen(true)} /></span>
                            <span className="header-img-span">

                                <Dropdown
                                    id="basic-nav-dropdown">
                                    <Dropdown.Toggle style={{ padding: 0, border: 'none', backgroundColor: 'transparent' }}>
                                        <Image src="/moreOption.png" className="icon-img menu-img" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => window.electron.send("profile-update")}>프로필 변경</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
                                    </Dropdown.Menu>

                                </Dropdown>
                            </span>
                        </div>





                    </div>

                    <UserSearchModal token={token} socket={socket}
                        userSearchModalIsOpen={userSearchModalIsOpen}
                        onClose={() => setUserSearchModalIsOpen(false)} />

                    <CreateRoomModal token={token} friendList={friendList}
                        createRoomModalisOpen={createRoomModalisOpen}
                        socket={socket}
                        onClose={() => setCreateRoomModalisOpen(false)}
                    />
                    <Routes>
                        <Route path="" element={<CustomCalendar />} />
                        <Route path="rooms" element={<RoomListPage roomList={roomList}
                            friendList={friendList}
                            user={user}
                            socket={socket}
                            roomType={roomType} />} />
                        <Route path=":roomId" element={<ChatPage />} />
                    </Routes>


                </Col>
            </Row>



        </Container>
    )
}

export default RootPage;