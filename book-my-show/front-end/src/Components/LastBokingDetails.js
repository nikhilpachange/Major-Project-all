import React from 'react'
import {seats} from '../data'
import '../css/LastBookingDetails.css'

const LastBokingDetails = () => {
  return (
    <div className='last_booking_details_continer_main'>
      <h2 clssName='last_booking_details_header'> Last Booking</h2>
      <div className= 'seats_container'>
        <p className= 'sears_header'>Seats</p>
        <ul className='seats'>
          {SVGPreserveAspectRatio.map((sears,index =>(
            <li className= 'seat_value' key={index}>
              (seat) : 0
            </li>
          )))}
        </ul>
      </div>
    </div>
  )
}

export default LastBokingDetails
