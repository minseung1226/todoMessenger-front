import { Button, Input } from "@mui/base";
import { useState,useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";
import { ListGroup,Image,Form } from "react-bootstrap";
import { getSocket } from "../../socket/socket";
import "./FriendListPage.css"
const FriendListPage=({friendList})=>{
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=localStorage.getItem("jwtToken");
    const navigate=useNavigate();
    const [friendInput,setFriendInput]=useState("");
    const [friends,setFriends]=useState(friendList);
    const [newFriends,setNewFriends]=useState([]);
    const [user,setUser]=useState("");
    const socket=getSocket();

    useEffect(() => {
        setFriends(friendList);
        }, [friendList]);

    useEffect(()=>{
      socket.on("newFriend",(res)=>{
        setNewFriends([...newFriends,res.newFriend]);
      })

      socket.emit("findUser",token,(res)=>{
        setUser(res.user);
      })
    },[])

    //친구 검색
    const friendSearch=(event)=>{
      setFriendInput(event.target.value);
      let friendName=event.target.value;
      
      if(!friendName){
        setFriends(friendList);
        return;
      }
      const lastCharCode=friendName.charCodeAt(friendName.length-1);
      if ((lastCharCode >= 0x3131 && lastCharCode <= 0x314E) ||
      (lastCharCode >= 0x314F && lastCharCode <= 0x3163)){
        if(friendName.length<=1){
          setFriends(friendList);
        }
          friendName=friendName.slice(0,-1);

      }
      setFriends(friendList.filter(friend=>friend.name.includes(friendName)));
    }
    return (
        <div>
          <Form.Control type="text" placeholder="친구 검색" value={friendInput}
            onChange={friendSearch}
          />
          <p>나</p>
          <hr></hr>
          <ListGroup>
            <ListGroup.Item className="d-flex align-items-center no-border">
              <Image src="/profile.jpeg" className="profile-img" roundedCircle/>
              <div className="ml-2">
                <div><strong>{user.name}</strong></div>
                <div className="small">{user.online}</div>
              </div>
            </ListGroup.Item>
          </ListGroup>

          {newFriends.lenght>0?
          <div>
            <p>새로운 친구</p>
            <hr></hr>
            <ListGroup>
            {newFriends.map((friend, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center no-border">
              <Image src={friend.profileImg?friend.profileImg:"/profile.jpeg"} className="profile-img" roundedCircle/>
              <div className="ml-2">
                <div><strong>{friend.name}</strong></div>
                <div className="small">{friend.online}</div>
              </div>
            </ListGroup.Item>
            ))}
            </ListGroup>
          </div>
          :<div></div>}
          <ListGroup>
            <p>친구</p>
            <hr></hr>
            {friends.map((friend, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center no-border">
              <Image src="/profile.jpeg" className="profile-img" roundedCircle/>
              <div className="ml-2">
                <div><strong>{friend.name}</strong></div>
                <div className="small">{friend.online}</div>
              </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
          
            <Logout/>
            <Button type="button" onClick={()=>window.electron.send("user-search")}>친구 추가</Button>
        </div>
    )
}

export default FriendListPage;