import { atom } from "jotai";
import { loadable } from "jotai/utils";
import * as R from "remeda";
import { merge } from "remeda";
import {
	emptyGameState,
	type GameState,
	gameStateSchema,
} from "../lib/schemas";

const API_URL = "http://192.168.0.13:6969";
const REFRESH_TIME_MS = 500;
const gsInitAtom = atom(false);
const gsAtom = atom<GameState>(emptyGameState);

export const roundEndedAtom = atom((get) =>
	R.pipe(
		get(gameStateAtom),
		R.pick(["blueTeam", "redTeam", "questions", "currentRound"]),
		({ questions, currentRound, ...teams }) => {
			if (questions.at(currentRound)?.answers.every(({ isShown }) => isShown))
				return true;
			if (
				Object.values(teams).every(
					({ fails, reboundFail }) => reboundFail || fails.every((f) => !f),
				)
			)
				return true;
		},
	),
);

export const setGSAtom = atom<null, [Partial<GameState>], void>(
	null,
	async (get, set, gs) => {
		try {
			const newGs = merge(get(gsAtom), gs) as GameState;
			const resp = await fetch(new URL("/edit", API_URL), {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify(newGs),
			});
			if (!resp.ok) throw await resp.text();
			set(gsAtom, newGs);
		} catch (e) {
			console.error(e);
		}
	},
);

export const currentRoundIdxAtom = atom(
	(get) => get(gameStateAtom).currentRound,
);
export const currentTeamAtom = atom((get) => get(gameStateAtom).currentTeam);

export const gameStateAtom = atom(
	(get) => get(gsAtom),
	async (get, set) => {
		if (get(gsInitAtom) === true) {
			return;
		}
		const run = async () => {
			try {
				set(gsInitAtom, true);
				const resp = await fetch(new URL("/display", API_URL));
				const data = await resp.json();
				const parsed = gameStateSchema.parse(data);
				set(gsAtom, parsed);
			} catch (e) {
				console.error(e);
			}
		};
		run();
		const interval = setInterval(run, REFRESH_TIME_MS);
		return () => {
			clearInterval(interval);
		};
	},
);

const stateAtom = loadable(gameStateAtom);

export const currentRoundAtom = atom((get) => {
	const data = get(stateAtom);
	return data.state === "hasData"
		? data.data.questions.at(data.data.currentRound)
		: undefined;
});

export const pointsOnTableAtom = atom((get) => {
	const cr = get(currentRoundAtom);
	return cr?.answers.reduce((sum, e) => sum + (e.isShown ? e.value : 0), 0);
});

const teamColors = ["red", "blue"] as const;
export type TeamColor = (typeof teamColors)[number];

export const getTeamFailsAtom = (team: TeamColor) =>
	atom((get) => {
		const data = get(stateAtom);
		return (
			data.state === "hasData" &&
			R.pick(data.data[`${team}Team`], ["fails", "reboundFail"])
		);
	});
