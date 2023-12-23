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
        const url=new URL(`${server_url}/friends`);
        url.searchParams.append("friendName",friendInput);
        fetch(url,{
            method:"get",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>res.json())
        .then(data=>setFriends(data.friends))
        .catch(err=>console.log(err));
    },[friendInput])

    return (
        <div>
            <Input type="text" onChange={(event)=>setFriendInput(event.target.value)}/>
            <div>
                <div >
                    {friends?friends?.map((friend,index)=>(
                        <div key={index}> {friend.name}</div>
                    )):<div></div>}
                </div>
            </div>
            <Button type="button" onClick={()=>navigate("/rooms")}>채팅방이동</Button>           
            <Logout/>
            <Button type="button" onClick={()=>navigate("/user/search")}>친구 추가</Button>
        </div>
    )
}

export default FriendListPage;