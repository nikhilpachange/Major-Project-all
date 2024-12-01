import React, { useContext } from 'react';
import { slots } from '../data';
import RadioComponent from './RadioComponent';
import BsContext from '../BsContext';
import '../css/TimeSchedule.css';

const TimeSchedule = () => {
  const { changeTime } = useContext(BsContext);

  return (
    <div className="Slot_container">
      <h1 className="TS_heading">Select a Schedule</h1>
      <div className="TS_main_container">
        {slots.map((slot, index) => (
          <RadioComponent text={slot} key={index} onClick={() => changeTime(slot)} />
        ))}
      </div>
    </div>
  );
};

export default TimeSchedule;
