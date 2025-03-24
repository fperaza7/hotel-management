<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $fillable = ['name', 'address', 'city', 'nit', 'max_rooms'];

    public function roomAllocations()
    {
        return $this->hasMany(RoomAllocation::class);
    }
}
