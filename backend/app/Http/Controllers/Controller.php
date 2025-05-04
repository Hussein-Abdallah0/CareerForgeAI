<?php

namespace App\Http\Controllers;

use App\Traits\ResponseTrait;
use App\Traits\TryCatchTrait;

abstract class Controller
{
    use ResponseTrait, TryCatchTrait;
}
