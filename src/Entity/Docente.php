<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DocenteRepository")
 */
class Docente
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $codigo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nombre;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Trabajo", mappedBy="docente")
     */
    private $trabajos;

    public function __construct()
    {
        $this->trabajos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodigo(): ?string
    {
        return $this->codigo;
    }

    public function setCodigo(string $codigo): self
    {
        $this->codigo = $codigo;

        return $this;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * @return Collection|Trabajo[]
     */
    public function getTrabajos(): Collection
    {
        return $this->trabajos;
    }

    public function addTrabajo(Trabajo $trabajo): self
    {
        if (!$this->trabajos->contains($trabajo)) {
            $this->trabajos[] = $trabajo;
            $trabajo->setDocente($this);
        }

        return $this;
    }

    public function removeTrabajo(Trabajo $trabajo): self
    {
        if ($this->trabajos->contains($trabajo)) {
            $this->trabajos->removeElement($trabajo);
            // set the owning side to null (unless already changed)
            if ($trabajo->getDocente() === $this) {
                $trabajo->setDocente(null);
            }
        }

        return $this;
    }
}
