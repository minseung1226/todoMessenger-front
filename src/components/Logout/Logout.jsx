import { Button } from "@mui/base";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/method";
const Logout=(server_url,token)=>{
    const navigate=useNavigate();
    const onClick=()=>{
        logout();
        navigate("/");
    }


    return(<div>
        <Button type="button" onClick={onClick}>logout</Button>
    </div>)
}

export default Logout;