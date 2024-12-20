<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'image';
    protected $fillable = [
        'name',
        'image',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'image_id');
    }
}
