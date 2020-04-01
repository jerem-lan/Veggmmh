<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AdRepository")
 *  @ApiResource(
 *      normalizationContext = {"groups"= { "ads_read" }}
 * )
 */
class Ad
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({ "ads_read" })
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Date de création de l'annonce manquante.")
     * @Groups({ "ads_read" })
     */
    private $creationDate;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Titre de l'annonce manquant.")
     * @Assert\Length(
     *                  min = 5,
     *                  max = 55,
     *                  minMessage = "Le titre de l'annonce doit contenir 5 caractères minimum.",
     *                  maxMessage = "Le titre de l'annonce doit contenir 55 caractères maximum.")
     * @Groups({ "ads_read" })
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message="Description de l'annonce manquante.")
     * @Assert\Length(
     *                  min = 15,
     *                  max = 4000,
     *                  minMessage = "La description de l'annonce doit contenir 15 caractères minimum.",
     *                  maxMessage = "La description de l'annonce doit contenir 4000 caractères maximum.")
     * @Groups({ "ads_read" })
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Code postal manquant.")
     * @Assert\Length(
     *                  min = 5,
     *                  max = 5,
     *                  exactMessage = "Le code postal doit contenir 5 caractères.")
     * @Assert\Type(type="numeric")
     * @Groups({ "ads_read" })
     */
    private $postcode;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Assert\NotBlank(message="Date de modification de l'annonce manquante.")
     * @Groups({ "ads_read" })
     */
    private $modificationDate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="ad")
     * @ORM\JoinColumn(nullable=false)
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

    public function setCreationDate(string $creationDate): self
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getPostcode(): ?string
    {
        return $this->postcode;
    }

    public function setPostcode(string $postcode): self
    {
        $this->postcode = $postcode;

        return $this;
    }

    public function getModificationDate(): ?string
    {
        return $this->modificationDate;
    }

    public function setModificationDate(?string $modificationDate): self
    {
        $this->modificationDate = $modificationDate;

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
