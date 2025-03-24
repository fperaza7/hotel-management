<?php

use App\Http\Controllers\HotelController;
use App\Http\Controllers\RoomAllocationController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\AccommodationTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('hotels', HotelController::class);

Route::get('hotels/{hotel}/settings/allocations', [RoomAllocationController::class, 'index'])->name('hotels.settings.rooms.index');
Route::post('hotels/{hotel}/settings/allocations', [RoomAllocationController::class, 'store'])->name('hotels.settings.rooms.store');
Route::delete('hotels/{hotel}/settings/allocations/{id}', [RoomAllocationController::class, 'destroy'])->name('hotels.settings.rooms.destroy');
Route::get('/room-types', [RoomTypeController::class, 'index'])->name('room-types.index');
Route::get('/accommodation-types', [AccommodationTypeController::class, 'index'])->name('accommodation-types.index');
