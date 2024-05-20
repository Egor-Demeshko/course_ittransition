<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity('email', 'Account with such an email already exists.')]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ],
    normalizationContext: ['groups' => ['user:read']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Name field should not be empty.')]
    // #[Assert\NoSuspiciousCharacters] needs intl plugin
    #[Groups(['user:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Password field should not be empty.')]
    private ?string $password = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\Email(message: 'Email should be like example@example.by')]
    #[Assert\NotBlank(message: 'Email field shouldn\'t be empty')]
    #[Groups(['user:read'])]
    private ?string $email = null;

    #[ORM\Column(type: Types::BINARY)]
    private $role;

    private array $roles = [];

    #[Groups(['user:read'])]
    #[ORM\Column]
    private ?bool $status = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[Groups(['user:read'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true, columnDefinition: "DATETIME on update CURRENT_TIMESTAMP")]
    private ?\DateTimeInterface $modified_at = null;

    #[ORM\Column(type: TYPES::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $last_loggined_at = null;


    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Collectiondata::class, cascade: ['persist'],)]
    #[Groups(['user:read'])]
    private Collection $collectionData;

    public function __construct()
    {
        $this->collectionData = new ArrayCollection();
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

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getRole()
    {
        return $this->role;
    }

    public function setRole(int $role): static
    {
        $this->role = decbin($role);

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): static
    {
        $this->status = $status;

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

    public function setModifiedAt(\DateTimeInterface $modified_at): static
    {
        $this->modified_at = $modified_at;

        return $this;
    }

    public function getLastLogginedAt(): ?\DateTimeInterface
    {
        return $this->last_loggined_at;
    }

    public function setLastLogginedAt(\DateTimeInterface $last_loggined_at): static
    {
        $this->last_loggined_at = $last_loggined_at;
        return $this;
    }


    /** AUTH */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function eraseCredentials(): void
    {
    }

    public function getCollectionData(): ?Collection
    {
        return $this->collectionData;
    }

    public function addCollectionData(CollectionData $data): static
    {
        if (!$this->collectionData->contains($data)) {
            $this->collectionData->add($data);
            $data->setUser($this);
        }

        return $this;
    }

    public function removeCollectionData(CollectionData $data): static
    {
        if ($this->collectionData->removeElement($data)) {
            if ($data->getUser() === $this) {
                $data->setUser(null);
            }
        }

        return $this;
    }
}
