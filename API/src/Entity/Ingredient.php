<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass="App\Repository\IngredientRepository")
 * @ApiResource()
 */
class Ingredient
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $family;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $startSeason;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $endSeason;

    /**
     * @ORM\Column(type="text", nullable=true)
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

    public function getStartSeason(): ?\DateTimeInterface
    {
        return $this->startSeason;
    }

    public function setStartSeason(?\DateTimeInterface $startSeason): self
    {
        $this->startSeason = $startSeason;

        return $this;
    }

    public function getEndSeason(): ?\DateTimeInterface
    {
        return $this->endSeason;
    }

    public function setEndSeason(?\DateTimeInterface $endSeason): self
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
