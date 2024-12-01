import React, { useContext } from 'react';
import { seats } from '../data';
import BsContext from '../BsContext';
import '../css/SelectSeats.css';

const SelectSeats = () => {
  const { noOfSeats, changeNoOfSeats } = useContext(BsContext);

  const handleChange = (seat, value) => {
    changeNoOfSeats((prev) => ({
      ...prev,
      [seat]: value,
    }));
  };

  return (
    <div className="SS_wrapper">
      <h1 className="SS_heading">Select Seats:</h1>
      <div className="SS_main_container">
        {seats.map((seat, index) => (
          <div className="seat" key={index}>
            <span>{seat}</span>
            <input
              type="number"
              className="seats-input"
              value={noOfSeats[seat]}
              onChange={(e) => handleChange(seat, e.target.value)}
              min="0"
              max="30"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectSeats;
