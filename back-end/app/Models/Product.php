<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';
    protected $fillable = [
        'name',
        'description',
        'cate_id',
        'image_id',
    ];

    public function categories()
    {
        return $this->belongsTo(Categories::class, 'cate_id');
    }

    public function varient()
    {
        return $this->hasMany(Varient::class, 'product_id');
    }

    public function feedback()
    {
        return $this->hasMany(Feedback::class, 'product_id');
    }

    public function image()
    {
        return $this->hasMany(Image::class);
    }
}
