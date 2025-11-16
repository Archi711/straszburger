import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { Player, Questions } from "@/db/schemas";
import { getRandomGameID } from "@/lib/utils";

export const gamesTable = sqliteTable("games_table", {
	// other idea - "normal" ID and field "status"
	id: text({ length: 4 }).$defaultFn(getRandomGameID).primaryKey(),
	pass: text().notNull(),
	players: text({ mode: "json" }).$type<Player[]>(),
	questions: text({ mode: "json" }).$type<Questions>(),
});
