package com.busbooking.service;

import com.busbooking.model.Booking;
import com.busbooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    public Booking updateBooking(String id, Booking booking) {
        booking.setId(id);
        return bookingRepository.save(booking);
    }

    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }

    public List<Booking> searchBookings(String departure, String destination, String passengerName) {
        if (departure != null && !departure.isEmpty()) {
            return bookingRepository.findByDepartureContainingIgnoreCase(departure);
        }
        if (destination != null && !destination.isEmpty()) {
            return bookingRepository.findByDestinationContainingIgnoreCase(destination);
        }
        if (passengerName != null && !passengerName.isEmpty()) {
            return bookingRepository.findByPassengerNameContainingIgnoreCase(passengerName);
        }
        return getAllBookings();
    }

    public long getBookingCount() {
        return bookingRepository.count();
    }
}