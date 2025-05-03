<?php

namespace App\Traits;

use Throwable;

trait TryCatchTrait
{
    use ResponseTrait;

    public function tryCatchResponse(callable $callback, string $errorMessage = 'An error occurred', int $errorCode = 500)
    {
        try {
            $result = $callback();
            return $this->successResponse($result);
        } catch (Throwable $e) {
            return $this->errorResponse("$errorMessage: " . $e->getMessage(), $errorCode);
        }
    }
}
