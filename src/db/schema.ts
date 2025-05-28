import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
});

export const usersRelationsTable = relations(usersTable, ({ many }) => ({
  userToClinics: many(usersToClinicsTable),
}));

export const clinicsTable = pgTable("clinics", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersToClinicsTable = pgTable("users_to_clinics", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersToClinicsTableRelations = relations(
  usersToClinicsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }),
);

export const clinicsRelationsTable = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  usersToClinicsTable: many(usersToClinicsTable),
}));

export const doctorsTable = pgTable("doctors", {
  id: uuid("id").primaryKey().defaultRandom(),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  avatarImageUrl: text("avatar_image_url"),
  availableFromWeekDay: integer("available_from_week_day").notNull(),
  availableToWeekDay: integer("available_to_week_day").notNull(),
  availableFromTime: time("available_from_time").notNull(),
  availableToTime: time("available_to_time").notNull(),
  speciality: text("specialty").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
});

export const doctorsRelationsTable = relations(
  doctorsTable,
  ({ many, one }) => ({
    clinic: one(clinicsTable, {
      fields: [doctorsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
  }),
);

export const patientsGenderEnum = pgEnum("patients_sex", ["male", "female"]);

export const patientsTable = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  sex: patientsGenderEnum("sex").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const patientsRelationsTable = relations(
  patientsTable,
  ({ many, one }) => ({
    clinic: one(clinicsTable, {
      fields: [patientsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
  }),
);

export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: timestamp("date").notNull(),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patientsTable.id, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => doctorsTable.id, { onDelete: "cascade" }),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const appointmentsRelationsTable = relations(
  appointmentsTable,
  ({ one }) => ({
    patient: one(patientsTable, {
      fields: [appointmentsTable.patientId],
      references: [patientsTable.id],
    }),
    doctor: one(doctorsTable, {
      fields: [appointmentsTable.doctorId],
      references: [doctorsTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [appointmentsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }),
);
