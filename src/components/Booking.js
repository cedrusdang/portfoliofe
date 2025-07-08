import "../components/Booking.css";
import { useEffect, useState } from "react";

// REMOVE THIS IMPORT WHEN NOT TESTING
import { Server, GetReservations } from '../testing/ServerTest';

// REMOVE THIS IMPORT WHEN NOT TESTING

function AvailableTable({ date, tocompletepage }) {
    const times = [
        "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
        "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
    ];

    const [bookedTimes, setBookedTimes] = useState([]);

    // Fetch booked times from the server based on the selected date
    //useEffect(() => {
    //    // Replace with your actual API endpoint
    //    fetch(`/api/reservations?date=${date}`)
    //        .then(res => res.json())
    //        .then(data => setBookedTimes(data.bookedTimes || []))
    //        .catch(() => setBookedTimes([]));
    //}, [date]);
    
    // TESTING PURPOSES ONLY, REMOVE WHEN NOT TESTING
    // Simulate fetching booked times for testing purposes
    useEffect(() => {
        async function fetchBookedTimes() {
            const response = await GetReservations({ date });
            if (response.status === 200 && Array.isArray(response.data)) {
                // Booked times are expected to be in the format of an array of objects with a 'time' property
                setBookedTimes(response.data.map(r => r.time));
            } else {
                setBookedTimes([]);
            }
        }
        fetchBookedTimes();
    }, [date, tocompletepage]);
    // REMOVE THIS USEEFFECT WHEN NOT TESTING

    const mid = Math.ceil(times.length / 2);
    const firstHalf = times.slice(0, mid);
    const secondHalf = times.slice(mid);

    const renderTable = (data, title) => (
        <div className="available-table-container">
            <h2 className="table-title">{title}</h2>
            <table className="available-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((time, idx) => {
                        const isBooked = bookedTimes.includes(time);
                        return (
                            <tr key={idx} className={idx % 2 === 0 ? "even-row" : "odd-row"}>
                                <td style={{ whiteSpace: "nowrap" }}>{date}</td>
                                <td>{time}</td>
                                <td style={{ color: isBooked ? 'red' : 'green', fontWeight: 'bold' }}>
                                    {isBooked ? 'Booked' : 'Available'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="available-tables">
            {renderTable(firstHalf, "Morning Reservation")}
            {renderTable(secondHalf, "Afternoon Reservation")}
        </div>
    );
}

// This component allows users to make a reservation by selecting a date, time, number of guests, and occasion.
function Booking() {
    const [tocompletepage, setToCompletePage] = useState(false);
    const [time, setTime] = useState("17:00");
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("Birthday");
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: 1,
        occasion: "",
    });
    const [errorDate, setErrorDate] = useState(false);
    const [errorTime, setErrorTime] = useState(false);

    // Intialize the date using the current date in ISO format (YYYY-MM-DD)
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    const todayISO = today.toISOString().split("T")[0];
    const [date, setDate] = useState(todayISO);

    // Check if the date is today or in the past
    const checkDate = (selectedDate) => {
        // Get today's date in ISO format and remove the time part
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        const todayISO = today.toISOString().split("T")[0];
        // console.log for debugging
        console.log("Selected date:", selectedDate);
        console.log("Today date:", todayISO);
        // Compare selected date with today's date
        const selected = selectedDate;
        return selected < todayISO;
    };
    // Check if the time is in the past
    const checkTime = (date, selectedTime) => {
        const checkDateTomorrow = (selectedDate) => {
            const today = new Date();
            today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
            const todayISO = today.toISOString().split("T")[0];
            const selected = selectedDate;
            console.log("Selected date:", selectedDate);
            console.log("Today date:", todayISO);
            return selected > todayISO;
        };
        // If the date is tomorrow or later, no need to check time
        if (checkDateTomorrow(date)) {
            return false;
        } else {
            const TimeNow = new Date();
            const now = new Date();
            const hour = now.getHours().toString().padStart(2, '0');
            // Ensure hour is in 24-hour format
            const minute = now.getMinutes().toString().padStart(2, '0');
            const hhmm = `${hour}:00`;
            // :00 for hour only comparison, change as needed
            console.log("Selected time:", selectedTime);
            console.log("Current time:", hhmm);
            return selectedTime <= hhmm;
        }
    };



    // TESTING PURPOSES ONLY, REMOVE WHEN NOT TESTING
    const ReserveTableDEMO = async (data) => {
        let response = await Server(data);
        if (response.status === 200) {
            console.log("Reservation made successfully!");
            setMessage(null);
            setToCompletePage(true);// Reset table update state
        } else if (response.status === 409) {
            setMessage("This slot is already booked.");
            console.error(response.message);
            setToCompletePage(null);
        } else if (response.status === 400) {
            setMessage("Invalid request. Please fill all fields.");
            console.error(response.message);
            setToCompletePage(null);
        } else {
            setMessage("Unknown error. Please try again.");
            console.error(response.message);
            setToCompletePage(null);
        }
        response = null; // Clear response to free memory
    };
    // REMOVE THE ABOVE FUNCTION WHEN NOT TESTING



    // This function sends the reservation data to the server and handles the response.
    // Note: Replace "https://example.com/api/reservations" with your actual API endpoint.
    const ReserveTable = async (data) => {
        try {
            const response = await fetch("https://example.com/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Reservation made successfully!");
                setDate(new Date().toISOString().split("T")[0]);
                setTime(new Date().toISOString().split("T")[1].substring(0, 5));
                setGuests(1);
                setOccasion("Birthday");
            } else {
                console.error("Error making reservation:", response.statusText);
                setMessage("Error making reservation. Please try again.");
            }
        } catch (error) {
            console.error("Network or server error:", error);
            setMessage("Network or server error. Please try again.");
        }
    };
    // Handle form submission
    const handleSubmit = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        if (checkDate(date)) {
            console.log("You cannot book a reservation in the past.");
            setErrorDate(true);
            return "You cannot book a reservation in the past.";
        } else {
            setErrorDate(false);
        }
        if (checkTime(date, time)) {
            console.log("You cannot book a reservation in the past.");
            setErrorTime(true);
            return "You cannot book a reservation in the past.";
        } else {
            setErrorTime(false);
        }
        // Set the form data state with the reservation details
        setFormData({ date, time, guests, occasion });
        console.log("Reservation made:", { date, time, guests, occasion });
        // Call the function to save the reservation data
        // ReserveTable({ date, time, guests, occasion }); Activate this line to use the actual API endpoint
        
        // TESTING PURPOSES ONLY, REMOVE WHEN NOT TESTING
        ReserveTableDEMO({ date, time, guests, occasion });
        // REMOVE THE ABOVE LINE WHEN NOT TESTING
    }

    return (
        <div>
            {!tocompletepage ? (
                <>
                    <AvailableTable date={date} tocompletepage={tocompletepage} />
                    <div className="booking-page">
                        <div className="booking-form-container">
                            <form className="booking-form" style={{ display: "grid", maxWidth: "200px", gap: "20px" }}>
                                <label htmlFor="res-date">Choose date</label>
                                <input
                                    type="date"
                                    id="res-date"
                                    name="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />

                                <label htmlFor="res-time">Choose time</label>
                                <select
                                    id="res-time"
                                    name="time"
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                >
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                    <option value="19:00">19:00</option>
                                    <option value="20:00">20:00</option>
                                    <option value="21:00">21:00</option>
                                    <option value="22:00">22:00</option>
                                    <option value="23:00">23:00</option>
                                </select>

                                <label htmlFor="guests">Number of guests</label>
                                <input
                                    type="number"
                                    placeholder="1"
                                    min="1"
                                    max="10"
                                    id="guests"
                                    name="guests"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                />

                                <label htmlFor="occasion">Occasion</label>
                                <select
                                    id="occasion"
                                    name="occasion"
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)}
                                >
                                    <option value="Birthday">Birthday</option>
                                    <option value="Anniversary">Anniversary</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Graduation">Graduation</option>
                                    <option value="Other">Other</option>
                                </select>

                                <input
                                    type="submit"
                                    id="submit"
                                    name="submit"
                                    value="Make Your reservation"
                                    onClick={handleSubmit}
                                />
                            </form>
                        </div>
                        <div className="error-message-container">
                            <span className="error-message">
                                {errorDate ? <p>Please select a date that is in the future.</p> : ""}
                                {errorTime ? <p>Please select a time that is in the future.</p> : ""}
                                {message !== true ? <p style={{ color: "red", whiteSpace: "pre-line" }}>{message}</p> : ""}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <div className="booking-complete">
                    <h2>Reservation Complete!</h2>
                    <p>Your reservation for <strong>{guests}</strong> guests on <strong>{date}</strong> at <strong>{time}</strong> has been successfully made!</p>
                    <p>Occasion: <strong>{occasion}</strong></p>
                    <button type="button" onClick={() => setToCompletePage(false)}>Make Another Reservation</button>
                </div>
            )}
        </div>
    );
}

export default Booking;
