# meetting-rooms-backend(express edition)

- clone project;

# Commands
- `npm i`
- `npm start` (for start mongod, create db, seed, start server at default port: 3000)
- Optional: 
- `npm seed` (make db and seed mock data, port: `27017` (mongo default, or can be changed in `src/config.js`))
- `npm run dev` (for development, default port: 3000)
- `npm test`

# AUTH_API (open)
- POST: `http://localhost:{port}/auth/register` -> req: { email: 'email', password: 'password' } -> res: email and status_code: 200 
- POST: `http://localhost:{port}/auth/sign_in` -> req: { email: 'email', password: 'password' } -> res: token(exp 5min) and status_code: 200

# API (with `Authorization: token` in header)
- GET: `http://localhost:{port}/api/practices` -> res: practices
- GET: `http://localhost:{port}/api/practices/:practice_id` -> res: practice
- GET: `http://localhost:{port}/api/practices/:practice_id/technologies?page=1&per=5` -> res: technsologies(page, per - optional)
- GET: `http://localhost:{port}/api/practices/:practice_id/technologies/:technology_id` -> res: technsology
