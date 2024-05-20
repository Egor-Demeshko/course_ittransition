<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240518155929 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C163D9D3ED');
        $this->addSql('DROP INDEX UNIQ_64C19C163D9D3ED ON category');
        $this->addSql('ALTER TABLE category DROP collection_data_id');
        $this->addSql('ALTER TABLE collection_data DROP FOREIGN KEY FK_E784DF8D9D86650F');
        $this->addSql('DROP INDEX IDX_E784DF8D9D86650F ON collection_data');
        $this->addSql('ALTER TABLE collection_data CHANGE user_id_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE collection_data ADD CONSTRAINT FK_E784DF8DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_E784DF8DA76ED395 ON collection_data (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE collection_data DROP FOREIGN KEY FK_E784DF8DA76ED395');
        $this->addSql('DROP INDEX IDX_E784DF8DA76ED395 ON collection_data');
        $this->addSql('ALTER TABLE collection_data CHANGE user_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE collection_data ADD CONSTRAINT FK_E784DF8D9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_E784DF8D9D86650F ON collection_data (user_id_id)');
        $this->addSql('ALTER TABLE category ADD collection_data_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C163D9D3ED FOREIGN KEY (collection_data_id) REFERENCES collection_data (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64C19C163D9D3ED ON category (collection_data_id)');
    }
}
