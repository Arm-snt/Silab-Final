<?php

namespace App\Controller;
use App\Entity\Programa;
use App\Repository\ProgramaRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/api/programa", name="api_programa")
 */
class ProgramaController extends AbstractController
{
    private $entityManager;
    private $programaRepository;

    public function __construct(EntityManagerInterface $entityManager, ProgramaRepository $programaRepository)
    {
        $this->entityManager = $entityManager;
        $this->programaRepository = $programaRepository;
    }

    /**
    * @Route("/read", name="api_programa_read", methods={"GET"})
    */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Programa::class, 'default');
        $todos = $this->programaRepository->Mostrar();
        return $this->json($todos);
    }
}
