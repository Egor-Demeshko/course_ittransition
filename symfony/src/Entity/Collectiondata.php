<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CollectiondataRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Category;

#[ORM\Entity(repositoryClass: CollectiondataRepository::class)]
#[ORM\Table(name: 'collection_data')]
#[ApiResource]
class Collectiondata
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $cathegory_id = null;

    #[ORM\OneToOne(Category::class, inversedBy: 'collection_data')]
    #[ORM\JoinColumn(name: 'cathegory_id', referencedColumnName: "id", nullable: false)]
    #[Assert\Valid]
    private ?Category $category = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image_link = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true, columnDefinition: "DATETIME on update CURRENT_TIMESTAMP")]
    private ?\DateTimeInterface $modified_at = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCathegoryId(): ?string
    {
        return $this->cathegory_id;
    }

    public function setCathegoryId(string $cathegory_id): static
    {
        $this->cathegory_id = $cathegory_id;

        return $this;
    }

    public function getCathegory(): ?Category
    {
        return $this->category;
    }

    public function setCathegory(?Category $category): void
    {
        $this->category = $category;
    }

    public function getImageLink(): ?string
    {
        return $this->image_link;
    }

    public function setImageLink(?string $image_link): static
    {
        $this->image_link = $image_link;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getModifiedAt(): ?\DateTimeInterface
    {
        return $this->modified_at;
    }

    public function setModifiedAt(?\DateTimeInterface $modified_at): static
    {
        $this->modified_at = $modified_at;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }
}
