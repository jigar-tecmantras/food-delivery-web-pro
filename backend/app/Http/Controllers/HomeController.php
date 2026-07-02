<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $restaurants = [
            [
                'name' => 'Sunrise Bites',
                'eta' => '25 min',
                'specialty' => 'Breakfast sandwiches & espresso',
                'tags' => ['under30', 'breakfast', 'local'],
                'rating' => 4.9,
                'price' => '$$',
            ],
            [
                'name' => 'Urban Curry Club',
                'eta' => '32 min',
                'specialty' => 'Slow-simmered comfort curries',
                'tags' => ['under30', 'spicy', 'dinner'],
                'rating' => 4.8,
                'price' => '$$$',
            ],
            [
                'name' => 'Harvest Grill',
                'eta' => '28 min',
                'specialty' => 'Wood-fired bowls & veggies',
                'tags' => ['healthy', 'local', 'bowls'],
                'rating' => 4.7,
                'price' => '$$',
            ],
        ];

        $filters = [
            ['key' => 'all', 'label' => 'All restaurants', 'description' => 'Every kitchen we partner with'],
            ['key' => 'under30', 'label' => 'Under 30 min', 'description' => 'Fast delivery for busy days'],
            ['key' => 'healthy', 'label' => 'Healthy', 'description' => 'Balanced bowls, salads, and plant-forward'],
            ['key' => 'local', 'label' => 'Local favorites', 'description' => 'Chefs from your neighborhood'],
        ];

        $categories = [
            ['name' => 'Breakfast', 'icon' => '🥐', 'description' => 'Bakery-fresh mornings'],
            ['name' => 'Comfort food', 'icon' => '🍔', 'description' => 'Burgers, fries, and feel-good bites'],
            ['name' => 'Plant-forward', 'icon' => '🥗', 'description' => 'Vibrant bowls & salads'],
            ['name' => 'Desserts', 'icon' => '🍰', 'description' => 'Sweet finales from local bakers'],
        ];

        $promotions = [
            [
                'tag' => 'Weekend deal',
                'title' => 'Free delivery on orders over $35',
                'subtitle' => 'Use code WEEKENDWAVE before Sunday night',
                'cta' => 'Unlock the deal',
            ],
            [
                'tag' => 'Member perk',
                'title' => 'Earn double rewards tonight',
                'subtitle' => 'Every diner earns triple points after 6 PM',
                'cta' => 'Track rewards',
            ],
        ];

        $testimonials = [
            [
                'quote' => 'The curated feed makes it easy to order what I am craving without scrolling forever.',
                'customer' => 'Ria M.',
                'city' => 'Houston, TX',
            ],
            [
                'quote' => 'My family loves the under 30 minute filter for quick weeknight dinners.',
                'customer' => 'Malik P.',
                'city' => 'Austin, TX',
            ],
        ];

        $stats = [
            ['label' => 'Orders delivered today', 'value' => '1,248'],
            ['label' => 'Partner kitchens', 'value' => '86'],
            ['label' => 'Average delivery time', 'value' => '28 min'],
        ];

        $payload = [
            'greeting' => 'Welcome back, ' . optional($request->user())->name,
            'hero' => [
                'tagline' => 'Hand-delivered favorites at your fingertips',
                'cta' => 'Browse the menu',
                'tag' => 'Today\'s highlights',
                'tag' => 'Today\'s highlights',
            ],
            'restaurants' => $restaurants,
            'featured' => [
                ['title' => 'Houston Honey Glazed Chicken', 'price' => '$14.99'],
                ['title' => 'Classic Margherita Flatbread', 'price' => '$12.49'],
                ['title' => 'Citrus Berry Smoothie', 'price' => '$6.75'],
            ],
            'filters' => $filters,
            'categories' => $categories,
            'promotions' => $promotions,
            'testimonials' => $testimonials,
            'stats' => $stats,
        ];

        return response()->json($payload);
    }
}
