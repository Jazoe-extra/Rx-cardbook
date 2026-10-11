import { pgTable, text, uuid, integer, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["counter", "hq_approver", "admin"]);
export const statusEnum = pgEnum("status", ["active", "disabled"]);
export const unitEnum = pgEnum("stock_unit", ["Tablet", "Pack", "Strip", "Bottle", "Ampoule", "Vial", "Sachet", "Other"]);

export const branches = pgTable("branches", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull()
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").unique(),
  phone: text("phone").unique(),
  branchId: uuid("branch_id").references(() => branches.id),
  role: roleEnum("role").notNull().default("counter"),
  status: statusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow()
});

export const drugs = pgTable("drugs", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").unique(),
  name: text("name").notNull(),
  generic: text("generic"),
  strength: text("strength"),
  form: text("form"),
  packSize: text("pack_size"),
  stockUnit: unitEnum("stock_unit").notNull(),
  standardPrice: numeric("standard_price").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const branchPrices = pgTable("branch_prices", {
  drugId: uuid("drug_id").references(() => drugs.id).notNull(),
  branchId: uuid("branch_id").references(() => branches.id).notNull(),
  price: numeric("price").notNull()
});

export const stockMovements = pgTable("stock_movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  branchId: uuid("branch_id").references(() => branches.id).notNull(),
  drugId: uuid("drug_id").references(() => drugs.id).notNull(),
  type: text("type").notNull(),
  qty: integer("qty").notNull(),
  unit: text("unit").notNull(),
  priceCharged: numeric("price_charged"),
  reason: text("reason"),
  actorId: uuid("actor_id").references(() => users.id),
  deviceTime: timestamp("device_time").defaultNow(),
  serverTime: timestamp("server_time").defaultNow()
});

export const physicalChecks = pgTable("physical_checks", {
  id: uuid("id").defaultRandom().primaryKey(),
  branchId: uuid("branch_id").references(() => branches.id).notNull(),
  drugId: uuid("drug_id").references(() => drugs.id).notNull(),
  day: text("day").notNull(),
  expectedQty: integer("expected_qty").notNull(),
  physicalQty: integer("physical_qty"),
  reason: text("reason"),
  countedBy: text("counted_by").default("Demo Counter")
});

export const dayCloses = pgTable("day_closes", {
  id: uuid("id").defaultRandom().primaryKey(),
  branchId: uuid("branch_id").references(() => branches.id).notNull(),
  day: text("day").notNull(),
  closedBy: text("closed_by").default("Demo Counter"),
  light: text("light").notNull(),
  closedAt: timestamp("closed_at").defaultNow()
});
