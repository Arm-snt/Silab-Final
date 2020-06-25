<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class StandardController extends AbstractController
{
    /**
     * @Route("/", name="standard")
     */
    public function index()
    {
        return $this->render('standard/index.html.twig', [
            'controller_name' => 'StandardController',
        ]);
    }

    /**
    * @Route("/{reactRoute}", name="elementos")
    */
    public function elementos()
    {
        return $this->render('standard/index.html.twig');
    }

    /**
    * @Route("/{reactRoute}/{elemento}", name="elemento/nuevo")
    */
    public function NuevoElemento()
    {
        return $this->render('standard/index.html.twig');
    }

}
