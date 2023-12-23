import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@mui/base";
const FriendSearchPage=()=>{
    const [friendId,setFriendId]=useState("");
    const [user,setUser]=useState("");
    const [alertMessage,setAlertMessage]=useState("");
    const [alertIsOpen,setAlertIsOpen]=useState(false);
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=sessionStorage.getItem("jwtToken");
    const navigate=useNavigate();
    const user_search=()=>{
        const url=new URL(`${server_url}/user`);
        url.searchParams.append("friendLoginId",friendId);
        fetch(url,{
            method:"get",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then(res=>res.json())
        .then(data=>{
            console.log("data=",data);
            if(data.errorMessage){
                setAlertIsOpen(true);
                setAlertMessage(data.errorMessage);
            }
            else{
            setUser(data.user);
            }
        })
        .catch(err=>{
            console.log("user search error");
            throw err;
        })
        
    }

    const addFriend=()=>{
        fetch(`${server_url}/friend/request`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({friendId:user._id})
        }).then(res=>res.json())
        .then(data=>{
            setAlertIsOpen(true);
            setAlertMessage("친구로 추가되었습니다.")
            if(!alertIsOpen){
                navigate("/friends")
            }
        })
    }

    return (
        <div>
            <Input type="text" onChange={(event)=>setFriendId(event.target.value)}/>
            <Button type="button" onClick={user_search}>검색</Button>

            {user?<div>
                <div>{user.name}</div>
                <Button type="button" onClick={addFriend}>추가</Button>
            </div>:<div></div>}
        </div>
    )
}

export default FriendSearchPage;