<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\CreateTagLinkController;
use App\Repository\TagLinkRepository;
use App\State\TagLinkCreate;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: TagLinkRepository::class)]
#[ApiResource(
    operations: [
        new Patch(
            name: 'Create Tag Link',
            uriTemplate: '/taglinks/create',
            controller: CreateTagLinkController::class,
            denormalizationContext: ['groups' => ['taglink:post:write']]
        ),
        new Delete(
            uriTemplate: '/taglinks/{id}'
        )
    ]
)]
class TagLink
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('item:get:single')]
    private ?int $id = null;

    #[ORM\ManyToOne(cascade: ['persist'], targetEntity: Tags::class, inversedBy: 'tagLinks')]
    #[ORM\JoinColumn(nullable: false, referencedColumnName: 'id')]
    #[Groups(['item:get:single', 'taglink:post:write', 'collection:get:single'])]
    private ?Tags $tag = null;

    #[ORM\ManyToOne(targetEntity: Item::class, inversedBy: "tagLinks", cascade: ["persist"])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['taglink:post:write'])]
    private ?Item $item = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTag(): ?Tags
    {
        return $this->tag;
    }

    public function setTag(?Tags $tag): static
    {
        $this->tag = $tag;

        return $this;
    }

    public function setItem(?Item $item): static
    {
        $this->item = $item;
        return $this;
    }

    public function getItem(): ?Item
    {
        return $this->item;
    }
}
