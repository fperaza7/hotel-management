<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    protected $fillable = ['name'];

    public function accommodations()
    {
        return $this->belongsToMany(
            AccommodationType::class,
            'room_type_accommodation',
            'room_type_id',
            'accommodation_type_id'
        )->withTimestamps();
    }

    public function isValidAccommodation($accommodationTypeId)
    {
        return $this->accommodations()->where('accommodation_types.id', $accommodationTypeId)->exists();
    }
}
