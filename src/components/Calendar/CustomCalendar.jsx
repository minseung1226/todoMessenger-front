import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CustomCalendar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ScheduleAddModal from '../ScheduleAddModal/ScheduleAddModal';
import moment from 'moment';
import { Form } from 'react-bootstrap';
const CustomCalendar = ({socket,token}) => {
  const [value, setValue] = useState(new Date());
  const [isOpen,setIsOpen]=useState(false);

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  return (
    <div className="calendar-container">

        <Calendar onChange={onChange}
         value={value}
        formatDay={(locale,date)=>moment(date).format("DD")}
         />



      <div className='schedule'>
          <div className='schedule-header'>
            <h3>일정</h3>
            <Button size="sm" className='schedule-add-btn' onClick={()=>setIsOpen(true)}
             variant='outline-dark'>일정 추가</Button>
          </div>

          <div className='schedule-list'>
              <div className='schedule-content'>
                  <div className='schedule-close-btn'>x</div>
                <div className='message-and-btn'>
                  <div className='message'>책읽기 30분</div>
                  <Form.Check />
                </div>
              </div>
              <ScheduleAddModal socket={socket} token={token}
               isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
          </div>
      </div>
    </div>
  );
};

export default CustomCalendar;