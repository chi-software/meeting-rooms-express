# meetting-rooms-backend(express edition)

[![Build Status](https://travis-ci.org/chi-software/meeting-rooms-express.svg?branch=master)](https://travis-ci.org/chi-software/meeting-rooms-express)

- clone project;

# Commands
- `npm i`
- `npm start`
- `npm run dev` db from mongoLab
- `npm test` local db start-mongo
- `npm run start-mongo`
- `npm run stop-mongo`

# AUTH_API (open)
- POST: `http://localhost:3000/api/auth/register` -> req: `{ email: 'email', password: 'password' }` -> res: `{email}` and Status: 200 
- POST: `http://localhost:3000/api/auth/sign_in` -> req: `{ email: 'email', password: 'password' }` -> res: `{token}` and Status: 200

# API (with `Authorization: token` in header)
## Rooms
- GET: `http://localhost:3000/api/rooms` -> `[Rooms]`

## Bookings
- GET: `http://localhost:3000/api/bookings` -> `[Bookings]`
- POST: `http://localhost:3000/api/bookings` req: `{userId: String, roomId: String, timeFrom: Date, timeTo: Date}` -> `{new Booking}` 
- GET: `http://localhost:3000/api/bookings/:id` -> `{booking}`
- PUT: `http://localhost:3000/api/bookings/:id` -> `{userId: String, roomId: String, timeFrom: Date, timeTo: Date}` -> `{new Booking}`
- DELETE: `http://localhost:3000/api/bookings/:id` -> Status 200

## Users
- GET: `http://localhost:3000/api/users` -> `[Users]`
- GET: `http://localhost:3000/api/users/:id` -> `{User}`
- PUT: `http://localhost:3000/api/users/:id` -> `{new User}`
