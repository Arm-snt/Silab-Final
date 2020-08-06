<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProgramaRepository")
 */
class Programa
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Departamento", inversedBy="programa")
     */
    private $departamento;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Estudiante", mappedBy="programa")
     */
    private $programa;

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

    public function getDepartamento(): ?Departamento
    {
        return $this->departamento;
    }

    public function setDepartamento(?Departamento $departamento): self
    {
        $this->departamento = $departamento;

        return $this;
    }

    /**
     * @return Collection|Estudiante[]
     */
    public function getPrograma(): Collection
    {
        return $this->programa;
    }

    public function addPrograma(Estudiante $programa): self
    {
        if (!$this->programa->contains($programa)) {
            $this->programa[] = $programa;
            $programa->setPrograma($this);
        }

        return $this;
    }

    public function removePrograma(Estudiante $programa): self
    {
        if ($this->programa->contains($programa)) {
            $this->programa->removeElement($programa);
            // set the owning side to null (unless already changed)
            if ($programa->getPrograma() === $this) {
                $programa->setPrograma(null);
            }
        }

        return $this;
    }
   
  
}
