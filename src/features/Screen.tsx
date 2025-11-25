import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { loadable } from "jotai/utils";
import React, { useMemo } from "react";
import * as R from "remeda";
import { cn } from "../lib/utils";

import {
	currentRoundAtom,
	currentTeamAtom,
	gameStateAtom,
	getTeamFailsAtom,
	pointsOnTableAtom,
	type TeamColor,
} from "./state";

const ChancesPanel = ({ team }: { team: TeamColor }) => {
	const currentTeam = useAtomValue(currentTeamAtom);
	const teamAtom = useMemo(() => getTeamFailsAtom(team), [team]);
	const teamFails = useAtomValue(teamAtom);
	if (!teamFails) return <div></div>;
	return (
		<div className="relative w-[84px] text-[84px] text-center items-center justify-start flex flex-col-reverse leading-none">
			{currentTeam === team ? (
				teamFails?.fails
					.reverse()
					.map((f, i) => <p key={`${team}-chance-${i + 1}`}>{f && "X"}</p>)
			) : (
				<p className="scale-y-366 pb-3 origin-bottom">
					{teamFails.reboundFail && "X"}
				</p>
			)}
		</div>
	);
};

const RoundScore = ({ value }: { value: number }) => {
	return (
		<div className="text-6xl p-1 *:pl-1.5 gap-1 *:bg-stone-800 bg-background flex items-center w-fit">
			{R.pipe(value, (n) => (n ?? 0).toString().padStart(3, "0"))
				.split("")
				.map((point, i) => (
					<p key={`round-score-${value}-${point}-${i + 3}`}>{point}</p>
				))}
		</div>
	);
};

export const Screen = () => {
	const [value] = useAtom(currentRoundAtom);
	const gs = useAtomValue(gameStateAtom);
	const onTable = useAtomValue(pointsOnTableAtom);
	const runInterval = useSetAtom(gameStateAtom);
	React.useEffect(() => {
		void runInterval();
	}, [runInterval]);
	return (
		<div
			style={{
				backgroundImage:
					"linear-gradient(to right, var(--color-red-600), var(--color-red-500) 40%, var(--color-blue-500) 60%, var(--color-blue-600))",
			}}
			className="gap-8 px-8 flex-col flex bg-linear-to-r min-h-screen relative"
		>
			<header className="flex flex-2 items-center justify-center">
				<RoundScore value={onTable ?? 0} />
			</header>
			<div
				className={cn(
					"grid gap-8 flex-1 **:uppercase grid-cols-[min-content_1fr_min-content] place-items-center",
					"",
				)}
			>
				<RoundScore value={gs.redTeam.points} />
				<div className="flex w-full px-12 py-16 border-4 border-stone-400 mx-auto items-center justify-center *:max-w-[calc(30*22px)] bg-stone-300 rounded-full">
					<div className="flex flex-1 w-[610px] bg-background">
						<ChancesPanel team="red" />
						<div
							className={cn(
								"grid w-full *:h-10 *:leading-none *:text-4xl",
								"*:flex *:whitespace-pre",
							)}
						>
							<div></div>
							{Array.from({ length: 6 }).map((_, i) => {
								const entry = value?.answers.find(
									({ index }) => index === i + 1,
								);

								return (
									<div key={`answer-${i + 1}`}>
										{entry && (
											<>
												<p> </p>
												<p>{entry?.index.toString().padStart(2, "0")}</p>
												<p> </p>
												{entry?.isShown ? (
													<>
														<p>{entry?.isShown && entry?.answer}</p>
														<p className="flex-1"></p>
													</>
												) : (
													<p className="flex-1">…………………………………………</p>
												)}
												<p>{entry?.isShown && entry?.value}</p>
												<p> </p>
											</>
										)}
									</div>
								);
							})}
							<div></div>
							<div className="flex-row-reverse">
								<p> </p>
								<p>{onTable?.toString().padStart(3, " ")}</p>
								<p>SUMA </p>
							</div>
							<div></div>
						</div>
						<ChancesPanel team="blue" />
					</div>
				</div>
				<RoundScore value={gs.blueTeam.points} />
			</div>
			<footer className="flex-2"></footer>
		</div>
	);
};

export default Screen;
