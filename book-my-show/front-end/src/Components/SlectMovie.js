import React, { useContext } from 'react';
import { movieList } from '../data';
import RadioComponent from './RadioComponent';
import BsContext from '../BsContext';
import '../css/SelectMovie.css';

const SelectMovie = () => {
  const { changeMovie } = useContext(BsContext);

  return (
    <>
      <h1 className="SM_heading">Select A Movie:</h1>
      <div className="SM_main_container">
        {movieList.map((el, index) => (
          <RadioComponent text={el} key={index} onClick={() => changeMovie(el)} />
        ))}
      </div>
    </>
  );
};

export default SelectMovie;
