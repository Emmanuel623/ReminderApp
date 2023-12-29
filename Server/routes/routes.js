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


// router.get('/api/booking-details', service.rescheduleBooking);
// router.get('/api/booking-details', service.cancelBooking);
// router.get('/api/booking-details', service.updateNumberOfReminders);
// router.get('/api/booking-details', service.completeAppointment);


module.exports = { router };