
const { BookingDetails, Reminder } = require('../models/models');

//find all users
exports.findAllDetails = async (req, res) => {
    try {
        const usersinfo = await BookingDetails.find();
        //console.log(usersinfo);
        res.json(usersinfo);
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'An error occurred while fetching user.' });
    }
};

//find booking by booking id
exports.findDetailsById = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const bookingDetails = await BookingDetails.findOne({
            'bookedServicesData.bookingId': bookingId,
        });
        if (!bookingDetails) {
            return res.status(404).json({ message: `Booking with ID ${bookingId} not found.` });
        }
        return res.status(200).json({ bookingDetails });
    } catch (error) {
        console.error('Error finding booking details:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


//find all customers and there emails
exports.findAllCustomers = async (req, res) => {
    try {
        const customers = await BookingDetails.find({
            'bookedServicesData.customerEmail': { $exists: true },
        }, { 'bookedServicesData.customerName': 1, 'bookedServicesData.customerEmail': 1, _id: 0 });

        return res.status(200).json({ customers });
    } catch (error) {
        console.error('Error finding customers:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



//find all doctors and there emails
exports.findAllDoctors = async (req, res) => {
    try {
        const doctors = await BookingDetails.find(
            { 'doctorEmail': { $exists: true } },
            { 'usernameDoctor': true, 'doctorEmail': true, _id: 0 }
        );
        //console.log(doctors)
        return res.status(200).json({ doctors });
    } catch (error) {
        console.error('Error finding doctors:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}




//find all reminders 
exports.findAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        return res.status(200).json({ reminders });
    } catch (error) {
        console.error('Error finding reminders:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


//find reminder by id
exports.findRemindersForBooking = async (req, res) => {
    const { bookingId } = req.params; // Assuming the booking ID is part of the request parameters
    try {
        const remindersForBooking = await Reminder.find({ bookingId });

        if (!remindersForBooking || remindersForBooking.length === 0) {
            return res.status(404).json({ message: `No reminders found for booking with ID ${bookingId}.` });
        }
        return res.status(200).json({ remindersForBooking });
    } catch (error) {
        console.error('Error finding reminders for booking:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//change booking time
exports.rescheduleBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { newMeetingStartTime, rescheduledBy } = req.body;

    try {
        // Update booking details
        const updatedBooking = await BookingDetails.findOneAndUpdate(
            { 'bookedServicesData.bookingId': bookingId },
            {
                $set: {
                    'bookedServicesData.$.meetingStartTime': newMeetingStartTime,
                    'bookedServicesData.$.isRescheduled': true,
                    'bookedServicesData.$.rescheduledBy': rescheduledBy,
                },
            },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: `Booking with ID ${bookingId} not found.` });
        }

        // Update reminder
        const updatedReminder = await Reminder.findOneAndUpdate(
            { bookingId },
            {
                $set: {
                    BookingTime: newMeetingStartTime,
                },
            },
            { new: true }
        );

        if (!updatedReminder) {
            return res.status(404).json({ message: `Booking with ID ${bookingId} not found.` });
        }

        return res.status(200).json({ updatedBooking, updatedReminder });
    } catch (error) {
        console.error('Error rescheduling booking:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


//canceling booking
exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        // Update booking details
        const updatedBooking = await BookingDetails.findOneAndUpdate(
            { 'bookedServicesData.bookingId': bookingId },
            {
                $set: {
                    'bookedServicesData.$.isCancelled': true,
                },
            },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: `Booking with ID ${bookingId} not found.` });
        }

        // Remove reminder
        const removedReminder = await Reminder.findOneAndDelete({ bookingId });

        if (!removedReminder) {
            return res.status(404).json({ message: `Booking with ID ${bookingId} not found.` });
        }

        return res.status(200).json({ updatedBooking, removedReminder });
    } catch (error) {
        console.error('Error canceling booking:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


//update reminder sent number of time 
exports.updateNumberOfReminders = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Update reminder
        const updatedReminder = await Reminder.findOneAndUpdate(
            { bookingId },
            {
                $inc: {
                    numberOfReminders: 1, // Increment the numberOfReminders field by 1
                },
            },
            { new: true }
        );

        if (!updatedReminder) {
            return res.status(404).json({ message: `Reminder for booking with ID ${bookingId} not found.` });
        }

        return res.status(200).json({ updatedReminder });
    } catch (error) {
        console.error('Error updating number of reminders:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


//sucess meeting
exports.completeAppointment = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Delete reminder
        const deletedReminder = await Reminder.findOneAndDelete({ bookingId });

        if (!deletedReminder) {
            return res.status(404).json({ message: `Reminder for booking with ID ${bookingId} not found.` });
        }

        // Update booking details
        const updatedBooking = await BookingDetails.findOneAndUpdate(
            { 'bookedServicesData.bookingId': bookingId },
            {
                $set: {
                    'bookedServicesData.$.transactionStatus': 'success',
                    'bookedServicesData.$.bookingStatus': 'success',
                    'bookedServicesData.$.meetingStartTime': 'success',
                    'bookedServicesData.$.meetingEndTime': 'success',
                },
            },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: `Booking with ID ${bookingId} not found.` });
        }

        return res.status(200).json({ deletedReminder, updatedBooking });
    } catch (error) {
        console.error('Error completing appointment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

