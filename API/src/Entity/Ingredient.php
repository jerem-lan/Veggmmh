<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\IngredientRepository")
 * @ApiResource(
 *      collectionOperations={
 *          "GET",
 *          "POST" = {"path" = "admin/ingredients"}
 *      },
 *      itemOperations={
 *          "GET",
 *          "PUT" = {"path" = "admin/ingredients/{id}"},
 *          "DELETE" = {"path" = "admin/ingredients/{id}"}
 *      },
 *      subresourceOperations = {
 *          "api_users_ingredients_get_subresource" = {
 *              "normalization_context" = { "groups" = {"ingredients_subresource"}}
 *          }
 *      },
 *      normalizationContext = {"groups"= {"ingredients_read"}}
 * )
 */
class Ingredient
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"ingredients_read", "ingredients_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="La famille de l'ingrédient est obligatoire")
     * @Groups({"ingredients_read", "ingredients_subresource"})
     */
    private $family;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le nom de l'ingrédient est obligatoire")
     * @Groups({"ingredients_read", "ingredients_subresource"})
     */
    private $name;

    /**
     * @ORM\Column(type="json", nullable=true)
     * @Groups({"ingredients_read", "ingredients_subresource"})
     */
    private $season = [];

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"ingredients_read", "ingredients_subresource"})
     */
    private $conservation;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="ingredient")
     * @Assert\NotBlank(message="L'utilisateur est obligatoire")
     * @Groups({"ingredients_read"})
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"ingredients_read", "ingredients_subresource"})
     */
    private $icon;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFamily(): ?string
    {
        return $this->family;
    }

    public function setFamily(string $family): self
    {
        $this->family = $family;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSeason(): ?array
    {
        return $this->season;
    }

    public function setSeason(?array $season): self
    {
        $this->season = $season;

        return $this;
    }

    public function getConservation(): ?string
    {
        return $this->conservation;
    }

    public function setConservation(?string $conservation): self
    {
        $this->conservation = $conservation;

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

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }
}
