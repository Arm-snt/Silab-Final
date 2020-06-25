<?php

namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UsuarioRepository")
 */
class Usuario
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
    private $codusuario;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $usuario;

    /**
     * @ORM\Column(type="string", length=150)
     */
    private $nombre;

    /**
     * @ORM\Column(type="string", length=150)
     */
    private $apellido;

    /**
     * @ORM\Column(type="string", length=150)
     */
    private $correo;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    private $telefono;

    /**
     * @ORM\Column(type="string", length=15)
     */
    private $tipousuario;

    /**
     * @ORM\Column(type="string", length=15)
     */
    private $estado;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Laboratorio", mappedBy="usuario")
     */
    private $laboratorios;

    public function __construct()
    {
        $this->laboratorios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodusuario(): ?int
    {
        return $this->codusuario;
    }

    public function setCodusuario(int $codusuario): self
    {
        $this->codusuario = $codusuario;

        return $this;
    }

    public function getUsuario(): ?string
    {
        return $this->usuario;
    }

    public function setUsuario(string $usuario): self
    {
        $this->usuario = $usuario;

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

    public function getApellido(): ?string
    {
        return $this->apellido;
    }

    public function setApellido(string $apellido): self
    {
        $this->apellido = $apellido;

        return $this;
    }

    public function getCorreo(): ?string
    {
        return $this->correo;
    }

    public function setCorreo(string $correo): self
    {
        $this->correo = $correo;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

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

    public function getTipousuario(): ?string
    {
        return $this->tipousuario;
    }

    public function setTipousuario(string $tipousuario): self
    {
        $this->tipousuario = $tipousuario;

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

    public function toArray(){
        return ['id'=>$this->id,'codusuario'=>$this->codusuario,'usuario'=>$this->usuario,'nombre'=>$this->nombre,'apellido'=>$this->apellido,'correo'=>$this->correo,'password'=>$this->password,'telefono'=>$this->telefono,'tipousuario'=>$this->tipousuario,'estado'=>$this->estado];
    }

    /**
     * @return Collection|Laboratorio[]
     */
    public function getLaboratorios(): Collection
    {
        return $this->laboratorios;
    }

    public function addLaboratorio(Laboratorio $laboratorio): self
    {
        if (!$this->laboratorios->contains($laboratorio)) {
            $this->laboratorios[] = $laboratorio;
            $laboratorio->setUsuario($this);
        }

        return $this;
    }

    public function removeLaboratorio(Laboratorio $laboratorio): self
    {
        if ($this->laboratorios->contains($laboratorio)) {
            $this->laboratorios->removeElement($laboratorio);
            // set the owning side to null (unless already changed)
            if ($laboratorio->getUsuario() === $this) {
                $laboratorio->setUsuario(null);
            }
        }

        return $this;
    }

}
