import { cn } from "../lib/utils";
import { RoundScore } from "./RoundScore";

export const Screen = () => {
	return (
		<div
			style={{
				backgroundImage:
					"linear-gradient(to right, var(--color-red-600), var(--color-red-500) 40%, var(--color-blue-500) 60%, var(--color-blue-600))",
			}}
			className="gap-8 flex-col flex bg-linear-to-r min-h-screen relative"
		>
			<header className="flex flex-2 items-center justify-center h-36">
				<RoundScore />
			</header>
			<div
				className={cn(
					"grid gap-4 flex-1 grid-cols-[1fr_4fr_1fr] place-items-center",
					"",
				)}
			>
				<RoundScore />
				<div className="w-full flex bg-stone-300 p-16 rounded-[64px]">
					<div className="flex flex-1 w-full bg-background">
						<div className="relative w-24 text-[calc(320px/3)] text-center items-center justify-start flex flex-col-reverse leading-none">
							<p>X</p>
							<p>X</p>
							<p>X</p>
						</div>
						<div
							className={cn(
								"grid flex-1 gap-2 *:h-8 *:leading-none *:text-2xl",
							)}
						>
							<div></div>
							<div> 01 ZUPA 34</div>
							<div> 01 ZUPA 34</div>
							<div> 01 ZUPA 34</div>
							<div> 01 ZUPA 34</div>
							<div> 01 ZUPA 34</div>
							<div> 01 ZUPA 34</div>
							<div></div>
							<div> SUMA 134</div>
							<div></div>
						</div>
						<div className="relative w-24 text-[calc(320px/3)] text-center items-center justify-start flex flex-col-reverse leading-none">
							<p>X</p>
							<p>X</p>
							<p>X</p>
						</div>
					</div>
				</div>
				<RoundScore />
			</div>
			<footer className="flex-2"></footer>
		</div>
	);
};

export default Screen;
