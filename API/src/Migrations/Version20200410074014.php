<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200410074014 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ad DROP FOREIGN KEY IDX_77E0ED58A76ED395');
        $this->addSql('ALTER TABLE ad CHANGE creation_date creation_date VARCHAR(255) NOT NULL, CHANGE modification_date modification_date VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE ingredient DROP FOREIGN KEY IDX_6BAF7870A76ED395');
        $this->addSql('ALTER TABLE ingredient CHANGE user_id user_id INT DEFAULT NULL, CHANGE icon icon VARCHAR(255) DEFAULT NULL, CHANGE season season JSON DEFAULT NULL');
        $this->addSql('ALTER TABLE recipe CHANGE user_id user_id INT DEFAULT NULL, CHANGE creation_date creation_date VARCHAR(255) NOT NULL, CHANGE ingredients ingredients JSON NOT NULL, CHANGE steps steps JSON NOT NULL, CHANGE rating rating DOUBLE PRECISION DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ad CHANGE creation_date creation_date DATETIME NOT NULL, CHANGE modification_date modification_date VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE ingredient CHANGE user_id user_id INT DEFAULT NULL, CHANGE season season LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_bin`, CHANGE icon icon VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE recipe CHANGE user_id user_id INT DEFAULT NULL, CHANGE creation_date creation_date DATETIME NOT NULL, CHANGE ingredients ingredients LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE steps steps LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE rating rating DOUBLE PRECISION DEFAULT \'NULL\'');
    }
}
