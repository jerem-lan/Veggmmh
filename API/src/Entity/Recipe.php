<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecipeRepository")
 * @ApiResource(
 *      collectionOperations={"GET", "POST"},
 *      itemOperations={"GET", "PUT", "DELETE"},
 *      subresourceOperations = {
 *          "api_users_recipes_get_subresource" = {
 *              "normalization_context" = { "groups" = {"recipes_subresource"}}
 *          }
 *      },
 *      normalizationContext = {"groups"= {"recipe_read"}}
 * )
 */
class Recipe
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Date de creation manquante.")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $creationDate;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message="Les ingredients sont obligatoires")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $ingredients;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="le type de la recette est obligatoire")
     * @Assert\Choice(choices={"Apero","Entree","Plat", "Dessert"}, message="le statut doit être Apero, Entree, Plat ou Dessert")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le nombre de personne est obligatoire")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $nbServings;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le temps de preparation est obligatoire")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $preparationTime;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message="La description de la recette est obligatoire")
     * @Assert\Length(
     *                  min = 15,
     *                  max = 4000,
     *                  minMessage = "La description de la recette doit contenir 15 caractères minimum.",
     *                  maxMessage = "La description de la recette doit contenir 4000 caractères maximum.")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $steps;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(
     *                  min = 15,
     *                  max = 4000,
     *                  minMessage = "Le commentaire doit contenir 15 caractères minimum.",
     *                  maxMessage = "Le commentaire doit contenir 4000 caractères maximum.")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $notes;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le titre de la recette est obligatoire")
     *  @Assert\Length(
     *                  min = 5,
     *                  max = 55,
     *                  minMessage = "Le titre de la recette doit contenir 5 caractères minimum.",
     *                  maxMessage = "Le titre de la recette doit contenir 55 caractères maximum.")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $recipeTitle;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Type(type="numeric", message="La note doit être numerique !")
     * @Groups({"recipes_subresource", "recipe_read"})
     */
    private $rating;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="recipe")
     * @Assert\NotBlank(message="L'utilisateur est obligatoire")
     * @Groups({"recipe_read"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreationDate(): ?string
    {
        return $this->creationDate;
    }

    public function setCreationDate(?string $creationDate): self
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getIngredients(): ?string
    {
        return $this->ingredients;
    }

    public function setIngredients(string $ingredients): self
    {
        $this->ingredients = $ingredients;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getNbServings(): ?string
    {
        return $this->nbServings;
    }

    public function setNbServings(string $nbServings): self
    {
        $this->nbServings = $nbServings;

        return $this;
    }

    public function getPreparationTime(): ?string
    {
        return $this->preparationTime;
    }

    public function setPreparationTime(string $preparationTime): self
    {
        $this->preparationTime = $preparationTime;

        return $this;
    }

    public function getSteps(): ?string
    {
        return $this->steps;
    }

    public function setSteps(string $steps): self
    {
        $this->steps = $steps;

        return $this;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(?string $notes): self
    {
        $this->notes = $notes;

        return $this;
    }

    public function getRecipeTitle(): ?string
    {
        return $this->recipeTitle;
    }

    public function setRecipeTitle(string $recipeTitle): self
    {
        $this->recipeTitle = $recipeTitle;

        return $this;
    }

    public function getRating(): ?float
    {
        return $this->rating;
    }

    public function setRating(?float $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
