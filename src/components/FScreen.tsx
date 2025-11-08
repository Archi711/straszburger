import { cn } from "@/lib/utils";

type FScreenProps = {};

const fScreenConfig = {
	wordSpace: 17,
	errors: 4,
	numbers: 2,
	width: 29,
	height: 10,
};

type FRowProps = {
	rowIdx: number;
};

const FRow = (props: FRowProps) => {
	const { rowIdx } = props;
	return (
		<div className={cn("flex gap-0.5")}>
			<div className="contents" data-left-errors>
				{Array.from({ length: fScreenConfig.errors }).map((_, i) => (
					<span key={`r-${rowIdx}-left-errors-${i + 1}`}>e</span>
				))}
			</div>
			<div className="contents" data-left-numbers>
				{Array.from({ length: fScreenConfig.numbers }).map((_, i) => (
					<span key={`r-${rowIdx}-left-numbers-${i + 1}`}></span>
				))}
			</div>
			<div className="contents" data-wordspace>
				{Array.from({ length: fScreenConfig.wordSpace }).map((_, i) => (
					<span key={`r-${rowIdx}-wordSpace-${i + 1}`}></span>
				))}
			</div>
			<div className="contents" data-right-numbers>
				{Array.from({ length: fScreenConfig.numbers }).map((_, i) => (
					<span key={`r-${rowIdx}-right-numbers-${i + 1}`}></span>
				))}
			</div>
			<div className="contents" data-right-errors>
				{Array.from({ length: fScreenConfig.errors }).map((_, i) => (
					<span key={`r-${rowIdx}-right-errors-${i + 1}`}></span>
				))}
			</div>
		</div>
	);
};

export const FScreen = (props: FScreenProps) => {
	return (
		<div className="flex flex-col  gap-0.5">
			{Array.from({ length: fScreenConfig.height }).map((_, i) => (
				<FRow key={`f-screen-r-${i + 1}`} rowIdx={i} />
			))}
		</div>
	);
};
