<?php

namespace App\Service\Api;

use App\Entity\TagLink;
use App\Entity\Tags;
use App\Repository\TagLinkRepository;
use App\Repository\TagsRepository;
use App\Service\Errors;
use App\Service\ResponseData;
use App\Service\ResponseDataWithBody;
use Doctrine\ORM\EntityManagerInterface;

class TagLinkCreateService
{

    private ?string $tagName = null;
    public function __construct(
        private TagsRepository $tagRepository,
        private TagLinkRepository $tagLinkRepo,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function handle(TagLink $tagLink, Errors $errors)
    {
        $this->tagName = $tagLink->getTag()->getValue();

        $result = $this->tagRepository->findBy(['value' => $this->tagName]);

        if (count($result) > 0) {
            $tag = $result[0];
            $this->onTagExists($tag, $tagLink, $errors);
        } else {
            $this->entityManager->persist($tagLink);
        }
    }

    public function onTagExists(Tags $tag, TagLink $tagLink, Errors $errors)
    {
        $itemId = $tagLink->getItem()->getId();
        $tagId = $tag->getId();

        $tagLinkFromDb = $this->tagLinkRepo->findBy(['item' => $itemId, 'tag' => $tagId]);
        if (count($tagLinkFromDb) > 0) {
            $errors->setError(Errors::GENERAL, "Tag with name $this->tagName exists on item with id $tagId");
            return;
        } else if (count($tagLinkFromDb) === 0) {
            $tag->addTagLink($tagLink);
            $tagLink->setTag($tag);

            $this->entityManager->persist($tagLink);
            $this->entityManager->persist($tag);
        }
    }
}
