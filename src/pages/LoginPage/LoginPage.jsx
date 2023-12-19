import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/base";
import { Button } from "@mui/base";
import { useDispatch } from "react-redux";
import { connectSocket } from "../../redux/actions/socketActions";
import { getSocket } from "../../socket/socket";
const LoginPage=()=>{
    const server_url=process.env.REACT_APP_SERVER_URL;
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const login=(event)=>{
        
        event.preventDefault();
        fetch(`${server_url}/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                loginId:id,
                pw:pw
            }),
        })
        .then((res)=>res.json())
        .then(data=>{

            if(!data.ok){
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
            else{
                console.log("token=",data.token);
                sessionStorage.setItem('jwtToken',data.token);
                dispatch(connectSocket());
                const socket=getSocket();
                socket.emit("saveSocketId",data.token,(res)=>{
                    if(res.ok) navigate("/rooms");
                    else{
                        alert("socketId 저장 실패")
                    }
                })
                
            }
        })
        .catch((err)=>{

            console.log(err.message);
        })
        
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login} className="loginForm">
                <Input
                    placeholder="ID"
                    value={id}
                    onChange={(event)=>setId(event.target.value)}
                    multiline={false}
                    rows={1}/>
                <Input
                    placeholder="password"
                    value={pw}
                    onChange={(event)=>setPw(event.target.value)}
                    multiline={false}
                    rows={1}/>
                
                <Button
                    type="submit">로그인</Button>
            </form>
            <Button
                type="button"
                onClick={()=>navigate("/join")}>회원가입</Button>
        </div>
    )
}


export default LoginPage;