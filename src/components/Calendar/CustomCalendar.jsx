import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CustomCalendar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ScheduleAddModal from '../ScheduleAddModal/ScheduleAddModal';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import AlertOkModal from '../AlertOkModal/AlertOkModal';
const CustomCalendar = ({ socket, token }) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [scheduleCounts, setScheduleCounts] = useState([]);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState("")
  const onChange = (nextValue) => {
    setDate(nextValue);
  };

  useEffect(() => {
    socket.emit("schedule", token, date, (res) => {
      setSchedules(res);
    })
  }, [date])

  useEffect(() => {
    socket.on("refreshScheduleAndCount", (schedules, scheduleCounts) => {
      setDate(new Date());
      setSchedules(schedules);
      setScheduleCounts(scheduleCounts);
    });

    socket.emit("getScheduleCountForMonth", token, date, (res) => {
      setScheduleCounts(res);
    })
  }, [socket])


  // 일정완료 버튼 클릭 이벤트
  const handleItemClick = (index) => {
    const newSchedules = schedules.map((schedule, i) => {
      if (i == index) {
        return { ...schedule, success: !schedule.success };
      }
      return schedule;
    })

    setSchedules(newSchedules);

    socket.emit("ScheduleChangeSuccess", schedules[index]._id);
  }

  //캘린더의 월이 바뀔때 일별 스케줄 개수 가져오기
  const monthChange = ({ activeStartDate, view }) => {
    if (view === "month") {
      socket.emit("getScheduleCountForMonth", token, activeStartDate, (res) => {
        setScheduleCounts(res);
      })
    }
  }

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      // date 객체를 ISO 문자열로 변환
      const dateStr = date.toISOString().split('T')[0]; // "2024-02-22"

      // ISO 8601 형식의 키 값을 로컬 시간대 날짜로 변환하여 비교
      const data = scheduleCounts[dateStr];
      if (data) {
        // 데이터가 있다면 표시합니다.
        return <p className='schedule-count'>{data}</p>;
      }
    }
    return null;
  };

  const deleteSchedule = () => {
    socket.emit("deleteSchedule", deleteScheduleId, (res) => {
      setAlertIsOpen(false);

      socket.emit("schedule", token, date, (res) => {
        setSchedules(res);
      })
      socket.emit("getScheduleCountForMonth", token, date, (res) => {
        setScheduleCounts(res);
      })
    })
  }

  return (
    <div className="calendar-container">

      <Calendar onChange={onChange}
        value={date}
        formatDay={(locale, date) => moment(date).format("DD")}
        onActiveStartDateChange={monthChange}
        tileContent={tileContent}
      />



      <div className='schedule'>
        <div className='schedule-header'>
          <h3>일정</h3>
          <Button size="sm" className='schedule-add-btn' onClick={() => setIsOpen(true)}
            variant='outline-dark'>일정 추가</Button>
        </div>

        <div className='schedule-list'>
          {schedules.map((schedule, index) => (
            <div className='schedule-content'
              key={index}
              onClick={() => handleItemClick(index)}
            >
              <div className='schedule-close-btn'
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteScheduleId(schedule._id)
                  setAlertIsOpen(true)
                }}>x</div>
              <div className='message-and-btn'>
                <Form.Check
                  type="checkbox"
                  checked={schedule.success}
                  onChange={() => handleItemClick(index)} />
                {schedule.success ? <div className='message'><del style={{ color: "#d0d0d0" }}>{schedule.message}</del></div> :
                  <div className='message'>{schedule.message}</div>}


              </div>
            </div>
          ))}

          <ScheduleAddModal socket={socket} token={token}
            isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <AlertOkModal isOpen={alertIsOpen} message="삭제하시겠습니까?"
            onClose={() => setAlertIsOpen(false)} success={deleteSchedule} />
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;