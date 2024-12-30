ALTER TABLE "employees" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "version" integer;