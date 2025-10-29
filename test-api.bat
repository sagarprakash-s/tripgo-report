@echo off
echo Testing Bus Booking API...
echo.

echo 1. Testing GET all bookings:
curl -X GET http://localhost:8080/api/bookings
echo.
echo.

echo 2. Testing POST create booking:
curl -X POST http://localhost:8080/api/bookings ^
  -H "Content-Type: application/json" ^
  -d "{\"passengerName\":\"Test User\",\"departure\":\"Mumbai\",\"destination\":\"Delhi\",\"travelDate\":\"2024-12-01\",\"phoneNumber\":\"9876543210\",\"email\":\"test@example.com\",\"numberOfSeats\":2}"
echo.
echo.

echo 3. Testing GET bookings count:
curl -X GET http://localhost:8080/api/bookings/count
echo.
echo.

echo 4. Testing search by departure:
curl -X GET "http://localhost:8080/api/bookings/search?departure=Mumbai"
echo.
echo.

echo API testing completed!
pause