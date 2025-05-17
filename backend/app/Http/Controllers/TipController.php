<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTipRequest;
use App\Services\TipService;

class TipController extends Controller
{
    protected $Service;

    public function __construct(TipService $Service)
    {
        $this->Service = $Service;
    }

    public function store(CreateTipRequest $request)
    {
        $function = fn() => $this->Service->createTip($request);
        return $this->tryCatchResponse($function, 201, 'Failed to create tip.');
    }

    public function getRandomTips()
    {
        $function = fn() => $this->Service->randomTip();
        return $this->tryCatchResponse($function, 200, 'Failed to get tips.');
    }
}
