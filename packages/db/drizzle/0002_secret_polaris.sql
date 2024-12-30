CREATE TABLE "DEPARTMENTS" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "DEPARTMENTS_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"version" integer,
	"label" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "employees" RENAME TO "EMPLOYEES";--> statement-breakpoint
ALTER TABLE "EMPLOYEES" ADD CONSTRAINT "fk_department_id" FOREIGN KEY ("department") REFERENCES "public"."DEPARTMENTS"("id") ON DELETE cascade ON UPDATE cascade;