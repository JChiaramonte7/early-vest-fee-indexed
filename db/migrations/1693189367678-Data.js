module.exports = class Data1693189367678 {
    name = 'Data1693189367678'

    async up(db) {
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "value" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
        await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
        await db.query(`CREATE INDEX "IDX_029e97d36121eb6a47dc853cf6" ON "transfer" ("value") `)
        await db.query(`CREATE TABLE "early_vested_cumulative" ("id" character varying NOT NULL, "amount_sent_to_treasury" numeric NOT NULL, CONSTRAINT "PK_638700f580e2f8ee49161e68388" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_5be5355d3c79970995d0eb65e6" ON "early_vested_cumulative" ("amount_sent_to_treasury") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
        await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
        await db.query(`DROP INDEX "public"."IDX_029e97d36121eb6a47dc853cf6"`)
        await db.query(`DROP TABLE "early_vested_cumulative"`)
        await db.query(`DROP INDEX "public"."IDX_5be5355d3c79970995d0eb65e6"`)
    }
}
