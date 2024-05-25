<?php

namespace App\Entity;

use App\Repository\AdditionalFieldContentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdditionalFieldContentRepository::class)]
class AdditionalFieldContent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?AdditionalFieldData $additional_data = null;

    #[ORM\ManyToOne(inversedBy: 'additionalFieldContents')]
    #[ORM\JoinColumn(nullable: false)]
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

    public function setAdditionalData(AdditionalFieldData $additional_data): static
    {
        $this->additional_data = $additional_data;

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
