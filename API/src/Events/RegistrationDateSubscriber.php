<?php

    namespace App\Events;
    
    use Symfony\Component\HttpKernel\KernelEvents;
    use Symfony\Component\HttpKernel\Event\ViewEvent;
    use ApiPlatform\Core\EventListener\EventPriorities;
    use Symfony\Component\EventDispatcher\EventSubscriberInterface;
    use App\Entity\User;
    use App\Entity\Ad;
    use App\Entity\Recipe;

    class RegistrationDateSubscriber implements EventSubscriberInterface {
        
        public static function getSubscribedEvents()
        {
            return [
                KernelEvents::VIEW => ['setRegistrationDateForUser', EventPriorities::PRE_VALIDATE]
            ];
        }

        public function setRegistrationDateForUser(ViewEvent $event){
            
            $data = $event->getControllerResult();
            $method = $event->getRequest()->getMethod();

            setlocale(LC_TIME, 'fr_FR');
            date_default_timezone_set('Europe/Paris');
            $date = strftime('%d-%m-%Y %H:%M');

            if ($data instanceof User && $method === "POST" ) {
                
                if (empty($data->getRegistrationDate())) {
                    
                    $data->setRegistrationDate($date);
                }
            }

            if ($data instanceof Ad && $method === "POST") {
                
                if (empty($data->getCreationDate())) {
                    
                    $data->setCreationDate($date);
                }
            }

            if($data instanceof Ad && $method === "PUT") {

                $data->setModificationDate($date);
            }

            if ($data instanceof Recipe && $method === "POST") {
                
                if(empty($data->getCreationDate())) {
                    
                    $data->setCreationDate($date);
                }
            }
        }
    }
?>