import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestampFields = {
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .$onUpdate(() => sql`now() AT TIME ZONE 'UTC'`),
};

export const userRoles = pgEnum("userRoles", [
  "candidate",
  "recruiter",
  "admin",
]);

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  role: userRoles().default("candidate"),
  profileImage: varchar("profile_image", { length: 255 }),
  ...timestampFields,
});

export const resumes = pgTable("resumes", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  resumeText: text("resume_text").notNull(),
  processedText: text("processed_text"),
  ...timestampFields,
});

export const jobPostings = pgTable("job_postings", {
  id: uuid().primaryKey().defaultRandom(),
  recruiterId: uuid("recruiter_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  salaryMin: varchar("salary_min", { length: 255 }).notNull(),
  salaryMax: varchar("salary_max", { length: 255 }).notNull(),
  employmentType: varchar("employment_type", { length: 255 }).notNull(),
  ...timestampFields,
});

export const applications = pgTable("applications", {
  id: uuid().primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id")
    .notNull()
    .references(() => users.id),
  jobPostingId: uuid("job_posting_id")
    .notNull()
    .references(() => jobPostings.id),
  feeeback: text("feedback"),
  status: varchar("status", { length: 255 }).notNull(),
  ...timestampFields,
});
