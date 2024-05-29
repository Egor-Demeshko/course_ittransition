<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240528142127 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE additional_field_content DROP INDEX UNIQ_D39177E7367F72C8, ADD INDEX IDX_D39177E7367F72C8 (additional_data_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE additional_field_content DROP INDEX IDX_D39177E7367F72C8, ADD UNIQUE INDEX UNIQ_D39177E7367F72C8 (additional_data_id)');
    }
}
