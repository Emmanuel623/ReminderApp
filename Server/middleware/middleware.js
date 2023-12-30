const nodemailer = require('nodemailer');

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