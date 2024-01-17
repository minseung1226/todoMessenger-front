import { useEffect, useState } from "react";
import { getSocket } from "../../socket/socket";
import { Container, Image, Row,Col,Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
const ProfileUpdatePage=()=>{
    const token=localStorage.getItem("jwtToken");
    const [user,setUser]=useState("");
    const socket=getSocket(token);
    const [name,setName]=useState("");
    useEffect(()=>{
        socket.emit("findUser",token,(res)=>{
            setUser(res.user);
            setName(res.user.name);
        });
    },[socket,token]);


    return(
        <Container fluid>
            <h4 className="mt-2">프로필 변경</h4>
            <Row className="mt-2 mb-3">
                <Col>
                    <Image roundedCircle src="/profile.jpeg" style={{height:"110px",width:"110px",marginLeft:"33%"}}/>
                </Col>
            </Row >
            <Row className="mt-2 mb-3">
                <Col xs={1}></Col>
                <Col className="d-flex justify-content-center">
                    <Form.Control
                        type="text"
                        placeholder="이름"
                        value={name} onChange={(e)=>setName(e.target.value)}/>
                </Col>
                <Col xs={1}></Col>
            </Row >
            <Row className="mt-2 mb-3">
                <Col xs={1}></Col>
                <Col>
                    <Button variant="outline-dark">비밀번호 변경</Button>
                    <Button variant="outline-dark">변경</Button>
                </Col>
                <Col xs={1}></Col>
            </Row>

        </Container>
    )
}

export default ProfileUpdatePage;