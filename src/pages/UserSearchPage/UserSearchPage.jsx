import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Form,Button,Container } from "react-bootstrap";
import FloatingLabelInput from "../../components/FloatingLabelInput/FloatingLabelInput";

const FriendSearchPage=()=>{
    const [friendId,setFriendId]=useState("");
    const [user,setUser]=useState("");
    const [alertMessage,setAlertMessage]=useState("");
    const [alertIsOpen,setAlertIsOpen]=useState(false);
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=localStorage.getItem("jwtToken");
    const navigate=useNavigate();

    useEffect(()=>{
        console.log("token=",token);
    })

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
            console.log("err=",err);
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
                navigate("/home")
            }
        })
    }

    return (
        <Container fluid>
            <FloatingLabelInput label="ID" onChange={(event)=>setFriendId(event.target.value)}/>
            <Button variant="outline-dark" onClick={user_search}>검색</Button>

            {user?<div>
                <div>{user.name}</div>
                <Button variant="outline-dark" onClick={addFriend}>추가</Button>
            </div>:<div></div>}
        </Container>
    )
}

export default FriendSearchPage;