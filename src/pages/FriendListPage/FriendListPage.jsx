import { useState, useEffect } from "react";
import { ListGroup, Image } from "react-bootstrap";
import "./FriendListPage.css";
import "../../styles/common.css";
import ProfileGroup from "../../components/ProfileGroup/ProfileGroup";
import SearchInput from "../../components/searchInput/SearchInput";
import { useNavigate } from "react-router-dom";
const FriendListPage = ({ friendList, newFriendList, socket, user }) => {
  const token = localStorage.getItem("jwtToken");
  const [friends, setFriends] = useState(friendList);
  const [newFriends, setNewFriends] = useState(newFriendList);
  const [userSearchModalIsOpen, setUserSearchModalIsOpen] = useState(false);
  const img_url = process.env.REACT_APP_PROFILE_IMG_URL;
  const navigate=useNavigate();

  useEffect(() => {
    setFriends(friendList);
    setNewFriends(newFriendList);
  }, [friendList, newFriendList]);


  const open_room = (friendId) => {
    const selectFriends = [friendId];
    socket.emit("createChatRoom", token, selectFriends, (res) => {
      navigate(`/home/${res.roomId}`);
    })
  }



  return (
    <div className="friend-list-container">
      <div className="friend-list-search">
        <SearchInput allData={friendList} setSearchResult={setFriends} />

      </div>
      <div className="all-profile">
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
            <ProfileGroup users={newFriends} onDoubleClick={open_room} />
          </div>
          : <div></div>}
        <p className="m-left list-name">친구</p>
        <hr></hr>
        <ProfileGroup users={friends} onDoubleClick={open_room} />
      </div>


    </div>
  )
}

export default FriendListPage;