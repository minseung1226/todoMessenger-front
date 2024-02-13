import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import TimePicker from 'react-time-picker';
const ScheduleAddModal = ({ isOpen, onClose }) => {
    const [time, setTime] = useState('10:00');
  
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };
    return (
        <Modal show={isOpen} onHide={onClose} className="schedule-add-modal"
            backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <h5>일정 추가</h5>
            </Modal.Header>

            <Modal.Body className="body">
            <TimePicker
                    onChange={setTime}
                    value={time}
                    clockIcon={null} // 시계 아이콘 제거
                />
            </Modal.Body>

            <Modal.Footer className="footer">
                <Button variant="outline-dark" onClick={onClose}>닫기</Button>
                <Button variant="outline-dark">확인</Button>
            </Modal.Footer>
        </Modal>

    )
}


export default ScheduleAddModal;