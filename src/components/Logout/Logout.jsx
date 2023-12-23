import { Button } from "@mui/base";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const navigate=useNavigate();
    const logout=()=>{
        sessionStorage.removeItem("jwtToken");
        navigate("/");
    }


    return(<div>
        <Button type="button" onClick={logout}>logout</Button>
    </div>)
}

export default Logout;