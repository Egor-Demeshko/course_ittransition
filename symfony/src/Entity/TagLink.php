<?php

namespace App\Entity;

use App\Repository\TagLinkRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TagLinkRepository::class)]
class TagLink
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Tags $tag = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTag(): ?Tags
    {
        return $this->tag;
    }

    public function setTag(Tags $tag): static
    {
        $this->tag = $tag;

        return $this;
    }
}
