<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AdditionalFieldDataRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: AdditionalFieldDataRepository::class)]
#[ORM\Table(name: 'additional_field_data')]
class AdditionalFieldData
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:create'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:create'])]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    #[Groups(['collection:patch:write', 'collections:peruser', 'additionalfield:create'])]
    private ?string $label = null;

    #[ORM\OneToOne(targetEntity: AdditionalFieldLink::class)]
    private AdditionalFieldLink $additionalFieldLink;

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
}
