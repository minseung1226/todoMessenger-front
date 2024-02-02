import { Modal,Button } from "react-bootstrap";
import "../../styles/common.css"
const AlertModal=({message,isOpen,onClose})=>{

    return (
        <div>
        <Modal show={isOpen} onHide={onClose} size="sm" style={{maxHeight:"500px",overflowY:"auto"}}>
        <Modal.Header closeButton style={{height:"40px"}}>
          <Modal.Title><h6 style={{margin:"0"}}>알림</h6></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:"70px" }}>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer style={{height:"40px",padding:"0 10px 0 0"}}>
          
          <div>
          <Button variant="outline-dark" onClick={onClose} className="round-sm-btn"
          >닫기</Button>
          </div>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default AlertModal;