<?php

namespace App\EventListener;

use DateTime;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Security\Http\Event\LoginSuccessEvent;
use App\Repository\UserRepository;

#[AsEventListener]
class LoginSuccessful
{
    public function __construct(private UserRepository $repository)
    {
    }

    public function __invoke(LoginSuccessEvent $event)
    {
        $user = $event->getUser();
        $id = $user->getId();
        if ($id) {
            $this->repository->saveLoginTime($id);
        }
    }
}
