<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TagsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: TagsRepository::class)]
class Tags
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['item:get:single', 'taglink:post:write', 'collection:get:single'])]
    private ?string $value = null;

    #[ORM\OneToMany(cascade: ['persist'], targetEntity: TagLink::class, mappedBy: 'tag')]
    private ?Collection $tagLinks = null;

    public function __construct()
    {
        $this->tagLinks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getTagLinks(): Collection
    {
        return $this->tagLinks;
    }

    public function addTagLink(TagLink $tagLink): static
    {
        if (!$this->tagLinks->contains($tagLink)) {
            $this->tagLinks->add($tagLink);
            $tagLink->setTag($this);
        }
        return $this;
    }

    public function removeTagLink(TagLink $tagLink): static
    {
        if ($this->tagLinks->removeElement($tagLink)) {
            if ($tagLink->getTag() === $this) {
                $tagLink->setTag(null);
            }
        }
        return $this;
    }
}
