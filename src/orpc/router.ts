import { ORPCError, os } from "@orpc/server";
import z from "zod";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { getRandomGameID } from "@/lib/utils";

const createGame = os.handler(() => {
	return db.insert(schema.gamesTable).values({});
});

const getAllGames = os.handler(() => {
	return db.query.gamesTable.findMany();
});

export const router = {
	game: {
		create: createGame,
		getAll: getAllGames,
	},
};
