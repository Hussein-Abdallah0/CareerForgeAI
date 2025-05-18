<?php

namespace App\Services;

use App\Models\Tip;
use Illuminate\Support\Facades\Auth;

class TipService
{
    public function createTip($request)
    {
        return Tip::create([
            'tip_text' => $request->tip_text,
        ]);
    }

    public function randomTip()
    {
        $randomIds = Tip::pluck('id')->random(2);

        return Tip::whereIn('id', $randomIds)->get();
    }
}
