<?php

    namespace App\Events;

    use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
    use App\Entity\User;

    class JwtCreatedSubscriber {
        
        public function updateJwtData(JWTCreatedEvent $event){
            /**
            * @var User
            */
            $user = $event->getUser();

            $data = $event->getData();
            $data['id'] = $user->getId();

            $event->setData($data);
                
            
        }
    }
?>