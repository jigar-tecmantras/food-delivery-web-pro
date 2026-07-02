<?php

return [
    'name' => env('APP_NAME', 'Food Delivery API'),
    'env' => env('APP_ENV', 'local'),
    'debug' => env('APP_DEBUG', true),
    'url' => env('APP_URL', 'http://localhost'),
    'timezone' => 'UTC',
    'locale' => 'en',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
    'providers' => [
        App\Providers\RouteServiceProvider::class,
    ],
    'aliases' => [],
];
