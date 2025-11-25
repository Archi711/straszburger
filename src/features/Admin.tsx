import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { cn } from "../lib/utils";
import {
	currentRoundAtom,
	gameStateAtom,
	pointsOnTableAtom,
	setGSAtom,
	type TeamColor,
} from "./state";

const mistakeAudio = new Audio("/audio/mistake.mp3");
const goodAudio = new Audio("/audio/good.mp3");
const roundAudio = new Audio("/audio/next-round.mp3");
const cashoutAudio = new Audio("/audio/cash-out.mp3");
const ChancesCtrls = ({ team }: { team: TeamColor }) => {
	const gs = useAtomValue(gameStateAtom);
	const enemy = team === "red" ? "blue" : "red";
	const { fails, ...td } = gs[`${team}Team`];
	const onTable = useAtomValue(pointsOnTableAtom);

	const updateGS = useSetAtom(setGSAtom);

	const handleError = (nb: 0 | 1 | 2) => (e) => {
		mistakeAudio.pause();
		mistakeAudio.currentTime = 0;
		mistakeAudio.play();
		fails[nb] = true;
		updateGS({
			[`${team}Team`]: {
				fails,
				...td,
			},
		});
	};
	const handleReboundError = () => {
		cashoutAudio.pause();
		cashoutAudio.currentTime = 0;
		cashoutAudio.play();
		updateGS({
			[`${team}Team`]: {
				...td,
				fails,
				reboundFail: true,
			},
		});
	};
	return (
		<div className="flex flex-col gap-4 justify-end">
			{gs.currentTeam === team ? (
				<>
					<button type="button" onClick={handleError(2)}>
						X
					</button>
					<button type="button" onClick={handleError(1)}>
						X
					</button>
					<button type="button" onClick={handleError(0)}>
						X
					</button>
				</>
			) : (
				<button
					onClick={handleReboundError}
					type="button"
					className="max-w-full scale-y-366 origin-bottom overflow-hidden"
				>
					<span className="flex scale-x-200 origin-left">X</span>
				</button>
			)}
		</div>
	);
};

const QuestionsCtrls = () => {
	const { currentRound, questions } = useAtomValue(gameStateAtom);

	const round = useAtomValue(currentRoundAtom);
	const updateGS = useSetAtom(setGSAtom);
	const after = false;
	const handleClick = (id: number) => () => {
		goodAudio.pause();
		goodAudio.currentTime = 0;
		goodAudio.play();
		const newQuestions = [...questions];
		newQuestions.at(currentRound).answers.at(id).isShown = true;
		updateGS({
			questions: newQuestions,
		});
	};
	return (
		<div className="grid gap-4 flex-1">
			{round?.answers.map((e, i) => (
				<button type="button" key={e.answer} onClick={handleClick(i)}>
					{e.answer}
				</button>
			))}
		</div>
	);
};

const TeamControls = () => {
	const [mul, setMul] = React.useState(1);
	const gs = useAtomValue(gameStateAtom);
	const onTable = useAtomValue(pointsOnTableAtom);
	const updateGS = useSetAtom(setGSAtom);
	const handleRound = (team: TeamColor) => () => {
		const winners = `${team}Team` as const;
		// const losers = `${team === 'blue' ? "red" : "blue"}Team` as const
		updateGS({
			[winners]: {
				...gs[winners],
				points: gs[winners].points + (onTable ?? 0) * mul,
			},
		});
	};
	return (
		<div className="flex-col w-full *:w-full *:justify-between *:flex">
			<div className="">
				<button
					className="bg-linear-to-b from-stone-800 to-red-800"
					type="button"
					onClick={() => updateGS({ currentTeam: "red" })}
				>
					SET RED
				</button>
				<button
					className="bg-linear-to-b from-stone-800 to-blue-800"
					type="button"
					onClick={() => updateGS({ currentTeam: "blue" })}
				>
					SET BLUE
				</button>
			</div>
			<div className="*:px-4">
				<p>RED: {gs.redTeam.points}</p>
				<p>BLUE: {gs.blueTeam.points}</p>
			</div>
			<div>
				<button type="button" onClick={handleRound("red")}>
					Runda RED
				</button>
				<select
					value={mul}
					onChange={(e) => setMul(+e.target.value)}
					className="h-12 min-w-12 bg-stone-800"
				>
					<option value={1}>x1</option>
					<option value={2}>x2</option>
					<option value={3}>x3</option>
				</select>
				<button type="button" onClick={handleRound("blue")}>
					Runda BLUE
				</button>
			</div>
		</div>
	);
};

const RoundCtrls = () => {
	const {
		currentRound,
		blueTeam: { points: blue },
		redTeam: { points: red },
	} = useAtomValue(gameStateAtom);
	const updateGS = useSetAtom(setGSAtom);

	const handleRound =
		(next = false) =>
		() => {
			roundAudio.pause();
			roundAudio.currentTime = 0;
			roundAudio.play();
			const nextRndNb = next ? currentRound + 1 : currentRound - 1;
			updateGS({
				currentRound: nextRndNb,
				blueTeam: {
					fails: [false, false, false],
					reboundFail: false,
					points: blue,
				},
				redTeam: {
					fails: [false, false, false],
					reboundFail: false,
					points: red,
				},
			});
		};
	return (
		<div>
			<button onClick={handleRound()} type="button">
				PREV ROUND
			</button>
			<button type="button">RESET</button>
			<button onClick={handleRound(true)} type="button">
				NEXT ROUND
			</button>
		</div>
	);
};

export const Admin = () => {
	const runInterval = useSetAtom(gameStateAtom);
	React.useEffect(() => {
		void runInterval();
	}, [runInterval]);
	const gs = useAtomValue(gameStateAtom);
	return (
		<div
			className={cn(
				"w-full border sm:max-w-sm h-screen space-y-4 p-2",
				"*:flex *:justify-between *:gap-4",
				"[&_button]:px-4 [&_button]:min-w-12 [&_button]:h-12 [&_button]:bg-stone-800",
				"[&_button]:items-center [&_button]:justify-center **:text-center",
				"[&_button]:active:ring-2 **:ring-amber-300",
				"[&_button]:select-none",
			)}
		>
			<div className="grid gap-1">
				<p>Runda: {gs.currentRound}</p>
				<p>{gs.questions.at(gs.currentRound)?.question}</p>
			</div>
			<RoundCtrls />
			<div>
				<ChancesCtrls team="red" />
				<QuestionsCtrls />
				<ChancesCtrls team="blue" />
			</div>
			<TeamControls />
		</div>
	);
};

export default Admin;
