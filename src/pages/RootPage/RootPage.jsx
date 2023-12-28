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
    const socket=getSocket;
    const token=sessionStorage.getItem("jwtToken");
    useEffect(()=>{
        socket.emit("friendList",token,(res)=>{
            setFriendList(res);
        })
        // const url=new URL(`${server_url}/friends`);
        // url.searchParams.append("friendName",friendInput);
        // fetch(url,{
        //     method:"get",
        //     headers:{
        //         "Content-type":"application/json",
        //         "Authorization":`Bearer ${token}`
        //     }
        // }).then(res=>res.json())
        // .then(data=>setFriendList(data.friends))
        // .catch(err=>console.log(err));
    },[friendList])

    useEffect(()=>{
        
    },[roomList]);
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
                {currentView===CurrentView.friendList && <FriendListPage/>}
                    {currentView===CurrentView.roomList && <RoomListPage/>}
                    
                </Col>
            </Row>
        </Container>
    )   
}

export default RootPage;