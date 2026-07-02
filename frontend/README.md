# Frontend (React)

This folder holds the React SPA that consumes the Laravel API.

## Setup
1. `cd frontend`
2. `npm install`
3. `REACT_APP_API_URL=http://localhost:8000/api npm start`

## Notes
* The app stores the API token in `localStorage` under `fd-token`.
* You can change `REACT_APP_API_URL` to point to a deployed API when ready.
