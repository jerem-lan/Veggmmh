<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AdRepository")
 *  @ApiResource(
 *      collectionOperations={"GET", "POST"},
 *      itemOperations={"GET", "PUT", "DELETE"},
 *      subresourceOperations = {
 *          "api_users_ads_get_subresource" = {
 *              "normalization_context" = {"groups"= {"ads_subresource"}}
 *          }
 *      },
 *      normalizationContext = {"groups"= {"ads_read"}}
 * )
 */
class Ad
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({ "ads_read", "ads_subresource" })
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="La date de création de l'annonce est obligatoire")
     * @Groups({ "ads_read", "ads_subresource" })
     */
    private $creationDate;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le titre de l'annonce est obligatoire")
     * @Assert\Length(
     *                  min = 5,
     *                  max = 55,
     *                  minMessage = "Le titre de l'annonce doit contenir 5 caractères minimum",
     *                  maxMessage = "Le titre de l'annonce doit contenir 55 caractères maximum")
     * @Groups({ "ads_read", "ads_subresource" })
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message="La description de l'annonce est obligatoire")
     * @Assert\Length(
     *                  min = 15,
     *                  max = 4000,
     *                  minMessage = "La description de l'annonce doit contenir 15 caractères minimum",
     *                  maxMessage = "La description de l'annonce doit contenir 4000 caractères maximum")
     * @Groups({ "ads_read", "ads_subresource" })
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le code postal est obligatoire")
     * @Assert\Length(
     *                  min = 5,
     *                  max = 5,
     *                  exactMessage = "Le code postal doit contenir exactement 5 caractères")
     * @Assert\Type(type="string")
     * @Groups({ "ads_read", "ads_subresource" })
     */
    private $postcode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({ "ads_read", "ads_subresource" })
     */
    private $modificationDate;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="ad")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({ "ads_read" })
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
