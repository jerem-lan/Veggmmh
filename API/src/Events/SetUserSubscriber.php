<?php

    namespace App\Events;

    use ApiPlatform\Core\EventListener\EventPriorities;
    use Symfony\Component\EventDispatcher\EventSubscriberInterface;
    use Symfony\Component\HttpKernel\Event\ViewEvent;
    use Symfony\Component\HttpKernel\KernelEvents;
    use Symfony\Component\Security\Core\Security;
    use App\Entity\Ad;
    use App\Entity\Ingredient;
    use App\Entity\Recipe;

    class SetUserSubscriber implements EventSubscriberInterface{

        private $security;

        public function __construct(Security $security)
        {
            $this->security = $security;
        }

        //fonction qui renvoie un tableau des evenements avec qui elle veut se lier 
        //pour savaoir à quelle moment elle doit intervenir 
        public static function getSubscribedEvents()
        {
            return [
                //ici on se place avant la validation
                KernelEvents::VIEW => ['setUser', EventPriorities::PRE_VALIDATE]
            ];
        }

        //la fonction que le kernel va appeler 
        public function setUser(ViewEvent $event){
            $data = $event->getControllerResult();
            $method = $event->getRequest()->getMethod();

            //Set un user lors de l'ajout d'une recette en méthode POST
            if ($data instanceof Recipe && $method === "POST" ) {
                //on recupere l'utilisateur actuellement connecté
                $user = $this->security->getUser();
                //et on assigne l'utilisateur à la recette qu'on est en train de créer
                $data->setUser($user);
            }

            //Set un user lors de l'ajout d'un ingrédient en méthode POST
            if ($data instanceof Ingredient && $method === "POST" ) {
                //on recupere l'utilisateur actuellement connecté
                $user = $this->security->getUser();
                //et on assigne l'utilisateur à la recette qu'on est en train de créer
                $data->setUser($user);
            }

            //Set un user lors de l'ajout d'une annonce en méthode POST
            if ($data instanceof Ad && $method === "POST" ) {
                //on recupere l'utilisateur actuellement connecté
                $user = $this->security->getUser();
                //et on assigne l'utilisateur à la recette qu'on est en train de créer
                $data->setUser($user);
            }
        }
    }
?>