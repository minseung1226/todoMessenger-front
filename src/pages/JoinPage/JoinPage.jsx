import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/base";
import { Button } from "@mui/base";

const server_url=process.env.REACT_APP_SERVER_URL;

const JoinPage=()=>{
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const [name,setName]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const navigate=useNavigate("");
    const [idCheck,setIdCheck]=useState(false);
    const [codeCheck,setCodeCheck]=useState(false);
    const [code,setCode]=useState("");
    const [realCode,setRealCode]=useState("");

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

    const verfificationCodeSend=()=>{
        fetch(`${server_url}/sendCode`,{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                phoneNumber:phoneNumber
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            alert("인증번호 발송");
            setRealCode(data.code);
        })
    }

    const codeValid=()=>{
        if(realCode!=code || !code){
            alert("인증번호가 일치하지 않음");
        }
        else{
            alert("인증성공");
            setCodeCheck(true);
        }
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
                name:name,
                phoneNumber:phoneNumber,
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

            <Input 
                placeholder="핸드폰 번호 - 제외"
                value={phoneNumber}
                disabled={codeCheck}
                onChange={(event)=>setPhoneNumber(event.target.value)}
                multiline={false}
                rows={1}/>
            <Button 
                type="button"
                onClick={verfificationCodeSend}
                disabled={codeCheck}
                >인증번호 발송</Button>
            <Input 
                placeholder="인증번호"
                value={code}
                disabled={codeCheck}
                onChange={(event)=>{
                    setCode(event.target.value)}}
                multiline={false}
                rows={1}/>
            <Button 
                type="button"
                onClick={codeValid}
                >인증</Button>
            <Button 
                type="submit"
                disabled={!idCheck||!codeCheck}
                >Join</Button>
            </form>
            

        </div>
    )
}


export default JoinPage;