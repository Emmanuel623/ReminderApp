import { useEffect, useState } from "react";
import './App.css';
import { MdClose } from "react-icons/md"
import axios, { AxiosError } from "axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

axios.defaults.baseURL = "https://reminderapp-backend.onrender.com";
//axios.defaults.baseURL = "http://localhost:8080";

function App() {

    //sections and there visibilities
    const [addsection, setAddSection] = useState(false);
    const [bookingsection, setBooking] = useState(true);
    const [doctorsection, setDoctor] = useState(false);
    const [customersection, setCustomer] = useState(false);
    const [remindersection, setReminder] = useState(false);
    const [remindsection, setRemind] = useState(false);
    const [viewsection, setviewSection] = useState(false);
    const [editsection, setEditSection] = useState(false);

    //date
    const [selectedDateTime, setSelectedDateTime] = useState(null);


    //retrived data usestates
    const [dataList, setDataList] = useState([]);
    const [doctorsData, setDoctorsData] = useState([]);
    const [customersData, setCustomersData] = useState([]);
    const [remindersData, setRemindersData] = useState([]);
    const [bookingData, setBookingData] = useState([]);

    //submit and changing functions 
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await axios.post('/api/booking-details', data);
            alert(response.data.message)
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handleDateChange = (date) => {
        try {
            if (date instanceof Date && !isNaN(date)) {
                setSelectedDateTime(date);
            } else {
                console.error('Invalid date:', date);
            }
        } catch (error) {
            console.error('Error handling date change:', error);
        }
    };

    const handlechange = async (e, id) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/api/reschedule/${id}`, {
                selectedDateTime: selectedDateTime.toISOString(),
            });
            alert(response.data.message)
        } catch (error) {
            console.error('Error:', error);
            alert('Error:', error);
        }
    };

    //functions to be called for fetching data in
    const Getdoctors = async () => {
        try {
            const data = await axios.get('/api/doctors');
            if (data.status === 200) {
                setDoctorsData(data.data);
            }
        }
        catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }
    const Getcustumers = async () => {
        try {
            const data = await axios.get('/api/customers');
            if (data.status === 200) {
                const datanew = [];
                data.data.customers.forEach((ele) => {
                    datanew.push(ele.bookedServicesData[0])
                });
                setCustomersData(datanew);
            }
        }
        catch (error) {
            console.error('Error fetching customers:', error);
        }
    }
    const Getreminders = async () => {
        try {
            const data = await axios.get('/api/reminders');
            if (data.status === 200) {
                setRemindersData(data.data.reminders);
            }
        }
        catch (error) {
            console.error('Error fetching reminders:', error);
        }
    }

    const Getbooking = async (id) => {
        try {
            const data = await axios.get(`/api/booking-details/${id}`);
            if (data.status === 200) {
                setBookingData(data.data.bookingDetails);
            }
        }
        catch (error) {
            console.error('Error fetching booking:', error);
        }
    }
    const Getbookings = async () => {
        try {
            const data = await axios.get('/api/booking-details');
            if (data.status === 200) {
                setDataList(data.data)
            }
        }
        catch (error) {
            console.error('Error fetching bookings:', error);
            // Handle the error (e.g., show a user-friendly message)
        }
    }

    const Success = async (bookingId) => {
        try {
            const response = await axios.put(`/api/booking-details/${bookingId}`);
            alert(response.data.message)
        } catch (error) {
            console.error('Error:', error);
        }
        Getbookings();
        Getreminders();
        Getdoctors();
        Getcustumers();
    };
    const Canceled = async (bookingId) => {
        try {
            const response = await axios.delete(`/api/cancel/${bookingId}`);
            alert(response.data.message)
        } catch (error) {
            console.error('Error:', error);
        }
        Getbookings();
        Getreminders();
        Getdoctors();
        Getcustumers();
    };


    //useeffect for getting details
    useEffect(() => {
        Getbookings();
        Getreminders();
        Getdoctors();
        Getcustumers();
    }, [])


    //handling  hidding buttons onclick
    async function veiwclick(id) {
        await Getbooking(id);
        setAddSection(false);
        setBooking(false);
        setDoctor(false);
        setCustomer(false);
        setReminder(false);
        setRemind(true);
        setEditSection(false);
    }
    async function reschedule(id) {
        await Getbooking(id);
        setAddSection(false);
        setBooking(false);
        setDoctor(false);
        setCustomer(false);
        setReminder(false);
        setRemind(false);
        setEditSection(true);
    }
    function addclick() {
        setAddSection(true);
        setBooking(false);
        setDoctor(false);
        setCustomer(false);
        setReminder(false);
        setRemind(false);
        setviewSection(false)
        setEditSection(false);
        Getbookings();
        Getreminders();
        Getdoctors();
        Getcustumers();
    }

    function bookingclick() {
        setAddSection(false);
        setBooking(true);
        setDoctor(false);
        setCustomer(false);
        setReminder(false);
        setRemind(false)
        setviewSection(false)
        setEditSection(false);
    }
    function doctorclick() {
        setAddSection(false);
        setBooking(false);
        setDoctor(true);
        setCustomer(false);
        setReminder(false);
        setRemind(false)
        setviewSection(false)
        setEditSection(false);
    }
    function customerclick() {
        setAddSection(false);
        setBooking(false);
        setDoctor(false);
        setCustomer(true);
        setReminder(false);
        setRemind(false)
        setviewSection(false)
        setEditSection(false);
    }
    function Reminderclick() {
        setAddSection(false);
        setBooking(false);
        setDoctor(false);
        setCustomer(false);
        setReminder(true);
        setRemind(false)
        setviewSection(false)
        setEditSection(false);
    }
    function closeviewclick() {
        setAddSection(false);
        setBooking(true);
        setDoctor(false);
        setCustomer(false);
        setReminder(false);
        setRemind(false);
        setviewSection(false)
        setEditSection(false);
    }

    return (
        <>
            <div className="container">
                <ul className="nav-list">
                    <li className="nav-item">
                        <div className="btn btn-add">
                            <img src="data:image/jpeg;base64,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" />
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="btn btn-add" onClick={() => addclick()}>GET Appointment</div>
                    </li>
                    <li className="nav-item">
                        <div className="btn" onClick={() => bookingclick()}>ALL BOOKINGS</div>
                    </li>
                    <li className="nav-item">
                        <div className="btn" onClick={() => doctorclick()}>DOCTORS LIST</div>
                    </li>
                    <li className="nav-item">
                        <div className="btn" onClick={() => customerclick()}>CUSTOMERS LIST</div>
                    </li>
                    <li className="nav-item">
                        <div className="btn" onClick={() => Reminderclick()}>REMINDERS</div>
                    </li>
                </ul>

                {addsection && (
                    <div className="addcontainer">

                        <form onSubmit={handlesubmit}>
                            <div className="close-btn" onClick={() => setAddSection(false)}><MdClose /></div>
                            <label htmlFor="usernameDoctor">Doctor Name:</label>
                            <input type="text" id="usernameDoctor" name="usernameDoctor" required />

                            <label htmlFor="accId">Doctor ID:</label>
                            <input type="text" id="accId" name="accId" required />

                            <label htmlFor="doctorEmail">Doctor Email:</label>
                            <input type="email" id="doctorEmail" name="doctorEmail" required />

                            <label htmlFor="doctorTimezone">Doctor Timezone:</label>
                            <input type="text" id="doctorTimezone" name="doctorTimezone" required />

                            <label htmlFor="bookingId">Booking ID:</label>
                            <input type="text" id="bookingId" name="bookingId" required />

                            <label htmlFor="orderId">Order ID:</label>
                            <input type="text" id="orderId" name="orderId" required />

                            <label htmlFor="customerEmail">Customer Email:</label>
                            <input type="email" id="customerEmail" name="customerEmail" required />

                            <label htmlFor="customerPhoneNumber">Customer Phone:</label>
                            <input type="text" id="customerPhoneNumber" name="customerPhoneNumber" required />

                            <label htmlFor="customerName">Customer Name:</label>
                            <input type="text" id="customerName" name="customerName" required />

                            <label htmlFor="serviceTitle">Service Title:</label>
                            <input type="text" id="serviceTitle" name="serviceTitle" required />

                            <label htmlFor="transactionId">Transaction ID:</label>
                            <input type="text" id="transactionId" name="transactionId" required />

                            <div className="date-picker-container">
                                <label htmlFor="selectedDateTime">Select Date and Time:</label>
                                <DatePicker
                                    id="selectedDateTime"
                                    name="selectedDateTime"
                                    selected={selectedDateTime}
                                    onChange={(date) => setSelectedDateTime(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                    minDate={new Date()}
                                />
                            </div>

                            <label htmlFor="customerTimezone">Customer Timezone:</label>
                            <input type="text" id="customerTimezone" name="customerTimezone" required />

                            <label htmlFor="country">location:</label>
                            <input type="text" id="location" name="location" required />

                            <label htmlFor="correlationId">Correlation ID:</label>
                            <input type="text" id="correlationId" name="correlationId" required />

                            <button className="btn">Add Appointment</button>
                        </form>
                    </div>
                )
                }
                {
                    bookingsection && (<div className="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bookings</th>
                                    <th>Stuatus</th>
                                    <th>Doctor Name</th>
                                    <th>Patient Name</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.bookedServicesData[0].bookingId}</td>
                                            <td>{ele.bookedServicesData[0].bookingStatus}</td>
                                            <td>{ele.usernameDoctor}</td>
                                            <td>{ele.bookedServicesData[0].customerName}</td>
                                            <td><button className="btn" onClick={() => veiwclick(ele.bookedServicesData[0].bookingId)}>View More</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>)
                }
                {
                    doctorsection && (<div className="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Doctor Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctorsData.doctors.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.usernameDoctor}</td>
                                            <td>{ele.doctorEmail}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>)
                }
                {
                    customersection && (<div className="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Customer Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customersData.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.customerName}</td>
                                            <td>{ele.customerEmail}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>)
                }
                {
                    remindersection && (<div className="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>B.NO</th>
                                    <th>Booking Time</th>
                                    <th>Patient Email</th>
                                    <th>Doctor Email</th>
                                    <th>latest Reminder</th>
                                    <th>Number of Reminders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {remindersData.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.bookingId}</td>
                                            <td>{ele.BookingTime}</td>
                                            <td>{ele.customerEmail}</td>
                                            <td>{ele.doctorEmail}</td>
                                            <td>{ele.lastReminderSentTime}</td>
                                            <td>{ele.numberOfReminders}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>)
                }
                {
                    remindsection && (
                        <>
                            {(
                                <div className="addcontainer" >
                                    <form>
                                        <div>
                                            <div className="btnnew" onClick={() => reschedule(bookingData.bookedServicesData[0].bookingId)}>Reschedule</div>
                                            <div className="btnnew green" onClick={() => Success(bookingData.bookedServicesData[0].bookingId)}>complete</div>
                                            <div className="btnnew red" onClick={() => Canceled(bookingData.bookedServicesData[0].bookingId)}>Cancel</div>
                                        </div>
                                        <div className="close-btn" onClick={() => closeviewclick()}><MdClose /></div>
                                        <label htmlFor="bookingId">Booking ID:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].bookingId} name="bookingId" disabled />

                                        <label htmlFor="orderId">Order ID:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].orderId} name="orderId" disabled />

                                        <label htmlFor="usernameDoctor">Doctor Name:</label>
                                        <input type="text" value={bookingData.usernameDoctor} name="usernameDoctor" disabled />

                                        <label htmlFor="accId">Doctor ID:</label>
                                        <input type="text" value={bookingData.accId} name="accId" disabled />

                                        <label htmlFor="doctorEmail">Doctor Email:</label>
                                        <input type="email" value={bookingData.doctorEmail} name="doctorEmail" disabled />

                                        <label htmlFor="doctorTimezone">Doctor Timezone:</label>
                                        <input type="text" value={bookingData.doctorTimezone} name="doctorTimezone" disabled />

                                        <label htmlFor="customerEmail">Customer Email:</label>
                                        <input type="email" value={bookingData.bookedServicesData[0].customerEmail} name="customerEmail" disabled />

                                        <label htmlFor="customerPhoneNumber">Customer Phone:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].customerPhoneNumber} name="customerPhoneNumber" disabled />

                                        <label htmlFor="customerName">Customer Name:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].customerName} name="customerName" disabled />

                                        <label htmlFor="serviceTitle">Service Title:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].serviceTitle} name="serviceTitle" disabled />

                                        <label htmlFor="transactionId">Transaction ID:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].transactionId} name="transactionId" disabled />

                                        <label htmlFor="dateTime">Date and Time:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].datetime} name="dateTime" disabled />

                                        <label htmlFor="customerTimezone">Customer Timezone:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].customerTimezone} name="customerTimezone" disabled />

                                        <label htmlFor="location">location:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].location} name="location" disabled />

                                        <label htmlFor="transactionStatus">Transaction Status:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].transactionStatus} name="transactionStatus" disabled />

                                        <label htmlFor="bookingStatus">Booking Status:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].bookingStatus} name="bookingStatus" disabled />

                                        <label htmlFor="meetingStartTime">Meeting Start:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].meetingStartTime} name="meetingStartTime" disabled />

                                        <label htmlFor="meetingEndTime">Meeting EndTime:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].meetingEndTime} name="meetingEndTime" disabled />

                                        <label htmlFor="correlationId">Correlation ID:</label>
                                        <input type="text" value={bookingData.bookedServicesData[0].correlationId} name="correlationId" disabled />


                                    </form>
                                </div>
                            )
                            }
                        </>
                    )
                }
                {
                    editsection && (
                        <div className="addcontainer">
                            <form onSubmit={(e) => handlechange(e, bookingData.bookedServicesData[0].bookingId)}>
                                <div className="close-btn" onClick={() => setEditSection(false)}><MdClose /></div>
                                <label htmlFor="bookingId">Booking ID:</label>
                                <input type="text" value={bookingData.bookedServicesData[0].bookingId} name="bookingId" disabled />

                                <label htmlFor="orderId">Order ID:</label>
                                <input type="text" value={bookingData.bookedServicesData[0].orderId} name="orderId" disabled />

                                <label htmlFor="usernameDoctor">Doctor Name:</label>
                                <input type="text" value={bookingData.usernameDoctor} name="usernameDoctor" disabled />

                                <label htmlFor="accId">Doctor ID:</label>
                                <input type="text" value={bookingData.accId} name="accId" disabled />

                                <label htmlFor="doctorEmail">Doctor Email:</label>
                                <input type="email" value={bookingData.doctorEmail} name="doctorEmail" disabled />

                                <label htmlFor="customerEmail">Customer Email:</label>
                                <input type="email" value={bookingData.bookedServicesData[0].customerEmail} name="customerEmail" disabled />

                                <label htmlFor="customerPhoneNumber">Customer Phone:</label>
                                <input type="text" value={bookingData.bookedServicesData[0].customerPhoneNumber} name="customerPhoneNumber" disabled />

                                <label htmlFor="customerName">Customer Name:</label>
                                <input type="text" value={bookingData.bookedServicesData[0].customerName} name="customerName" disabled />

                                <label htmlFor="serviceTitle">Service Title:</label>
                                <input type="text" value={bookingData.bookedServicesData[0].serviceTitle} name="serviceTitle" disabled />

                                <div className="date-picker-container">
                                    <label htmlFor="selectedDateTime">Select Date and Time:</label>
                                    <DatePicker
                                        id="selectedDateTime"
                                        name="selectedDateTime"
                                        selected={selectedDateTime}
                                        onChange={handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd HH:mm:ss"
                                        minDate={new Date()}
                                    />
                                </div>

                                <label htmlFor="location">location:</label>
                                <input type="text" value={bookingData.bookedServicesData[0].location} name="location" disabled />

                                <button className="btnnew">Confirm Change schedule</button>
                            </form>
                        </div>
                    )
                }
            </div >
        </>
    );
}

export default App;
