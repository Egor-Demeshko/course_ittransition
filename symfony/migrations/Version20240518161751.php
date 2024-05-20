<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240518161751 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE collectiondata_category DROP FOREIGN KEY FK_CEAAB9E12469DE2');
        $this->addSql('ALTER TABLE collectiondata_category DROP FOREIGN KEY FK_CEAAB9E8EC71691');
        $this->addSql('DROP TABLE collectiondata_category');
        $this->addSql('ALTER TABLE collection_data DROP INDEX IDX_E784DF8DA76ED395, ADD UNIQUE INDEX UNIQ_E784DF8DA76ED395 (user_id)');
        $this->addSql('ALTER TABLE collection_data ADD CONSTRAINT FK_E784DF8D8EC71691 FOREIGN KEY (cathegory_id) REFERENCES category (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E784DF8D8EC71691 ON collection_data (cathegory_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE collectiondata_category (cathegory_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_CEAAB9E12469DE2 (category_id), INDEX IDX_CEAAB9E8EC71691 (cathegory_id), PRIMARY KEY(cathegory_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE collectiondata_category ADD CONSTRAINT FK_CEAAB9E12469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE collectiondata_category ADD CONSTRAINT FK_CEAAB9E8EC71691 FOREIGN KEY (cathegory_id) REFERENCES collection_data (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE collection_data DROP INDEX UNIQ_E784DF8DA76ED395, ADD INDEX IDX_E784DF8DA76ED395 (user_id)');
        $this->addSql('ALTER TABLE collection_data DROP FOREIGN KEY FK_E784DF8D8EC71691');
        $this->addSql('DROP INDEX UNIQ_E784DF8D8EC71691 ON collection_data');
    }
}
