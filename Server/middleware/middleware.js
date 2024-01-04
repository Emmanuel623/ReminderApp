const nodemailer = require('nodemailer');
const { updateNumberOfReminders } = require('../controllers/controllers')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mailingtesting79@gmail.com',
        pass: 'gcuh yxlm esvk kjeu',
    },
});

exports.newAppointmentmail = async (req, res) => {
    try {
        const { todoc, tocon, subject, text } = req.appointmentDataForEmail;
        console.log(todoc, tocon);
        const mailOptions = {
            from: 'mailingtesting79@gmail.com',
            to: [tocon, todoc],
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('Email sent:', info.response);
        });
        res.json({ message: 'Appointment  Added also Email sent to both doctor and patient' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.completed = async (req, res) => {
    try {
        const { todoc, tocon, subject, text } = req.completedappointment;
        const mailOptions = {
            from: 'mailingtesting79@gmail.com',
            to: [tocon, todoc],
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('Email sent:', info.response);
        });
        res.json({ message: 'Appointment  Completed also Email sent to both doctor and patient' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.cancelled = async (req, res) => {
    try {
        const { todoc, tocon, subject, text } = req.cancelledappointment;
        const mailOptions = {
            from: 'mailingtesting79@gmail.com',
            to: [tocon, todoc],
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('Email sent:', info.response);
        });
        res.json({ message: 'Appointment  Cancelled also Email sent to both doctor and patient' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.rescheduled = async (req, res) => {
    try {
        const { todoc, tocon, subject, text } = req.rescheduledappointment;
        const mailOptions = {
            from: 'mailingtesting79@gmail.com',
            to: [tocon, todoc],
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('Email sent:', info.response);
        });
        res.json({ message: 'Appointment  Rescheduled also Email sent to both doctor and patient' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.sendonehrmail = async (data) => {
    const { _id, bookingId, BookingTime, customerEmail, doctorEmail, numberOfReminders } = data;
    const presentTime = new Date(BookingTime.getTime() - 6 * 60 * 60 * 1000 + 30 * 60 * 1000);
    try {

        const { bookingId, BookingTime, customerEmail, doctorEmail, numberOfReminders } = data;
        const subject = 'Reminder mail for one hour before appoinment'
        const text = `Hello we This mail is regarding Appoinment for ${bookingId}:
                            There is one hour more left i.e: ${presentTime} before  your appoinment with doctor
                        Thank you `
        const mailOptions = {
            from: 'So and so Hospital',
            to: [customerEmail, doctorEmail],
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                //return res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                console.log('Email sent:', info.response);
                updateNumberOfReminders(bookingId);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
    console.log("data", data);
}

exports.sendfiveminmail = async (data) => {
    const { _id, bookingId, BookingTime, customerEmail, doctorEmail, numberOfReminders } = data;
    const presentTime = new Date(BookingTime.getTime() - 6 * 60 * 60 * 1000 + 30 * 60 * 1000);
    try {
        const subject = 'Reminder mail for five min before appoinment'
        const text = `Hello we This mail is regarding Appoinment for ${bookingId}:
                            There is 5 minuties more left i.e: ${presentTime} before  your appoinment with doctor
                        Thank you `
        const mailOptions = {
            from: 'So and so Hospital',
            to: [customerEmail, doctorEmail],
            subject: subject,
            text: text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent:', info.response);
                updateNumberOfReminders(bookingId);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
    console.log("data2", data);
}