<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecipeRepository")
 * @ApiResource(
 *      subresourceOperations = {
 *          "api_users_recipes_get_subresource" = {
 *              "normalization_context" = { "groups" = {"recipes_subresource"}}
 *          }
 *      }
 * )
 */
class Recipe
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"recipes_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Groups({"recipes_subresource"})
     */
    private $creationDate;

    /**
     * @ORM\Column(type="text")
     * @Groups({"recipes_subresource"})
     */
    private $ingredients;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recipes_subresource"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recipes_subresource"})
     */
    private $nbServings;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recipes_subresource"})
     */
    private $preparationTime;

    /**
     * @ORM\Column(type="text")
     * @Groups({"recipes_subresource"})
     */
    private $steps;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"recipes_subresource"})
     */
    private $notes;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recipes_subresource"})
     */
    private $recipeTitle;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"recipes_subresource"})
     */
    private $rating;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="recipe")
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
