<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\AdditionalFieldDataRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: AdditionalFieldDataRepository::class)]
#[ORM\Table(name: 'additional_field_data')]
#[ApiResource(
    operations: [new GetCollection()]
)]
class AdditionalFieldData
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:create'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:create', 'additionalfield:patch:write', 'additionalfield:patch:response', 'item:get:single', 'datacontent:post:read'])]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:create', 'additionalfield:patch:write', 'additionalfield:patch:response', 'item:get:single', 'datacontent:post:read', 'collection:get:single'])]
    private ?string $label = null;

    #[ORM\OneToOne(targetEntity: AdditionalFieldLink::class)]
    private AdditionalFieldLink $additionalFieldLink;

    #[ORM\OneToMany(targetEntity: AdditionalFieldContent::class, mappedBy: 'additional_data')]
    private Collection $fieldContent;

    public function __construct()
    {
        $this->fieldContent = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function gettype(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }


    public function getAdditionalFieldLinks(): AdditionalFieldLink
    {
        return $this->additionalFieldLink;
    }

    public function setAdditionalFieldLink(?AdditionalFieldLink $link): static
    {
        $this->additionalFieldLink = $link;

        return $this;
    }

    public function getFieldContent(): ?Collection
    {
        return $this->fieldContent;
    }

    public function addFieldContent(?AdditionalFieldContent $content): static
    {
        if (!$this->fieldContent->contains($content)) {
            $this->fieldContent->add($content);
            $content->setAdditionalData($this);
        }
        return $this;
    }

    public function removeFieldContent(AdditionalFieldContent $content): static
    {
        if ($this->fieldContent->removeElement($content)) {
            $content->setAdditionalData(null);
        }

        return $this;
    }
}
