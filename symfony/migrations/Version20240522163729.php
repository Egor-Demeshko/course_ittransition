<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240522163729 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE additional_field_data (id INT AUTO_INCREMENT NOT NULL, additional_field_link_id INT DEFAULT NULL, content VARCHAR(255) NOT NULL, label VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_AB8ABD3680F0453F (additional_field_link_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE additional_field_link (id INT AUTO_INCREMENT NOT NULL, collection_id INT NOT NULL, field_data_id INT NOT NULL, INDEX IDX_30D5D7A4514956FD (collection_id), UNIQUE INDEX UNIQ_30D5D7A4D9D1849C (field_data_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE additional_field_data ADD CONSTRAINT FK_AB8ABD3680F0453F FOREIGN KEY (additional_field_link_id) REFERENCES additional_field_link (id)');
        $this->addSql('ALTER TABLE additional_field_link ADD CONSTRAINT FK_30D5D7A4514956FD FOREIGN KEY (collection_id) REFERENCES collection_data (id)');
        $this->addSql('ALTER TABLE additional_field_link ADD CONSTRAINT FK_30D5D7A4D9D1849C FOREIGN KEY (field_data_id) REFERENCES additional_field_data (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE additional_field_data DROP FOREIGN KEY FK_AB8ABD3680F0453F');
        $this->addSql('ALTER TABLE additional_field_link DROP FOREIGN KEY FK_30D5D7A4514956FD');
        $this->addSql('ALTER TABLE additional_field_link DROP FOREIGN KEY FK_30D5D7A4D9D1849C');
        $this->addSql('DROP TABLE additional_field_data');
        $this->addSql('DROP TABLE additional_field_link');
    }
}
