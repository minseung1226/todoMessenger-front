import React,{useEffect,useRef,useState} from "react";
import CurrentView from "../../enums/CurrentView";
import { Container,Row,Col ,Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListPage from "../RoomListPage/RoomListPage";
import FriendListPage from "../FriendListPage/FriendListPage";
import "./RootPageStyle.css";
import { getSocket } from "../../socket/socket";
import { logout } from "../../utils/method";
const RootPage=()=>{
    const [currentView,setCurrentView]=useState(CurrentView.friendList);
    const [friendList,setFriendList]=useState([]);
    const [newFriendList,setNewFriendList]=useState([]);
    const [roomList,setRoomList]=useState([]);
    const token=localStorage.getItem("jwtToken");
    const socket=getSocket(token);
    let timeoutId=useRef(null);

    
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
    const getFriendList=()=>{
        socket.emit("friendList",token,(res)=>{
            setFriendList(res.friendList);
        });
    }

    //5분에 한번씩 친구 조회
    useEffect(()=>{
        getFriendList();

        const interval=setInterval(() => {
            getFriendList();
        }, 360000);

        return ()=>clearInterval(interval);
    },[]);

    useEffect(()=>{

        // 채팅방 조회
        socket.emit("roomList",token,(res)=>{
            setRoomList(res.chatRoomListInfo);

        })

        //친구 추가 시 server에서 보내는 데이터 newFriendList에 추가
        socket.on("newFriend",(data)=>{
            setNewFriendList(prevFriends=>[...prevFriends,data.newFriend]);
            getFriendList();

            if(timeoutId.current){
                clearTimeout(timeoutId.current);
            }

            //5분뒤 데이터 초기화
            timeoutId.current=setTimeout(()=>{
                setNewFriendList([]);
            },360000)
          });

          return()=>{
            if(timeoutId.current){
                clearTimeout(timeoutId.current);
            }
          }
    
    },[socket,token]);


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
                {currentView===CurrentView.friendList && <FriendListPage friendList={friendList} newFriendList={newFriendList}/>}
                    {currentView===CurrentView.roomList && <RoomListPage roomList={roomList}/>}
                    
                </Col>
            </Row>
        </Container>
    )   
}

export default RootPage;