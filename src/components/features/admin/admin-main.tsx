import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { orpc } from "@/orpc/client";

export default function AdminMain() {
	const { gameId } = useParams();
	const { data, isLoading, isError } = useQuery(
		orpc.game.checkCurrent.queryOptions({
			input: gameId as string, // we have a check below, look!,
			enabled: !!gameId,
		}),
	);

	return <div>Gra {gameId}</div>;
}
