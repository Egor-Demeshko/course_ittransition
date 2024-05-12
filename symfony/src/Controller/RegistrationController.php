<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationType;
use App\Repository\UserRepository;
use App\Service\Hasher;
use App\Service\Errors;
use App\Service\ProcessForm;
use App\Service\ResponseData;
use App\Service\Validation\DataObjValidation;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


class RegistrationController extends AbstractController
{
    #[Route('/registration', name: 'registration', methods: [Request::METHOD_POST])]
    public function index(
        Request $request,
        UserRepository $repository,
        ResponseData $data,
        Hasher $hasher,
        Errors $errorManager,
        DataObjValidation $dataObjValidation
    ): Response {

        $user = new User();
        $form = $this->createForm(RegistrationType::class, $user);
        $formProcess = new ProcessForm($data, $form, $request, $hasher, $errorManager);

        $formProcess->validateForm();
        $dataObjValidation->checkObj($user, $errorManager);

        if ($errorManager->getErrorsCount() > 0) {
            $errorManager->populateResponse($data);
        } else {
            $hasher->hash($user);
            $repository->saveUser($user);
            $data->setSuccessMessage();
        }

        return $this->json($data->getData());
    }
}
