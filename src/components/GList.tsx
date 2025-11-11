"use client";
import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/orpc/client";

export const GList = () => {
	const query = useQuery(orpc.game.getAll.queryOptions({}));
	return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
};
