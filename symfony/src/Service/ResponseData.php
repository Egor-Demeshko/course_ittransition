<?php

namespace App\Service;

class ResponseData
{
    protected array $data;

    protected const SUCCESS_MESSAGE = "Account has been created.";
    public const SUCCESS_ON_TAG = "Tag was created.";

    public function __construct()
    {
        $this->data = [
            'status' => false,
            'success_message' => null,
            'errors' => []
        ];
    }

    public function setSuccessMessage(?string $message = null): void
    {
        $this->data['status'] = true;
        $this->data['success_message'] = $message ?? self::SUCCESS_MESSAGE;
    }

    public function setFalse(): void
    {
        $data['status'] = false;
    }

    public function getStatus(): bool
    {
        return $this->data['status'];
    }

    public function setError(array $errorData): void
    {
        $this->data['errors'][] = $errorData;
    }

    public function getData(): array
    {
        return $this->data;
    }
}
