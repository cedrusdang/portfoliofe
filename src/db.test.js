import { DataBase, Server } from './db';

// Mocking localStorage for testing
beforeEach(() => {
  localStorage.clear();
  DataBase();
});

test('should add new reservation', async () => {
  const req = {
    date: "2025-07-10",
    time: "19:00",
    guests: 3,
    occasion: "Anniversary"
  };
  const res = await Server(req);
  expect(res.status).toBe(200);
  const reservations = JSON.parse(localStorage.getItem('reservations'));
  expect(reservations.length).toBe(1);
  expect(reservations[0].date).toBe("2025-07-10");
});

test('should return 409 for duplicate', async () => {
  const req = {
    date: "2025-07-10",
    time: "19:00",
    guests: 3,
    occasion: "Anniversary"
  };
  await Server(req);
  const res2 = await Server(req);
  expect(res2.status).toBe(409);
});
