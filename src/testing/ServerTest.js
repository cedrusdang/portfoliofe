export function DataBase() {
    if (!localStorage.getItem('reservations')) {
        localStorage.setItem('reservations', JSON.stringify([]));
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

export async function Login(request) {
    console.log("Login request received:", request);
    // Validate request
    if (!request || !request.username || !request.password) {
        return { status: 400, message: "Invalid request" };
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.username === request.username && u.password === request.password);
    if (!user) {
        return { status: 401, message: "Unauthorized" };
    }
    return { status: 200, message: "Login successful", data: user };
}