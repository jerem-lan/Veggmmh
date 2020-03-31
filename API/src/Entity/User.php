<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 *  @ApiResource(
 *      normalizationContext = {"groups"= { "users_read" }}
 * )
 * @UniqueEntity("username", message="Nom d'utilisateur déjà existant.")
 * @UniqueEntity("email", message="Adresse mail déjà existante.")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({ "users_read" })
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotNull(message="Email manquant.")
     * @Assert\Email(message="Format d'email invalide.")
     * @Groups({ "users_read" })
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Mot de passe manquant.")
     * @Assert\Length(
     *                  min = 8,
     *                  minMessage = "Le mot de passe doit contenir 8 caractères minimum.")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="nom d'utilisateur manquant.")
     * @Assert\Length(
     *                  min = 3,
     *                  max = 20,
     *                  minMessage = "Le nom d'utilisateur doit contenir 3 caractères minimum.",
     *                  maxMessage = "Le nom d'utilisateur doit contenir 20 caractères maximum.")
     * @Groups({ "users_read" })
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="prénom manquant.")
     * @Assert\Length(
     *                  min = 2,
     *                  max = 20,
     *                  minMessage = "Le prénom doit contenir 2 caractères minimum.",
     *                  maxMessage = "Le prénom doit contenir 20 caractères maximum.")
     * @Groups({ "users_read" })
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="nom manquant.")
     * @Assert\Length(
     *                  min = 2,
     *                  max = 20,
     *                  minMessage = "Le nom doit contenir 2 caractères minimum.",
     *                  maxMessage = "Le nom doit contenir 20 caractères maximum.")
     * @Groups({ "users_read" })
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="code postal manquant.")
     * @Assert\Length(
     *                  min = 5,
     *                  max = 5,
     *                  exactMessage = "Le code postal doit contenir 5 caractères.")
     * @Assert\Type(type="numeric")
     * @Groups({ "users_read" })
     */
    private $postcode;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Date d'inscription manquante.")
     * @Groups({ "users_read" })
     */
    private $registrationDate;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Ingredient", mappedBy="user")
     */
    private $ingredient;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Ad", mappedBy="user", orphanRemoval=true)
     * @Groups({ "users_read" })
     */
    private $ad;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Recipe", mappedBy="user")
     * @Groups({ "users_read" })
     */
    private $recipe;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Recipe")
     * @Groups({ "users_read" })
     */
    private $bookmark;

    public function __construct()
    {
        $this->ingredient = new ArrayCollection();
        $this->ad = new ArrayCollection();
        $this->recipe = new ArrayCollection();
        $this->bookmark = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

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

    public function getRegistrationDate(): ?string
    {
        return $this->registrationDate;
    }

    public function setRegistrationDate(string $registrationDate): self
    {
        $this->registrationDate = $registrationDate;

        return $this;
    }

    /**
     * @return Collection|Ingredient[]
     */
    public function getIngredient(): Collection
    {
        return $this->ingredient;
    }

    public function addIngredient(Ingredient $ingredient): self
    {
        if (!$this->ingredient->contains($ingredient)) {
            $this->ingredient[] = $ingredient;
            $ingredient->setUser($this);
        }

        return $this;
    }

    public function removeIngredient(Ingredient $ingredient): self
    {
        if ($this->ingredient->contains($ingredient)) {
            $this->ingredient->removeElement($ingredient);
            // set the owning side to null (unless already changed)
            if ($ingredient->getUser() === $this) {
                $ingredient->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Ad[]
     */
    public function getAd(): Collection
    {
        return $this->ad;
    }

    public function addAd(Ad $ad): self
    {
        if (!$this->ad->contains($ad)) {
            $this->ad[] = $ad;
            $ad->setUser($this);
        }

        return $this;
    }

    public function removeAd(Ad $ad): self
    {
        if ($this->ad->contains($ad)) {
            $this->ad->removeElement($ad);
            // set the owning side to null (unless already changed)
            if ($ad->getUser() === $this) {
                $ad->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Recipe[]
     */
    public function getRecipe(): Collection
    {
        return $this->recipe;
    }

    public function addRecipe(Recipe $recipe): self
    {
        if (!$this->recipe->contains($recipe)) {
            $this->recipe[] = $recipe;
            $recipe->setUser($this);
        }

        return $this;
    }

    public function removeRecipe(Recipe $recipe): self
    {
        if ($this->recipe->contains($recipe)) {
            $this->recipe->removeElement($recipe);
            // set the owning side to null (unless already changed)
            if ($recipe->getUser() === $this) {
                $recipe->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Recipe[]
     */
    public function getBookmark(): Collection
    {
        return $this->bookmark;
    }

    public function addBookmark(Recipe $bookmark): self
    {
        if (!$this->bookmark->contains($bookmark)) {
            $this->bookmark[] = $bookmark;
        }

        return $this;
    }

    public function removeBookmark(Recipe $bookmark): self
    {
        if ($this->bookmark->contains($bookmark)) {
            $this->bookmark->removeElement($bookmark);
        }

        return $this;
    }
}
