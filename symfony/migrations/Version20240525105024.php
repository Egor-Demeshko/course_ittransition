<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240525105024 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE additional_field_content (id INT AUTO_INCREMENT NOT NULL, additional_data_id INT NOT NULL, item_id INT NOT NULL, content VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_D39177E7367F72C8 (additional_data_id), INDEX IDX_D39177E7126F525E (item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE item (id INT AUTO_INCREMENT NOT NULL, collection_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', modified_at DATETIME DEFAULT NULL, INDEX IDX_1F1B251E514956FD (collection_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag_link (id INT AUTO_INCREMENT NOT NULL, tag_id INT NOT NULL, UNIQUE INDEX UNIQ_D8A32647BAD26311 (tag_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tags (id INT AUTO_INCREMENT NOT NULL, value VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_6FBC94261D775834 (value), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE additional_field_content ADD CONSTRAINT FK_D39177E7367F72C8 FOREIGN KEY (additional_data_id) REFERENCES additional_field_data (id)');
        $this->addSql('ALTER TABLE additional_field_content ADD CONSTRAINT FK_D39177E7126F525E FOREIGN KEY (item_id) REFERENCES item (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E514956FD FOREIGN KEY (collection_id) REFERENCES collection_data (id)');
        $this->addSql('ALTER TABLE tag_link ADD CONSTRAINT FK_D8A32647BAD26311 FOREIGN KEY (tag_id) REFERENCES tags (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE additional_field_content DROP FOREIGN KEY FK_D39177E7367F72C8');
        $this->addSql('ALTER TABLE additional_field_content DROP FOREIGN KEY FK_D39177E7126F525E');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E514956FD');
        $this->addSql('ALTER TABLE tag_link DROP FOREIGN KEY FK_D8A32647BAD26311');
        $this->addSql('DROP TABLE additional_field_content');
        $this->addSql('DROP TABLE item');
        $this->addSql('DROP TABLE tag_link');
        $this->addSql('DROP TABLE tags');
    }
}
