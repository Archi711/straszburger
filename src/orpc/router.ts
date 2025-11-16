import { os } from "@orpc/server";
import z from "zod";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { questionsSchema } from "@/db/schemas";

const createGame = os
	.input(
		z.object({
			pass: z.string().min(4),
			questions: questionsSchema,
		}),
	)
	.handler(async ({ input }) => {
		const data = await db
			.insert(schema.gamesTable)
			.values({
				...input,
			})
			.returning();
		return data.map(({ id }) => id).at(0) as string;
	});

const checkCurrentGame = os
	.input(z.string().min(4))
	.handler(async ({ input }) => {
		const game = await db.query.gamesTable.findFirst({
			columns: {
				id: true,
			},
			where: (fields, { eq }) => eq(fields.id, input),
		});
		return !!game;
	});

const getAllGames = os.handler(() => {
	return db.query.gamesTable.findMany();
});

export const router = {
	game: {
		create: createGame,
		getAll: getAllGames,
		checkCurrent: checkCurrentGame,
	},
};
