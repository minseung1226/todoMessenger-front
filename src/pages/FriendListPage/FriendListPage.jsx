import { useState, useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { ListGroup, Image } from "react-bootstrap";
import "./FriendListPage.css";
import "../../styles/common.css";
import ProfileGroup from "../../components/ProfileGroup/ProfileGroup";
import HeaderSearchBar from "../../components/HeaderSearchBar/HeaderSearchBar";
import UserSearchModal from "../../components/UserSearchModal/UserSearchModal";
const FriendListPage = ({ friendList, newFriendList, socket, user }) => {
  const token = localStorage.getItem("jwtToken");
  const [friends, setFriends] = useState(friendList);
  const [newFriends, setNewFriends] = useState(newFriendList);
  const [userSearchModalIsOpen, setUserSearchModalIsOpen] = useState(false);
  const img_url = process.env.REACT_APP_PROFILE_IMG_URL;

  useEffect(() => {
    setFriends(friendList);
    setNewFriends(newFriendList);
  }, [friendList, newFriendList]);


  const open_room=(friendId)=>{
    const selectFriends=[friendId];
    socket.emit("createChatRoom",token,selectFriends,(res)=>{
      window.electron.send("open-chat-room",res.roomId);
    })
  }



  return (
    <div className="friend-list-container">
      <HeaderSearchBar title="친구"
        allData={friendList} setSearchResult={setFriends}>
        <Image src="/friendPlus.png"
          className="friend-plus icon-img" onClick={() => setUserSearchModalIsOpen(true)} />
      </HeaderSearchBar>
      <UserSearchModal token={token} socket={socket}
        userSearchModalIsOpen={userSearchModalIsOpen}
        onClose={() => setUserSearchModalIsOpen(false)} />

      <p className="m-left list-name">me</p>
      <hr></hr>
      <ListGroup>
        <ListGroup.Item className="d-flex align-items-center no-border profile">
          <Image src={user.profileImg ? img_url + user.profileImg : "/profile.jpeg"} className="profile-img" roundedCircle />
          <div className="ml-2">
            <div><strong>{user.name}</strong></div>

          </div>
        </ListGroup.Item>
      </ListGroup>

      {newFriends.length > 0 ?
        <div>
          <p className="m-left list-name">새 친구</p>
          <hr></hr>
          <ProfileGroup users={newFriends} onDoubleClick={open_room}/>
        </div>
        : <div></div>}
      <p className="m-left list-name">친구</p>
      <hr></hr>
      <ProfileGroup users={friends} onDoubleClick={open_room}/>



    </div>
  )
}

export default FriendListPage;