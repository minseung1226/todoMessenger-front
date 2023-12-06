import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/base";
import { Button } from "@mui/base";

const server_url=process.env.REACT_APP_SERVER_URL;

const JoinPage=()=>{
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const [name,setName]=useState("");
    const navigate=useNavigate("");
    const [idCheck,setIdCheck]=useState(false);

    const idDuplication=()=>{
        fetch(`${server_url}/idDuplication`,{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                loginId:id,
            })
        })
        .then((res)=>res.json())
        .then(data=>{
            if(!data.ok) alert("중복 ID")
            else{
                alert("사용 가능한 아이디 입니다.");
                setIdCheck(true);

            }

        }).catch(err=>console.log(err.message));
    }


    const join=(event)=>{
        event.preventDefault();
        fetch(`${server_url}/join`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                loginId:id,
                pw:pw,
                name:name
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.ok){
                if(window.confirm("회원가입 성공")){
                    navigate("/");
                }
            }
        })
        .catch((err)=>console.log(err.message));
    }



    return (
        <div>
            <h1>Join</h1>
            <form onSubmit={join} className="joinForm">

            <Input 
                placeholder="ID"
                disabled={idCheck}
                value={id}
                onChange={(event)=>setId(event.target.value)}
                multiline={false}
                rows={1}/>
            <Button 
                type="button"
                disabled={idCheck}
                onClick={idDuplication}>중복확인</Button>
            <Input 
                placeholder="password"
                value={pw}
                onChange={(event)=>setPw(event.target.value)}
                multiline={false}
                rows={1}/>
            <Input 
                placeholder="name"
                value={name}
                onChange={(event)=>setName(event.target.value)}
                multiline={false}
                rows={1}/>
            
            <Button 
                type="submit"
                disabled={!idCheck}
                >Join</Button>
            </form>
            

        </div>
    )
}


export default JoinPage;