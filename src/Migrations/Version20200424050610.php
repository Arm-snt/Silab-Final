<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200424050610 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE elemento (id INT AUTO_INCREMENT NOT NULL, codelemento INT NOT NULL, elemento VARCHAR(100) NOT NULL, stock INT NOT NULL, horauso INT DEFAULT NULL, categoria VARCHAR(2) NOT NULL, estado VARCHAR(12) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE estudiante CHANGE tipodoc tipodoc VARCHAR(255) NOT NULL, CHANGE documento documento VARCHAR(255) NOT NULL, CHANGE estado estado VARCHAR(255) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_3B3F3FAD20332D99 ON estudiante (codigo)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_3B3F3FAD3A909126 ON estudiante (nombre)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_3B3F3FADB6B12EC7 ON estudiante (documento)');
        $this->addSql('ALTER TABLE trabajo CHANGE estudiante_id estudiante_id INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE elemento');
        $this->addSql('DROP INDEX UNIQ_3B3F3FAD20332D99 ON estudiante');
        $this->addSql('DROP INDEX UNIQ_3B3F3FAD3A909126 ON estudiante');
        $this->addSql('DROP INDEX UNIQ_3B3F3FADB6B12EC7 ON estudiante');
        $this->addSql('ALTER TABLE estudiante CHANGE tipodoc tipodoc VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE documento documento VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE estado estado VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE trabajo CHANGE estudiante_id estudiante_id INT DEFAULT NULL');
    }
}
