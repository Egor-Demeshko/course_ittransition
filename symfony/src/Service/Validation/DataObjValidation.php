<?php

namespace App\Service\Validation;

use App\Service\Errors;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class DataObjValidation
{
    private ?object $data = null;
    private ?Errors $errorManager = null;

    public function __construct(private ValidatorInterface $validator)
    {
    }

    public function checkObj(object $object, Errors $errorManager): void
    {
        $this->data = $object;
        $this->errorManager = $errorManager;

        $this->validate();
    }

    public function validate()
    {
        $errors = $this->validator->validate($this->data);

        if (count($errors) > 0) {
            $this->errorManager->processDataObjectErrors($errors);
        }
    }
}
