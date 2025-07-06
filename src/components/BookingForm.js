import { useState } from "react";

// Check if the selected date is today or in the future
function isValidDate(dateStr) {
   if (!dateStr) return false;
   const today = new Date();
   const inputDate = new Date(dateStr + "T00:00:00");
   today.setHours(0, 0, 0, 0);
   return inputDate >= today;
}

// Check if the selected time is in the list of available times and not in the past (if today)
function isValidTime(time, availableTimes, dateStr) {
   if (!availableTimes.includes(time)) return false;
   if (!dateStr) return false;
   const today = new Date();
   const inputDate = new Date(dateStr + "T00:00:00");
   today.setHours(0, 0, 0, 0);
   inputDate.setHours(0, 0, 0, 0);
   // If selected date is today, check time is not in the past
   if (inputDate.getTime() === today.getTime()) {
      const [hours, minutes] = time.split(":").map(Number);
      const now = new Date();
      if (
         hours < now.getHours() ||
         (hours === now.getHours() && minutes <= now.getMinutes())
      ) {
         return false;
      }
   }
   return true;
}

export default function BookingForm() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    const [occasion, setOccasion] = useState("");
    const [availableTimes] = useState([
         "10:00", "11:00", "12:00",
         "13:00", "14:00", "15:00", "16:00",
         "17:00", "18:00", "19:00",
         "20:00", "21:00", "22:00"
    ]);
    const [reservated, setReserved] = useState(false);

    // Error states for each field
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [guestsError, setGuestsError] = useState("");
    const [occasionError, setOccasionError] = useState("");

    // State to save reservation details
    const [savedate, setSavedate] = useState("");
    const [savetime, setSavetime] = useState("");
    const [saveguests, setSaveguests] = useState("");
    const [saveoccasion, setSaveoccasion] = useState("");

    // Immediate validation handlers
    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value);
        if (!isValidDate(value)) {
            setDateError("Please select a valid date (today or future).");
        } else {
            setDateError("");
        }
        // Also re-validate time if date changes
        if (time && !isValidTime(time, availableTimes, value)) {
            setTimeError("Please select a valid time.");
        } else {
            setTimeError("");
        }
    };

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setTime(value);
        if (!isValidTime(value, availableTimes, date)) {
            setTimeError("Please select a valid time.");
        } else {
            setTimeError("");
        }
    };

    const handleGuestsChange = (e) => {
        const value = e.target.value;
        setGuests(value);
        if (!value || isNaN(value) || value < 1 || value > 10) {
            setGuestsError("Please enter a number of guests between 1 and 10.");
        } else {
            setGuestsError("");
        }
    };

    const handleOccasionChange = (e) => {
        const value = e.target.value;
        setOccasion(value);
        if (!value) {
            setOccasionError("Please select an occasion.");
        } else {
            setOccasionError("");
        }
    };

    const handleSubmit = (e) => {
         e.preventDefault();
         let valid = true;
         setReserved(false);

         if (!isValidDate(date)) {
            setDateError("Please select a valid date (today or future).");
            valid = false;
         }
         if (!isValidTime(time, availableTimes, date)) {
            setTimeError("Please select a valid time.");
            valid = false;
         }
         if (!guests || isNaN(guests) || guests < 1 || guests > 10) {
            setGuestsError("Please enter a number of guests between 1 and 10.");
            valid = false;
         }
         if (!occasion) {
            setOccasionError("Please select an occasion.");
            valid = false;
         }
         if (!valid) {
            setReserved('error');
            return;
         }
         setSavedate(date);
         setSavetime(time);
         setSaveguests(guests);
         setSaveoccasion(occasion);
         setReserved(true);
    };

    return (
         <form
             style={{ display: "grid", maxWidth: "200px", gap: "20px" }}
             onSubmit={handleSubmit}
         >
             <label htmlFor="res-date">Choose date</label>
             <input
                  type="date"
                  id="res-date"
                  value={date}
                  onChange={handleDateChange}
                  required
             />
             {dateError && <p style={{ color: "red", margin: 0 }}>{dateError}</p>}

             <label htmlFor="res-time">Choose time</label>
             <select
                  id="res-time"
                  value={time}
                  onChange={handleTimeChange}
                  required
             >
                  <option value="" disabled>
                      Select time
                  </option>
                  {availableTimes.map((t) => (
                      <option key={t} value={t}>
                           {t}
                      </option>
                  ))}
             </select>
             {timeError && <p style={{ color: "red", margin: 0 }}>{timeError}</p>}

             <label htmlFor="guests">Number of guests</label>
             <input
                  type="number"
                  id="guests"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={handleGuestsChange}
                  required
             />
             {guestsError && <p style={{ color: "red", margin: 0 }}>{guestsError}</p>}

             <label htmlFor="occasion">Occasion</label>
             <select
                  id="occasion"
                  value={occasion}
                  onChange={handleOccasionChange}
                  required
             >
                  <option value="" disabled>
                      Select occasion
                  </option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Other</option>
             </select>
             {occasionError && <p style={{ color: "red", margin: 0 }}>{occasionError}</p>}

             <input type="submit" value="Make Your reservation" />

             {reservated === true && (
                  <>
                      <span style={{ color: "green" }}><strong>Reservation Successful!</strong></span>
                      <div><strong>Date:</strong> {savedate}</div>
                      <div><strong>Time:</strong> {savetime}</div>
                      <div><strong>Guests:</strong> {saveguests}</div>
                      <div><strong>Occasion:</strong> {saveoccasion}</div>
                  </>
             )}
         </form>
    );
}
