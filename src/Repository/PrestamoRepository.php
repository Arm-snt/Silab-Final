<?php

namespace App\Repository;

use App\Entity\Prestamo;
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
            $stm = $conn->prepare(" SELECT est.codigo, est.nombre, pre.id, pre.estudiante_id, pre.registro, pre.observacion, pre.estado, ele.codelemento, ele.elemento, ele.stock, prele.prestamo_id, prele.elemento_id
            FROM prestamo pre, estudiante est, elemento ele, prestamo_elemento prele
            WHERE pre.estudiante_id=est.id AND pre.id=prele.prestamo_id AND ele.id=prele.elemento_id ORDER BY pre.id ASC");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($estudiante_id, $registro, $observacion, $estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO prestamo (estudiante_id, registro, observacion, estado) VALUES (:pre, :reg, :obs, :est);");
            if($stm->execute(array(':pre'=>$estudiante_id, ':reg'=>$registro, ':obs'=>$observacion, ':est'=>$estado)));
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

    public function InsertarPrestamo($id, $elemento, $cantidad){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO prestamo_elemento (prestamo_id, elemento_id, cantidad) VALUES (:pres, :elei, :can)");
            if($stm->execute(array(':pres'=>$id, ':elei'=>$elemento, ':can'=>$cantidad)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarElemento($elemento){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT id, elemento, stock
            FROM elemento
            WHERE elemento.id=:id");
            if($stm->execute(array(':id'=>$elemento)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }


    public function Buscar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT pre.estudiante_id, est.nombre, pre.registro, pre.observacion, pre.estado 
            FROM prestamo pre, estudiante est
            WHERE pre.id=:pre AND pre.estudiante_id=est.id");
            $pre=$id;
            if($stm->execute(array(':pre'=>$pre)))
            $res = $stm->fetch();
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
