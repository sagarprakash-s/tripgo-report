import React, { useState } from 'react';
import axios from 'axios';

function BookingSearch({ onSearchResults }) {
    const [searchForm, setSearchForm] = useState({
        departure: '',
        destination: '',
        passengerName: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const params = new URLSearchParams();
            if (searchForm.departure) params.append('departure', searchForm.departure);
            if (searchForm.destination) params.append('destination', searchForm.destination);
            if (searchForm.passengerName) params.append('passengerName', searchForm.passengerName);

            const response = await axios.get(`http://localhost:8080/api/bookings/search?${params}`);
            onSearchResults(response.data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchForm({
            departure: '',
            destination: '',
            passengerName: ''
        });
        onSearchResults(null); // This will trigger showing all bookings
    };

    return (
        <div className="booking-search">
            <h4>Search Bookings</h4>
            <form onSubmit={handleSearch}>
                <div className="search-row">
                    <select 
                        name="departure" 
                        value={searchForm.departure} 
                        onChange={handleChange}
                    >
                        <option value="">Any Departure</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                    </select>
                    <select 
                        name="destination" 
                        value={searchForm.destination} 
                        onChange={handleChange}
                    >
                        <option value="">Any Destination</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                    </select>
                </div>
                <div className="search-row">
                    <input
                        name="passengerName"
                        placeholder="Search by passenger name"
                        value={searchForm.passengerName}
                        onChange={handleChange}
                    />
                </div>
                <div className="search-buttons">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                    <button type="button" onClick={handleClearSearch} className="clear-btn">
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookingSearch;