<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\POST;
use App\Repository\CollectiondataRepository;
use Symfony\Component\Serializer\Attribute\Groups;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Category;
use DateTimeImmutable;

#[ORM\Entity(repositoryClass: CollectiondataRepository::class)]
#[ORM\Table(name: 'collection_data')]
#[ApiResource(
    shortName: "Collection",
    operations: [
        new Post(
            normalizationContext: ['groups' => ['collection:create:newitem']],
            denormalizationContext: ['groups' => ['collection:create']]
        )
    ],
    paginationItemsPerPage: 5
)]
class Collectiondata
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['collection:create:newitem'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[Groups(['collection:create:newitem', 'collection:create'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['collection:create:newitem', 'collection:create'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['collection:create:newitem'])]
    private ?int $cathegory_id;

    #[ORM\ManyToOne(Category::class, cascade: ['persist', 'remove'], inversedBy: 'collectionData')]
    #[ORM\JoinColumn(name: 'cathegory_id', referencedColumnName: "id", nullable: false)]
    #[Assert\Valid]
    #[Groups(['collection:create'])]
    private ?Category $cathegory = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image_link = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true, columnDefinition: "DATETIME on update CURRENT_TIMESTAMP")]
    #[Groups("collection:create:newitem")]
    private ?\DateTimeInterface $modified_at = null;

    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\ManyToOne(targetEntity: User::class, cascade: ['persist', 'remove'], inversedBy: 'collectionData')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false)]
    #[Groups(['collection:create:newitem', 'collection:create'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->created_at = new DateTimeImmutable('now');
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

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): static
    {
        $this->user_id = $user_id;

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

    public function setCathegoryId(int $cathegory_id): static
    {
        $this->cathegory_id = $cathegory_id;

        return $this;
    }

    public function getCathegory(): ?Category
    {
        return $this->cathegory;
    }

    public function setCathegory(?Category $cathegory): void
    {
        $this->cathegory = $cathegory;
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
