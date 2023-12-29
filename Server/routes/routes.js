const express = require('express');
const router = express.Router();

const { findAllDetails,
    findDetailsById,
    findAllCustomers,
    findAllDoctors,
    findAllReminders,
    findRemindersForBooking,
    rescheduleBooking,
    cancelBooking,
    updateNumberOfReminders,
    completeAppointment } = require('../controllers/controllers')




//gettig details from 
router.get('/api/booking-details', findAllDetails);//working

//getting boking details by id
router.get('/api/booking-details/:bookingId', findDetailsById);//working

//finding all customers
router.get('/api/customers', findAllCustomers);//working

//finding all doctors
router.get('/api/doctors', findAllDoctors);//working

//finding all reminder 
router.get('/api/reminders', findAllReminders);

//finding reminder by id
router.get('/api/reminders/:bookingId', findRemindersForBooking);

//changing schedule
router.put('/api/reschedule/:bookingId', rescheduleBooking);

//cancelling booking 
router.delete('/api/cancel/:bookingId', cancelBooking);

//update reminder sent when a reminder is succesfully sent
router.put('/api/reminders/:bookingId', updateNumberOfReminders);

//after apointmnet complete change appointmeents
router.put('/api/booking-details/:bookingId', completeAppointment);



module.exports = { router };