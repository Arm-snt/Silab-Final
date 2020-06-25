<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PrestamoRepository")
 */
class Prestamo
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
    private $registro;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $observacion;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Estudiante", inversedBy="prestamos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $estudiante;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Elemento", inversedBy="prestamos")
     */
    private $elemento;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $estado;

    public function __construct()
    {
        $this->elemento = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRegistro(): ?string
    {
        return $this->registro;
    }

    public function setRegistro(string $registro): self
    {
        $this->registro = $registro;

        return $this;
    }

    public function getObservacion(): ?string
    {
        return $this->observacion;
    }

    public function setObservacion(string $observacion): self
    {
        $this->observacion = $observacion;

        return $this;
    }

    public function getEstudiante(): ?Estudiante
    {
        return $this->estudiante;
    }

    public function setEstudiante(?Estudiante $estudiante): self
    {
        $this->estudiante = $estudiante;

        return $this;
    }

    /**
     * @return Collection|Elemento[]
     */
    public function getElemento(): Collection
    {
        return $this->elemento;
    }

    public function addElemento(Elemento $elemento): self
    {
        if (!$this->elemento->contains($elemento)) {
            $this->elemento[] = $elemento;
        }

        return $this;
    }

    public function removeElemento(Elemento $elemento): self
    {
        if ($this->elemento->contains($elemento)) {
            $this->elemento->removeElement($elemento);
        }

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }
}
