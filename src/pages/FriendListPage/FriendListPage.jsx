import { Button, Input } from "@mui/base";
import { useState,useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";

const FriendListPage=()=>{
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=sessionStorage.getItem("jwtToken");
    const navigate=useNavigate();
    const [friendInput,setFriendInput]=useState("");
    const [friends,setFriends]=useState([]);

    useEffect(()=>{
        fetch(`${server_url}/friends`,{
            method:"post",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>res.json())
        .then(data=>setFriends(data))
        .catch(err=>console.log(err));
    },[])



    const friend_search=(event)=>{
        setFriendInput(event.target.value);
        fetch(`${server_url}/friend/search`,{
            method:"get",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                friendName:friendInput
            })
        }).then(res=>res.json())
        .then(data=>setFriends(data.friends))
        .catch(err=>{
            console.log("friends search client error");
            throw err;
        })
    }
    return (
        <div>
            <Input type="text" onChange={friend_search}/>
            <div>
                <div >
                    {friends.map((friend,index)=>(
                        <div key={index}> {friend.name}</div>
                    ))}
                </div>
            </div>
            <Button type="button" onClick={()=>navigate("/rooms")}/>           
            <Logout/>
        </div>
    )
}

export default FriendListPage;