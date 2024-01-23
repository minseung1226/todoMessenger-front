import { useState,useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { ListGroup,Image} from "react-bootstrap";
import "./FriendListPage.css";
import "../../styles/common.css";
import ProfileGroup from "../../components/ProfileGroup/ProfileGroup";
import HeaderSearchBar from "../../components/HeaderSearchBar/HeaderSearchBar";
import UserSearchModal from "../../components/UserSearchModal/UserSearchModal";
const FriendListPage=({friendList,newFriendList,socket,user})=>{
    const token=localStorage.getItem("jwtToken");
    const [friends,setFriends]=useState(friendList);
    const [newFriends,setNewFriends]=useState(newFriendList);
    const [userSearchModalIsOpen,setUserSearchModalIsOpen]=useState(false);
    const img_url=process.env.REACT_APP_PROFILE_IMG_URL;

    useEffect(() => {
        setFriends(friendList);
        setNewFriends(newFriendList);
        }, [friendList,newFriendList]);


    //친구 검색
    
    return (
        <div>
          <HeaderSearchBar title="친구"
          allData={friendList} setSearchResult={setFriends}>
          <Image src="/friendPlus.png"
          className="friend-plus icon-img" onClick={() =>setUserSearchModalIsOpen(true)}/>
          </HeaderSearchBar>
          <UserSearchModal token={token} socket={socket}
                           userSearchModalIsOpen={userSearchModalIsOpen}
                           onClose={()=>setUserSearchModalIsOpen(false)}/>

          <p>me</p>
          <hr></hr>
          <ListGroup>
        <ListGroup.Item className="d-flex align-items-center no-border profile">
          <Image src={user.profileImg?img_url+user.profileImg:"/profile.jpeg"} className="profile-img" roundedCircle/>
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
          
            
            
        </div>
    )
}

export default FriendListPage;