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
            $stm = $conn->prepare(" SELECT tra.id, tra.estudiante_id, tra.docente_id, tra.usuario_id, tra.particular, tra.telefono, tra.registro, 
            tra.descripcion, tra.tipo, tra.fecha_entrada, tra.hora_entrada, tra.fecha_salida, tra.hora_salida, est.nombre
            FROM trabajo tra, estudiante est, docente doc
            WHERE tra.estudiante_id=est.id OR tra.docente_id=doc.id OR tra.particular IS NOT NULL GROUP BY tra.id ");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($estudiante_id,$docente_id,$particular,$telefono, $usuario_id,$registro,$descripcion,$tipo,$fecha_entrada,$hora_entrada,$fecha_salida,$hora_salida){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO trabajo (estudiante_id, docente_id,particular,telefono,usuario_id, registro, descripcion, tipo, fecha_entrada, hora_entrada, fecha_salida, hora_salida) 
            VALUES (:tra, :doc, :par, :tel, :usu, :reg, :cri, :tip, :fec, :hor, :fec2, :hor2)");
            if($stm->execute(array(':tra'=>$estudiante_id, ':doc'=>$docente_id, ':par'=>$particular, ':tel'=>$telefono, ':usu'=>$usuario_id, ':reg'=>$registro, ':cri'=>$descripcion, ':tip'=>$tipo, ':fec'=>$fecha_entrada, ':hor'=>$hora_entrada, ':fec2'=>$fecha_salida, ':hor2'=>$hora_salida)));
        } catch (Exception $e) {
            return $e;
        }
    }


    public function Buscar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT tra.estudiante_id, est.nombre, tra.docente_id, tra.particular, tra.telefono, tra.usuario_id, tra.registro, tra.descripcion, tra.tipo,
            tra.fecha_entrada, tra.hora_entrada, tra.fecha_salida, tra.hora_salida
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

    public function BuscarEst($estudiante_id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT est.nombre
            FROM estudiante est
            WHERE est.id=:est");
            if($stm->execute(array(':est'=>$estudiante_id)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    
    public function BuscarDoc($docente_id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT doc.nombre
            FROM docente doc
            WHERE doc.id=:doc");
            if($stm->execute(array(':doc'=>$docente_id)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    public function Actualizar($id,$estudiante_id,$docente_id,$particular,$telefono,$usuario_id,$registro,$descripcion,$tipo,$fecha_entrada,$hora_entrada,$fecha_salida,$hora_salida){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE trabajo SET estudiante_id=:estudiante_id, docente_id=:docente_id, particular=:particular, telefono=:telefono, usuario_id=:usuario_id, registro=:registro, descripcion=:descripcion, 
            tipo=:tipo, fecha_entrada=:fecha_entrada, hora_entrada=:hora_entrada, fecha_salida=:fecha_salida, hora_salida=:hora_salida  
            WHERE trabajo.id =:id");
            if($stm->execute(array(':id'=>$id, ':estudiante_id'=>$estudiante_id, ':docente_id'=>$docente_id, ':particular'=>$particular,  ':telefono'=>$telefono, ':usuario_id'=>$usuario_id, ':registro'=>$registro, ':descripcion'=>$descripcion, 
            ':tipo'=>$tipo, ':fecha_entrada' =>$fecha_entrada, ':hora_entrada'=>$hora_entrada, ':fecha_salida'=>$fecha_salida, ':hora_salida'=>$hora_salida)));
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