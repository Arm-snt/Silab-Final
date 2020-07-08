<?php

namespace App\Controller;
use App\Entity\Prestamo;
use App\Repository\PrestamoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/prestamo", name="api_prestamo")
 */
class PrestamoController extends AbstractController
{
    private $entityManager;
    private $prestamoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, PrestamoRepository $prestamoRepository)
    {
        $this->entityManager = $entityManager;
        $this->prestamoRepository = $prestamoRepository;
    }

   
    /**
     * @Route("/readPrestamoElemento", name="api_prestamo_readPrestamoElemento", methods={"GET"})
     */
    public function readPrestamoElemento()
    {
        $todos = $this->getDoctrine()->getRepository(Prestamo::class, 'default');
        $todos = $this->prestamoRepository->MostrarPrestatoEle();
        return $this->json($todos);
    }

        /**
     * @Route("/read", name="api_prestamo_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Prestamo::class, 'default');
        $todos = $this->prestamoRepository->Mostrar();
        return $this->json($todos);
    }

    /**
     * @Route("/create", name="api_prestamo_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $estudiante_id=$content['estudiante_id'];
        $registro=$content['registro'];
        $observacion=$content['observacion'];
        $estado=$content['estado'];
        $elemento=$content['elemento_id'];
        $fecha_prestamo=$content['fecha_prestamo'];
        $hora_prestamo=$content['hora_prestamo'];
        $fecha_entrega=$content['fecha_entrega'];
        $hora_entrega=$content['hora_entrega'];

        try {
                
                $todo = $this->getDoctrine()->getRepository(Prestamo::class, 'default');
                $todo = $this->prestamoRepository->Insertar($estudiante_id,$registro,$observacion,$estado, $fecha_prestamo, $hora_prestamo, $fecha_entrega, $hora_entrega);
                $prestamo_id = $this->prestamoRepository->BuscarId();
                $id = $prestamo_id['id'];
                
                foreach ($elemento as $info => $valor) {

                    $idelemento = $valor['editElemento'];
                    $cantidad = $valor['cantidad'];
                    $informacion = $this->prestamoRepository->BuscarElemento($idelemento);
                    $stock = $informacion['stock'];
                    $nombre = $informacion['elemento'];
                    $nuevacantidad = $stock - $cantidad; 

                    $todo = $this->prestamoRepository->InsertarPrestamo($id, $idelemento, $cantidad, $fecha_prestamo, $hora_prestamo, $fecha_entrega, $hora_entrega);
                    $informacion = $this->prestamoRepository->UpdateStock($idelemento, $nuevacantidad);

                }
                return $this->json([
                    'message' => ['text'=>['El prestamo se realizó a : '.$estudiante_id,] , 'level'=>'success']      
                     ]);
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El Prestamo no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
    }

    /**
     * @Route("/update/{id}", name="api_prestamo_update", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $content = json_decode($request->getContent());

        $id=$content->id;
        $estudiante_id=$content->estudiante_id;
        $registro=$content->registro;
        $observacion=$content->observacion;
        $estado=$content->estado;
        $elemento=$content->elemento_id;
        $fecha_prestamo=$content->fecha_prestamo;
        $hora_prestamo=$content->hora_prestamo;
        $fecha_entrega=$content->fecha_entrega;
        $hora_entrega=$content->hora_entrega;
        $check=false;
        
        $todo = $this->getDoctrine()->getRepository(Prestamo::class, 'default');
        //busca el array de elementos y su cantidad en la tabla prestamo_elemento
        $todo = $this->prestamoRepository->BuscarArray($id);
        //compara el array de elementos del prestamo_elementos con los registros de elementos en la base de datos
        foreach ($elemento as $info => $valor) {
            $idelemento=$valor->editElemento;
            $cantidad=$valor->cantidad;
            foreach ($todo as $info => $dato) {
                $idelemento_bd=$dato['elemento_id'];
                $cantidad_bd=$dato['cantidad'];
                //si los elementos y cantidades no coinciden, se utiliza el check para marcar el cambio
                if ($idelemento!=$idelemento_bd && $cantidad!=$cantidad_bd) {
                    $check=true;
                }
            }           
        }
        
        //se busca la informacion del prestamo
        $todo = $this->prestamoRepository->Buscar($id);
        $estudiante_id_bd=$todo['estudiante_id'];
        $registro_bd=$todo['registro'];
        $observacion_bd=$todo['observacion'];
        $nombre_bd=$todo['nombre'];
        $estado_bd=$todo['estado'];

        //se compara la información obtenida de la base de datos con los registros obtenidos del formulario para saber si hubo un cambio
        if ($estudiante_id===$estudiante_id_bd && $registro===$registro_bd && $observacion===$observacion_bd && $estado===$estado_bd && $check==false) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios al Préstamo realizado a: '.$nombre_bd] , 'level'=>'warning']
            ]);
        }
             
        
        try {
            //se pregunta si la informacion 
            if($estudiante_id!=$estudiante_id_bd || $registro!=$registro_bd || $observacion!=$observacion_bd || $estado!=$estado_bd){
                $todo = $this->getDoctrine()->getRepository(Prestamo::class, 'default');
                $todo = $this->prestamoRepository->Actualizar($id,$estudiante_id,$registro,$observacion,$estado);
            }

            
            //para cada elemento del array de elementos del prestamo se busca el stock
            foreach ($elemento as $info => $valor) {
                $idelemento = $valor->editElemento;
                $cantidad = $valor->cantidad;
                $informacion = $this->prestamoRepository->BuscarElemento($idelemento);
                $stock = $informacion['stock'];
                $nombre = $informacion['elemento'];
                $nuevacantidad = $stock - $cantidad; 
                //se agrega el elemento a prestamo_elemento
                $todoPre = $this->prestamoRepository->InsertarPrestamo($id, $idelemento, $cantidad, $fecha_prestamo, $hora_prestamo, $fecha_entrega, $hora_entrega);
                //se actualiza el stock de elemento
                $informacion = $this->prestamoRepository->UpdateStock($idelemento, $nuevacantidad);
                
            }
            //se devuelve la informción del prestamo actualizado
            $todo = $this->prestamoRepository->Buscar($id);         

        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba el Prestamo!'] , 'level'=>'error']
                ]);
        }
        return $this->json([            
            'todo'    => $todo,
            'message' => ['text'=>['El Prestamo del estudiante '.$nombre_bd,' se ha actualizado' ] , 'level'=>'success']      
        ]);
 
    }

        /**
     * @Route("/updatePrestamoEle/{id}", name="api_prestamo_updatePrestamoEle", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    
    public function updatePrestamoEle(Request $request)
    {
        $content = json_decode($request->getContent());
        $idelemento=$content->elemento_id;
        $prestamo_id=$content->prestamo_id;
        $id=$prestamo_id;
        $codelemento=$content->codelemento;
        $elemento=$content->elemento;
        $cantidad=$content->cantidad;
        $fecha_prestamo=$content->fecha_prestamo;
        $hora_prestamo=$content->hora_prestamo;
        $fecha_entrega=$content->fecha_entrega;
        $hora_entrega=$content->hora_entrega;
        $contador= 0;
        
        try {
            $todo = $this->getDoctrine()->getRepository(Prestamo::class, 'default');
            $todo = $this->prestamoRepository->BuscarArray($id);
            //para cada elemento del array de elementos del prestamo busco fecha y hora de entrega
            foreach ($todo as $info => $valor) {
                $fecha_entrega_bd=$valor['fecha_entrega'];
                $hora_entrega_bd=$valor['hora_entrega'];
                if($fecha_entrega_bd == null && $hora_entrega_bd == null){
                    $contador += 1;
                }
            }
            
            $informacion = $this->prestamoRepository->BuscarElemento($idelemento);
            $stock = $informacion['stock'];
            $nombre = $informacion['elemento'];
            $nuevacantidad = $stock + $cantidad; 
            $informacion = $this->prestamoRepository->UpdateStock($idelemento, $nuevacantidad);
            if($content->entregar == "si"){
                $informacion = $this->prestamoRepository->EntregarPrele($idelemento, $prestamo_id,$fecha_entrega,$hora_entrega);
            } else {
                $informacion = $this->prestamoRepository->EliminarPreLe($idelemento, $prestamo_id);
            }
            if($contador==1){
                $todo = $this->prestamoRepository->ActualizarPrestamo($id,$fecha_entrega,$hora_entrega);
            }

        } catch(Exception $exception){
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba el Prestamo!'.$exception] , 'level'=>'error']
                ]);
        }

        return $this->json([
            'message' => ['text'=>['Se ha devuelto el elemento '.$nombre,' al almacen' ] , 'level'=>'success']      
        ]);

    }

    /**
     * @Route("/delete/{id}", name="api_prestamo_delete", methods={"DELETE"})
     * @param Prestamo $todo
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request, Prestamo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el Prestamo!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del Prestamo'] , 'level'=>'success']
        ]);
 
    }
 
    
    
    public function delete2(Request $request, Prestamo $todo)
    {
         function toArray(){
            return ['id' => $this->id,'registro' => $this->registro, 'observacion' => $this->observacion];
        }

        $id[] = $todo->toArray();
        dd($id);
        
        try {
            $todo = $this->getDoctrine()->getRepository(Prestamo::class, 'default');
            $todo = $this->prestamoRepository->Eliminar($id);    
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el Prestamo!'.$exception] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del Prestamo'] , 'level'=>'success']
        ]);
 
    }
  
}