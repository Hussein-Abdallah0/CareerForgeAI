<?php

namespace App\Traits;

use Throwable;

trait TryCatchTrait
{
    use ResponseTrait;

    public function tryCatchResponse(callable $callback, int $successCode = 200, string $errorMessage = 'An error occurred', int $errorCode = 500)
    {
        try {
            $result = $callback();
            return $this->successResponse($result, $successCode);
        } catch (Throwable $e) {
            return $this->errorResponse("$errorMessage: " . $e->getMessage(), $errorCode);
        }
    }
}
