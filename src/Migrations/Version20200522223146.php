<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200522223146 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE elemento (id INT AUTO_INCREMENT NOT NULL, laboratorio_id INT NOT NULL, codelemento INT NOT NULL, elemento VARCHAR(255) NOT NULL, stock INT NOT NULL, horauso INT NOT NULL, categoria VARCHAR(255) NOT NULL, estado VARCHAR(255) NOT NULL, INDEX IDX_504B5B12677ED5D4 (laboratorio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE laboratorio (id INT AUTO_INCREMENT NOT NULL, usuario_id INT NOT NULL, codlaboratorio INT NOT NULL, nombre VARCHAR(255) NOT NULL, ubicacion VARCHAR(255) NOT NULL, observacion VARCHAR(255) DEFAULT NULL, INDEX IDX_9D3D6DD6DB38439E (usuario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE usuario (id INT AUTO_INCREMENT NOT NULL, codusuario INT NOT NULL, usuario VARCHAR(100) NOT NULL, nombre VARCHAR(150) NOT NULL, apellido VARCHAR(150) NOT NULL, correo VARCHAR(150) NOT NULL, password VARCHAR(255) NOT NULL, telefono VARCHAR(25) DEFAULT NULL, tipousuario VARCHAR(15) NOT NULL, estado VARCHAR(15) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE elemento ADD CONSTRAINT FK_504B5B12677ED5D4 FOREIGN KEY (laboratorio_id) REFERENCES laboratorio (id)');
        $this->addSql('ALTER TABLE laboratorio ADD CONSTRAINT FK_9D3D6DD6DB38439E FOREIGN KEY (usuario_id) REFERENCES usuario (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE elemento DROP FOREIGN KEY FK_504B5B12677ED5D4');
        $this->addSql('ALTER TABLE laboratorio DROP FOREIGN KEY FK_9D3D6DD6DB38439E');
        $this->addSql('DROP TABLE elemento');
        $this->addSql('DROP TABLE laboratorio');
        $this->addSql('DROP TABLE usuario');
    }
}
