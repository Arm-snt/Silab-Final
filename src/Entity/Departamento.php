<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DepartamentoRepository")
 */
class Departamento
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
     * @ORM\OneToMany(targetEntity="App\Entity\Programa", mappedBy="departamento")
     */
    private $programa;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Facultad", inversedBy="departamentos")
     */
    private $facultad;

    public function __construct()
    {
        $this->programa = new ArrayCollection();
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
     * @return Collection|Programa[]
     */
    public function getPrograma(): Collection
    {
        return $this->programa;
    }

    public function addPrograma(Programa $programa): self
    {
        if (!$this->programa->contains($programa)) {
            $this->programa[] = $programa;
            $programa->setDepartamento($this);
        }

        return $this;
    }

    public function removePrograma(Programa $programa): self
    {
        if ($this->programa->contains($programa)) {
            $this->programa->removeElement($programa);
            // set the owning side to null (unless already changed)
            if ($programa->getDepartamento() === $this) {
                $programa->setDepartamento(null);
            }
        }

        return $this;
    }

    public function getFacultad(): ?Facultad
    {
        return $this->facultad;
    }

    public function setFacultad(?Facultad $facultad): self
    {
        $this->facultad = $facultad;

        return $this;
    }
   
}
