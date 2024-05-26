<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use App\Repository\ItemRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ItemRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new POST(
            denormalizationContext: ['groups' => ['item:post:newitem']]
        ),
        new Delete(),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:write']],
            normalizationContext: ['groups' => ['item:patch:response']]
        )
    ]
)]
class Item
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['collection:get:single'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['item:post:newitem', 'collection:get:single', 'item:patch:write'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false,)]
    #[Groups(['item:post:newitem'])]
    private ?CollectionData $collection = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true, columnDefinition: 'DATETIME on update CURRENT_TIMESTAMP')]
    #[Groups(['collection:get:single', 'item:patch:response'])]
    private ?\DateTimeInterface $modified_at = null;

    /**
     * @var Collection<int, AdditionalFieldContent>
     */
    #[ORM\OneToMany(targetEntity: AdditionalFieldContent::class, mappedBy: 'item')]
    private Collection $additionalFieldContents;

    #[ORM\OneToMany(targetEntity: TagLink::class, mappedBy: "item")]
    private Collection $tagLinks;

    public function __construct()
    {
        $this->created_at = new DateTimeImmutable('now');
        $this->additionalFieldContents = new ArrayCollection();
        $this->tagLinks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
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

    /**
     * @return Collection<int, AdditionalFieldContent>
     */
    public function getAdditionalFieldContents(): Collection
    {
        return $this->additionalFieldContents;
    }

    public function addAdditionalFieldContent(AdditionalFieldContent $additionalFieldContent): static
    {
        if (!$this->additionalFieldContents->contains($additionalFieldContent)) {
            $this->additionalFieldContents->add($additionalFieldContent);
            $additionalFieldContent->setItem($this);
        }

        return $this;
    }

    public function removeAdditionalFieldContent(AdditionalFieldContent $additionalFieldContent): static
    {
        if ($this->additionalFieldContents->removeElement($additionalFieldContent)) {
            // set the owning side to null (unless already changed)
            if ($additionalFieldContent->getItem() === $this) {
                $additionalFieldContent->setItem(null);
            }
        }

        return $this;
    }

    public function getTagLinks(): Collection
    {
        return $this->tagLinks;
    }

    public function setTagLink(TagLink $tagLink): static
    {
        if (!$this->tagLinks->contains($tagLink)) {
            $this->tagLinks->add($tagLink);
            $tagLink->setItem($this);
        }

        return $this;
    }

    public function removeTagLink(TagLink $tagLink): static
    {
        if ($this->tagLinks->removeElement($tagLink)) {
            if ($tagLink->getItem() === $this) {
                $tagLink->setItem(null);
            }
        }

        return $this;
    }
}
