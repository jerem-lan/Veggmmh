<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordAndRoleUserSubscriber implements EventSubscriberInterface {

        /** @var  UserPasswordEncoderInterface */
        private $encoder;

        public function __construct(UserPasswordEncoderInterface $encoder)
        {
            $this->encoder = $encoder;
        }

        
        public static function getSubscribedEvents()
        {
            return [
                
                KernelEvents::VIEW=> ['setAttributesForUser', EventPriorities::PRE_WRITE]
            ];
        }

        public function setAttributesForUser(ViewEvent $event){
            
            $user = $event->getControllerResult();
                        
            $method = $event->getRequest()->getMethod();
            
            if ($user instanceof User && ($method === "POST" || $method === "PUT")) {
                $hash = $this->encoder->encodePassword($user, $user->getPassword());

                $user->setPassword($hash);
            }
            if ($user instanceof User && $method === "POST") {
                $role = $user->getRoles();

                $user->setRoles($role);
            }
        } 
    }
?>