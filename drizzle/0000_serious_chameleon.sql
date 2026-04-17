CREATE TABLE "opportunities" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title_en" text NOT NULL,
	"title_ms" text NOT NULL,
	"summary_en" text NOT NULL,
	"summary_ms" text NOT NULL,
	"description_en" text NOT NULL,
	"description_ms" text NOT NULL,
	"eligibility_en" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"eligibility_ms" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"category" text NOT NULL,
	"organization_id" text NOT NULL,
	"location_label" text NOT NULL,
	"mode" text NOT NULL,
	"deadline_at" timestamp with time zone NOT NULL,
	"external_url" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "opportunities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"short_description_en" text NOT NULL,
	"short_description_ms" text NOT NULL,
	"website" text NOT NULL,
	"logo_url" text
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"clerk_user_id" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"display_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
CREATE TABLE "saved_opportunities" (
	"profile_id" text NOT NULL,
	"opportunity_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "saved_opportunities_profile_id_opportunity_id_pk" PRIMARY KEY("profile_id","opportunity_id")
);
--> statement-breakpoint
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_opportunities" ADD CONSTRAINT "saved_opportunities_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_opportunities" ADD CONSTRAINT "saved_opportunities_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE cascade ON UPDATE no action;