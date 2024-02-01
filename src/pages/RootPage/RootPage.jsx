import React, { useEffect, useRef, useState } from "react";
import CurrentView from "../../enums/CurrentView";
import { Container, Row, Col, Nav, Dropdown, Image, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListPage from "../RoomListPage/RoomListPage";
import FriendListPage from "../FriendListPage/FriendListPage";
import "./RootPageStyle.css";
import { getSocket, disconnect } from "../../socket/socket";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import RoomType from "../../enums/RoomType";
import CreateRoomModal from "../../components/CreateRoomModal/CreateRoomModal";
import UserSearchModal from "../../components/UserSearchModal/UserSearchModal";
import WindowControl from "../../components/WindowControl/WindowControl";
import ChatPage from "../Chatpage/Chatpage";
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
    const [roomType, setRoomType] = useState(RoomType.all_room);
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
        socket.on("message", (res) => {
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
            console.log("여긴 오는디");
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
        <Container fluid >

                <Row className="root-container">
                    <Col xs={6} className="friend-list-col">
                        <FriendListPage friendList={friendList}
                            newFriendList={newFriendList} user={user}
                            socket={socket} />
                    </Col>

                    <Col className="right-col">
                        <div className="header-bar">
                            <div>
                                <span
                                    className={div_btn_className(RoomType.all_room)}
                                    onClick={() => {
                                        setRoomType(RoomType.all_room);
                                        navigate("/home")
                                    }}>
                                    전체 채팅</span>
                                <span className={div_btn_className(RoomType.normal_room)}
                                    onClick={() => {
                                        setRoomType(RoomType.normal_room);
                                        navigate("/home")
                                    }}>
                                    일반 채팅</span>
                                <span className={div_btn_className(RoomType.group_room)}
                                    onClick={() => {
                                        setRoomType(RoomType.group_room);
                                        navigate("/home")
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
                            <Route path="" element={<RoomListPage roomList={roomList}
                                friendList={friendList}
                                user={user}
                                socket={socket}
                                roomType={roomType} />} />
                            <Route path=":roomId" element={<ChatPage />} />
                        </Routes>
                        

                    </Col>
                </Row>
       


        </Container>
        // <Container fluid className="mainContainer">
        //     <Row>
        //         <Col  md={2} xs={2} className="sidebar">
        //             <Nav className="flex-column">
        //                 <Nav.Link onClick={() => setCurrentView(CurrentView.friendList)}
        //                           className={currentView===CurrentView.friendList?"click-color":""}
        //                           onMouseOver={()=>currentView===CurrentView.roomList&&setFriendImg("/clickFriend.png")}
        //                           onMouseOut={()=>currentView===CurrentView.roomList&&setFriendImg("/friend.png")}
        //                 >
        //                     <Image className="menu-img" 
        //                         src={friendImg}
        //                          />
        //                 </Nav.Link>
        //                 <Nav.Link onClick={() => setCurrentView(CurrentView.roomList)}
        //                 className={currentView===CurrentView.roomList?"click-color":""}
        //                 onMouseOver={()=>currentView===CurrentView.friendList&&setRoomImg("/clickRoom.png")}
        //                 onMouseOut={()=>currentView===CurrentView.friendList&&setRoomImg("/room.png")}
        //                 >
        //                 <Image className="menu-img" 
        //                         src={roomImg} />
        //                 </Nav.Link>

        //                 <NavDropdown title={<Image src="/moreOption.png" className="menu-img" />}
        //                  id="basic-nav-dropdown">

        //                     <NavDropdown.Item onClick={() => window.electron.send("profile-update")}>프로필 변경</NavDropdown.Item>
        //                     <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
        //                 </NavDropdown>
        //             </Nav>
        //         </Col>

        //         <Col  className="content">
        //             {currentView === CurrentView.friendList && <FriendListPage friendList={friendList}
        //                 newFriendList={newFriendList} user={user}
        //                 socket={socket} />}
        //             {currentView === CurrentView.roomList && <RoomListPage roomList={roomList}
        //                 friendList={friendList}
        //                 user={user}
        //                 socket={socket} />}

        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default RootPage;