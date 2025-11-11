import { useQuery } from "@tanstack/react-query";
import type { ReactEventHandler } from "react";
import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Display = () => {
	const [gameId, setGameId] = React.useState("");
	const { data, isLoading, error } = useQuery({
		queryKey: [gameId],
		queryFn: () => {
			return new Promise<boolean>((res) => res(Math.random() > 0.5));
		},
		enabled: gameId.length === 4,
	});
	const navigate = useNavigate();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Wyświetlaj grę</CardTitle>
			</CardHeader>
			<form
				className="contents"
				onSubmit={(e) => {
					e.preventDefault();
					if (!data) return;
					navigate(gameId);
				}}
			>
				<CardContent>
					<Input
						value={gameId}
						onChange={(e) => setGameId(e.target.value)}
						minLength={4}
						maxLength={4}
						required
						autoFocus
					/>
					{(error || data === false) && (
						<p className="text-sm pt-2 text-destructive">
							Podany ID jest nieprawidłowy
						</p>
					)}
				</CardContent>
				<CardFooter>
					<CardAction>
						<Button disabled={!data}>Otwórz</Button>
					</CardAction>
				</CardFooter>
			</form>
		</Card>
	);
};
export default Display;
