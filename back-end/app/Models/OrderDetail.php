<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'varient_id',
        'quantity',
        'price'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function varient()
    {
        return $this->belongsTo(Varient::class, 'varient_id');
    }
}
