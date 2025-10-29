import React, { useState } from "react";
import axios from "axios";
import SeatSelection from "./SeatSelection";

function BookingForm({ onBookingAdded }) {
    const [form, setForm] = useState({
        passengerName: "",
        departure: "",
        destination: "",
        travelDate: "",
        phoneNumber: "",
        email: ""
    });
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showSeatSelection, setShowSeatSelection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const calculatePrice = (seatCount) => {
        const basePrice = 500;
        return seatCount * basePrice;
    };

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
    };

    const handleProceedToSeatSelection = () => {
        if (!form.departure || !form.destination || !form.travelDate) {
            setError("Please fill in departure, destination, and travel date first.");
            return;
        }
        setShowSeatSelection(true);
        setError("");
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        if (selectedSeats.length === 0) {
            setError("Please select at least one seat.");
            setLoading(false);
            return;
        }
        
        try {
            const bookingData = {
                ...form,
                selectedSeats: selectedSeats,
                numberOfSeats: selectedSeats.length,
                totalPrice: calculatePrice(selectedSeats.length)
            };
            
            await axios.post("http://localhost:8080/api/bookings", bookingData);
            alert(`Booking confirmed! Seats: ${selectedSeats.join(', ')} - Total Price: ₹${bookingData.totalPrice}`);
            
            setForm({
                passengerName: "",
                departure: "",
                destination: "",
                travelDate: "",
                phoneNumber: "",
                email: ""
            });
            setSelectedSeats([]);
            setShowSeatSelection(false);
            
            if (onBookingAdded) onBookingAdded();
        } catch (error) {
            setError("Failed to create booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-form">
            <h3>Book Your Bus Ticket</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input 
                        name="passengerName" 
                        placeholder="Passenger Name" 
                        value={form.passengerName}
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        name="phoneNumber" 
                        placeholder="Phone Number" 
                        value={form.phoneNumber}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-row">
                    <input 
                        name="email" 
                        type="email"
                        placeholder="Email Address" 
                        value={form.email}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-row">
                    <select name="departure" value={form.departure} onChange={handleChange} required>
                        <option value="">Select Departure City</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                    </select>
                    <select name="destination" value={form.destination} onChange={handleChange} required>
                        <option value="">Select Destination City</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                    </select>
                </div>
                <div className="form-row">
                    <input 
                        type="date" 
                        name="travelDate" 
                        value={form.travelDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleChange} 
                        required 
                    />
                    <button 
                        type="button" 
                        className="seat-select-btn"
                        onClick={handleProceedToSeatSelection}
                        disabled={!form.departure || !form.destination || !form.travelDate}
                    >
                        Select Seats
                    </button>
                </div>
                
                {showSeatSelection && (
                    <SeatSelection 
                        onSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                    />
                )}
                
                {selectedSeats.length > 0 && (
                    <div className="price-display">
                        Selected Seats: {selectedSeats.join(', ')} | Total Price: ₹{calculatePrice(selectedSeats.length)}
                    </div>
                )}
                
                <button type="submit" disabled={loading || selectedSeats.length === 0}>
                    {loading ? "Booking..." : "Confirm Booking"}
                </button>
            </form>
        </div>
    );
}
export default BookingForm;