import "../../styles/common.css";

import { ListGroup,Image } from "react-bootstrap";
const ProfileGroup=({users})=>{

    return (
        <ListGroup>
        {users.map((user, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-center no-border profile">
          <Image src="/profile.jpeg" className="profile-img" roundedCircle/>
          <div className="ml-2">
            <div><strong>{user.name}</strong></div>
            <div className="small">{user.online?"online":"offline"}</div>
          </div>
    </ListGroup.Item>
  ))}
</ListGroup>
    )
}

export default ProfileGroup;