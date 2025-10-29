import React, { useState, useEffect } from "react";
import BookingForm from "./components/BookingForm";
import BookingsList from "./components/BookingsList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import './App.css';

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [user, setUser] = useState(null);
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleBookingAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    if (!user) {
        return showSignup ? (
            <Signup switchToLogin={() => setShowSignup(false)} />
        ) : (
            <Login onLogin={handleLogin} switchToSignup={() => setShowSignup(true)} />
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <div className="header-info">
                        <h1>🚌 Bus Booking System</h1>
                        <p>Welcome back, {user.fullName}!</p>
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user.username}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            
            <main className="app-main">
                <div className="container">
                    <BookingForm onBookingAdded={handleBookingAdded} />
                    <BookingsList refreshTrigger={refreshTrigger} />
                </div>
            </main>
            
            <footer className="app-footer">
                <p>&copy; 2024 Bus Booking System. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default App;
