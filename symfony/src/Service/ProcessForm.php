<?php

namespace App\Service;


use App\Service\ResponseData;
use App\Service\Errors;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

class ProcessForm
{
    public function __construct(
        private ResponseData $data,
        private FormInterface $form,
        private Request $request,
        private Hasher $hasher,
        private Errors $errorManager
    ) {
    }


    public function validateForm(): void
    {
        $form = $this->form;

        $form->handleRequest($this->request);
        if ($form->isSubmitted() && $form->isValid()) {
        } else {
            $this->errorManager->proccessFormError([...$form->getErrors()]);
        }
    }
}
