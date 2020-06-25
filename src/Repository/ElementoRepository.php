<?php

namespace App\Repository;

use App\Entity\Elemento;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Elemento|null find($id, $lockMode = null, $lockVersion = null)
 * @method Elemento|null findOneBy(array $criteria, array $orderBy = null)
 * @method Elemento[]    findAll()
 * @method Elemento[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ElementoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Elemento::class);
    }

   
    public function Buscar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT ele.id, ele.laboratorio_id, ele.codelemento, ele.elemento, ele.stock, ele.horauso, ele.categoria, ele.estado
            FROM elemento ele
            WHERE ele.id=:ele");
            $ele=$id;
            if($stm->execute(array(':ele'=>$ele)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    
    public function Actualizar($id, $laboratorio_id, $codelemento, $elemento, $stock, $horauso, $categoria, $estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE elemento SET  laboratorio_id=:laboratorio_id, codelemento=:codelemento, elemento=:elemento, stock=:stock, horauso=:horauso, categoria = :categoria, estado = :estado  WHERE elemento.id =:id");
            if($stm->execute(array(':id'=>$id, ':laboratorio_id' =>$laboratorio_id, ':codelemento' =>$codelemento, ':elemento' =>$elemento, ':stock' =>$stock, ':horauso'=>$horauso,  ':categoria' =>$categoria, ':estado' =>$estado )));
        } catch (Exception $e) {
            return $e;
        }
    }

    // /**
    //  * @return Elemento[] Returns an array of Elemento objects
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
    public function findOneBySomeField($value): ?Elemento
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
