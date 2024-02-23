import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CustomCalendar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ScheduleAddModal from '../ScheduleAddModal/ScheduleAddModal';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import { set } from 'date-fns';
const CustomCalendar = ({socket,token}) => {
  const [date, setDate] = useState(new Date());
  const [isOpen,setIsOpen]=useState(false);
  const [schedules,setSchedules]=useState([]);
  const onChange = (nextValue) => {
    setDate(nextValue);
  };

  useEffect(()=>{
    socket.emit("schedule",token,date,(res)=>{
      console.log("res=",res);
     setSchedules(res); 
    })
  },[date])

  const handleItemClick=(index)=>{
    const newSchedules=schedules.map((schedule,i)=>{
      if(i==index){
        return {...schedule,success:!schedule.success};
      }
      return schedule;
    })

    setSchedules(newSchedules);

    socket.emit("ScheduleChangeSuccess",schedules[index]._id);
  }

  return (
    <div className="calendar-container">

        <Calendar onChange={onChange}
         value={date}
        formatDay={(locale,date)=>moment(date).format("DD")}
         />



      <div className='schedule'>
          <div className='schedule-header'>
            <h3>일정</h3>
            <Button size="sm" className='schedule-add-btn' onClick={()=>setIsOpen(true)}
             variant='outline-dark'>일정 추가</Button>
          </div>

          <div className='schedule-list'>
            {schedules.map((schedule,index)=>(
              <div className='schedule-content'
                key={index}
                onClick={()=>handleItemClick(index)}
                >
              <div className='schedule-close-btn'>x</div>
            <div className='message-and-btn'>
              <div className='message'>{schedule.message}</div>
              <Form.Check 
                type="checkbox"
                checked={schedule.success}
                onClick={()=>handleItemClick(index)}/>
            </div>
          </div>
            ))}
              
              <ScheduleAddModal socket={socket} token={token}
               isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
          </div>
      </div>
    </div>
  );
};

export default CustomCalendar;