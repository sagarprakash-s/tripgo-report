import React, { useState } from 'react';

function SeatSelection({ onSeatSelect, selectedSeats = [] }) {
  const [bookedSeats] = useState(['1A', '2C', '3B', '5D', '7A', '8C', '9B']);
  
  const generateSeats = () => {
    const seats = [];
    for (let row = 1; row <= 10; row++) {
      for (let col of ['A', 'B', 'C', 'D']) {
        seats.push(`${row}${col}`);
      }
    }
    return seats;
  };
  
  const [allSeats] = useState(generateSeats());

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    let newSelectedSeats;
    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      newSelectedSeats = [...selectedSeats, seatId];
    }
    onSeatSelect(newSelectedSeats);
  };

  const getSeatClass = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'seat booked';
    if (selectedSeats.includes(seatId)) return 'seat selected';
    return 'seat available';
  };

  return (
    <div className="seat-selection">
      <h4>Select Your Seats</h4>
      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat booked"></div>
          <span>Booked</span>
        </div>
      </div>
      
      <div className="bus-layout">
        <div className="driver-section">
          <div className="driver">🚗 Driver</div>
        </div>
        
        <div className="seats-grid">
          {Array.from({ length: 10 }, (_, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              <div className="row-number">{rowIndex + 1}</div>
              <div className="seat-pair">
                {['A', 'B'].map(col => {
                  const seatId = `${rowIndex + 1}${col}`;
                  return (
                    <div
                      key={seatId}
                      className={getSeatClass(seatId)}
                      onClick={() => handleSeatClick(seatId)}
                      title={`Seat ${seatId}`}
                    >
                      {seatId}
                    </div>
                  );
                })}
              </div>
              <div className="aisle"></div>
              <div className="seat-pair">
                {['C', 'D'].map(col => {
                  const seatId = `${rowIndex + 1}${col}`;
                  return (
                    <div
                      key={seatId}
                      className={getSeatClass(seatId)}
                      onClick={() => handleSeatClick(seatId)}
                      title={`Seat ${seatId}`}
                    >
                      {seatId}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="selection-summary">
        <p>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
        <p>Total Price: ₹{selectedSeats.length * 500}</p>
      </div>
    </div>
  );
}

export default SeatSelection;