
import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
const CreateRoomPage=()=>{
    const token=localStorage.getItem("jwtToken");
    console.log("token=",token);
    const [friends,setfriends]=useState([]);
    const [checkedState,setCheckedState]=useState({});
    const server_url=process.env.REACT_APP_SERVER_URL;
    const navigate=useNavigate("");

    useEffect(()=>{
        fetch(`${server_url}/friends`,{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`,
            },
        }).then(res=>res.json())
        .then((data)=>{
            setfriends(data.friends);
        }).catch(err=>{
            console.log("err=",err)
        })
    },[])

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
            {friends.map((friend,index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        value={friend._id}
                        checked={checkedState[friend._id] || false}
                        onChange={() => handleCheckboxChange(friend._id)}
                    />
                    {friend.name}
                </div>
            ))}
            <button onClick={handleSubmit}>전송</button>
        </div>
    );
}


export default CreateRoomPage;