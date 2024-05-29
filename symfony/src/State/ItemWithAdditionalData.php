<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\DTO\SingleItem;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use App\Entity\AdditionalFieldData;
use App\Entity\Item;

class ItemWithAdditionalData implements ProviderInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.item_provider')]
        private ProviderInterface $decorated,
        private EntityManagerInterface $em
    ) {
    }
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $item = $this->decorated->provide($operation, $uriVariables, $context);
        $collectionObj = $item->getCollection();
        $collectionRepository = $this->em->getRepository($collectionObj::class);
        $collection = $collectionRepository->find($collectionObj->getId());

        $additionalFieldsObjects = $collection->getAdditionalFields()->getValues();
        // $item->setAdditionalContent($this->createAdditionalContent($item));
        $item->setFieldData($this->createFieldData($additionalFieldsObjects));
        return $item;
    }

    private function createFieldData(array $additionalFieldsObjects): array
    {
        $fieldDataRepository = $this->em->getRepository(AdditionalFieldData::class);
        $fieldData = [];
        foreach ($additionalFieldsObjects as $link) {
            $dataId = $link->getFieldData()->getId();
            $data = [];
            $data["id"] = $dataId;
            $data["label"] = $fieldDataRepository->find($dataId)->getLabel();
            $data["type"] = $fieldDataRepository->find($dataId)->getType();
            $fieldData[$dataId] =  $data;
        }

        return $fieldData;
    }

    private function createAdditionalContent(Item $item): array
    {
        $result = [];


        //поулчить collection additional_field_content
        $addionalContents = $item->getAdditionalFieldContents()->getValues();

        foreach ($addionalContents as $content) {
            $singleContent = [];
            $singleContent['id'] = $content->getId();
            $singleContent['content'] = $content->getContent();
        }

        //

        return $result;
    }
}
