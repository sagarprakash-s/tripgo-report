package com.busbooking.repository;

import com.busbooking.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByDepartureContainingIgnoreCase(String departure);
    List<Booking> findByDestinationContainingIgnoreCase(String destination);
    List<Booking> findByPassengerNameContainingIgnoreCase(String passengerName);
    
    @Query("{ $or: [ " +
           "{ 'departure': { $regex: ?0, $options: 'i' } }, " +
           "{ 'destination': { $regex: ?1, $options: 'i' } }, " +
           "{ 'passengerName': { $regex: ?2, $options: 'i' } } ] }")
    List<Booking> findBySearchCriteria(String departure, String destination, String passengerName);
}