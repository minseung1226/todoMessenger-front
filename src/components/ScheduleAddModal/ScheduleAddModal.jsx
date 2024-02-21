import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import "./ScheduleAddModal.css"
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const ScheduleAddModal = ({ isOpen, onClose }) => {
    const [date, setDate] = useState(new Date());
    const [isDaily, setIsDaily] = useState(false);
    
    useEffect(()=>{
        const onSubmit=()=>{
            
        }
    },[])


    return (
        <Modal show={isOpen} onHide={onClose} className="schedule-add-modal"
            backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <h5>일정 추가</h5>
            </Modal.Header>

            <Modal.Body className="body">
                <div className="date">
                    <DatePicker selected={date} onChange={date => setDate(date)}
                        locale={ko}
                        dateFormat="yyyy년 MM월 dd일"
                        disabled={isDaily} />

                    <Form.Check
                        className="daily-check"
                        inline
                        label="매일"
                        checked={isDaily}
                        onChange={(e) => {
                            setIsDaily(e.target.checked)
                        }}
                    />
                    <span className="sm-text">(한달 기준)</span>
                </div>


                <div className="title">
                    <Form.Group >
                        <Form.Label>제목</Form.Label>
                        <Form.Control as="textarea"className="title-input" rows={2} />
                    </Form.Group>
                </div>

            </Modal.Body>

            <Modal.Footer className="footer">
                <Button variant="outline-dark" onClick={onClose}>닫기</Button>
                <Button variant="outline-dark">확인</Button>
            </Modal.Footer>
        </Modal>

    )
}


export default ScheduleAddModal;