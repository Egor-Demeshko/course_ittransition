<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\AdditionalFieldLinkRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: AdditionalFieldLinkRepository::class)]
#[ORM\Table(name: 'additional_field_link')]
#[ApiResource(
    shortName: 'Additional Field',
    uriTemplate: 'additional_fields',
    operations: [
        // new GetCollection(),
        new Post(
            denormalizationContext: ['groups' => ['additionalfield:create']]
        ),
        new Patch(
            denormalizationContext: ['groups' => ['additionalfield:patch:write']],
            normalizationContext: ['groups' => ['additionalfield:patch:response']],
            uriTemplate: 'additional_fields/{id}'
        ),
        new Delete(
            uriTemplate: 'additional_fields/{id}'
        )

    ],
)]
class AdditionalFieldLink
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:delete'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: CollectionData::class, inversedBy: 'additionalFields')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['additionalfield:create'])]
    private ?CollectionData $collection = null;

    #[ORM\OneToOne(cascade: ["persist"])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:create', 'additionalfield:patch:write'])]
    private ?AdditionalFieldData $field_data = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCollection(): ?CollectionData
    {
        return $this->collection;
    }

    public function setCollection(?CollectionData $collection): static
    {
        $this->collection = $collection;

        return $this;
    }

    public function getFieldData(): ?AdditionalFieldData
    {
        return $this->field_data;
    }

    public function setFieldData(?AdditionalFieldData $field_data): static
    {
        $this->field_data = $field_data;

        return $this;
    }
}
