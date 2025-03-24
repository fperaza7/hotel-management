<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hotels = Hotel::all();
        return response()->json($hotels, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:hotels|max:255',
            'address' => 'required',
            'city' => 'required',
            'nit' => 'required|unique:hotels',
            'max_rooms' => 'required|integer|min:1',
        ]);

        $hotel = Hotel::create($request->all());

        return response()->json(['message' => 'Hotel creado exitosamente.', 'hotel' => $hotel], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hotel = Hotel::with([
            'roomAllocations.roomType',
            'roomAllocations.accommodationType'
        ])->findOrFail($id);

        return response()->json($hotel, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $hotel = Hotel::findOrFail($id);

        $request->validate([
            'name' => 'required|unique:hotels,name,' . $id .'|max:255',
            'address' => 'required',
            'city' => 'required',
            'nit' => 'required|unique:hotels,nit,' . $id,
            'max_rooms' => 'required|integer|min:1',
        ]);

        $hotel->update($request->all());

        return response()->json(['message' => 'Hotel actualizado exitosamente.', 'hotel' => $hotel], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();

        return response()->json(['message' => 'Hotel eliminado exitosamente.'], 200);
    }
}
