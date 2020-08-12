<?php

namespace App\Controller;
use App\Entity\Mantenimiento;
use App\Repository\MantenimientoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/mantenimiento", name="api_mantenimiento")
 */
class MantenimientoController extends AbstractController
{
    private $entityManager;
    private $mantenimientoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, MantenimientoRepository $mantenimientoRepository)
    {
        $this->entityManager = $entityManager;
        $this->mantenimientoRepository = $mantenimientoRepository;
    }

   
    /**
     * @Route("/readMantenimientoElemento", name="api_mantenimiento_readMantenimientoElemento", methods={"GET"})
     */
    public function readMantenimientoElemento()
    {
        $todos = $this->getDoctrine()->getRepository(Mantenimiento::class, 'default');
        $todos = $this->mantenimientoRepository->MostrarMantetoEle();
        return $this->json($todos);
    }

        /**
     * @Route("/read", name="api_mantenimiento_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Mantenimiento::class, 'default');
        $todos = $this->mantenimientoRepository->Mostrar();
        return $this->json($todos);
    }

    /**
     * @Route("/create", name="api_mantenimiento_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $nelementos=0;
        $tipo=$content['tipo'];
        $observacion=$content['observacion'];
        $estado=$content['estado'];
        $elemento=$content['elemento_id'];
        $fecha_solicitud=$content['fecha_solicitud'];
        $hora_solicitud=$content['hora_solicitud'];
        $fecha_entrega=$content['fecha_entrega'];
        $hora_entrega=$content['hora_entrega'];

        try {
                
                $todo = $this->getDoctrine()->getRepository(Mantenimiento::class, 'default');
                $todo = $this->mantenimientoRepository->Insertar($tipo,$observacion,$estado, $fecha_solicitud, $hora_solicitud, $fecha_entrega, $hora_entrega);
                $mantenimiento_id = $this->mantenimientoRepository->BuscarId();
                $id = $mantenimiento_id['id'];
                
                foreach ($elemento as $info => $valor) {

                    $idelemento = $valor['editElemento'];
                    $cantidad = $valor['cantidad'];
                    $informacion = $this->mantenimientoRepository->BuscarElemento($idelemento);
                    $stock = $informacion['stock'];
                    $nombre = $informacion['elemento'];
                    $nuevacantidad = $stock - $cantidad; 
                    $nelementos+=1;
                    $todo = $this->mantenimientoRepository->InsertarMantenimiento($id, $idelemento, $cantidad, $fecha_solicitud, $hora_solicitud, $fecha_entrega, $hora_entrega);
                    $informacion = $this->mantenimientoRepository->UpdateStock($idelemento, $nuevacantidad);

                }
                //$infoestudiante = $this->mantenimientoRepository->BuscarEstudiante($tipo); 
                $todo = $this->mantenimientoRepository->Buscar($id);
                $elementospres = $this->mantenimientoRepository->MostrarMantetoEle();
                
            } catch (Exception $exception) {
                return $this->json([ 
                    'message' => ['text'=>['La lista de Mantenimiento de elementos no se ha podido registrar!'] , 'level'=>'error']
                    ]);
                }  
            return $this->json([
                'todo'=>$todo,
                'elementospres'=>$elementospres,
                'message' => ['text'=>['Se añadió con exito a la lista de Mantenimiento '.$nelementos,' elementos'] , 'level'=>'success']      
            ]);
    }

    /**
     * @Route("/update/{id}", name="api_mantenimiento_update", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $content = json_decode($request->getContent());
        $id=$content->id;
        $tipo=$content->tipo;
        $observacion=$content->observacion;
        $estado=$content->estado;
        $elemento=$content->elemento_id;
        $fecha_solicitud=$content->fecha_solicitud;
        $hora_solicitud=$content->hora_solicitud;
        $fecha_entrega=$content->fecha_entrega;
        $hora_entrega=$content->hora_entrega;
        $elementospres= [];
        $check=false;
        
        $todo = $this->getDoctrine()->getRepository(Mantenimiento::class, 'default');
        //busca el array de elementos y su cantidad en la tabla mantenimiento_elemento
        $todo = $this->mantenimientoRepository->BuscarArray($id); 
        //compara el array de elementos del mantenimiento_elementos con los registros de elementos en la base de datos
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
        
        //se busca la informacion del mantenimiento
        $todo = $this->mantenimientoRepository->Buscar($id);
        $tipo_bd=$todo['tipo'];
        $observacion_bd=$todo['observacion'];
        //$nombre_bd=$todo['nombre'];
        $estado_bd=$todo['estado'];

        //se compara la información obtenida de la base de datos con los registros obtenidos del formulario para saber si hubo un cambio
        if ($tipo===$tipo_bd && $observacion===$observacion_bd && $estado===$estado_bd && $check==false) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios a la lista de Mantenimiento de elementos'] , 'level'=>'warning']
            ]);
        }
             
        
        try {
            //se pregunta si la informacion 
            if($tipo!=$tipo_bd || $observacion!=$observacion_bd || $estado!=$estado_bd){
                $todo = $this->getDoctrine()->getRepository(Mantenimiento::class, 'default');
                $todo = $this->mantenimientoRepository->Actualizar($id,$tipo,$observacion,$estado);
            }

            
            //para cada elemento del array de elementos del mantenimiento se busca el stock
            foreach ($elemento as $info => $valor) {
                $idelemento = $valor->editElemento;
                $cantidad = $valor->cantidad;
                $informacion = $this->mantenimientoRepository->BuscarElemento($idelemento);
                $stock = $informacion['stock'];
                $nombre = $informacion['elemento'];
                $nuevacantidad = $stock - $cantidad; 
                //se agrega el elemento a mantenimiento_elemento
                $todoPre = $this->mantenimientoRepository->InsertarMantenimiento($id, $idelemento, $cantidad, $fecha_solicitud, $hora_solicitud, $fecha_entrega, $hora_entrega);
                //se actualiza el stock de elemento
                $informacion = $this->mantenimientoRepository->UpdateStock($idelemento, $nuevacantidad);
            }
            //se devuelve la informción del mantenimiento actualizado
            $todo = $this->mantenimientoRepository->Buscar($id);
            // $elementospres = $this->mantenimientoRepository->TraerElemento($id, $idelemento);
            $elementospres = $this->mantenimientoRepository->MostrarMantetoEle();
            
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba la lista de Mantenimiento de elementos!'.$exception] , 'level'=>'error']
                ]);
            }
            return $this->json([            
            'todo'    => $todo,
            'elementospres'=>$elementospres,
            'message' => ['text'=>['La información de la lista de Mantenimiento de elementos se ha actualizado' ] , 'level'=>'success']      
        ]);
 
    }

        /**
     * @Route("/updatemantenimientoEle/{mantenimiento_id}", name="api_mantenimiento_updatemantenimientoEle", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    
    public function updatemantenimientoEle(Request $request)
    {
        $content = json_decode($request->getContent());
        $idelemento=$content->elemento_id;
        $mantenimiento_id=$content->mantenimiento_id;
        $id=$mantenimiento_id;
        $codelemento=$content->codelemento;
        $elemento=$content->elemento;
        $cantidad=$content->cantidad;
        $fecha_solicitud=$content->fecha_solicitud;
        $hora_solicitud=$content->hora_solicitud;
        $fecha_entrega=$content->fecha_entrega;
        $hora_entrega=$content->hora_entrega;
        $contador= 0;
        
        try {
            $todo = $this->getDoctrine()->getRepository(Mantenimiento::class, 'default');
            $todo = $this->mantenimientoRepository->BuscarArray($id);
            //para cada elemento del array de elementos del mantenimiento busco fecha y hora de entrega
            foreach ($todo as $info => $valor) {
                $fecha_entrega_bd=$valor['fecha_entrega'];
                $hora_entrega_bd=$valor['hora_entrega'];
                if($fecha_entrega_bd == null && $hora_entrega_bd == null){
                    $contador += 1;
                }
            }
            
            $informacion = $this->mantenimientoRepository->BuscarElemento($idelemento);
            $stock = $informacion['stock'];
            $nombre = $informacion['elemento'];
            $nuevacantidad = $stock + $cantidad; 
            $informacion = $this->mantenimientoRepository->UpdateStock($idelemento, $nuevacantidad);
            if($content->entregar == "si"){
                $informacion = $this->mantenimientoRepository->EntregarMele($idelemento, $mantenimiento_id,$fecha_entrega,$hora_entrega);
            } else {
                $informacion = $this->mantenimientoRepository->EliminarMele($idelemento, $mantenimiento_id);
            }
            if($contador==1){
                $todo = $this->mantenimientoRepository->ActualizarMantenimiento($id,$fecha_entrega,$hora_entrega);
            }

            $elementospres = $this->mantenimientoRepository->TraerElemento($id,$idelemento);
            //se devuelve la informción del mantenimiento actualizado
            $todo = $this->mantenimientoRepository->Buscar($id);

        } catch(Exception $exception){
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba la lista de Mantenimientos!'.$exception] , 'level'=>'error']
                ]);
        }

        return $this->json([
            'todo'=>$todo,
            'elementospres'=>$elementospres,
            'message' => ['text'=>['Se ha entregado el elemento '.$nombre,' del Mantenimiento al almacén' ] , 'level'=>'success']      
        ]);

    }

    /**
     * @Route("/delete/{id}", name="api_mantenimiento_delete", methods={"DELETE"})
     * @param Mantenimiento $todo
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request, Mantenimiento $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el mantenimiento!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del mantenimiento'] , 'level'=>'success']
        ]);
 
    }
 
    
    
    public function delete2(Request $request, Mantenimiento $todo)
    {
         function toArray(){
            return ['id' => $this->id,'registro' => $this->registro, 'observacion' => $this->observacion];
        }

        $id[] = $todo->toArray();
        dd($id);
        
        try {
            $todo = $this->getDoctrine()->getRepository(Mantenimiento::class, 'default');
            $todo = $this->mantenimientoRepository->Eliminar($id);    
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el mantenimiento!'.$exception] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del mantenimiento'] , 'level'=>'success']
        ]);
 
    }
  
}