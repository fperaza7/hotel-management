<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomAllocation extends Model
{
    protected $fillable = ['hotel_id', 'room_type_id', 'accommodation_type_id', 'quantity'];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function roomType()
    {
        return $this->belongsTo(RoomType::class);
    }

    public function accommodationType()
    {
        return $this->belongsTo(AccommodationType::class);
    }

    public function scopeByRoomType($query, $roomTypeId)
    {
        return $query->where('room_type_id', $roomTypeId);
    }

    public function scopeByAccommodationType($query, $accommodationTypeId)
    {
        return $query->where('accommodation_type_id', $accommodationTypeId);
    }
}
