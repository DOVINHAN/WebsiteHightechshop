<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adress extends Model
{
    use HasFactory;
    protected $table = 'address';
    protected $fillable = [
        'address',
        'phone',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
