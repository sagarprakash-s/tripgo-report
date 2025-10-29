# Bus Booking System

A full-stack web application for booking bus tickets built with Spring Boot (backend) and React (frontend).

## Features

### Backend (Spring Boot)
- RESTful API for booking management
- MongoDB integration for data persistence
- CRUD operations for bookings
- Search functionality by departure, destination, and passenger name
- Service layer architecture
- CORS configuration for frontend integration

### Frontend (React)
- Modern, responsive UI with gradient design
- Booking form with validation
- Real-time booking list with search functionality
- Delete/cancel booking functionality
- Price calculation
- Mobile-friendly design

## Technology Stack

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS

### Frontend
- React 18
- Axios for HTTP requests
- CSS3 with modern styling

### Database
- MongoDB (Cloud)

## Project Structure

```
demo/
├── backend/
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── server.js       # Main server file
│   ├── package.json
│   └── .env           # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 14 or higher
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure MongoDB connection in `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/busbooking
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The frontend will start on `http://localhost:3000`

### Database Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster and database named `busbooking`
3. Get your connection string and update the `.env` file
4. Collections will be created automatically when you add your first booking

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Delete booking
- `GET /api/bookings/departure/{departure}` - Get bookings by departure city
- `GET /api/bookings/search` - Search bookings with query parameters
- `GET /api/bookings/count` - Get total bookings count

### Search Parameters
- `departure` - Filter by departure city
- `destination` - Filter by destination city
- `passengerName` - Filter by passenger name

## Usage

1. **Create Booking**: Fill out the booking form with passenger details, route, and travel date
2. **View Bookings**: All bookings are displayed in a card layout with detailed information
3. **Search Bookings**: Use the search form to filter bookings by various criteria
4. **Cancel Booking**: Click the "Cancel Booking" button to delete a booking

## Features in Detail

### Booking Form
- Passenger name, phone, and email validation
- Dropdown selection for departure and destination cities
- Date picker with minimum date validation
- Seat selection (1-10 seats)
- Real-time price calculation (₹500 per seat)

### Booking Management
- View all bookings with complete details
- Search and filter functionality
- Delete bookings with confirmation
- Responsive card-based layout

### Cities Supported
- Mumbai
- Delhi
- Bangalore
- Chennai
- Kolkata
- Pune

## Development

### Adding New Cities
1. Update the city options in both `BookingForm.js` and `BookingSearch.js`
2. No backend changes required

### Customizing Price
- Modify the `BASE_PRICE` constant in `BookingService.java`
- Update the `calculatePrice` function in `BookingForm.js`

## Troubleshooting

### Common Issues
1. **CORS Error**: Make sure the backend CORS configuration allows `http://localhost:3000`
2. **MongoDB Connection**: Ensure MongoDB is running on the default port 27017
3. **Port Conflicts**: Backend runs on 8080, frontend on 3000

### Logs
- Backend logs: Check console output when running `mvn spring-boot:run`
- Frontend logs: Check browser console for any JavaScript errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.