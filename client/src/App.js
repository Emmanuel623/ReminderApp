import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { MdClose } from "react-icons/md"
import axios from "axios"

axios.defaults.baseURL = "https://reminderapp-backend.onrender.com";

function App() {

    //sections and there visibilities
    const [addsection, setAddSection] = useState(false);
    const [bookingsection, setBooking] = useState(true);
    const [doctorsection, setDoctor] = useState(false);
    const [customersection, setCustomer] = useState(false);
    const [remindersection, setReminder] = useState(false);


    //retrived data usestates
    const [dataList, setDataList] = useState([]);
    const [doctorsData, setDoctorsData] = useState([]);
    const [customersData, setCustomersData] = useState([]);
    const [remindersData, setRemindersData] = useState([]);
    //const [reminderData, setReminderData] = useState([]);
    const [bookingData, setBookingData] = useState([]);


    const handlesubmit = (e) => {
        e.preventDefault();
    }


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
            // Handle the error (e.g., show a user-friendly message)
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
            // Handle the error (e.g., show a user-friendly message)
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
            // Handle the error (e.g., show a user-friendly message)
        }
    }
    // const Getreminder = async () => {
    //     try {
    //         const data = await axios.get(`/api/reminders/B001`);
    //         if (data.status === 200) {
    //             setReminderData(data.data);
    //         }
    //     }
    //     catch (error) {
    //         console.error('Error fetching reminder:', error);
    //         // Handle the error (e.g., show a user-friendly message)
    //     }
    // };
    const Getbooking = async () => {
        try {
            const data = await axios.get(`/api/booking-details/B001`);
            if (data.status === 200) {
                setBookingData(data.data);
            }
        }
        catch (error) {
            console.error('Error fetching booking:', error);
            // Handle the error (e.g., show a user-friendly message)
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



    //useeffect for getting details
    useEffect(() => {
        Getbookings();
        Getreminders();
        Getdoctors();
        Getcustumers();
        //Getreminder();
        Getbooking();
    }, [])
    // console.log("it", dataList)
    //console.log("it2", remindersData);
    // console.log("it3", doctorsData)
    //console.log("it4", customersData)
    // console.log("it5", reminderData)
    // console.log("it6", bookingData)

    //handling  hidding buttons onclick
    function addclick() {
        setAddSection(true);
        setBooking(false);
        setDoctor(false);
        setCustomer(false);
        setReminder(false);
    }
    function bookingclick() {
        setAddSection(false);
        setBooking(true);
        setDoctor(false);
        setCustomer(false);
        setReminder(false);
    }
    function doctorclick() {
        setAddSection(false);
        setBooking(false);
        setDoctor(true);
        setCustomer(false);
        setReminder(false);
    }
    function customerclick() {
        setAddSection(false);
        setBooking(false);
        setDoctor(false);
        setCustomer(true);
        setReminder(false);
    }
    function Reminderclick() {
        setAddSection(false);
        setBooking(false);
        setDoctor(false);
        setCustomer(false);
        setReminder(true);
    }


    return (
        <>
            <div className="container">
                <ul className="nav-list">
                    <li className="nav-item">
                        <button className="btn btn-add" onClick={() => addclick()}>ADD</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn" onClick={() => bookingclick()}>Booking details</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn" onClick={() => doctorclick()}>Doctors details</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn" onClick={() => customerclick()}>Customers details</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn" onClick={() => Reminderclick()}>Reminders</button>
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

                            <label htmlFor="day">Day:</label>
                            <input type="number" id="day" name="day" required />

                            <label htmlFor="month">Month:</label>
                            <input type="text" id="month" name="month" required />

                            <label htmlFor="weekDay">Weekday:</label>
                            <input type="text" id="weekDay" name="weekDay" required />

                            <label htmlFor="customerTimezone">Customer Timezone:</label>
                            <input type="text" id="customerTimezone" name="customerTimezone" required />

                            <label htmlFor="country">Country:</label>
                            <input type="text" id="country" name="country" required />

                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" required />

                            <label htmlFor="state">State:</label>
                            <input type="text" id="state" name="state" required />

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
                                    <th>bookingId</th>
                                    <th>booking status</th>
                                    <th>Doctor name</th>
                                    <th>customer Name</th>
                                    <th>Actions</th>
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
                                    <th>BookingId</th>
                                    <th>BookingTime</th>
                                    <th>CustomerEmail</th>
                                    <th>DoctorEmail</th>
                                    <th>latest Reminder</th>
                                    <th>Number of Reminders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {remindersData.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ele.BookingTime}</td>
                                            <td>{ele.bookingId}</td>
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
            </div >
        </>
    );
}

export default App;
