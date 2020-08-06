<?php

namespace App\Repository;

use App\Entity\Estudiante;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Estudiante|null find($id, $lockMode = null, $lockVersion = null)
 * @method Estudiante|null findOneBy(array $criteria, array $orderBy = null)
 * @method Estudiante[]    findAll()
 * @method Estudiante[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EstudianteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Estudiante::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT est.id, est.codigo, est.nombre, est.programa_id, est.email, est.tipodoc, est.documento, est.telefono, est.estado
            FROM estudiante est, programa pro 
            WHERE est.programa_id=pro.id ORDER BY est.id");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($codigo, $nombre, $programa_id, $email, $tipodoc, $documento, $telefono, $estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO estudiante (codigo, nombre, programa_id, email, tipodoc, documento, telefono, estado) VALUES (:cod, :nom, :pro, :ema, :tip, :doc, :tel, :est)");
            if($stm->execute(array(':cod'=>$codigo, ':nom'=>$nombre, ':pro'=>$programa_id, ':ema'=>$email, ':tip'=>$tipodoc, ':doc'=>$documento, ':tel'=>$telefono, ':est'=>$estado)));
        } catch (Exception $e) {
            return $e;
        }
    }


    public function Buscar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT est.id, est.codigo, est.nombre, est.programa_id, est.email, est.tipodoc, est.documento, est.telefono, est.estado
            FROM estudiante est
            WHERE est.id=:est ORDER BY est.id");
            $est=$id;
            if($stm->execute(array(':est'=>$est)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    
    public function Actualizar($id, $codigo, $nombre, $programa_id, $email, $tipodoc, $documento, $telefono, $estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE estudiante SET  codigo=:codigo, nombre=:nombre, programa_id=:programa_id, email=:email, tipodoc=:tipodoc, documento=:documento, telefono=:telefono, estado=:estado WHERE estudiante.id =:id");
            if($stm->execute(array(':id'=>$id, ':codigo' =>$codigo, ':nombre' =>$nombre, ':programa_id' =>$programa_id, ':email'=>$email, ':tipodoc'=>$tipodoc, ':documento'=>$documento, ':telefono'=>$telefono, ':estado'=>$estado)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Eliminar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM estudiante WHERE estudiante.id =:id");
            if($stm->execute(array(':id'=>$id)));
        } catch (Exception $e) {
            return $e;
        }
    }

    

    // /**
    //  * @return Estudiante[] Returns an array of Estudiante objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Estudiante
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
