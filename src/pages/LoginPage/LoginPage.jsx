import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/base";
import { Button } from "@mui/base";
const server_url=process.env.REACT_APP_SERVER_URL;
const LoginPage=()=>{
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const navigate=useNavigate();
    const login=(event)=>{

        event.preventDefault();
        fetch(`${server_url}/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                userId:id,
                pw:pw
            }),
        })
        .then((res)=>res.json())
        .then(data=>{

            if(!data.ok){
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
            else{
                sessionStorage.setItem('jwtToken',data.token);
                alert("로그인 성공");
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