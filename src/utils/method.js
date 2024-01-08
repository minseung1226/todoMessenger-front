import { disconnect } from "../socket/socket";
export const logout=()=>{
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=localStorage.getItem("jwtToken");
    fetch(`${server_url}/logout`,{
        method:"PATCH",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        
    }).then(res=>res.json())
    .then(res=>{
        localStorage.removeItem("jwtToken");
        disconnect();
    });

    
}