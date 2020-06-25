<?php

namespace App\Controller;
use App\Entity\Trabajo;
use App\Repository\TrabajoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/trabajo", name="api_trabajo")
 */
class TrabajoController extends AbstractController
{
    private $entityManager;
    private $trabajoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, TrabajoRepository $trabajoRepository)
    {
        $this->entityManager = $entityManager;
        $this->trabajoRepository = $trabajoRepository;
    }
    /**
     * @Route("/read", name="api_trabajo_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Trabajo::class, 'default');
        $todos = $this->trabajoRepository->Mostrar();
        return $this->json($todos);
    }

    /**
     * @Route("/create", name="api_trabajo_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);
               
        $estudiante_id=$content['estudiante_id'];
        $registro=$content['registro'];
        $descripcion=$content['descripcion'];
        try {
            
            $todo = $this->getDoctrine()->getRepository(Trabajo::class, 'default');
            $todo = $this->trabajoRepository->Insertar($estudiante_id,$registro,$descripcion);
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El trabajo no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'message' => ['text'=>['El trabajo de '.$estudiante_id, 'se ha registrado!' ] , 'level'=>'success']      
                 ]);
    }

    /**
     * @Route("/update/{id}", name="api_trabajo_update", methods={"PUT"})
     * @param Request $request
     * @param Trabajo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Trabajo $todo)
    {
        $content = json_decode($request->getContent());
        
        $id=$content->id;
        $estudiante_id=$content->estudiante_id;
        $registro=$content->registro;
        $descripcion=$content->descripcion;
        
        $todo = $this->getDoctrine()->getRepository(Trabajo::class, 'default');
        $todo = $this->trabajoRepository->Buscar($id,$estudiante_id,$registro,$descripcion);
        

        $estudiante_id_bd=$todo['estudiante_id'];
        $registro_bd=$todo['registro'];
        $descripcion_bd=$todo['descripcion'];
        $nombre_bd=$todo['nombre'];

        if ($estudiante_id===$estudiante_id_bd && $registro===$registro_bd && $descripcion===$descripcion_bd) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios al estudiante: '.$nombre_bd] , 'level'=>'warning']
            ]);
        }

        try {
            $todo = $this->getDoctrine()->getRepository(Trabajo::class, 'default');
            $todo = $this->trabajoRepository->Actualizar($id,$estudiante_id,$registro,$descripcion);
            $todo = $this->trabajoRepository->Buscar($id,$estudiante_id,$registro,$descripcion);

        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba el trabajo!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'todo'    => $todo,
            'message' => ['text'=>['El trabajo del estudiante '.$todo['nombre'], ' se ha actualizado' ] , 'level'=>'success']      
        ]);
 
    }

    /**
     * @Route("/delete/{id}", name="api_trabajo_delete", methods={"DELETE"})
     * @param Trabajo $todo
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request, Trabajo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el trabajo!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del trabajo'] , 'level'=>'success']
        ]);
 
    }
 
    
    
    public function delete2(Request $request, Trabajo $todo)
    {
         function toArray(){
            return ['id' => $this->id,'registro' => $this->registro, 'descripcion' => $this->descripcion];
        }

        $id[] = $todo->toArray();
        dd($id);
        
        try {
            $todo = $this->getDoctrine()->getRepository(Trabajo::class, 'default');
            $todo = $this->trabajoRepository->Eliminar($id);    
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el trabajo!'.$exception] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del Trabajo'] , 'level'=>'success']
        ]);
 
    }
  
}