import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getSocket } from "../../socket/socket";
import { Col, Container,Row } from "react-bootstrap";
import "./MessageAlertWindow.css"
import ImgGroup from "../../components/ImgGroup/ImgGroup";
const MessageAlertWindow=()=>{
    const token=localStorage.getItem("jwtToken");
    const socket=getSocket(token);
    const {chatId}=useParams();
    const [chat,setChat]=useState("");
    useEffect(()=>{
        socket.emit("alertMessage",chatId,(res)=>{
            setChat(res.chat);
        })

        return ()=>{
            socket.off("alertMessage");
        }
    },[])
    
    const formatText=(data,maxLength)=>{
        if (data?.length > maxLength) {
            return data.substring(0, maxLength) + '...';
          } else {
            return data;
          }
    }

    const goRoom=()=>{
        socket.emit("openRoom",chat.room._id,token);
        window.electron.closeWindow();
        }

    return (
        <Container fluid className="message-alert-container" onClick={goRoom}>
       
            <Row>
                <Col className="d-flex justify-content-between">
                    <strong className="alert-text">새 메시지</strong>
                    <div className="message-alert-close"
                         onClick={()=>window.electron.closeWindow()}>x</div>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <ImgGroup members={chat?.room?.members}/>
                </Col>
                <Col xs={9}>
                <div className="message-alert-title">
                    <strong>{formatText(chat?.room?.name,11)}</strong></div>
            <div className="message-alert-content">{formatText(chat?.chat,15)}</div>
                </Col>
            </Row>
            
         
        </Container>
    )
}

export default MessageAlertWindow;