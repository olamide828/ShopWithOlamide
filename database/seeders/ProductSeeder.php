<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    DB::table('products')->insert([
        [
            'name' => 'Wireless Noise-Canceling Headphones',
            'slug' => 'wireless-noise-canceling-headphones',
            'description' => 'High-quality wireless noise-canceling headphones for daily use.',
            'price' => 299.99,
            'stock_quantity' => 50,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/23/8753753/1.jpg?4817",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Smart Fitness Tracker',
            'slug' => 'smart-fitness-tracker',
            'description' => 'Track your steps, heart rate, and sleep patterns.',
            'price' => 79.50,
            'stock_quantity' => 120,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/80/408536/1.jpg?3027",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Mechanical Gaming Keyboard',
            'slug' => 'mechanical-gaming-keyboard',
            'description' => 'RGB backlit keys with tactile switches.',
            'price' => 129.00,
            'stock_quantity' => 35,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/29/2447814/1.jpg?1931",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => '4K Ultra HD Projector',
            'slug' => '4k-ultra-hd-projector',
            'description' => 'Cinema-quality resolution for home theaters.',
            'price' => 899.99,
            'stock_quantity' => 15,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/99/4857814/1.jpg?6392",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Portable Power Bank 20000mAh',
            'slug' => 'portable-power-bank-20000mah',
            'description' => 'Fast charging for your mobile devices on the go.',
            'price' => 45.95,
            'stock_quantity' => 200,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/88/2340914/1.jpg?0449",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Ergonomic Office Chair',
            'slug' => 'ergonomic-office-chair',
            'description' => 'Comfortable seating designed for long work hours.',
            'price' => 249.00,
            'stock_quantity' => 20,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/40/9511914/1.jpg?3375",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Stainless Steel Water Bottle',
            'slug' => 'stainless-steel-water-bottle',
            'description' => 'Vacuum-insulated bottle that keeps drinks cold for 24 hours.',
            'price' => 24.99,
            'stock_quantity' => 150,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/95/1640143/1.jpg?2168",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Smart LED Desk Lamp',
            'slug' => 'smart-led-desk-lamp',
            'description' => 'Adjustable brightness and color temperature controlled by app.',
            'price' => 35.00,
            'stock_quantity' => 60,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/0131814/1.jpg?9223",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Bluetooth Mesh Speaker',
            'slug' => 'bluetooth-mesh-speaker',
            'description' => 'Superior sound with multi-room connectivity.',
            'price' => 159.99,
            'stock_quantity' => 45,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/51/9402914/1.jpg?3853",
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Leather Laptop Sleeve',
            'slug' => 'leather-laptop-sleeve',
            'description' => 'Hand-crafted leather protection for 13-inch laptops.',
            'price' => 55.00,
            'stock_quantity' => 80,
            'image' => "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/60/0311914/1.jpg?2887",
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);
}

}
