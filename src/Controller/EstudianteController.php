<?php

namespace App\Controller;
use App\Entity\Estudiante;
use App\Repository\EstudianteRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/estudiante", name="api_estudiante")
 */
class EstudianteController extends AbstractController
{
    private $entityManager;
    private $estudianteRepository;
 
    public function __construct(EntityManagerInterface $entityManager, EstudianteRepository $estudianteRepository)
    {
        $this->entityManager = $entityManager;
        $this->estudianteRepository = $estudianteRepository;
    }

     /**
     * @Route("/read", name="api_estudiante_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Estudiante::class, 'default');
        $todos = $this->estudianteRepository->Mostrar();
        return $this->json($todos);
    }
    
    /**
     * @Route("/create", name="api_estudiante_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);
               
        $codigo=$content['codigo'];
        $nombre=$content['nombre'];
        $programa=$content['programa'];
        $email=$content['email'];
        $tipodoc=$content['tipodoc'];
        $documento=$content['documento'];
        $telefono=$content['telefono'];
        $estado=$content['estado'];

        try {
            
            $todo = $this->getDoctrine()->getRepository(Estudiante::class, 'default');
            $todo = $this->estudianteRepository->Insertar($codigo, $nombre, $programa, $email, $tipodoc, $documento, $telefono, $estado);
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El estudiante no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'message' => ['text'=>['El estudiante '.$nombre, 'se ha registrado!' ] , 'level'=>'success']      
                 ]);
    }


    /**
     * @Route("/update/{id}", name="api_estudiante_update", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $content = json_decode($request->getContent());
        
        $id=$content->id;
        $codigo=$content->codigo;
        $nombre=$content->nombre;
        $programa=$content->programa;
        $email=$content->email;
        $tipodoc=$content->tipodoc;
        $documento=$content->documento;
        $telefono=$content->telefono;
        $estado=$content->estado;
        
        $todo = $this->getDoctrine()->getRepository(Estudiante::class, 'default');
        $todo = $this->estudianteRepository->Buscar($id);
        
        
        $codigo_bd=$todo['codigo'];
        $nombre_bd=$todo['nombre'];
        $programa_bd=$todo['programa'];
        $email_bd=$todo['email'];
        $tipodoc_bd=$todo['tipodoc'];
        $documento_bd=$todo['documento'];
        $telefono_bd=$todo['telefono'];
        $estado_bd=$todo['estado'];

        if ($codigo===$codigo_bd && $nombre===$nombre_bd && $programa===$programa_bd && $email===$email_bd && $tipodoc===$tipodoc_bd && $documento===$documento_bd && $telefono===$telefono_bd && $estado===$estado_bd) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios al estudiante: '.$nombre_bd] , 'level'=>'warning']
            ]);
        }
        
        try {
            $todo = $this->getDoctrine()->getRepository(Estudiante::class, 'default');
            $todo = $this->estudianteRepository->Actualizar($id, $codigo, $nombre, $programa, $email, $tipodoc, $documento, $telefono, $estado);
            $todo = $this->estudianteRepository->Buscar($id);

        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba la información del estudiante!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'todo'    => $todo,
            'message' => ['text'=>['La información del estudiante '.$todo['nombre'], ' se ha actualizado' ] , 'level'=>'success']      
        ]);
 
    }

    /**
     * @Route("/delete/{id}", name="api_estudiante_delete", methods={"DELETE"})
     * @param Request $request
     * @param Estudiante $todo
     * @return JsonResponse
     */
    public function delete(Request $request,Estudiante $todo)
    {       

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba al estudiante!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del Estudiante: '.$todo->getNombre()] , 'level'=>'success']
        ]);
 
    }

}
