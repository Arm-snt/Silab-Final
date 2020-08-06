<?php

namespace App\Controller;
use App\Entity\Docente;
use App\Repository\DocenteRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/api/docente", name="api_docente")
 */
class DocenteController extends AbstractController
{
    private $entityManager;
    private $docenteRepository;

    public function __construct(EntityManagerInterface $entityManager, DocenteRepository $docenteRepository)
    {
        $this->entityManager = $entityManager;
        $this->docenteRepository = $docenteRepository;
    }

    /**
    * @Route("/read", name="api_docente_read", methods={"GET"})
    */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Docente::class, 'default');
        $todos = $this->docenteRepository->Mostrar();
        return $this->json($todos);
    }
}
