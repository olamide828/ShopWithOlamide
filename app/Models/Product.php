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
                if (!$value)
                    return 'https://placehold.co/600x400';

                if (filter_var($value, FILTER_VALIDATE_URL)) {
                    return $value;
                }

                // Check if the bucket config is empty to prevent the crash
                if (empty(config('filesystems.disks.private.bucket'))) {
                    // If no bucket is set, assume it's a local file or return a placeholder
                    return '/storage/' . $value;
                }

                return Storage::disk('private')->url($value);
            },
        );
    }
}

