<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccommodationType extends Model
{
    protected $fillable = ['name'];

    public function roomTypes()
    {
        return $this->belongsToMany(
            RoomType::class,
            'room_type_accommodation',
            'accommodation_type_id',
            'room_type_id'
        )->withTimestamps();
    }
}
