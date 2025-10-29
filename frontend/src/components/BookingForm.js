import React, { useState } from "react";
import axios from "axios";

function BookingForm({ onBookingAdded }) {
    const [form, setForm] = useState({
        passengerName: "",
        departure: "",
        destination: "",
        travelDate: "",
        phoneNumber: "",
        email: "",
        numberOfSeats: 1
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = e => {
        const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const calculatePrice = (seats) => {
        const basePrice = 500;
        return seats * basePrice;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const bookingData = {
                ...form,
                totalPrice: calculatePrice(form.numberOfSeats)
            };
            
            await axios.post("http://localhost:8080/api/bookings", bookingData);
            alert(`Booking confirmed! ${form.numberOfSeats} seat(s) - Total Price: ₹${bookingData.totalPrice}`);
            
            setForm({
                passengerName: "",
                departure: "",
                destination: "",
                travelDate: "",
                phoneNumber: "",
                email: "",
                numberOfSeats: 1
            });
            
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
                    <input 
                        name="numberOfSeats" 
                        type="number"
                        min="1"
                        max="10"
                        placeholder="Number of Seats" 
                        value={form.numberOfSeats}
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
                </div>
                
                <div className="price-display">
                    Total Price: ₹{calculatePrice(form.numberOfSeats)}
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? "Booking..." : "Confirm Booking"}
                </button>
            </form>
        </div>
    );
}
export default BookingForm;
