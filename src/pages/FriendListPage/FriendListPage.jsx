import { Button, Input } from "@mui/base";
import { useState,useEffect } from "react";
import Logout from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";

const FriendListPage=(friendList)=>{
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=sessionStorage.getItem("jwtToken");
    const navigate=useNavigate();
    const [friendInput,setFriendInput]=useState("");

    useEffect(()=>{

    },[friendInput])

    return (
        <div>
            <Input type="text" onChange={(event)=>setFriendInput(event.target.value)}/>
            <div>
                <div >
                    {friendList?friendList?.map((friend,index)=>(
                        <div key={index}> {friend.name}</div>
                    )):<div></div>}
                </div>
            </div>
          
            <Logout/>
            <Button type="button" onClick={()=>navigate("/user/search")}>친구 추가</Button>
        </div>
    )
}

export default FriendListPage;