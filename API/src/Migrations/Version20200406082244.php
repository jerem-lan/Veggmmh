<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200406082244 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ad ADD CONSTRAINT IDX_77E0ED58A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE ingredient ADD icon VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE ingredient ADD CONSTRAINT IDX_6BAF7870A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_recipe DROP FOREIGN KEY IDX_BFDAAA0A59D8A214');
        $this->addSql('ALTER TABLE user_recipe DROP FOREIGN KEY IDX_BFDAAA0AA76ED395');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ad DROP FOREIGN KEY IDX_77E0ED58A76ED395');
        $this->addSql('ALTER TABLE ingredient DROP FOREIGN KEY IDX_6BAF7870A76ED395');
        $this->addSql('ALTER TABLE ingredient DROP icon');
    }
}
