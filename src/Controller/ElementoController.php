<?php

namespace App\Controller;
use App\Entity\Elemento;
use App\Repository\ElementoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


    /**
     * @Route("/api/elemento", name="api_elemento")
     */

class ElementoController extends AbstractController
{
    private $entityManager;
    private $elementoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, ElementoRepository $elementoRepository){

        $this->entityManager = $entityManager;
        $this->elementoRepository = $elementoRepository;
    }

    /**
     * @Route("/create", name="api_elemento_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
    */

    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Elemento();
        $todo->setCodElemento($content->codelemento);
        $todo->setElemento($content->elemento);
        $todo->setStock($content->stock);
        $todo->setHoraUso($content->horauso);
        $todo->setCategoria($content->categoria);
        $todo->setEstado($content->estado);

        try{
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        }catch (Exception $exception){
            return $this->json([ 
                'message' => ['text'=>['El Elemento no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }

        return $this->json([ 
            'todo' => $todo->toArray(),
            'message' => ['text'=>['El Elemento: '.$content->elemento,' se ha registrado!'] , 'level'=>'success']
            ]);

    }

    /**
     * @Route("/read", name="api_elemento_read", methods={"GET"})
     */

    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Elemento::class, 'default');
        $todos = $this->elementoRepository->Mostrar();
        return $this->json($todos);
    }

    /**
     * @Route("/update/{id}", name="api_elemento_update", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
    */

    public function update(Request $request)
    {
        $content = json_decode($request->getContent());      
        
        $id=$content->id;
        $laboratorio_id=$content->laboratorio_id;
        $codelemento=$content->codelemento;
        $elemento=$content->elemento;
        $stock=$content->stock;
        $horauso=$content->horauso;
        $categoria=$content->categoria;
        $estado=$content->estado;
        $elementospres= [];
        
        $todo = $this->getDoctrine()->getRepository(Elemento::class, 'default');
        $todo = $this->elementoRepository->Buscar($id);
        $codelemento_bd=$todo['codelemento'];
        $laboratorio_id_bd=$todo['laboratorio_id'];
        $elemento_bd=$todo['elemento'];
        $stock_bd=$todo['stock'];
        $horauso_bd=$todo['horauso'];
        $categoria_bd=$todo['categoria'];
        $estado_bd=$todo['estado'];
        
        if ($codelemento==$codelemento_bd && $laboratorio_id==$laboratorio_id_bd && $elemento==$elemento_bd && $stock==$stock_bd && $horauso==$horauso_bd && $categoria==$categoria_bd && $estado==$estado_bd) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios al elemento '] , 'level'=>'warning']
                ]);
            }
            
            try {
                if($codelemento === '' && $elemento === '' && $stock === '' && $horauso === '' && $categoria === '' && $estado === ''){
                    $codelemento=$codelemento_bd;
                    $elemento=$elemento_bd;
                    $stock=$stock_bd;
                    $horauso=$horauso_bd;
                    $categoria=$categoria_bd;
                    $estado=$estado_bd;
                }
                
                $todo = $this->getDoctrine()->getRepository(Elemento::class, 'default');
                $todo = $this->elementoRepository->Actualizar($id, $laboratorio_id, $codelemento, $elemento, $stock, $horauso, $categoria, $estado);
                // mostrar todos los datos
                $todo = $this->elementoRepository->InfoLab($id);
                $elementospres = $this->elementoRepository->TraerElemento($id, $laboratorio_id);
                //$elementospres = $this->elementoRepository->MostrarPrestatoEle();
                //$elemento_array = $this->elementoRepository->TraerElemento($id,$laboratorio_id);
                //array_push($elementospres, $elemento_array);
                

        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba el elemento!'.$exception] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'todo' => $todo,            
            'elementospres' => $elementospres,
            'message' => ['text'=>['El elemento se ha actualizado' ] , 'level'=>'success']      
        ]);
 
    }
    
    /**
     * @Route("/delete/{id}", name="api_elemento_delete", methods={"DELETE"})
     * @param Request $request
     * @param Elemento $todo
     * @return JsonResponse
    */

    public function delete  (Request $request,Elemento $todo )
    {
        $content = json_decode($request->getContent());

         try{
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        }catch (Exception $exception){
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el elemento!'] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'message' => ['text'=>['Se ha eliminado el registro del elemento: '.$todo->getElemento()] , 'level'=>'success']
        ]);
    }
    

}
