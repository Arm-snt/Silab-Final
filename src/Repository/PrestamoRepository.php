<?php

namespace App\Repository;

use App\Entity\Prestamo;
use App\Entity\Elemento;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Prestamo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Prestamo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Prestamo[]    findAll()
 * @method Prestamo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PrestamoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Prestamo::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT pre.id, pre.estudiante_id, pre.registro, pre.observacion, pre.estado, pre.fecha_prestamo, pre.hora_prestamo, pre.fecha_entrega, pre.hora_entrega, est.codigo, est.nombre
            FROM prestamo pre, estudiante est
            WHERE pre.estudiante_id=est.id GROUP BY pre.id ORDER BY pre.id DESC");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function MostrarPrestatoEle(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT prele.prestamo_id, prele.elemento_id, prele.cantidad, prele.fecha_prestamo, prele.hora_prestamo, prele.fecha_entrega, prele.hora_entrega, ele.elemento, ele.codelemento
            FROM elemento ele, prestamo_elemento prele
            WHERE ele.id=prele.elemento_id");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($estudiante_id, $registro, $observacion, $estado, $fecha_prestamo, $hora_prestamo, $fecha_entrega, $hora_entrega){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO prestamo (estudiante_id, registro, observacion, estado, fecha_prestamo, hora_prestamo, fecha_entrega, hora_entrega) VALUES (:pre, :reg, :obs, :est, :fec, :hor, :fec2, :hor2);");
            if($stm->execute(array(':pre'=>$estudiante_id, ':reg'=>$registro, ':obs'=>$observacion, ':est'=>$estado, ':fec'=>$fecha_prestamo, ':hor'=>$hora_prestamo, ':fec2'=>$fecha_entrega, ':hor2'=>$hora_entrega)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarId(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT MAX(id) as id FROM prestamo;");
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

    public function InsertarPrestamo($id, $idelemento, $cantidad, $fecha_prestamo, $hora_prestamo, $fecha_entrega, $hora_entrega){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO prestamo_elemento (prestamo_id, elemento_id, cantidad, fecha_prestamo, hora_prestamo, fecha_entrega, hora_entrega) VALUES (:pres, :elei, :can, :fec, :hor, :fec2, :hor2)");
            if($stm->execute(array(':pres'=>$id, ':elei'=>$idelemento, ':can'=>$cantidad, ':fec'=>$fecha_prestamo, ':hor'=>$hora_prestamo, ':fec2'=>$fecha_entrega, ':hor2'=>$hora_entrega)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function EntregarPrele($idelemento, $prestamo_id,$fecha_entrega,$hora_entrega){
        try{
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE prestamo_elemento SET fecha_entrega = :fecha_entrega, hora_entrega = :hora_entrega WHERE prestamo_id = :prestamo_id AND elemento_id = :idelemento");
            if($stm->execute(array(':idelemento'=>$idelemento,':prestamo_id' =>$prestamo_id, ':hora_entrega'=>$hora_entrega, ':fecha_entrega'=>$fecha_entrega)));
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
            $stm = $conn->prepare(" SELECT pre.id, pre.estudiante_id, pre.registro, pre.observacion, pre.estado, est.codigo, est.nombre, pre.fecha_prestamo, pre.hora_prestamo, pre.fecha_entrega, pre.hora_entrega            
            FROM prestamo pre, estudiante est
            WHERE pre.id=:pre AND pre.estudiante_id=est.id ");
            $pre=$id;
            if($stm->execute(array(':pre'=>$pre)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarArray($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT prele.elemento_id, prele.cantidad, prele.fecha_prestamo, prele.hora_prestamo, prele.fecha_entrega, prele.hora_entrega
            FROM prestamo_elemento prele
            WHERE prele.prestamo_id=:prele");
            $prele=$id;
            if($stm->execute(array(':prele'=>$prele)))
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    public function Actualizar($id,$estudiante_id,$registro,$observacion,$estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE prestamo SET estudiante_id = :estudiante_id, registro=:registro, observacion=:observacion, estado=:estado   WHERE prestamo.id =:id");
            if($stm->execute(array(':id'=>$id, ':estudiante_id' =>$estudiante_id, ':registro'=>$registro, ':observacion'=>$observacion, ':estado'=>$estado)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function ActualizarPrestamo($id,$fecha_entrega,$hora_entrega){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE prestamo SET fecha_entrega=:fecha_entrega, hora_entrega=:hora_entrega, estado='Inactivo' WHERE prestamo.id =:id");
            if($stm->execute(array(':id'=>$id, ':fecha_entrega' =>$fecha_entrega, ':hora_entrega'=>$hora_entrega)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function EliminarPreLe($idelemento, $prestamo_id){
        try{
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM prestamo_elemento WHERE prestamo_id =:prestamo_id AND elemento_id= :idelemento");
            if($stm->execute(array(':idelemento'=>$idelemento,':prestamo_id'=>$prestamo_id)));
        } catch(Exception $e){
            return $e;
        }
    }

    public function Eliminar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM prestamo WHERE prestamo.id =:id");
            if($stm->execute(array(':id'=>$id)));
        } catch (Exception $e) {
            return $e;
        }
    }


    // /**
    //  * @return Prestamo[] Returns an array of Prestamo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Prestamo
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
