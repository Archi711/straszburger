import type React from "react";

type LayoutProps = React.PropsWithChildren;
export function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen text-amber-300 font-doto">
			<h1 className=" text-5xl flex gap-0.5">
				<span className="sr-only">Familiada</span>
				{"Familiada".split("").map((l, i) => (
					<span key={`f-${l}-${i + 2}`} className="uppercase bg-stone-800">
						{l}
					</span>
				))}
			</h1>
			{children}
		</div>
	);
}
