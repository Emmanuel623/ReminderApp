const mongoose = require('mongoose');

const bookingDetailsSchema = new mongoose.Schema({
    usernameDoctor: String,
    accId: String,
    doctorEmail: String,
    doctorTimezone: String,
    bookedServicesData: [{
        bookingId: String,
        orderId: String,
        customerEmail: String,
        customerPhoneNumber: String,
        customerName: String,
        serviceTitle: String,
        transactionId: String,
        isRescheduled: { type: Boolean, default: false },
        isCancelled: { type: Boolean, default: false },
        numberOfReschedules: { type: Number, default: 0 },
        rescheduledBy: { type: String, default: null },
        transactionStatus: String,
        bookingStatus: { type: String, default: 'pending' },
        meetingStartTime: String,
        meetingEndTime: String,
        date: {
            day: Number,
            month: String,
            weekDay: String
        },
        customerTimezone: String,
        location: {
            country: String,
            city: String,
            state: String
        },
        correlationId: String
    }]
});

const reminderSchema = new mongoose.Schema({
    bookingId: String,
    BookingTime: String,
    doctorEmail: String,
    customerEmail: String,
    numberOfReminders: Number,
    lastReminderSentTime: String,
    isReminderSuccessful: Boolean,
});

const BookingDetails = mongoose.model('BookingDetails', bookingDetailsSchema);
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = {
    BookingDetails,
    Reminder
}