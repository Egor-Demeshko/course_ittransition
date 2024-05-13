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
        $payload['name'] = $name;

        $event->setData($payload);
    }
}
