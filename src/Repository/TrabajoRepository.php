<?php

namespace App\Repository;

use App\Entity\Trabajo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Trabajo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Trabajo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Trabajo[]    findAll()
 * @method Trabajo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrabajoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Trabajo::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT est.nombre, tra.id, tra.estudiante_id, est.codigo, tra.registro, tra.descripcion 
            FROM trabajo tra, estudiante est
            WHERE tra.estudiante_id=est.id");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($estudiante_id, $registro, $descripcion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO trabajo (estudiante_id, registro, descripcion) VALUES (:tra, :reg, :cri)");
            $tra=$estudiante_id;
            $reg= $registro;
            $cri= $descripcion;
            if($stm->execute(array(':tra'=>$tra, ':reg'=>$reg, ':cri'=>$cri)));
        } catch (Exception $e) {
            return $e;
        }
    }


    public function Buscar($id,$estudiante_id,$registro,$descripcion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT tra.estudiante_id, est.nombre, tra.registro, tra.descripcion 
            FROM trabajo tra, estudiante est
            WHERE tra.id=:tra AND tra.estudiante_id=est.id");
            $tra=$id;
            if($stm->execute(array(':tra'=>$tra)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    public function Actualizar($id,$estudiante_id,$registro,$descripcion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE trabajo SET estudiante_id = :estudiante_id, registro=:registro, descripcion=:descripcion  WHERE trabajo.id =:id");
            if($stm->execute(array(':id'=>$id, ':estudiante_id' =>$estudiante_id, ':registro'=>$registro, ':descripcion'=>$descripcion)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Eliminar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM trabajo WHERE trabajo.id =:id");
            if($stm->execute(array(':id'=>$id)));
        } catch (Exception $e) {
            return $e;
        }
    }




    // /**
    //  * @return Trabajo[] Returns an array of Trabajo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Trabajo
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}