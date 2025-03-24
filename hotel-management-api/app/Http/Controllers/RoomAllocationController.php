<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\RoomAllocation;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomAllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Hotel $hotel)
    {
        $configurations = $hotel->roomAllocations;
        return response()->json($configurations, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Hotel $hotel)
    {
        $validatedData = $request->validate([
            'room_type_id' => 'required|exists:room_types,id',
            'accommodation_type_id' => 'required|exists:accommodation_types,id',
            'quantity' => 'required|integer|min:1',
        ]);


        $roomType = RoomType::find($request->room_type_id);

        if (!$roomType->isValidAccommodation($request->accommodation_type_id)) {
            return response()->json([
                'message' => 'La combinación de tipo de habitación y acomodación no es válida.'
            ], 422);
        }

        $roomAllocationExists = $hotel->roomAllocations()
            ->byRoomType($request->room_type_id)
            ->byAccommodationType($request->accommodation_type_id)
            ->exists();

        if ($roomAllocationExists) {
            return response()->json([
                'message' => 'Ya existe una asignación de este tipo de habitación y acomodación para este hotel.'
            ], 422);
        }

        $totalConfiguredRooms = $hotel->roomAllocations->sum('quantity');
        if ($totalConfiguredRooms + $request->quantity > $hotel->max_rooms) {
            return response()->json([
                'message' => 'La cantidad total de habitaciones excede el límite máximo permitido para el hotel.'
            ], 422);
        }

        $roomAllocation = $hotel->roomAllocations()->create(array_merge(
            ['hotel_id' => $hotel->id],
            $validatedData
        ));

        return response()->json([
            'message' => 'Habitación asignada exitosamente.',
            'room_allocation' => $roomAllocation
        ], 201);
    }

    public function destroy(Hotel $hotel, string $id)
    {
        $roomAllocation = RoomAllocation::findOrFail($id);
        $roomAllocation->delete();

        return response()->json(['message' => 'Asignación eliminada exitosamente.'], 200);
    }
}
