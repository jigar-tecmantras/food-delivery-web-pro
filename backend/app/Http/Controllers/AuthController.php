<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $payload = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $payload['password'] = Hash::make($payload['password']);
        $payload['api_token'] = Str::random(60);

        $user = User::create($payload);

        return response()->json([
            'user' => $user,
            'token' => $user->api_token,
        ], 201);
    }

    public function login(Request $request)
    {
        $payload = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $payload['email'])->first();

        if (! $user || ! Hash::check($payload['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user->api_token = Str::random(60);
        $user->save();

        return response()->json([
            'user' => $user,
            'token' => $user->api_token,
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $user->api_token = null;
            $user->save();
        }

        return response()->json(['message' => 'Logged out']);
    }
}
