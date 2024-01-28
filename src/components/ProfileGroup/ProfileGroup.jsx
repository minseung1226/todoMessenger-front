import "../../styles/common.css";
import "./ProfileGroup.css"
import { ListGroup, Image } from "react-bootstrap";
const ProfileGroup = ({ users,onDoubleClick }) => {
  const img_url = process.env.REACT_APP_PROFILE_IMG_URL
  return (
    <ListGroup>
      {users.map((user, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-center no-border profile"
                        onDoubleClick={()=>onDoubleClick(user._id)}>
          <div className="img-container">
            <Image src={user.profileImg ? img_url + user.profileImg : "/profile.jpeg"} className="profile-img" roundedCircle />
            {user.online==="online"&&<div className="online-indicator"></div>}
          </div>
          <div className="ml-2">
            <div><strong>{user.name}</strong></div>
          
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ProfileGroup;