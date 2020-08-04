<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FacultadRepository")
 */
class Facultad
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
     * @ORM\OneToMany(targetEntity="App\Entity\Departamento", mappedBy="facultad")
     */
    private $departamentos;

    public function __construct()
    {
        $this->departamentos = new ArrayCollection();
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
     * @return Collection|Departamento[]
     */
    public function getDepartamentos(): Collection
    {
        return $this->departamentos;
    }

    public function addDepartamento(Departamento $departamento): self
    {
        if (!$this->departamentos->contains($departamento)) {
            $this->departamentos[] = $departamento;
            $departamento->setFacultad($this);
        }

        return $this;
    }

    public function removeDepartamento(Departamento $departamento): self
    {
        if ($this->departamentos->contains($departamento)) {
            $this->departamentos->removeElement($departamento);
            // set the owning side to null (unless already changed)
            if ($departamento->getFacultad() === $this) {
                $departamento->setFacultad(null);
            }
        }

        return $this;
    }
}
