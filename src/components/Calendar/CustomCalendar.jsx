import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const CustomCalendar = () => {
  const [value, setValue] = useState(new Date());

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default CustomCalendar;