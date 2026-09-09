import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1788949378337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO roles (name)
      VALUES
        ('user'),
        ('admin')
      ON CONFLICT (name) DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM roles
      WHERE name IN ('user', 'admin')
    `);
  }
}
