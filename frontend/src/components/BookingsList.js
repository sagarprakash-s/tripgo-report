import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingSearch from "./BookingSearch";

function BookingsList({ refreshTrigger }) {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/bookings");
            setBookings(response.data);
            setFilteredBookings(response.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [refreshTrigger]);

    const handleSearchResults = (searchResults) => {
        if (searchResults === null) {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(searchResults);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                await axios.delete(`http://localhost:8080/api/bookings/${id}`);
                const updatedBookings = bookings.filter(b => b.id !== id);
                setBookings(updatedBookings);
                setFilteredBookings(filteredBookings.filter(b => b.id !== id));
                alert("Booking cancelled successfully!");
            } catch (err) {
                alert("Failed to cancel booking");
            }
        }
    };

    if (loading) return <div className="loading">Loading bookings...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="bookings-list">
            <h3>All Bookings ({bookings.length})</h3>
            <BookingSearch onSearchResults={handleSearchResults} />
            {filteredBookings.length === 0 ? (
                <p className="no-bookings">No bookings found</p>
            ) : (
                <div className="bookings-grid">
                    <div className="results-info">
                        Showing {filteredBookings.length} of {bookings.length} bookings
                    </div>
                    {filteredBookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-header">
                                <h4>{booking.passengerName}</h4>
                                <span className={`status ${booking.status?.toLowerCase()}`}>
                                    {booking.status || 'CONFIRMED'}
                                </span>
                            </div>
                            <div className="booking-details">
                                <div className="route">
                                    <strong>{booking.departure}</strong> → <strong>{booking.destination}</strong>
                                </div>
                                <div className="travel-date">
                                    Travel Date: {new Date(booking.travelDate).toLocaleDateString()}
                                </div>
                                <div className="booking-info">
                                    <span>Seats: {booking.numberOfSeats || 1}</span>
                                    <span>Price: ₹{booking.totalPrice || 500}</span>
                                </div>
                                {booking.phoneNumber && (
                                    <div className="contact-info">
                                        <span>Phone: {booking.phoneNumber}</span>
                                    </div>
                                )}
                                {booking.email && (
                                    <div className="contact-info">
                                        <span>Email: {booking.email}</span>
                                    </div>
                                )}
                                <div className="booking-date">
                                    Booked on: {new Date(booking.bookingDate || Date.now()).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="booking-actions">
                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDelete(booking.id)}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default BookingsList;
