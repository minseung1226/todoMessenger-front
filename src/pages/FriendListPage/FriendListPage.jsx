import { Button, Input } from "@mui/base";
import { useState,useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";
import { ListGroup,Image,Form } from "react-bootstrap";

const FriendListPage=({friendList})=>{
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=localStorage.getItem("jwtToken");
    const navigate=useNavigate();
    const [friendInput,setFriendInput]=useState("");
    const [friends,setFriends]=useState(friendList);

    useEffect(() => {
        setFriends(friendList);
        }, [friendList]);

    const friendSearch=(event)=>{
      console.log("실행");
      const friendName=event.target.value;
      
      if(friendName){
        setFriends(friendList);
        return;
      }

      const lastChar=friendName.charAt(friendName.length-1);

      if((lastChar>=`/u3131` && lastChar<=`/u314E`)||
         (lastChar>=`/u314F` && lastChar<=`/u3163`)){
          friendName=friendName.slice(0,-1);
          if(!friendName){
            setFriends(friendList);
            return;
          }
      }
      setFriends(friendList.filter(name=>name.includes(friendName)));
      console.log("friend=",friends);

    }
    return (
        <div>
        <Form.Control type="text" placeholder="친구 검색" 
        onChange={friendSearch}
      />
            <ListGroup>
      {friends.map((friend, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-center">
          <Image src="/profile.jpeg" roundedCircle  style={{width:"50px",height:"50px",marginRight:"20px"}}/>
          <div className="ml-2">
            <div><strong>{friend.name}</strong></div> {/* 이름을 굵게 표시합니다 */}
            <div className="small">online</div> {/* 온라인 여부를 작은 텍스트로 표시합니다 */}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
          
            <Logout/>
            <Button type="button" onClick={()=>navigate("/user/search")}>친구 추가</Button>
        </div>
    )
}

export default FriendListPage;