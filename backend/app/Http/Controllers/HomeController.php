<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $payload = [
            'greeting' => 'Welcome back, ' . optional($request->user())->name,
            'hero' => [
                'tagline' => 'Hand-delivered favorites at your fingertips',
                'cta' => 'Browse the menu',
            ],
            'restaurants' => [
                ['name' => 'Sunrise Bites', 'eta' => '25 min', 'specialty' => 'Breakfast sandwiches'],
                ['name' => 'Urban Curry Club', 'eta' => '32 min', 'specialty' => 'Slow-simmered curries'],
                ['name' => 'Harvest Grill', 'eta' => '28 min', 'specialty' => 'Wood-fired bowls'],
            ],
            'featured' => [
                ['title' => 'Houston Honey Glazed Chicken', 'price' => '$14.99'],
                ['title' => 'Classic Margherita Flatbread', 'price' => '$12.49'],
                ['title' => 'Citrus Berry Smoothie', 'price' => '$6.75'],
            ],
        ];

        return response()->json($payload);
    }
}
