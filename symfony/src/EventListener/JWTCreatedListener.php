<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;


final class JWTCreatedListener
{


    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $payload = $event->getData();
        $name = $event->getUser()?->getName() ?? '';
        $payload['user_id'] = $event->getUser()?->getId();
        $payload['name'] = $name;

        $event->setData($payload);
    }
}
