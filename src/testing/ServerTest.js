import { ReservationDB, loginData} from './TestData';

export function DataBase() {
    if (!localStorage.getItem('reservations')) {
        localStorage.setItem('reservations', JSON.stringify(ReservationDB));
    }
}

export async function Server(request) {
    console.log("Server request received:", request);
    // Validate request
    if (!request || !request.date || !request.time || !request.guests || !request.occasion) {
        return { status: 400, message: "Invalid request" };
    }
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    let conflict = reservations.some(
        r => r.date === request.date && r.time === request.time
    );
    if (conflict) {
        return { status: 409, message: "Data already exists" };
    }
    request.id = Date.now();
    reservations.push(request);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    return { status: 200, message: "Data saved successfully", data: request };
}

export async function GetReservations(request) {
    // Extract time and availables base on date in request
    console.log("GetReservations request received:", request);
    if (!request || !request.date) {
        return { status: 400, message: "Invalid request" };
    } else {
        let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        let filtered = reservations.filter(r => r.date === request.date);
        return { status: 200, data: filtered };
    }
}

// Create a local mock login database from TestData.js
export function CreateLoginDatabase() {
    localStorage.setItem('users', JSON.stringify(loginData));
}

// Mock login function
// This function simulates a login request to the server
export async function LoginValidate(request) {
    console.log("Login request received:", request);
    // Validate request
    if (!request || !request.username || !request.password) {
        return { status: 400, message: "Invalid request" };
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.username === request.username && u.password === request.password);
    if (!user) {
        return { status: 401, message: "Wrong credentials!" };
    }
    return { status: 200, message: "Login successful", id: user.id };
}

export async function ClearAllReservations() {
    console.log("ClearAllReservations request received");
    localStorage.setItem('reservations', JSON.stringify([]));
    return { status: 200, message: "All reservations cleared" };
}

// Get all reservations and users data using admin credentials
export async function GetAllData(request) {
    // check if request is valid with admin credentials
    // Check id and password are in the database or not
    console.log("GetAllData request received:", request);
    if (!request || !request.id || !request.password) {
        return { status: 400, message: "Invalid request" };
    }
    // Validate user credentials - check both by id and by username
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => 
        (u.id === request.id || u.username === request.id) && 
        (u.password === request.password || u.username === request.password)
    );
    if (!user) {
        console.log("GetAllData validation failed. Available users:", users);
        console.log("Requested id:", request.id, "password:", request.password);
        return { status: 401, message: "Wrong credentials!" };
    } else {
        console.log("Admin credentials validated successfully");
        let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        let allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        return { status: 200, data: { reservations, users: allUsers } };
    }

}

// Additional admin functions for user and reservation management

// Add new user (admin only)
export async function AddUser(request) {
    console.log("AddUser request received:", request);
    if (!request || !request.adminId || !request.adminPassword || !request.username || !request.password) {
        return { status: 400, message: "Invalid request" };
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.username)) {
        return { status: 400, message: "Please enter a valid email address." };
    }
    
    // Validate password length
    if (request.password.length < 6) {
        return { status: 400, message: "Password must be at least 6 characters long." };
    }
    
    // Validate admin credentials - check both by id and by username
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let admin = users.find(u => 
        (u.id === request.adminId || u.username === request.adminId) && 
        (u.password === request.adminPassword || u.username === request.adminPassword)
    );
    if (!admin) {
        console.log("Admin validation failed. Available users:", users);
        console.log("Requested adminId:", request.adminId, "adminPassword:", request.adminPassword);
        return { status: 401, message: "Unauthorized access!" };
    }
    
    // Check if user already exists
    let existingUser = users.find(u => u.username === request.username);
    if (existingUser) {
        return { status: 409, message: "User with this email already exists!" };
    }
    
    // Create new user
    const newId = (Math.max(...users.map(u => parseInt(u.id)), 0) + 1).toString();
    const newUser = {
        id: newId,
        username: request.username,
        password: request.password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log("User added successfully:", newUser);
    return { status: 200, message: "User added successfully", data: newUser };
}

// Remove user (admin only)
export async function RemoveUser(request) {
    console.log("RemoveUser request received:", request);
    if (!request || !request.adminId || !request.adminPassword || !request.userId) {
        return { status: 400, message: "Invalid request" };
    }
    
    // Validate admin credentials - check both by id and by username
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let admin = users.find(u => 
        (u.id === request.adminId || u.username === request.adminId) && 
        (u.password === request.adminPassword || u.username === request.adminPassword)
    );
    if (!admin) {
        return { status: 401, message: "Unauthorized access!" };
    }
    
    // Prevent removing the last user in the system
    if (users.length <= 1) {
        return { status: 403, message: "Cannot remove the last user in the system. At least one user must remain for admin access." };
    }
    
    // Remove user
    let updatedUsers = users.filter(u => u.id !== request.userId);
    if (updatedUsers.length === users.length) {
        return { status: 404, message: "User not found!" };
    }
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return { status: 200, message: "User removed successfully" };
}

// Add new reservation (admin only)
export async function AddReservation(request) {
    console.log("AddReservation request received:", request);
    if (!request || !request.adminId || !request.adminPassword || 
        !request.date || !request.time || !request.guests || !request.occasion) {
        return { status: 400, message: "Invalid request" };
    }
    
    // Validate admin credentials - check both by id and by username
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let admin = users.find(u => 
        (u.id === request.adminId || u.username === request.adminId) && 
        (u.password === request.adminPassword || u.username === request.adminPassword)
    );
    if (!admin) {
        return { status: 401, message: "Unauthorized access!" };
    }
    
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    // Check for conflicts
    let conflict = reservations.some(
        r => r.date === request.date && r.time === request.time
    );
    if (conflict) {
        return { status: 409, message: "Time slot already reserved!" };
    }
    
    // Create new reservation
    const newId = Math.max(...reservations.map(r => r.id), 0) + 1;
    const newReservation = {
        id: newId,
        date: request.date,
        time: request.time,
        guests: parseInt(request.guests),
        occasion: request.occasion
    };
    
    reservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    return { status: 200, message: "Reservation added successfully", data: newReservation };
}

// Remove reservation (admin only)
export async function RemoveReservation(request) {
    console.log("RemoveReservation request received:", request);
    if (!request || !request.adminId || !request.adminPassword || !request.reservationId) {
        return { status: 400, message: "Invalid request" };
    }
    
    // Validate admin credentials - check both by id and by username
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let admin = users.find(u => 
        (u.id === request.adminId || u.username === request.adminId) && 
        (u.password === request.adminPassword || u.username === request.adminPassword)
    );
    if (!admin) {
        return { status: 401, message: "Unauthorized access!" };
    }
    
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    let updatedReservations = reservations.filter(r => r.id !== parseInt(request.reservationId));
    
    if (updatedReservations.length === reservations.length) {
        return { status: 404, message: "Reservation not found!" };
    }
    
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    return { status: 200, message: "Reservation removed successfully" };
}