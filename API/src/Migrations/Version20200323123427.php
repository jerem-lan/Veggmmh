<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200323123427 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ad CHANGE modification_date modification_date DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE ingredient CHANGE user_id user_id INT DEFAULT NULL, CHANGE start_season start_season DATETIME DEFAULT NULL, CHANGE end_season end_season DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE recipe CHANGE user_id user_id INT DEFAULT NULL, CHANGE rating rating DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ad CHANGE modification_date modification_date DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE ingredient CHANGE user_id user_id INT DEFAULT NULL, CHANGE start_season start_season DATETIME DEFAULT \'NULL\', CHANGE end_season end_season DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE recipe CHANGE user_id user_id INT DEFAULT NULL, CHANGE rating rating DOUBLE PRECISION DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_bin`');
    }
}
