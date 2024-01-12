import { ListGroup,Image } from "react-bootstrap";
import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../socket/socket";
const CreateRoomPage=()=>{
    const token=localStorage.getItem("jwtToken");
    const [friends,setFriends]=useState([]);
    const [checkedState,setCheckedState]=useState({});
    const server_url=process.env.REACT_APP_SERVER_URL;
    const socket=getSocket(token);
    const navigate=useNavigate("");

    const getFriendList=()=>{
        socket.emit("friendList",token,(res)=>{
            setFriends(res.friendList);
        });
    }
    useEffect(()=>{
        console.log("jwtToken=",token);
        getFriendList();

        socket.on("newFriend",(data)=>{
            getFriendList();
        })
    },[socket])

    const handleCheckboxChange=(friendId)=>{
        setCheckedState(prevState=>({
            ...prevState,
            [friendId]:!prevState[friendId]
        }));
    };

    const handleSubmit=()=>{
        const selectFriend=friends.filter(friend=>checkedState[friend._id]);

        fetch(`${server_url}/room`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                friends:selectFriend
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.ok){
                navigate(`/room/${result.roomId}`);
            }
        })
        .catch(err=>console.log("Err=",err));
    }

    return (
        <div>
                    <ListGroup>
        {friends.map((friend, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-center no-border">
          <Image src="/profile.jpeg" className="profile-img" roundedCircle/>
          <div className="ml-2">
            <div><strong>{friend.name}</strong></div>
          </div>

    </ListGroup.Item>
  ))}
</ListGroup><button onClick={handleSubmit}>전송</button>
            </div>
    );
}


export default CreateRoomPage;