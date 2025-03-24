<?php

namespace App\Http\Controllers;

use App\Models\AccommodationType;
use Illuminate\Http\Request;

class AccommodationTypeController extends Controller
{
    public function index()
    {
        $accommodationTypes = AccommodationType::all();
        return response()->json($accommodationTypes, 200);
    }
}
