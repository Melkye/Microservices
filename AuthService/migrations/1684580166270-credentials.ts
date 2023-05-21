import { MigrationInterface, QueryRunner } from 'typeorm';

export class credentials1684580166270 implements MigrationInterface {
  name = 'credentials1684580166270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6544feb3937c24111e758cd18b8" UNIQUE ("email"), CONSTRAINT "UQ_0940f26ada71cc24d28fcc7b6a4" UNIQUE ("userId"), CONSTRAINT "PK_276d541a530a5e727c2bb4a2889" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Credentials"`);
  }
}
