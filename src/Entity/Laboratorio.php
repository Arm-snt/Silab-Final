<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LaboratorioRepository")
 */
class Laboratorio
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $codlaboratorio;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nombre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $ubicacion;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $observacion;

    /**
     * @ORM\Column(type="string", length=8)
     */
    private $estado;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Usuario", inversedBy="laboratorios")
     */
    private $usuario;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Elemento", mappedBy="laboratorio")
     */
    private $elementos;

    public function __construct()
    {
        $this->elementos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodlaboratorio(): ?int
    {
        return $this->codlaboratorio;
    }

    public function setCodlaboratorio(int $codlaboratorio): self
    {
        $this->codlaboratorio = $codlaboratorio;

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

    public function getUbicacion(): ?string
    {
        return $this->ubicacion;
    }

    public function setUbicacion(string $ubicacion): self
    {
        $this->ubicacion = $ubicacion;

        return $this;
    }

    public function getObservacion(): ?string
    {
        return $this->observacion;
    }

    public function setObservacion(?string $observacion): self
    {
        $this->observacion = $observacion;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(?string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getUsuario(): ?Usuario
    {
        return $this->usuario;
    }

    public function setUsuario(?Usuario $usuario): self
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * @return Collection|Elemento[]
     */
    public function getElementos(): Collection
    {
        return $this->elementos;
    }

    public function addElemento(Elemento $elemento): self
    {
        if (!$this->elementos->contains($elemento)) {
            $this->elementos[] = $elemento;
            $elemento->setLaboratorio($this);
        }

        return $this;
    }

    public function removeElemento(Elemento $elemento): self
    {
        if ($this->elementos->contains($elemento)) {
            $this->elementos->removeElement($elemento);
            // set the owning side to null (unless already changed)
            if ($elemento->getLaboratorio() === $this) {
                $elemento->setLaboratorio(null);
            }
        }

        return $this;
    }
}
