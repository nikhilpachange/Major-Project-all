import React from 'react';
import '../css/RadioComponent.css';

const RadioComponent = ({ text, onClick }) => {
  return (
    <div className="form-check-label" onClick={onClick}>
      <span>{text}</span>
    </div>
  );
};

export default RadioComponent;
