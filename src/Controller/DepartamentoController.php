<?php

namespace App\Controller;
use App\Entity\Departamento;
use App\Repository\DepartamentoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/api/departamento", name="api_departamento")
 */
class DepartamentoController extends AbstractController
{
    private $entityManager;
    private $departamentoRepository;

    public function __construct(EntityManagerInterface $entityManager, DepartamentoRepository $departamentoRepository)
    {
        $this->entityManager = $entityManager;
        $this->departamentoRepository = $departamentoRepository;
    }

    /**
    * @Route("/read", name="api_departamento_read", methods={"GET"})
    */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Departamento::class, 'default');
        $todos = $this->departamentoRepository->Mostrar();
        return $this->json($todos);
    }
}
