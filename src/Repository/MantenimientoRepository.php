<?php

namespace App\Repository;

use App\Entity\Mantenimiento;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Mantenimiento|null find($id, $lockMode = null, $lockVersion = null)
 * @method Mantenimiento|null findOneBy(array $criteria, array $orderBy = null)
 * @method Mantenimiento[]    findAll()
 * @method Mantenimiento[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MantenimientoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Mantenimiento::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT man.id, man.tipo, man.observacion, man.estado, man.fecha_solicitud, man.hora_solicitud, man.fecha_entrega, man.hora_entrega
            FROM mantenimiento man
            GROUP BY man.id ORDER BY man.fecha_solicitud DESC");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function MostrarMantetoEle(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT mele.mantenimiento_id, mele.elemento_id, mele.cantidad, mele.fecha_solicitud, mele.hora_solicitud, mele.fecha_entrega, mele.hora_entrega, ele.elemento, ele.codelemento
            FROM elemento ele, mantenimiento_elemento mele
            WHERE ele.id=mele.elemento_id");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function TraerElemento($id,$idelemento){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT mele.mantenimiento_id, mele.elemento_id, ele.codelemento, ele.elemento, mele.cantidad, mele.fecha_solicitud, mele.hora_solicitud, mele.fecha_entrega, mele.hora_entrega
            FROM mantenimiento_elemento mele, elemento ele
            WHERE mele.mantenimiento_id=:mele AND mele.elemento_id=:idelemento AND ele.id=:idelemento");
            if($stm->execute(array(':mele'=>$id,':idelemento'=>$idelemento)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($tipo, $observacion, $estado, $fecha_solicitud, $hora_solicitud, $fecha_entrega, $hora_entrega){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO mantenimiento (tipo, observacion, estado, fecha_solicitud, hora_solicitud, fecha_entrega, hora_entrega) VALUES (:man, :obs, :est, :fec, :hor, :fec2, :hor2);");
            if($stm->execute(array(':man'=>$tipo, ':obs'=>$observacion, ':est'=>$estado, ':fec'=>$fecha_solicitud, ':hor'=>$hora_solicitud, ':fec2'=>$fecha_entrega, ':hor2'=>$hora_entrega)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarId(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT MAX(id) as id FROM mantenimiento;");
            $stm->execute();
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarElemento($idelemento){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT id, elemento, stock
            FROM elemento
            WHERE elemento.id=:id");
            if($stm->execute(array(':id'=>$idelemento)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function InsertarMantenimiento($id, $idelemento, $cantidad, $fecha_solicitud, $hora_solicitud, $fecha_entrega, $hora_entrega){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO mantenimiento_elemento (mantenimiento_id, elemento_id, cantidad, fecha_solicitud, hora_solicitud, fecha_entrega, hora_entrega) VALUES (:pres, :elei, :can, :fec, :hor, :fec2, :hor2)");
            if($stm->execute(array(':pres'=>$id, ':elei'=>$idelemento, ':can'=>$cantidad, ':fec'=>$fecha_solicitud, ':hor'=>$hora_solicitud, ':fec2'=>$fecha_entrega, ':hor2'=>$hora_entrega)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function EntregarMele($idelemento, $mantenimiento_id,$fecha_entrega,$hora_entrega){
        try{
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE mantenimiento_elemento SET fecha_entrega = :fecha_entrega, hora_entrega = :hora_entrega WHERE mantenimiento_id = :mantenimiento_id AND elemento_id = :idelemento");
            if($stm->execute(array(':idelemento'=>$idelemento,':mantenimiento_id' =>$mantenimiento_id, ':hora_entrega'=>$hora_entrega, ':fecha_entrega'=>$fecha_entrega)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function UpdateStock($idelemento, $nuevacantidad){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE elemento SET stock = :stock WHERE elemento.id =:id");
            if($stm->execute(array(':id'=>$idelemento,':stock' =>$nuevacantidad)));
        } catch (Exception $e) {
            return $e;
        }
    }


    public function Buscar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT man.id, man.tipo, man.observacion, man.estado, man.fecha_solicitud, man.hora_solicitud, man.fecha_entrega, man.hora_entrega            
            FROM mantenimiento man
            WHERE man.id=:man ");
            $man=$id;
            if($stm->execute(array(':man'=>$man)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    public function BuscarEstudiante($tipo){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT nombre, codigo
            FROM estudiante
            WHERE id=:tipo");
            if($stm->execute(array(':tipo'=>$tipo)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarArray($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT mele.elemento_id, mele.cantidad, mele.fecha_solicitud, mele.hora_solicitud, mele.fecha_entrega, mele.hora_entrega
            FROM mantenimiento_elemento mele
            WHERE mele.mantenimiento_id=:mele");
            $mele=$id;
            if($stm->execute(array(':mele'=>$mele)))
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    public function Actualizar($id,$tipo,$observacion,$estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE mantenimiento SET tipo = :tipo, observacion=:observacion, estado=:estado   WHERE mantenimiento.id =:id");
            if($stm->execute(array(':id'=>$id, ':tipo' =>$tipo, ':observacion'=>$observacion, ':estado'=>$estado)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function ActualizarMantenimiento($id,$fecha_entrega,$hora_entrega){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE mantenimiento SET fecha_entrega=:fecha_entrega, hora_entrega=:hora_entrega, estado='Inactivo' WHERE mantenimiento.id =:id");
            if($stm->execute(array(':id'=>$id, ':fecha_entrega' =>$fecha_entrega, ':hora_entrega'=>$hora_entrega)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function EliminarMele($idelemento, $mantenimiento_id){
        try{
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM mantenimiento_elemento WHERE mantenimiento_id =:mantenimiento_id AND elemento_id= :idelemento");
            if($stm->execute(array(':idelemento'=>$idelemento,':mantenimiento_id'=>$mantenimiento_id)));
        } catch(Exception $e){
            return $e;
        }
    }

    public function Eliminar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM mantenimiento WHERE mantenimiento.id =:id");
            if($stm->execute(array(':id'=>$id)));
        } catch (Exception $e) {
            return $e;
        }
    }

    // /**
    //  * @return Mantenimiento[] Returns an array of Mantenimiento objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Mantenimiento
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
