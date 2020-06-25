<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TagRepository")
 */
class Tag
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
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Article", inversedBy="tags")
     */
    private $ArtTag;

    public function __construct()
    {
        $this->ArtTag = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection|Article[]
     */
    public function getArtTag(): Collection
    {
        return $this->ArtTag;
    }

    public function addArtTag(Article $artTag): self
    {
        if (!$this->ArtTag->contains($artTag)) {
            $this->ArtTag[] = $artTag;
        }

        return $this;
    }

    public function removeArtTag(Article $artTag): self
    {
        if ($this->ArtTag->contains($artTag)) {
            $this->ArtTag->removeElement($artTag);
        }

        return $this;
    }
}
