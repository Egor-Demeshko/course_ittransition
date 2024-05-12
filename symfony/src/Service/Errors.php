<?php

namespace App\Service;

use Psr\Log\LoggerInterface;

class Errors
{
    private static $errors = [];
    const GENERAL = 'general';
    const FIELD_VALIDATION = 'field';

    const MESSAGE = 'Error accured while processing the form';

    public function __construct(private LoggerInterface $logger)
    {
    }

    /**
     * @param $feild - if error on specific field 
     */
    public function setError(string $type, string $message, ?string $field = null)
    {
        match ($type) {
            Errors::GENERAL => $this->setGeneral($message),
            Errors::FIELD_VALIDATION => $this->setField($field, $message)
        };
    }

    private function setGeneral(string $message)
    {
        self::$errors[] = [
            'field' => self::GENERAL,
            'message' => $message
        ];
    }

    private function setField(string $field, string $message)
    {
        self::$errors[] = [
            'field' => $field,
            'message' => $message
        ];
    }

    public function getErrors(): array
    {
        return self::$errors;
    }

    public function getErrorsCount(): int
    {
        return count(self::$errors);
    }

    public function logErrorMessage(string $preface, string $message): void
    {
        $this->logger->log(-1, "$preface $message");
    }

    public function populateResponse(ResponseData $response): void
    {
        if ($this->getErrorsCount() > 0) {
            $response->setFalse();

            foreach (self::$errors as $error) {
                $response->setError($error);
            }
        }
    }

    public function proccessFormError(array $formErrors): void
    {
        foreach ($formErrors as $error) {
            $this->setError(self::FIELD_VALIDATION, $error->getMessage(), $error->getName());
        }
    }

    public function processDataObjectErrors(mixed $errors): void
    {
        foreach ($errors as $error) {

            $this->setError(self::FIELD_VALIDATION, $error->getMessage(), $error->getPropertyPath());
        }
    }
}
