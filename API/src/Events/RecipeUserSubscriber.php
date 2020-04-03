<?php

    namespace App\Events;

    
    use App\Entity\Recipe;
    use ApiPlatform\Core\EventListener\EventPriorities;
    use Symfony\Component\EventDispatcher\EventSubscriberInterface;
    use Symfony\Component\HttpKernel\Event\ViewEvent;
    use Symfony\Component\HttpKernel\KernelEvents;
    use Symfony\Component\Security\Core\Security;

    class RecipeUserSubscriber implements EventSubscriberInterface{

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
                KernelEvents::VIEW => ['setUserForRecipe', EventPriorities::PRE_VALIDATE]
            ];
        }
        //la fonction que le kernel va appeler 
        public function setUserForRecipe(ViewEvent $event){
            $recipe = $event->getControllerResult();
            $method = $event->getRequest()->getMethod();

            if ($recipe instanceof Recipe && $method === "POST" ) {
                //on recupere l'utilisateur actuellement connecté
                $user = $this->security->getUser();
                //et on assigne l'utilisateur à la recette qu'on est en train de créer
                $recipe->setUser($user);
            }
        }
    }
?>