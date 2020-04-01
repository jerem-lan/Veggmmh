<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\IngredientRepository")
 * @ApiResource(
 *      subresourceOperations = {
 *          "api_users_ingredients_get_subresource" = {
 *              "normalization_context" = { "groups" = {"ingredients_subresource"}}
 *          }
 *      }
 * )
 */
class Ingredient
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"ingredients_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"ingredients_subresource"})
     */
    private $family;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"ingredients_subresource"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Groups({ "ingredients_subresource"})
     */
    private $startSeason;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Groups({ "ingredients_subresource"})
     */
    private $endSeason;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({ "ingredients_subresource"})
     */
    private $conservation;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="ingredient")
     */
    private $user;

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

    public function getStartSeason(): ?string
    {
        return $this->startSeason;
    }

    public function setStartSeason(?string $startSeason): self
    {
        $this->startSeason = $startSeason;

        return $this;
    }

    public function getEndSeason(): ?string
    {
        return $this->endSeason;
    }

    public function setEndSeason(?string $endSeason): self
    {
        $this->endSeason = $endSeason;

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
}
