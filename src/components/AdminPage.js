import React, { useState, useEffect } from "react";
import { 
    GetAllData, 
    DataBase, 
    CreateLoginDatabase, 
    ClearAllReservations,
    AddUser as ServerAddUser,
    RemoveUser as ServerRemoveUser,
    AddReservation as ServerAddReservation,
    RemoveReservation as ServerRemoveReservation
} from "../testing/ServerTest";
import "./AdminPage.css";

export default function AdminPage({ loginCredentials }) {
    // State for data
    const [users, setUsers] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form states
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newResDate, setNewResDate] = useState(new Date().toISOString().split('T')[0]);
    const [newResTime, setNewResTime] = useState("");
    const [newResGuests, setNewResGuests] = useState("");
    const [newResOccasion, setNewResOccasion] = useState("");

    // Validation functions
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 6;
    };

    // Initialize databases and load data
    useEffect(() => {
        const initializeData = async () => {
            try {
                setLoading(true);
                setError("");
                
                // Initialize databases
                DataBase();
                CreateLoginDatabase();
                
                // Load all data using admin credentials
                const response = await GetAllData({
                    id: loginCredentials?.id || loginCredentials?.username,
                    password: loginCredentials?.password || loginCredentials?.username
                });
                
                console.log("Login credentials:", loginCredentials);
                console.log("GetAllData response:", response);
                
                if (response.status === 200) {
                    setUsers(response.data.users || []);
                    setReservations(response.data.reservations || []);
                    setSuccess("Data loaded successfully!");
                    setTimeout(() => setSuccess(""), 3000);
                } else {
                    setError(response.message || "Failed to load data");
                }
            } catch (err) {
                setError("Error loading data: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (loginCredentials) {
            initializeData();
        }
    }, [loginCredentials]);

    // Handlers
    const refreshData = async () => {
        try {
            setLoading(true);
            setError("");
            
            const response = await GetAllData({
                id: loginCredentials?.id || loginCredentials?.username,
                password: loginCredentials?.password || loginCredentials?.username
            });
            
            if (response.status === 200) {
                setUsers(response.data.users || []);
                setReservations(response.data.reservations || []);
                setSuccess("Data refreshed successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(response.message || "Failed to refresh data");
            }
        } catch (err) {
            setError("Error refreshing data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearAllReservations = async () => {
        if (window.confirm("Are you sure you want to clear all reservations? This action cannot be undone.")) {
            try {
                const response = await ClearAllReservations();
                if (response.status === 200) {
                    setReservations([]);
                    setSuccess("All reservations cleared successfully!");
                    setTimeout(() => setSuccess(""), 3000);
                } else {
                    setError(response.message || "Failed to clear reservations");
                }
            } catch (err) {
                setError("Error clearing reservations: " + err.message);
            }
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        if (!newUserEmail || !newUserPassword) return;
        
        // Validate email format
        if (!isValidEmail(newUserEmail)) {
            setError("Please enter a valid email address.");
            setTimeout(() => setError(""), 3000);
            return;
        }
        
        // Validate password length
        if (!isValidPassword(newUserPassword)) {
            setError("Password must be at least 6 characters long.");
            setTimeout(() => setError(""), 3000);
            return;
        }
        
        try {
            const response = await ServerAddUser({
                adminId: loginCredentials?.id || loginCredentials?.username,
                adminPassword: loginCredentials?.password || loginCredentials?.username,
                username: newUserEmail, // Using email as username
                password: newUserPassword
            });
            
            console.log("AddUser response:", response);
            
            if (response.status === 200) {
                // Refresh data to get updated user list
                await refreshData();
                setNewUserEmail("");
                setNewUserPassword("");
                setSuccess(response.message);
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(response.message || "Failed to add user");
            }
        } catch (err) {
            setError("Error adding user: " + err.message);
        }
    };

    const removeUser = async (id) => {
        // Prevent removing the last user in the system
        if (users.length <= 1) {
            setError("Cannot remove the last user in the system. At least one user must remain for admin access.");
            setTimeout(() => setError(""), 5000);
            return;
        }

        if (window.confirm("Are you sure you want to remove this user?")) {
            try {
                const response = await ServerRemoveUser({
                    adminId: loginCredentials?.id || loginCredentials?.username,
                    adminPassword: loginCredentials?.password || loginCredentials?.username,
                    userId: id
                });
                
                if (response.status === 200) {
                    // Refresh data to get updated user list
                    await refreshData();
                    setSuccess(response.message);
                    setTimeout(() => setSuccess(""), 3000);
                } else {
                    setError(response.message || "Failed to remove user");
                }
            } catch (err) {
                setError("Error removing user: " + err.message);
            }
        }
    };

    const addReservation = async (e) => {
        e.preventDefault();
        if (!newResDate || !newResTime || !newResGuests || !newResOccasion) return;
        
        try {
            const response = await ServerAddReservation({
                adminId: loginCredentials?.id || loginCredentials?.username,
                adminPassword: loginCredentials?.password || loginCredentials?.username,
                date: newResDate,
                time: newResTime,
                guests: newResGuests,
                occasion: newResOccasion
            });
            
            if (response.status === 200) {
                // Refresh data to get updated reservation list
                await refreshData();
                setNewResDate("");
                setNewResTime("");
                setNewResGuests("");
                setNewResOccasion("");
                setSuccess(response.message);
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(response.message || "Failed to add reservation");
            }
        } catch (err) {
            setError("Error adding reservation: " + err.message);
        }
    };

    const removeReservation = async (id) => {
        if (window.confirm("Are you sure you want to remove this reservation?")) {
            try {
                const response = await ServerRemoveReservation({
                    adminId: loginCredentials?.id || loginCredentials?.username,
                    adminPassword: loginCredentials?.password || loginCredentials?.username,
                    reservationId: id
                });
                
                if (response.status === 200) {
                    // Refresh data to get updated reservation list
                    await refreshData();
                    setSuccess(response.message);
                    setTimeout(() => setSuccess(""), 3000);
                } else {
                    setError(response.message || "Failed to remove reservation");
                }
            } catch (err) {
                setError("Error removing reservation: " + err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="admin-container">
                <div className="loading">Loading admin data...</div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>🍋 Little Lemon Admin Portal</h1>
                <div className="credentials-info">
                    <p>
                        Signed in as: <strong>{loginCredentials?.username || loginCredentials?.email}</strong>
                    </p>
                    <p>
                        Admin ID: <strong>{loginCredentials?.id}</strong>
                    </p>
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            {/* Statistics */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">{users.length}</div>
                    <div className="stat-label">Total Users</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{reservations.length}</div>
                    <div className="stat-label">Total Reservations</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">
                        {reservations.filter(r => new Date(r.date) >= new Date()).length}
                    </div>
                    <div className="stat-label">Upcoming Reservations</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="actions-row">
                <button className="btn btn-primary" onClick={refreshData}>
                    🔄 Refresh Data
                </button>
                <button className="btn btn-warning" onClick={clearAllReservations}>
                    🗑️ Clear All Reservations
                </button>
            </div>

            {/* Users Section */}
            <div className="section">
                <h2 className="section-header">User Management</h2>
                <div className="section-content">
                    {users.length <= 1 && (
                        <div className="warning-message">
                            ⚠️ <strong>System Protection:</strong> Cannot remove the last admin user to maintain system access.
                        </div>
                    )}
                    <form className="form-row" onSubmit={addUser}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            required
                        />
                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                placeholder="Password (min 6 characters)"
                                value={newUserPassword}
                                onChange={(e) => setNewUserPassword(e.target.value)}
                                minLength="6"
                                required
                                style={{ 
                                    borderColor: newUserPassword.length > 0 && newUserPassword.length < 6 ? '#d13438' : '#d1d1d1' 
                                }}
                            />
                            {newUserPassword.length > 0 && newUserPassword.length < 6 && (
                                <small style={{ 
                                    color: '#d13438', 
                                    fontSize: '0.75rem',
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    marginTop: '2px'
                                }}>
                                    {6 - newUserPassword.length} more characters needed
                                </small>
                            )}
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={!isValidEmail(newUserEmail) || !isValidPassword(newUserPassword)}
                        >
                            ➕ Add User
                        </button>
                    </form>
                    
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{"•".repeat(user.password.length)}</td>
                                    <td>
                                        <button 
                                            className={`btn ${users.length <= 1 ? 'btn-disabled' : 'btn-danger'}`}
                                            onClick={() => removeUser(user.id)}
                                            disabled={users.length <= 1}
                                            title={users.length <= 1 ? "Cannot remove the last user in the system" : "Remove user"}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reservations Section */}
            <div className="section">
                <h2 className="section-header">Reservation Management</h2>
                <div className="section-content">
                    <form className="form-row" onSubmit={addReservation}>
                        <input
                            type="date"
                            value={newResDate}
                            onChange={(e) => setNewResDate(e.target.value)}
                            required
                        />
                        <input
                            type="time"
                            value={newResTime}
                            onChange={(e) => setNewResTime(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Guests"
                            value={newResGuests}
                            onChange={(e) => setNewResGuests(e.target.value)}
                            min="1"
                            max="20"
                            required
                        />
                        <select
                            value={newResOccasion}
                            onChange={(e) => setNewResOccasion(e.target.value)}
                            required
                        >
                            <option value="">Select Occasion</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Graduation">Graduation</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Business">Business</option>
                            <option value="Other">Other</option>
                        </select>
                        <button type="submit" className="btn btn-primary">➕ Add Reservation</button>
                    </form>
                    
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Guests</th>
                                <th>Occasion</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => {
                                const isUpcoming = new Date(reservation.date) >= new Date();
                                return (
                                    <tr key={reservation.id}>
                                        <td>{reservation.id}</td>
                                        <td>{reservation.date}</td>
                                        <td>{reservation.time}</td>
                                        <td>{reservation.guests}</td>
                                        <td>{reservation.occasion}</td>
                                        <td>
                                            <span style={{
                                                color: isUpcoming ? '#28a745' : '#6c757d',
                                                fontWeight: 'bold'
                                            }}>
                                                {isUpcoming ? 'Upcoming' : '🔴 Past'}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => removeReservation(reservation.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
