<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\AdditionalFieldData;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class SingleCollection implements ProviderInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.item_provider')]
        private ProviderInterface $decorated,
        private EntityManagerInterface $em
    ) {
    }


    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $singleCollection = $this->decorated->provide($operation, $uriVariables, $context);
        $items = $singleCollection->getItems();

        $this->processItems($items);

        return $singleCollection;
    }

    public function processItems($items)
    {
        foreach ($items as $item) {
            $content = $item->getAdditionalFieldContents();
            $slicedContent = $content->slice(-2);
            $content->clear();
            foreach ($slicedContent as $singleContent) {
                $content->add($singleContent);
            }
        }
    }
}
