import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1692952495381 implements MigrationInterface {
    name = 'Migrations1692952495381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weights" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, CONSTRAINT "PK_624dec6add7543f9a9c47871d8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rankings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', "draws" integer NOT NULL DEFAULT '0', "knockouts" integer NOT NULL DEFAULT '0', "submissions" integer NOT NULL DEFAULT '0', "average" double precision NOT NULL DEFAULT '0', "fighter_id" integer, CONSTRAINT "REL_3adc35db3d2923ccb01e38b0c3" UNIQUE ("fighter_id"), CONSTRAINT "PK_05d87d598d485338c9980373d20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fights_result" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" character varying NOT NULL, "isDraw" boolean NOT NULL DEFAULT false, "fight_id" integer, "winner_id" integer, "loser_id" integer, CONSTRAINT "REL_b33fcee50c9cbf45a7c71b6bbd" UNIQUE ("fight_id"), CONSTRAINT "PK_0a91fdc01894afd4435e71e2c9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fighters" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "weight" integer NOT NULL, "nation" character varying NOT NULL, "team" character varying NOT NULL, "event_id" integer, CONSTRAINT "PK_181eba8698d5defe223daa78fba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fights" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "underdog" character varying NOT NULL DEFAULT 'none', "is_main_card" boolean NOT NULL, "fighter_one" integer, "fighter_two" integer, "weight_class" integer, "event_id" integer, "fight_result_id" integer, CONSTRAINT "REL_481ff4615b289b25238dbe6d5e" UNIQUE ("fight_result_id"), CONSTRAINT "PK_f58a76631bc2c2bdef2a8628c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "location" jsonb NOT NULL, "date" date NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rankings" ADD CONSTRAINT "FK_3adc35db3d2923ccb01e38b0c3f" FOREIGN KEY ("fighter_id") REFERENCES "fighters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights_result" ADD CONSTRAINT "FK_b33fcee50c9cbf45a7c71b6bbd2" FOREIGN KEY ("fight_id") REFERENCES "fights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights_result" ADD CONSTRAINT "FK_23b58c775ba257fbffe2b699fc2" FOREIGN KEY ("winner_id") REFERENCES "fighters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights_result" ADD CONSTRAINT "FK_f1c3ca2d60b73fcd414fbb5dee5" FOREIGN KEY ("loser_id") REFERENCES "fighters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fighters" ADD CONSTRAINT "FK_6b675f79354163839aae977eaa3" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights" ADD CONSTRAINT "FK_c69d9ded36d43f86cf5b0faf979" FOREIGN KEY ("fighter_one") REFERENCES "fighters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights" ADD CONSTRAINT "FK_de3f88b4f35d0f0dff068799be9" FOREIGN KEY ("fighter_two") REFERENCES "fighters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights" ADD CONSTRAINT "FK_539fce1d643ef64a13ce4d1e43d" FOREIGN KEY ("weight_class") REFERENCES "weights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights" ADD CONSTRAINT "FK_7776f6c71fd1f8f9442370983af" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fights" ADD CONSTRAINT "FK_481ff4615b289b25238dbe6d5e7" FOREIGN KEY ("fight_result_id") REFERENCES "fights_result"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fights" DROP CONSTRAINT "FK_481ff4615b289b25238dbe6d5e7"`);
        await queryRunner.query(`ALTER TABLE "fights" DROP CONSTRAINT "FK_7776f6c71fd1f8f9442370983af"`);
        await queryRunner.query(`ALTER TABLE "fights" DROP CONSTRAINT "FK_539fce1d643ef64a13ce4d1e43d"`);
        await queryRunner.query(`ALTER TABLE "fights" DROP CONSTRAINT "FK_de3f88b4f35d0f0dff068799be9"`);
        await queryRunner.query(`ALTER TABLE "fights" DROP CONSTRAINT "FK_c69d9ded36d43f86cf5b0faf979"`);
        await queryRunner.query(`ALTER TABLE "fighters" DROP CONSTRAINT "FK_6b675f79354163839aae977eaa3"`);
        await queryRunner.query(`ALTER TABLE "fights_result" DROP CONSTRAINT "FK_f1c3ca2d60b73fcd414fbb5dee5"`);
        await queryRunner.query(`ALTER TABLE "fights_result" DROP CONSTRAINT "FK_23b58c775ba257fbffe2b699fc2"`);
        await queryRunner.query(`ALTER TABLE "fights_result" DROP CONSTRAINT "FK_b33fcee50c9cbf45a7c71b6bbd2"`);
        await queryRunner.query(`ALTER TABLE "rankings" DROP CONSTRAINT "FK_3adc35db3d2923ccb01e38b0c3f"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "fights"`);
        await queryRunner.query(`DROP TABLE "fighters"`);
        await queryRunner.query(`DROP TABLE "fights_result"`);
        await queryRunner.query(`DROP TABLE "rankings"`);
        await queryRunner.query(`DROP TABLE "weights"`);
    }

}
