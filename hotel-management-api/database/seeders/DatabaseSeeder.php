<?php

namespace Database\Seeders;

use App\Models\AccommodationType;
use App\Models\RoomType;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roomTypes = [
            ['id' => 1, 'name' => 'Estándar'],
            ['id' => 2, 'name' => 'Junior'],
            ['id' => 3, 'name' => 'Suite'],
        ];

        foreach ($roomTypes as $type) {
            RoomType::updateOrCreate(['id' => $type['id']], $type);
        }

        $accommodationTypes = [
            ['id' => 1, 'name' => 'Sencilla'],
            ['id' => 2, 'name' => 'Doble'],
            ['id' => 3, 'name' => 'Triple'],
            ['id' => 4, 'name' => 'Cuádruple'],
        ];

        foreach ($accommodationTypes as $type) {
            AccommodationType::updateOrCreate(['id' => $type['id']], $type);
        }

        $roomTypeAccommodations = [
            // Estándar
            ['room_type_id' => 1, 'accommodation_type_id' => 1], // Sencilla
            ['room_type_id' => 1, 'accommodation_type_id' => 2], // Doble
            // Junior
            ['room_type_id' => 2, 'accommodation_type_id' => 3], // Triple
            ['room_type_id' => 2, 'accommodation_type_id' => 4], // Cuádruple
            // Suite
            ['room_type_id' => 3, 'accommodation_type_id' => 1], // Sencilla
            ['room_type_id' => 3, 'accommodation_type_id' => 2], // Doble
            ['room_type_id' => 3, 'accommodation_type_id' => 3], // Triple
        ];

        foreach ($roomTypeAccommodations as $combination) {
            DB::table('room_type_accommodation')->updateOrInsert(
                [
                    'room_type_id' => $combination['room_type_id'],
                    'accommodation_type_id' => $combination['accommodation_type_id'],
                ],
                [
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            );
        }
    }
}
