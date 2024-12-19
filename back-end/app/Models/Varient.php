<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Varient extends Model
{
    use HasFactory;
    protected $table = 'varient';
    protected $fillable = [
        'color',
        'configure',
        'quantity',
        'price',
        'product_id',
        'image_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function orderDetail()
    {
        return $this->hasMany(OrderDetail::class, 'varient_id');
    }
}
