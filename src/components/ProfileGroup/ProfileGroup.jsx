import "../../styles/common.css";

import { ListGroup,Image } from "react-bootstrap";
const ProfileGroup=({users})=>{
    const img_url=process.env.REACT_APP_PROFILE_IMG_URL
    return (
        <ListGroup>
        {users.map((user, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-center no-border profile">
          <Image src={user.profileImg?img_url+user.profileImg:"/profile.jpeg"} className="profile-img" roundedCircle/>
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