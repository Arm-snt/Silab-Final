<?php

namespace App\Controller;
use App\Entity\Laboratorio;
use App\Repository\LaboratorioRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/laboratorio", name="api_laboratorio")
 */
class LaboratorioController extends AbstractController
{
    private $entityManager;
    private $laboratorioRepository;
 
    public function __construct(EntityManagerInterface $entityManager, LaboratorioRepository $laboratorioRepository)
    {
        $this->entityManager = $entityManager;
        $this->laboratorioRepository = $laboratorioRepository;
    }
    /**
     * @Route("/read", name="api_laboratorio_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
        $todos = $this->laboratorioRepository->Mostrar();
        return $this->json($todos);
    }

    /**
     * @Route("/create", name="api_laboratorio_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);
               
        $codlaboratorio=$content['codlaboratorio'];
        $usuario_id=$content['usuario_id'];
        $nombre=$content['nombre'];
        $ubicacion=$content['ubicacion'];
        $observacion=$content['observacion'];
        $estado=$content['estado'];
        
        try {
            
            $todo = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
            $todo = $this->laboratorioRepository->Insertar($codlaboratorio, $usuario_id, $nombre, $ubicacion, $observacion, $estado);
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El laboratorio no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'message' => ['text'=>['El laboratorio de '.$nombre, 'se ha registrado!' ] , 'level'=>'success']      
                 ]);
    }

    
      /**
     * @Route("/update/{id}", name="api_laboratorio_update", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $content = json_decode($request->getContent());

        $id=$content->id;
        $codlaboratorio=$content->codlaboratorio;
        $usuario_id=$content->usuario_id;
        $nombre=$content->nombre;
        $ubicacion=$content->ubicacion;
        $observacion=$content->observacion;
        $estado=$content->estado;
        $elementospres= [];
        
        $todo = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
        $todo = $this->laboratorioRepository->Buscar($id);
        
        $codlaboratorio_bd=$todo['codlaboratorio'];
        $usuario_id_bd=$todo['usuario_id'];
        $nombre_bd=$todo['nombre'];
        $ubicacion_bd=$todo['ubicacion'];
        $observacion_bd=$todo['observacion'];
        $estado_bd=$todo['estado'];

        if ($codlaboratorio===$codlaboratorio_bd && $usuario_id===$usuario_id_bd && $nombre===$nombre_bd && $ubicacion===$ubicacion_bd && $observacion===$observacion_bd && $estado===$estado_bd) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios al laboratorio: '.$nombre_bd] , 'level'=>'warning']
            ]);
        }

        try {
            if($codlaboratorio === '' && $nombre === '' && $ubicacion === '' && $observacion === '' && $estado === ''){
                $codlaboratorio=$codlaboratorio_bd;
                $nombre=$nombre_bd;
                $ubicacion=$ubicacion_bd;
                $observacion=$observacion_bd;
                $estado=$estado_bd;
            }
            $todo = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
            $todo = $this->laboratorioRepository->Actualizar($id, $codlaboratorio, $usuario_id, $nombre, $ubicacion, $observacion, $estado);
            //$elementospres = $this->laboratorioRepository->MostrarPrestatoEle();
            $elementospres = $this->laboratorioRepository->TraerLaboratorio($id, $usuario_id);
            $todo = $this->laboratorioRepository->Buscar($id);

        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba el laboratorio!'] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'todo'    => $todo,
            'elementospres'    => $elementospres,
            'message' => ['text'=>['El laboratorio se ha actualizado' ] , 'level'=>'success']      
        ]);
 
    }

    /**
     * @Route("/delete/{id}", name="api_laboratorio_delete", methods={"DELETE","GET"})
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request)
    {
        $content = json_decode($request->getContent());
        $id=$content->id;

        try {
            $todo = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
            $todo = $this->laboratorioRepository->Eliminar($id);
           
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el laboratorio!'.$exception] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del laboratorio'] , 'level'=>'success']
        ]);
 
    }
 
    
    
    
  
}