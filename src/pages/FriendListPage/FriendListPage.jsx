import { useState,useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { ListGroup,Image} from "react-bootstrap";
import "./FriendListPage.css";
import "../../styles/common.css";
import ProfileGroup from "../../components/ProfileGroup/ProfileGroup";
import HeaderSearchBar from "../../components/HeaderSearchBar/HeaderSearchBar";
import UserSearchModal from "../../components/UserSearchModal/UserSearchModal";
const FriendListPage=({friendList,newFriendList,socket})=>{
    const token=localStorage.getItem("jwtToken");
    const [friends,setFriends]=useState(friendList);
    const [newFriends,setNewFriends]=useState(newFriendList);
    const [user,setUser]=useState("");
    const [userSearchModalIsOpen,setUserSearchModalIsOpen]=useState(false);


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
    
    return (
        <div>
          <HeaderSearchBar title="Friend"
          allData={friendList} setSearchResult={setFriends}>
          <Image src="/friendPlus.png" className="friend-plus icon-img" onClick={() =>setUserSearchModalIsOpen(true)}/>
          </HeaderSearchBar>
          <UserSearchModal token={token} socket={socket}
                           userSearchModalIsOpen={userSearchModalIsOpen}
                           onClose={()=>setUserSearchModalIsOpen(false)}/>

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