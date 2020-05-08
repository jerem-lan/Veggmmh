<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PutPassword implements EventSubscriberInterface {

        /** @var  UserPasswordEncoderInterface */
        private $encoder;
        //private $repository;

        public function __construct(UserPasswordEncoderInterface $encoder, UserRepository $repository)
        {
            $this->encoder = $encoder;
            //$this->repository = $repository;
        }

        
        public static function getSubscribedEvents()
        {
            return [
                
                KernelEvents::VIEW=> ['PutNewPassword', EventPriorities::POST_VALIDATE]
            ];
        }

        public function PutNewPassword(ViewEvent $event){
            
            $user = $event->getControllerResult();
            $method = $event->getRequest()->getMethod();
            $data = $event->getRequest()->attributes->get('previous_data');

            if ($user instanceof User && $method === "PUT") {
                $data->getPassword();
                $userPassword = $user->getPassword();
                if ($userPassword != $data->getPassword()) {
                $hash = $this->encoder->encodePassword($user, $userPassword);
                
                $user->setPassword($hash);
                }
            }
        } 
    }
?>