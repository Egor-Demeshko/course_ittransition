<?php

namespace App\Repository;

use App\Entity\Collectiondata;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Collectiondata>
 */
class CollectiondataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Collectiondata::class);
    }

    //    /**
    //     * @return Collectiondata[] Returns an array of Collectiondata objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }


    public function findTopFive()
    {
        $em = $this->getEntityManager();

        $query = $this->createQueryBuilder('c')
            ->select('c.id, c.title, c.description, c.image_link, COUNT(i.name) as item_quantity')
            ->join('c.items', 'i', 'WITH', 'i.collection = c')
            ->groupBy('c.id', 'c.title', 'c.description', 'c.image_link')
            ->setMaxResults(5)
            ->orderBy('item_quantity', 'DESC')
            ->getQuery();


        return $query->getResult();
    }
}
