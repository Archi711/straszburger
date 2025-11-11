import { Link, Outlet } from "react-router";

export function Layout() {
	return (
		<div className="min-h-screen flex flex-col gap-4">
			<header className="flex items-center justify-between px-rws py-4 border-b">
				<Link to="/" className="text-5xl flex gap-0.5">
					<span className="sr-only">Familiada</span>
					{"Familiada".split("").map((l, i) => (
						<span key={`f-${l}-${i + 2}`} className="uppercase bg-stone-800">
							{l}
						</span>
					))}
				</Link>
			</header>
			<div className="flex-1 grid place-items-center-safe **:data-[slot='card']:max-w-lg **:data-[slot='card']:w-full">
				<Outlet />
			</div>
		</div>
	);
}
