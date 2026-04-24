<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Product extends Model
{

    protected $appends = ['image'];
    protected $fillable = [
        'name',
        'price',
        'slug',
        'stock_quantity',
        'description',
        'image',
        'category',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }



    // ... inside the class ...

    //     protected function image(): Attribute
// {
//     return Attribute::make(
//         get: function ($value) {
//             // 1. Fallback for empty values
//             if (empty($value)) {
//                 return 'https://placehold.co/600x400';
//             }

    //             // 2. If it's already a full URL
//             if (filter_var($value, FILTER_VALIDATE_URL)) {
//                 return $value;
//             }

    //             // 3. Local Development Logic
//             // If AWS_BUCKET is empty, we assume we are using local storage
//             if (empty(env('AWS_BUCKET'))) {
//                 // Remove 'public/' prefix if the controller saved it that way
//                 $path = str_replace('public/', '', $value);

    //                 // Using a relative path /storage/ is the safest way on Windows
//                 return '/storage/' . ltrim($path, '/');
//             }

    //             // 4. Cloud Logic (Laravel Cloud/S3)
//             return Storage::disk('private')->url($value);
//         },
//     );
// }
}

