import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import z from "zod";
import { getRandomGameID } from "@/lib/utils";

// --- --- ---
const playerSchema = z.object({
	name: z.string(),
	isHead: z.boolean().optional(),
});
type Player = z.infer<typeof playerSchema>;
// ---
const answerSchema = z.object({
	answer: z.string(),
	value: z.number(),
	index: z.number().positive(),
	isShown: z.boolean(),
});
const questionsSchema = z.array(
	z.object({
		question: z.string(),
		answers: z.array(answerSchema),
	}),
);
type Questions = z.infer<typeof questionsSchema>;
// --- --- ---

export const gamesTable = sqliteTable("games_table", {
	// other idea - "normal" ID and field "status"
	id: text({ length: 4 }).default(getRandomGameID()).primaryKey(),
	pass: text().notNull(),
	players: text({ mode: "json" }).$type<Player[]>(),
	questions: text({ mode: "json" }).$type<Questions>(),
});
