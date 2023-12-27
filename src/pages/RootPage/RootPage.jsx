import React,{useEffect,useState} from "react";
import CurrentView from "../../enums/CurrentView";
import { Container,Row,Col ,Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListPage from "../RoomListPage/RoomListPage";
import FriendListPage from "../FriendListPage/FriendListPage";
const RootPage=()=>{
    const [currentView,setCurrentView]=useState(CurrentView.friendList);
    const [friendList,setFriendList]=useState([]);
    const [roomList,setRoomList]=useState([]);


    return(
        <Container fluid>
            <Row>
                <Col md={2} className="sidebar">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link onClick={()=>setCurrentView(CurrentView.friendList)}>친구목록</Nav.Link>
                        <Nav.Link onClick={()=>setCurrentView(CurrentView.roomList)}>채팅방 목록</Nav.Link>
                    </Nav>  
                </Col>

                <Col md={10} className="content">
                    {currentView===CurrentView.roomList && <RoomListPage/>}
                    {currentView===currentView.friendList && <FriendListPage/>}
                </Col>
            </Row>
        </Container>
    )   
}

export default RootPage;