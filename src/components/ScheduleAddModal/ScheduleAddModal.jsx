import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
const ScheduleAddModal = ({ isOpen, onClose }) => {
    const [value, setValue] = useState(new Date());

    const onChange = (nextValue) => {
        setValue(nextValue);
    };

    return (
        <Modal show={isOpen} onHide={onClose} className="schedule-add-modal"
            backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <h5>일정 추가</h5>
            </Modal.Header>

            <Modal.Body className="body">
                <Calendar
                    onChange={onChange}
                    value={value}
                    formatDay={(locale,date)=>moment(date).format("DD")}
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