<?php

namespace App\Repository;

use App\Entity\Departamento;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Departamento|null find($id, $lockMode = null, $lockVersion = null)
 * @method Departamento|null findOneBy(array $criteria, array $orderBy = null)
 * @method Departamento[]    findAll()
 * @method Departamento[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DepartamentoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Departamento::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT id, facultad_id, codigo, nombre
            FROM departamento");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    // /**
    //  * @return Departamento[] Returns an array of Departamento objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Departamento
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
