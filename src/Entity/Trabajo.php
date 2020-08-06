<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TrabajoRepository")
 */
class Trabajo
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
    private $descripcion;

    /**
     * @ORM\Column(type="date")
     */
    private $fecha_entrada;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $fecha_salida;

    /**
     * @ORM\Column(type="time")
     */
    private $hora_entrada;

    /**
     * @ORM\Column(type="time", nullable=true)
     */
    private $hora_salida;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $tipo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Estudiante", inversedBy="trabajos")
     */
    private $estudiante;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $particular;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Docente", inversedBy="trabajos")
     */
    private $docente;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Usuario", inversedBy="trabajos")
     */
    private $usuario;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $telefono;

    
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

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getFechaEntrada(): ?\DateTimeInterface
    {
        return $this->fecha_entrada;
    }

    public function setFechaEntrada(\DateTimeInterface $fecha_entrada): self
    {
        $this->fecha_entrada = $fecha_entrada;

        return $this;
    }

    public function getFechaSalida(): ?\DateTimeInterface
    {
        return $this->fecha_salida;
    }

    public function setFechaSalida(?\DateTimeInterface $fecha_salida): self
    {
        $this->fecha_salida = $fecha_salida;

        return $this;
    }

    public function getHoraEntrada(): ?\DateTimeInterface
    {
        return $this->hora_entrada;
    }

    public function setHoraEntrada(\DateTimeInterface $hora_entrada): self
    {
        $this->hora_entrada = $hora_entrada;

        return $this;
    }

    public function getHoraSalida(): ?\DateTimeInterface
    {
        return $this->hora_salida;
    }

    public function setHoraSalida(?\DateTimeInterface $hora_salida): self
    {
        $this->hora_salida = $hora_salida;

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

    public function getEstudiante(): ?Estudiante
    {
        return $this->estudiante;
    }

    public function setEstudiante(?Estudiante $estudiante): self
    {
        $this->estudiante = $estudiante;

        return $this;
    }

    public function getParticular(): ?string
    {
        return $this->particular;
    }

    public function setParticular(?string $particular): self
    {
        $this->particular = $particular;

        return $this;
    }

    public function getDocente(): ?Docente
    {
        return $this->docente;
    }

    public function setDocente(?Docente $docente): self
    {
        $this->docente = $docente;

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

    public function getTelefono(): ?string
    {
        return $this->telefono;
    }

    public function setTelefono(?string $telefono): self
    {
        $this->telefono = $telefono;

        return $this;
    }
    
    
}
