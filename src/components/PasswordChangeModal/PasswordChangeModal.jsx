import { useState } from "react";
import { Button,Col,Form,Modal, Row } from "react-bootstrap";
import "./PasswordChangeModal.css"
import AlertModal from "../AlertModal/AlertModal";
import { getSocket } from "../../socket/socket";
const PasswordChangeModal=({token})=>{
    const [show, setShow] = useState(false);
    const [password,setPassword]=useState("");
    const [password2,setPassword2]=useState("");
    const [alertIsOpen,setAlertIsOpen]=useState(false);
    const [message,setMessage]=useState("");
    const [isChange,setIsChange]=useState(false);
    const socket=getSocket(token);

    const passwordChange=()=>{
        if(password!==password2){
            setMessage("비밀번호가 일치하지 않습니다.")
            setAlertIsOpen(true);
            return;
        }else{
            socket.emit("changePassword",token,password,(res)=>{
                console.log("완료")
                setIsChange(true);
                setMessage("변경 완료");
                setAlertIsOpen(true);
            })
        }

    }

    const onClose=()=>{
        setAlertIsOpen(false);
        setPassword("");
        setPassword2("");
        if(isChange){
            setShow(false);
        }
    }

    return (
      <>
        <Button variant="outline-dark" onClick={()=>setShow(true)}>
          비밀번호 변경
        </Button>
  
        <Modal show={show} onHide={()=>setShow(false)} className="password-modal">
          <Modal.Header closeButton className="password-modal-header">
            <Modal.Title>
            <h6>비밀번호 변경</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="password-modal-body">

            <Row className="mb-4">
                <Col>
                <div>
                
                <Form.Control type="password"id="password"
                              value={password} placeholder="비밀번호"
                          onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div>
                <Form.Control type="password" id="password2" 
                              value={password2} placeholder="비밀번호 확인"
                              onChange={(e)=>setPassword2(e.target.value)}/>
                </div>

                </Col>
            </Row>
         
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={passwordChange}>
              변경
            </Button>
            <Button variant="outline-dark" onClick={()=>setShow(false)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>

        <AlertModal message={message} isOpen={alertIsOpen} onClose={onClose}/>
      </>
    );

}

export default PasswordChangeModal;