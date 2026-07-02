# Backend API (Laravel)

This folder contains the Laravel REST API powering the React frontend.

## Setup
1. Make sure PHP 8.1+ and Composer are installed
2. `cd backend`
3. `composer install`
4. `cp .env.example .env`
5. `php artisan key:generate`
6. `touch database/database.sqlite`
7. `php artisan migrate --seed`
8. `php artisan serve --host=localhost --port=8000`

## Seed data
A demo user is seeded (demo@fooddelivery.test / password) so you can try login right away.

## API tokens
All protected endpoints expect `Authorization: Bearer {api_token}`. Tokens are rotated on each login.
