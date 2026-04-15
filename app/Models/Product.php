<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'slug',
        'stock_quantity',
        'description',
        'image',
        'category',
    ];

    public function seller()
{
    return $this->belongsTo(User::class, 'user_id');
}
}

