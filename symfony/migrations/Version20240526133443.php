<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240526133443 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tag_link ADD item_id INT NOT NULL');
        $this->addSql('ALTER TABLE tag_link ADD CONSTRAINT FK_D8A32647126F525E FOREIGN KEY (item_id) REFERENCES item (id)');
        $this->addSql('CREATE INDEX IDX_D8A32647126F525E ON tag_link (item_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tag_link DROP FOREIGN KEY FK_D8A32647126F525E');
        $this->addSql('DROP INDEX IDX_D8A32647126F525E ON tag_link');
        $this->addSql('ALTER TABLE tag_link DROP item_id');
    }
}
