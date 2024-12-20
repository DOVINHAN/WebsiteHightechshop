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
        'sizes',
        'colors',
        'quantity',
        'description',
        'price',
        'discount_price',
        'cate_id',
        'image_id',
    ];

    public function categories()
    {
        return $this->belongsTo(Categories::class, 'cate_id');
    }

    public function image()
    {
        return $this->hasMany(Image::class, 'image_id');
    }

    public function orderDetails()
    {
    return $this->hasMany(OrderDetail::class, 'product_id');
    }

    public static function getDiscountedProducts()
    {
        return self::whereNotNull('discount_price')  // Only select products with a discount_price
                   ->paginate(4);  // Paginate the results with 8 products per page
    }
}
