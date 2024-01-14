import { Modal,Button } from "react-bootstrap";
const AlertModal=({message,isOpen,onClose})=>{

    return (
        <div>
        <Modal show={isOpen} onHide={onClose} size="sm" style={{maxHeight:"500px",overflowY:"auto"}}>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:"110px"}}>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="outline-dark" onClick={onClose}>확인</Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default AlertModal;