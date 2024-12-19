<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'image';
    protected $fillable = [
        'name',
        'path',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function varient()
    {
        return $this->belongsTo(Varient::class);
    }
}
