<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240510074432 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE collection_data CHANGE cathegory_id cathegory_id INT NOT NULL');
        $this->addSql('ALTER TABLE collection_data ADD CONSTRAINT FK_E784DF8D8EC71691 FOREIGN KEY (cathegory_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE user CHANGE modified_at modified_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE collection_data DROP FOREIGN KEY FK_E784DF8D8EC71691');
        $this->addSql('ALTER TABLE collection_data CHANGE cathegory_id cathegory_id VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE modified_at modified_at DATETIME NOT NULL');
    }
}
