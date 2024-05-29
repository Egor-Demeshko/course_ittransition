<?php

namespace App\Controller;

use App\Entity\Item;
use App\Entity\TagLink;
use App\Entity\Tags;
use App\Service\Api\TagLinkCreateService;
use App\Service\Errors;
use App\Service\ResponseData;
use App\Service\ResponseDataWithBody;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Attribute\Route;


#[AsController]
class CreateTagLinkController extends AbstractController
{
    public function __construct(
        private TagLinkCreateService $handler,
        private Errors $errorManager,
        private ResponseDataWithBody $reponseObj,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(TagLink $tagLink)
    {
        $this->handler->handle($tagLink, $this->errorManager, $this->reponseObj);

        return $this->makeResponse($tagLink);
    }

    public function makeResponse($tagLink)
    {
        if ($this->errorManager->getErrorsCount() > 0) {
            $this->errorManager->populateResponse($this->reponseObj);
            $this->entityManager->remove($tagLink);
        } else {
            $this->reponseObj->setSuccessMessage($this->reponseObj::SUCCESS_ON_TAG);
            $this->entityManager->flush();
            $this->populateResponse($tagLink);
        }

        return $this->json($this->reponseObj->getData());
    }

    private function populateResponse(TagLink $tagLink)
    {
        $body = [];

        $tagLinkId = $tagLink->getId();
        $tagId = $tagLink->getTag()->getId();
        $tagValue = $tagLink->getTag()->getValue();

        if ($tagLinkId && $tagId) {
            $body[$tagLinkId] = [
                'tag' => [
                    'id' => $tagId,
                    'value' => $tagValue
                ]
            ];
        }

        $this->reponseObj->setBody($body);
    }
}
