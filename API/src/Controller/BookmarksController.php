<?php
    namespace App\Controller;

    use App\Entity\User;
    use App\Repository\RecipeRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Component\HttpFoundation\Request;

    class BookmarksController {

        /**
         * @var ObjectManager
         */
        private $manager;
        private $repository;

        public function __construct(EntityManagerInterface $manager, RecipeRepository $repository )
        {
            $this->manager = $manager;
            $this->repository= $repository;
        }

        public function __invoke(User $data, Request $request)
        {
            $requestdata = json_decode($request->getContent(), true);
            $id = $requestdata['id'];
            $recipe = $this->repository->findRecipe($id);
            
            $data->addBookmark($recipe);
            
            $this->manager->flush();

            return $data;
        }

    }


?>