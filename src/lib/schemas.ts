import z from "zod";

export const answerSchema = z.object({
	answer: z.string(),
	index: z.number().positive().max(6).min(1),
	isShown: z.boolean().default(false),
	value: z.number().positive(),
});

export const questionSchema = z.object({
	question: z.string(),
	answers: z.array(answerSchema).max(6),
});
export type Questions = z.infer<typeof questionSchema>;

export const teamSchema = z.object({
	points: z.number(),
	fails: z.tuple([z.boolean(), z.boolean(), z.boolean()]),
	reboundFail: z.boolean(),
});

export type Team = z.infer<typeof teamSchema>;
export const emptyTeam: Team = {
	fails: [false, false, false],
	points: 0,
	reboundFail: false,
};

export const gameStateSchema = z
	.object({
		currentRound: z.number().positive().max(6),
		currentTeam: z.union([z.literal("red"), z.literal("blue")]),
		questions: z.array(questionSchema),
		redTeam: teamSchema,
		blueTeam: teamSchema,
	})
	.refine((data) => data.currentRound < data.questions.length);

export type GameState = z.infer<typeof gameStateSchema>;
export const emptyGameState: GameState = {
	currentRound: 1,
	currentTeam: "red",
	questions: [],
	redTeam: { ...emptyTeam },
	blueTeam: { ...emptyTeam },
};
