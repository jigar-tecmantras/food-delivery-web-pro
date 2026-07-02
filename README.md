# Food Delivery Web Pro

Food delivery marketplace with a React single-page app shuttling orders into a Laravel REST API.

## Tech stack
- Frontend: React 18 + React Router v6 + Axios
- Backend: Laravel-style REST API with token-based authentication and lightweight feed data

## Getting started

### Backend
1. `cd backend`
2. `composer install`
3. `cp .env.example .env`
4. `php artisan key:generate`
5. `touch database/database.sqlite`
6. `php artisan migrate --seed`
7. `php artisan serve --host=localhost --port=8000`

### Frontend
1. `cd frontend`
2. `npm install`
3. `REACT_APP_API_URL=http://localhost:8000/api npm start`

## API surface

| Endpoint | Method | Description | Authentication |
| --- | --- | --- | --- |
| `/api/register` | POST | Create a new customer, hash the password, and return an active token | No |
| `/api/login` | POST | Validate credentials and return an `api_token` | No |
| `/api/logout` | POST | Clears the bearer token from the user record | Yes (Bearer token) |
| `/api/home` | GET | Returns the landing feed (restaurants + featured dishes) | Yes (Bearer token) |

## Directory layout
- `/backend` — Laravel REST API, token auth via `api_token` column on `users`
- `/frontend` — React SPA with login, register, and protected home feed
