import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {Button,Container,ListGroup,Image, Row, Col,Form } from "react-bootstrap";
import { getSocket } from "../../socket/socket";
import AlertModal from "../../components/AlertModal/AlertModal";
const FriendSearchPage=()=>{
    const [friendId,setFriendId]=useState("");
    const [user,setUser]=useState("");
    const [alertMessage,setAlertMessage]=useState("");
    const [alertIsOpen,setAlertIsOpen]=useState(false);
    const server_url=process.env.REACT_APP_SERVER_URL;
    const token=localStorage.getItem("jwtToken");
    const socket=getSocket();
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
        socket.emit("addFriend",token,user._id,(res)=>{
            setAlertIsOpen(true);
            setAlertMessage("친구로 추가되었습니다.")
        });

        
        // fetch(`${server_url}/friend/request`,{
        //     method:"PATCH",
        //     headers:{
        //         "Content-type":"application/json",
        //         "Authorization":`Bearer ${token}`
        //     },
        //     body:JSON.stringify({friendId:user._id})
        // }).then(res=>res.json())
        // .then(data=>{
        //     setAlertIsOpen(true);
        //     setAlertMessage("친구로 추가되었습니다.")
        //     if(!alertIsOpen){
        //         navigate("/home")
        //     }
        // })
    }


    const modalOnClose=()=>{
        setAlertIsOpen(false);
        window.electron.closeWindow();
        
    }

    return (
        <Container fluid>
            <Row className="mb-2">
                <Col xs={9}>
                    <Form.Control placeholder="ID" onChange={(event)=>setFriendId(event.target.value)}/>
                    {/* <FloatingLabelInput label="ID" onChange={(event)=>setFriendId(event.target.value)}/> */}
                </Col>
                <Col xs={3}>
                    <Button variant="outline-dark" onClick={user_search}>검색</Button>
                </Col>
            </Row>
            {user?
            <ListGroup.Item className="d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center">
                <Image src="/profile.jpeg" roundedCircle style={{width:"50px",height:"50px",marginRight:"20px"}}/>
                <div>
                    <div><strong>{user.name}</strong></div>
                    <div className="small">online</div>
                </div>
            </div>
            <Button variant="outline-dark" onClick={addFriend}>추가</Button>
        </ListGroup.Item>:<div></div>}
        <AlertModal
                isOpen={alertIsOpen}
                message={alertMessage}
                onClose={modalOnClose}/>
        </Container>
    )
}

export default FriendSearchPage;