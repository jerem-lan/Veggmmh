<?php

    namespace App\Events;

    use App\Entity\User;
    use Symfony\Component\HttpKernel\KernelEvents;
    use Symfony\Component\HttpKernel\Event\ViewEvent;
    use ApiPlatform\Core\EventListener\EventPriorities;
    use Symfony\Component\EventDispatcher\EventSubscriberInterface;

    class RegistrationDateSubscriber implements EventSubscriberInterface {
        
        public static function getSubscribedEvents()
        {
            return [
                KernelEvents::VIEW => ['setRegistrationDateForUser', EventPriorities::PRE_VALIDATE]
            ];
        }

        public function setRegistrationDateForUser(ViewEvent $event){
            
            $user = $event->getControllerResult();
            $method = $event->getRequest()->getMethod();

            if ($user instanceof User && $method === "POST" ) {

                if (empty($user->getRegistrationDate())) {
                    setlocale(LC_TIME, 'fr_FR');
                    date_default_timezone_set('Europe/Paris');
                    $date = strftime('%d-%m-%Y %H:%M');

                    $user->setRegistrationDate($date);
                }
            }
        
        }
    }

?>