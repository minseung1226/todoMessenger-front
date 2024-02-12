import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CustomCalendar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ScheduleAddModal from '../ScheduleAddModal/ScheduleAddModal';
const CustomCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [isOpen,setIsOpen]=useState(false);

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  return (
    <div className="calendar-container">

        <Calendar onChange={onChange} value={value} />



      <div className='schedule'>
          <div className='schedule-header'>
            <h3>일정</h3>
            <Button size="sm" className='schedule-add-btn' onClick={()=>setIsOpen(true)}
             variant='outline-dark'>일정 추가</Button>
          </div>

          <div className='schedule-content'>
              <ScheduleAddModal isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
          </div>
      </div>
    </div>
  );
};

export default CustomCalendar;