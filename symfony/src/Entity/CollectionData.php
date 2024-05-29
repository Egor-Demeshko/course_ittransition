<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\POST;
use ApiPlatform\Metadata\Put;
use App\Repository\CollectiondataRepository;
use Symfony\Component\Serializer\Attribute\Groups;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Category;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\OneToMany;

#[ORM\Entity(repositoryClass: CollectiondataRepository::class)]
#[ORM\Table(name: 'collection_data')]
#[ApiResource(
    shortName: "Collection",
    operations: [
        new Get(
            normalizationContext: ['groups' => ['collection:get:single']]
        ),
        new Post(
            normalizationContext: ['groups' => ['collection:create:newitem']],
            denormalizationContext: ['groups' => ['collection:create']]
        ),
        new Patch(
            normalizationContext: ['groups' => ['collection:patch:response']],
            denormalizationContext: [
                'groups' => ['collection:patch:write']
            ]
        ),
        new Delete()
    ],
    paginationItemsPerPage: 5
)]
#[ApiResource(
    operations: [
        new GetCollection()
    ],
    shortName: 'Collections Per User',
    uriTemplate: '/users/{id}/collections',
    uriVariables: [
        'id' => new Link(fromClass: User::class, toProperty: 'user')
    ],
    normalizationContext: ['groups' => ['collections:peruser']],
    paginationItemsPerPage: 5
)]
#[ApiResource(
    operations: [
        new PATCH()
    ],
    shortName: 'Delete items on collection',
    denormalizationContext: ['groups' => ['collection:delete:items']]
)]
class CollectionData
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['collection:create:newitem', 'collections:peruser', 'collection:get:single', 'item:get:single'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    #[Groups([
        'collection:create:newitem',
        'collection:create',
        'collections:peruser',
        'collection:patch:write',
        'collection:get:single',
    ])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['collection:create:newitem', 'collection:create', 'collections:peruser', 'collection:patch:write'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['collection:create:newitem', 'collections:peruser'])]
    private ?int $cathegory_id = null;

    #[ORM\ManyToOne(Category::class, cascade: ['persist'], inversedBy: 'collectionData')]
    #[ORM\JoinColumn(name: 'cathegory_id', referencedColumnName: "id", nullable: false)]
    #[Assert\Valid]
    #[Groups(['collection:create', 'collection:patch:write'])]
    private ?Category $cathegory = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['collections:peruser', 'collection:patch:write', 'collection:get:single'])]
    private ?string $image_link = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true, columnDefinition: "DATETIME on update CURRENT_TIMESTAMP")]
    #[Groups([
        'collection:create:newitem',
        'collections:peruser',
        'collection:patch:response',
        'collection:get:single'
    ])]
    private ?\DateTimeInterface $modified_at = null;

    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\ManyToOne(targetEntity: User::class, cascade: ['persist'], inversedBy: 'collectionData')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false)]
    #[Groups(['collection:create:newitem', 'collection:create'])]
    private ?User $user = null;

    #[OneToMany(targetEntity: AdditionalFieldLink::class, mappedBy: 'collection', cascade: ["persist"])]
    #[Groups(['collection:patch:write', 'collections:peruser', 'collection:get:single'])]
    private Collection $additionalFields;

    /**
     * @var Collection<int, Item>
     */
    #[ORM\OneToMany(targetEntity: Item::class, mappedBy: 'collection', cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['collection:get:single', 'collection:delete:items'])]
    private Collection $items;

    public function __construct()
    {
        $this->created_at = new DateTimeImmutable('now');
        $this->additionalFields = new ArrayCollection();
        $this->items = new ArrayCollection();
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

    public function getCathegoryId(): ?int
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

    public function getAdditionalFields(): ?Collection
    {
        return $this->additionalFields;
    }

    public function addAdditionalFields(AdditionalFieldLink $link): static
    {
        if (!$this->additionalFields->contains($link)) {
            $this->additionalFields->add($link);
            $link->setCollection($this);
        }
        return $this;
    }

    public function removeAdditionalFields(AdditionalFieldLink $link): static
    {
        $id = $link->getId();
        if ($this->additionalFields->remove($id)) {
            if ($link->getCollection() === $this) {
                $link->setCollection(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Item>
     */
    public function getItems(): Collection
    {
        return $this->items;
    }

    public function addItem(Item $item): static
    {
        if (!$this->items->contains($item)) {
            $this->items->add($item);
            $item->setCollection($this);
        }

        return $this;
    }

    public function removeItem(Item $item): static
    {
        if ($this->items->removeElement($item)) {
            // set the owning side to null (unless already changed)
            if ($item->getCollection() === $this) {
                $item->setCollection(null);
            }
        }

        return $this;
    }
}
