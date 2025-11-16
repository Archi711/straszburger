import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
import { safe } from "true-myth/result";
import z from "zod";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const nanoid = customAlphabet(
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	10,
);
export function getRandomGameID() {
	return nanoid(4);
}

export const safeJSONParse = safe(JSON.parse);

export const jsonCodec = <T extends z.core.$ZodType>(schema: T) =>
	z.codec(z.string(), schema, {
		decode: (jsonString, ctx) => {
			try {
				return JSON.parse(jsonString);
			} catch (err: any) {
				ctx.issues.push({
					code: "invalid_format",
					format: "json",
					input: jsonString,
					message: err.message,
				});
				return z.NEVER;
			}
		},
		encode: (value) => JSON.stringify(value),
	});
