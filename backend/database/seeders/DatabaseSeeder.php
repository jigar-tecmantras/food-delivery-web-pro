<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Demo User',
            'email' => 'demo@fooddelivery.test',
            'password' => 'password',
            'api_token' => Str::random(60),
        ]);
    }
}
