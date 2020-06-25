<?php

namespace App\Controller;
use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

    /**
     * @Route("/api/usuario", name="api_usuario")
     */

class UsuarioController extends AbstractController
{
    private $entityManager;
    private $usuarioRepository;

    public function __construct(EntityManagerInterface $entityManager, UsuarioRepository $usuarioRepository)
    {
        $this->entityManager = $entityManager;
        $this->usuarioRepository = $usuarioRepository;
    }

    /**
     * @Route("/create", name="api_usuario_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */

    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Usuario();
        $todo->setCodusuario($content->codusuario);
        $todo->setUsuario($content->usuario);
        $todo->setNombre($content->nombre);
        $todo->setApellido($content->apellido);
        $todo->setCorreo($content->correo);
        $todo->setPassword($content->password);
        $todo->setTelefono($content->telefono);
        $todo->setTipousuario($content->tipousuario);
        $todo->setEstado($content->estado);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

        } catch(Exception $exception){
            return $this->json([
                'message' => ['text'=>['El Usuario no se ha podido registrar!'.$exception] , 'level'=>'error']
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text'=>['El Usuario: '.$content->usuario, ', se ha registrado!'] , 'level'=>'success']
        ]);

    }

    /**
     * @Route("/read", name="api_usuario_read", methods={"GET"})
     */

    public function read()
    {    
        $todos = $this->usuarioRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo){
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/update/{id}", name="api_usuario_update", methods={"PUT"})
     * @param Request $request
     * @param Usuario $todo
     * @return JsonResponse
     */

     public function update(Request $request, Usuario $todo)
     {
        $content = json_decode($request->getContent());

        if($todo->getCodusuario() === $content->codusuario && $todo->getUsuario() === $content->usuario && $todo->getNombre() === $content->nombre && $todo->getApellido() === $content->apellido && $todo->getCorreo() === $content->correo && $todo->getPassword() === $content->password && $todo->getTelefono() === $content->telefono &&  $todo->getTipousuario() === $content->tipousuario && $todo->getEstado() === $content->estado)
        {
            return $this->json([                
                'message' => ['text'=>['No se realizaron cambios al usuario: '.$todo->getUsuario()] , 'level'=>'warning']
            ]);
        }

        $todo->setCodusuario($content->codusuario);
        $todo->setUsuario($content->usuario);
        $todo->setNombre($content->nombre);
        $todo->setApellido($content->apellido);
        $todo->setCorreo($content->correo);
        $todo->setPassword($content->password);
        $todo->setTelefono($content->telefono);
        $todo->setTipousuario($content->tipousuario);
        $todo->setEstado($content->estado);

        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba al usuario!'] , 'level'=>'error']
                ]);
        }

        return $this->json([
            'todo'    => $todo->toArray(),
            'message' => ['text'=>['Se ha actualizado la informacion del usuario: '.$content->usuario] , 'level'=>'success']
        ]);

     }
    /**
     * @Route("/delete/{id}", name="api_usuario_delete", methods={"DELETE"})
     * @param Request $request
     * @param Usuario $todo
     * @return JsonResponse
     */

    public function delete(Request $request,Usuario $todo)
    {
        $content = json_decode($request->getContent());

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba al usuario, Error: '.$exception] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del Usuario: '.$todo->getUsuario()] , 'level'=>'success']
        ]);
 
    }

}
