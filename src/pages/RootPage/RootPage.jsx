import React,{useEffect,useState} from "react";
import CurrentView from "../../enums/CurrentView";
import { Container,Row,Col ,Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListPage from "../RoomListPage/RoomListPage";
import FriendListPage from "../FriendListPage/FriendListPage";
import "./RootPageStyle.css";
import { getSocket } from "../../socket/socket";
const RootPage=()=>{
    const [currentView,setCurrentView]=useState(CurrentView.friendList);
    const [friendList,setFriendList]=useState([]);
    const [roomList,setRoomList]=useState([]);
    const socket=getSocket();
    const token=localStorage.getItem("jwtToken");
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.clear();
        });
    
        return () => {
            window.removeEventListener('beforeunload', () => {
                localStorage.clear();
            });
        };
    }, []);

    useEffect(()=>{
        socket.emit("friendList",token,(res)=>{
            console.log("friendList=",res.friendList);
            setFriendList(res.friendList);
        });
        
        socket.emit("roomList",token,(res)=>{
            setRoomList(res.chatRoomListInfo);

        })
    },[socket,token]);

    useEffect(()=>{
        console.log("useEffect friendList=",friendList);
    },[friendList]);
    return(
        <Container fluid>
            <Row>
                <Col md={2} className="sidebar">
                    <Nav className="flex-column">
                        <Nav.Link onClick={()=>setCurrentView(CurrentView.friendList)}>친구목록</Nav.Link>
                        <Nav.Link onClick={()=>setCurrentView(CurrentView.roomList)}>채팅방 목록</Nav.Link>
                    </Nav>  
                </Col>

                <Col md={10} className="content">
                {currentView===CurrentView.friendList && <FriendListPage friendList={friendList}/>}
                    {currentView===CurrentView.roomList && <RoomListPage roomList={roomList}/>}
                    
                </Col>
            </Row>
        </Container>
    )   
}

export default RootPage;