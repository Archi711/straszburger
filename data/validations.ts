import * as R from "remeda";
import z from "zod";
export const playerSchema = z.object({
	id: z.cuid(),
	name: z.string(),
	isHead: z.boolean(),
	roundsPlayed: z.number().positive(),
	roundsScored: z.number().positive(),
});
export type Player = z.infer<typeof playerSchema>;

export const teamSchema = z.object({
	score: z.number().positive(),
	players: z.array(playerSchema),
});

export type Team = z.infer<typeof teamSchema>;

export const gameStateSchema = z.object({
	currentRoundIndex: z.number().positive(),
	currentPlayer: z.cuid(),
	isFinal: z.boolean(),
	blueTeam: teamSchema,
	redTeam: teamSchema,
});
export type GameState = z.infer<typeof gameStateSchema>;

export const roundAnswerSchema = z.object({
	answer: z.string(),
	value: z.number().positive(),
});

export const roundDataSchema = z.object({
	question: z.string(),
	answers: z.array(roundAnswerSchema).refine(
		(els) => {
			return R.sumBy(els, (e) => e.value) === 100;
		},
		{ error: "Suma punktów != 100" },
	),
});

export type RoundData = z.infer<typeof roundDataSchema>;
