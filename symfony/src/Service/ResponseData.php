<?php

namespace App\Service;

class ResponseData
{
    private array $data = [
        'status' => false,
        'success_message' => null,
        'errors' => []
    ];

    private const SUCCESS_MESSAGE = "Account has been created.";

    public function __construct()
    {
    }

    public function setSuccessMessage(): void
    {
        $this->data['status'] = true;
        $this->data['success_message'] = self::SUCCESS_MESSAGE;
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
