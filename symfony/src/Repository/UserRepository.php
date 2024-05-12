<?php

namespace App\Repository;

use App\Entity\User;
use App\Service\Errors;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Throwable;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository
{
    private const DB_USER_FLUSH_ERROR = "[ERROR ON USER FLUSHING]: ";
    private ?Errors $errorsManager = null;
    private ?EntityManagerInterface $entityManager = null;
    public function __construct(ManagerRegistry $registry, Errors $errors, EntityManagerInterface $em)
    {
        parent::__construct($registry, User::class);
        $this->errorsManager = $errors;
        $this->entityManager = $em;
    }

    public function saveUser(User $user): void
    {
        try {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        } catch (Throwable $e) {
            $this->errorsManager->setError(Errors::GENERAL, Errors::MESSAGE);
            $this->errorsManager->logErrorMessage(self::DB_USER_FLUSH_ERROR, $e->getMessage());
        }
    }

    //    /**
    //     * @return User[] Returns an array of User objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?User
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
