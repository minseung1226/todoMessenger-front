import { Modal,Button } from "react-bootstrap";

const ScheduleAddModal=({isOpen,onClose})=>{


    return (
        <Modal show={isOpen} onHide={onClose} className="schedule-add-modal"
                backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <span>일정 추가</span>
                </Modal.Header>

                <Modal.Body className="body">
                    
                </Modal.Body>

                <Modal.Footer className="footer">
                    <Button variant="outline-dark" onClick={onClose}>닫기</Button>
                    <Button variant="outline-dark">확인</Button>
                </Modal.Footer>
            </Modal>

    )
}


export default ScheduleAddModal;