<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MantenimientoRepository")
 */
class Mantenimiento
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Elemento", inversedBy="mantenimientos")
     */
    private $elemento;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $tipo;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $observacion;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $estado;

    /**
     * @ORM\Column(type="date")
     */
    private $fecha_solicitud;

    /**
     * @ORM\Column(type="time")
     */
    private $hora_solicitud;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fecha_entrega;

    /**
     * @ORM\Column(type="time", nullable=true)
     */
    private $hora_entrega;

    public function __construct()
    {
        $this->elemento = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(string $tipo): self
    {
        $this->tipo = $tipo;

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

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getFechaSolicitud(): ?\DateTimeInterface
    {
        return $this->fecha_solicitud;
    }

    public function setFechaSolicitud(\DateTimeInterface $fecha_solicitud): self
    {
        $this->fecha_solicitud = $fecha_solicitud;

        return $this;
    }

    public function getHoraSolicitud(): ?\DateTimeInterface
    {
        return $this->hora_solicitud;
    }

    public function setHoraSolicitud(\DateTimeInterface $hora_solicitud): self
    {
        $this->hora_solicitud = $hora_solicitud;

        return $this;
    }

    public function getFechaEntrega(): ?\DateTimeInterface
    {
        return $this->fecha_entrega;
    }

    public function setFechaEntrega(?\DateTimeInterface $fecha_entrega): self
    {
        $this->fecha_entrega = $fecha_entrega;

        return $this;
    }

    public function getHoraEntrega(): ?\DateTimeInterface
    {
        return $this->hora_entrega;
    }

    public function setHoraEntrega(?\DateTimeInterface $hora_entrega): self
    {
        $this->hora_entrega = $hora_entrega;

        return $this;
    }
}
