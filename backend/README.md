# Bus Booking Backend

Node.js backend for the bus booking system using Express and MongoDB.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure MongoDB:**
   - Update the `.env` file with your MongoDB connection string
   - Replace `your-username` and `your-password` with your actual MongoDB credentials

3. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `GET /api/bookings/search?departure=&destination=&passengerName=` - Search bookings
- `GET /api/bookings/count` - Get total bookings count
- `GET /api/health` - Health check

## Environment Variables

Create a `.env` file with:
```
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/busbooking
```