<?php

namespace App\Controller;
use App\Entity\Facultad;
use App\Repository\FacultadRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/api/facultad", name="api_facultad")
 */
class FacultadController extends AbstractController
{
    private $entityManager;
    private $facultadRepository;

    public function __construct(EntityManagerInterface $entityManager, FacultadRepository $facultadRepository)
    {
        $this->entityManager = $entityManager;
        $this->facultadRepository = $facultadRepository;
    }

    /**
    * @Route("/read", name="api_facultad_read", methods={"GET"})
    */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Facultad::class, 'default');
        $todos = $this->facultadRepository->Mostrar();
        return $this->json($todos);
    }
}
