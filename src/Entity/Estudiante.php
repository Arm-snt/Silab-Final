<?php

namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EstudianteRepository")
 */
class Estudiante
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
    private $codigo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nombre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tipodoc;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $documento;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $estado;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $telefono;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Programa", inversedBy="programa")
     * @ORM\JoinColumn(nullable=false)
     */
    private $programa;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Trabajo", mappedBy="estudiante")
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getTipodoc(): ?string
    {
        return $this->tipodoc;
    }

    public function setTipodoc(string $tipodoc): self
    {
        $this->tipodoc = $tipodoc;

        return $this;
    }

    public function getDocumento(): ?string
    {
        return $this->documento;
    }

    public function setDocumento(string $documento): self
    {
        $this->documento = $documento;

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

    public function getTelefono(): ?string
    {
        return $this->telefono;
    }

    public function setTelefono(string $telefono): self
    {
        $this->telefono = $telefono;

        return $this;
    }

    public function getPrograma(): ?Programa
    {
        return $this->programa;
    }

    public function setPrograma(?Programa $programa): self
    {
        $this->programa = $programa;

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
            $trabajo->setEstudiante($this);
        }

        return $this;
    }

    public function removeTrabajo(Trabajo $trabajo): self
    {
        if ($this->trabajos->contains($trabajo)) {
            $this->trabajos->removeElement($trabajo);
            // set the owning side to null (unless already changed)
            if ($trabajo->getEstudiante() === $this) {
                $trabajo->setEstudiante(null);
            }
        }

        return $this;
    }

   
    
}
