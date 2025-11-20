import z from "zod";
import { jsonCodec } from "@/lib/utils";

// ---
export const answerSchema = z.object({
	answer: z.string(),
	value: z.number(),
	index: z.number().positive(),
	isShown: z.boolean(),
});
export const questionsSchema = z.array(
	z.object({
		question: z.string(),
		answers: z.array(answerSchema),
	}),
);
export const questionsJSON = jsonCodec(questionsSchema);
export type Questions = z.infer<typeof questionsSchema>;
// --- --- ---

export const gameStateSchema = z
	.object({
		currentRound: z.number().positive(),
		currentTeam: z.union([
			z.literal("blue"),
			z.literal("red"),
			z.literal("none"),
		]),
		currentFails: z.number().positive().max(3),
		reboundFailed: z.boolean().default(false),
	})
	.refine((data) => !(data.reboundFailed && data.currentFails < 3));

export type GameState = z.infer<typeof gameStateSchema>;

export const emptyGameState: GameState = {
	currentFails: 0,
	currentRound: 0,
	currentTeam: "none",
	reboundFailed: false,
};
