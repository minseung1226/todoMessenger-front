import { Modal} from "react-bootstrap";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleAddModal.css"
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-multi-date-picker/components/button"
import DatePicker from "react-multi-date-picker";
const ScheduleAddModal = ({ isOpen, onClose, socket,token }) => {
    const [message, setMessage] = useState("");
    const [dates, setDates] = useState([]);

    const onSubmit = () => {
        socket.emit("scheduleCreate", token, message, dates, (res) => {
            setMessage("");
            setDates([]);
            onClose();
        })
    }

    const closeModal = () => {
        setMessage("");
        setDates([]);
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} className="schedule-add-modal"
            backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <h5>일정 추가</h5>
            </Modal.Header>

            <Modal.Body className="body">
                <div className="date">
                    <strong className="select-date-title">선택된 날짜</strong>

                    <DatePicker
                        value={dates}
                        onChange={setDates}
                        multiple
                        format="YYYY-MM-DD"
                        render={<Button  className="custom-btn">날짜 선택</Button>}
                    />
                </div>


                <div className="select-date">
                    {dates.map(date => date.format("YYYY-MM-DD")).join(", ")}
                </div>


                <div className="title">
                    <strong>message</strong>
                    <Form.Group >
                        <Form.Control as="textarea" className="title-input" rows={2}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} />
                    </Form.Group>
                </div>

            </Modal.Body>

            <Modal.Footer className="footer">
                <Button className="custom-btn big-btn" onClick={closeModal}>닫기</Button>
                <Button className="custom-btn big-btn" onClick={onSubmit}>확인</Button>
            </Modal.Footer>
        </Modal>

    )
}


export default ScheduleAddModal;