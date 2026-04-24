<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

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

    protected function image(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                // 1. If no image path exists in the DB, show placeholder
                if (!$value) {
                    return 'https://placehold.co/600x400';
                }

                // 2. If the value is already a full URL, just return it
                if (filter_var($value, FILTER_VALIDATE_URL)) {
                    return $value;
                }

                // 3. Check if we are actually configured for S3/Cloud
                // If the bucket is empty, we are likely on localhost without S3 setup
                if (empty(config('filesystems.disks.private.bucket'))) {
                    // Return a local path. Make sure you've run 'php artisan storage:link'
                    return asset('storage/' . $value);
                }

                // 4. If bucket exists, generate the cloud URL
                return Storage::disk('private')->url($value);
            },
        );
    }
}

