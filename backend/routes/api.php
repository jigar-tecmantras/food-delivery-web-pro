<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth.api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/home', [HomeController::class, 'index']);
});
