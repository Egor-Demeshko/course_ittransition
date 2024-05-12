<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class Hasher
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function hash(User $user): void
    {
        $password = $user->getPassword();

        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);

        $user->setPassword($hashedPassword);
    }
}
