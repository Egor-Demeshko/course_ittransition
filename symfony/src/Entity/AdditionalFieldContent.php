<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Repository\AdditionalFieldContentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AdditionalFieldContentRepository::class)]
#[ApiResource(
    operations: [new Post(
        denormalizationContext: ['groups' => ['datacontent:post:write']],
        normalizationContext: ['groups' => ['datacontent:post:read']]
    )]
)]
class AdditionalFieldContent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['item:get:single', 'datacontent:post:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['item:get:single', 'datacontent:post:write', 'datacontent:post:read'])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'fieldContent')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['item:get:single', 'datacontent:post:write', 'datacontent:post:read'])]
    private ?AdditionalFieldData $additional_data = null;

    #[ORM\ManyToOne(inversedBy: 'additionalFieldContents')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['datacontent:post:write'])]
    private ?Item $item = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getAdditionalData(): ?AdditionalFieldData
    {
        return $this->additional_data;
    }

    public function setAdditionalData(?AdditionalFieldData $content): static
    {
        $this->additional_data = $content;
        return $this;
    }

    public function getItem(): ?Item
    {
        return $this->item;
    }

    public function setItem(?Item $item): static
    {
        $this->item = $item;

        return $this;
    }
}
