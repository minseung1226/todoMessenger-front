import React, { useEffect, useRef, useState } from "react";
import CurrentView from "../../enums/CurrentView";
import { Container, Row, Col, Nav, NavDropdown, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListPage from "../RoomListPage/RoomListPage";
import FriendListPage from "../FriendListPage/FriendListPage";
import "./RootPageStyle.css";
import { getSocket, disconnect } from "../../socket/socket";
import { useNavigate } from "react-router-dom";
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

    //채팅방이 생성되었을 때 채팅방 받기
    useEffect(() => {
        socket.on("newRoom", (res) => {

            setRoomList(prevRoomList => [res, ...prevRoomList]);
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
        socket.emit("roomList", token, (res) => {
            setRoomList(res.chatRoomListInfo);

        })

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
    return (
        <Container fluid className="mainContainer">
            <Row>
                <Col md={2} xs={2} className="sidebar">
                    <Nav className="flex-column">
                        <Nav.Link onClick={() => setCurrentView(CurrentView.friendList)}>친구목록</Nav.Link>
                        <Nav.Link onClick={() => setCurrentView(CurrentView.roomList)}>채팅방 목록</Nav.Link>
                        <NavDropdown title="더보기" id="basic-nav-dropdown" className="custom-dropdown-menu">

                            <NavDropdown.Item onClick={() => window.electron.send("profile-update")}>프로필 변경</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Col>

                <Col md={10} xs={10} className="content">
                    {currentView === CurrentView.friendList && <FriendListPage friendList={friendList}
                        newFriendList={newFriendList} user={user}
                        socket={socket} />}
                    {currentView === CurrentView.roomList && <RoomListPage roomList={roomList}
                        friendList={friendList}
                        socket={socket} />}

                </Col>
            </Row>
        </Container>
    )
}

export default RootPage;