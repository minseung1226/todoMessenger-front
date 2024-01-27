import { Modal,Button } from "react-bootstrap";
const AlertOkModal=({message,isOpen,onClose,success})=>{

    return (
        <div>
        <Modal show={isOpen} onHide={onClose}
        className="alert-ok-modal"
        size="sm" style={{maxHeight:"500px",overflowY:"auto"}}>
        <Modal.Header closeButton style={{height:"20px"}}>
          <Modal.Title><h6>알림</h6></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:"70px"}}>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer style={{height:"50px"}}>
          
          <div>
          <Button variant="outline-dark" onClick={success} size="sm">확인</Button>
          <Button variant="outline-dark" onClick={onClose} size="sm">닫기</Button>
          </div>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default AlertOkModal;