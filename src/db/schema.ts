import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { emptyGameState, type GameState, type Questions } from "@/db/schemas";
import { getRandomGameID } from "@/lib/utils";

export const gamesTable = sqliteTable("games_table", {
	// other idea - "normal" ID and field "status"
	id: text({ length: 4 }).$defaultFn(getRandomGameID).primaryKey(),
	pass: text().notNull(),
	questions: text({ mode: "json" }).$type<Questions>(),
	gameState: text({ mode: "json" }).$type<GameState>().default(emptyGameState),
});
