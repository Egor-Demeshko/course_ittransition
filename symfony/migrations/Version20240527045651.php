<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240527045651 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tag_link DROP FOREIGN KEY FK_D8A32647BAD26311');
        $this->addSql('ALTER TABLE tag_link CHANGE tag_id tag_id INT NOT NULL');
        $this->addSql('ALTER TABLE tag_link ADD CONSTRAINT FK_D8A32647BAD26311 FOREIGN KEY (tag_id) REFERENCES tags (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tag_link DROP FOREIGN KEY FK_D8A32647BAD26311');
        $this->addSql('ALTER TABLE tag_link CHANGE tag_id tag_id VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE tag_link ADD CONSTRAINT FK_D8A32647BAD26311 FOREIGN KEY (tag_id) REFERENCES tags (value) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
