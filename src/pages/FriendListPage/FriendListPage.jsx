import { Button, Input } from "@mui/base";
import { useState,useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { ListGroup,Image,Form,Row,Col } from "react-bootstrap";
import { getSocket } from "../../socket/socket";
import "./FriendListPage.css";
import "../../styles/common.css";
import ProfileGroup from "../../components/ProfileGroup/ProfileGroup";
import HeaderSearchBar from "../../components/HeaderSearchBar/HearderSearchBar";
const FriendListPage=({friendList,newFriendList})=>{
    const token=localStorage.getItem("jwtToken");
    const [friendInput,setFriendInput]=useState("");
    const [friends,setFriends]=useState(friendList);
    const [newFriends,setNewFriends]=useState(newFriendList);
    const [user,setUser]=useState("");
    const socket=getSocket(token);



    useEffect(() => {
        setFriends(friendList);
        setNewFriends(newFriendList);
        }, [friendList,newFriendList]);

    useEffect(()=>{
      socket.emit("findUser",token,(res)=>{
        setUser(res.user);
      })
    },[socket])
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
          <HeaderSearchBar title="Friend" allData={friendList} setSearchResult={setFriends}>
          <Image src="/friendPlus.png" className="friend-plus icon-img" onClick={() => window.electron.send("user-search")}/>
          </HeaderSearchBar>
            {/* <Row className="align-items-center mb-2">
      <Col xs={6} className="text-start">
        <h4>Friend</h4>
      </Col>
      <Col xs={6} className="text-end">
        <Image src="/friendPlus.png" className="friend-plus" onClick={() => window.electron.send("user-search")}/>
      </Col>
    </Row>
          <Form.Control type="text" placeholder="검색" value={friendInput}
            onChange={friendSearch}
          /> */}
          <p>me</p>
          <hr></hr>
          <ListGroup>
        <ListGroup.Item className="d-flex align-items-center no-border">
          <Image src="/profile.jpeg" className="profile-img" roundedCircle/>
          <div className="ml-2">
            <div><strong>{user.name}</strong></div>
            
          </div>
    </ListGroup.Item>
    </ListGroup>

          {newFriends.length>0?
          <div>
            <p>새 친구</p>
            <hr></hr>
            <ProfileGroup users={newFriends}/>
          </div>
          :<div></div>}
          <p>친구</p>
          <hr></hr>
          <ProfileGroup users={friends}/>
          
            <Logout/>
            
        </div>
    )
}

export default FriendListPage;