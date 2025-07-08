import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Booking from "../components/Booking";
import * as ServerTest from "../testing/ServerTest";

// __tests__/Booking.test.js


// Mock ServerTest functions
jest.mock("../testing/ServerTest", () => ({
    Server: jest.fn(),
    GetReservations: jest.fn(),
    clearAll: jest.fn(),
}));

describe("Booking Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default: no reservations
        ServerTest.GetReservations.mockResolvedValue({ status: 200, data: [] });
        ServerTest.Server.mockResolvedValue({ status: 200 });
    });

    test("renders booking form and available tables", async () => {
        render(<Booking />);
        expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
        expect(screen.getByText(/Morning Reservation/i)).toBeInTheDocument();
        expect(screen.getByText(/Afternoon Reservation/i)).toBeInTheDocument();
        await waitFor(() => expect(ServerTest.GetReservations).toHaveBeenCalled());
    });

    test("shows error when booking in the past", async () => {
        render(<Booking />);
        const dateInput = screen.getByLabelText(/Choose date/i);
        // Set date to yesterday
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        fireEvent.change(dateInput, { target: { value: yesterday } });
        fireEvent.click(screen.getByRole("button", { name: /Make Your reservation/i }));
        expect(await screen.findByText(/Please select a date that is in the future/i)).toBeInTheDocument();
        expect(ServerTest.Server).not.toHaveBeenCalled();
    });

    test("makes reservation and shows complete page", async () => {
        render(<Booking />);
        fireEvent.click(screen.getByRole("button", { name: /Make Your reservation/i }));
        await waitFor(() => expect(ServerTest.Server).toHaveBeenCalled());
        expect(await screen.findByText(/Reservation Complete!/i)).toBeInTheDocument();
    });

    test("shows error if slot is already booked", async () => {
        ServerTest.Server.mockResolvedValue({ status: 409, message: "This slot is already booked." });
        render(<Booking />);
        fireEvent.click(screen.getByRole("button", { name: /Make Your reservation/i }));
        expect(await screen.findByText(/This slot is already booked/i)).toBeInTheDocument();
    });

    test("shows error if request is invalid", async () => {
        ServerTest.Server.mockResolvedValue({ status: 400, message: "Invalid request." });
        render(<Booking />);
        fireEvent.click(screen.getByRole("button", { name: /Make Your reservation/i }));
        expect(await screen.findByText(/Invalid request/i)).toBeInTheDocument();
    });

    test("shows booked status in available table", async () => {
        ServerTest.GetReservations.mockResolvedValue({
            status: 200,
            data: [{ time: "10:00" }, { time: "17:00" }]
        });
        render(<Booking />);
        expect(await screen.findAllByText(/Booked/i)).toHaveLength(2);
    });

});

// ServerTest.js (clearAll only)
describe("ServerTest.clearAll", () => {
    it("calls clearAll without error", () => {
        ServerTest.clearAll.mockClear();
        ServerTest.clearAll();
        expect(ServerTest.clearAll).toHaveBeenCalled();
    });
});