<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\State\CollectionProvider;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\CollectionData;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class TopCollections implements ProviderInterface
{

    public function __construct(
        private EntityManagerInterface $em,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $collections = $this->em->getRepository(CollectionData::class);
        $result = $collections->findTopFive();
        return $result;
    }
}
