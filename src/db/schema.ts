import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { getRandomGameID } from "@/lib/utils";

export const gamesTable = sqliteTable("games_table", {
	id: text({ length: 4 }).default(getRandomGameID()).primaryKey(),
});
