import z from "zod";
import { jsonCodec } from "@/lib/utils";

// --- --- ---
export const playerSchema = z.object({
	name: z.string(),
	isHead: z.boolean().optional(),
});
export type Player = z.infer<typeof playerSchema>;
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
