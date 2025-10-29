const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  passengerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  departure: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  travelDate: {
    type: Date,
    required: true
  },
  numberOfSeats: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  selectedSeats: {
    type: [String],
    default: []
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'CONFIRMED',
    enum: ['CONFIRMED', 'CANCELLED']
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);