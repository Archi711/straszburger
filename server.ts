import { merge } from "remeda";
import {
	emptyGameState,
	type GameState,
	gameStateSchema,
} from "./src/lib/schemas";

const q0 = Bun.file("src/data/q2.json");

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET",
	"Access-Control-Allow-Headers": "Content-Type",
};

let data: GameState = {
	...emptyGameState,
	questions: await q0.json(),
};

const server = Bun.serve({
	port: 6969,
	routes: {
		"/display": (req) => {
			return Response.json(data, { headers: { ...CORS_HEADERS } });
		},
		"/edit": {
			OPTIONS: new Response(null, { headers: { ...CORS_HEADERS } }),
			POST: async (req) => {
				const unpData = await req.json();
				const newData = gameStateSchema.parse(unpData); // ZOD PARSE
				data = merge(data, newData);
				return new Response(null, {
					status: 201,
					headers: { ...CORS_HEADERS },
				});
			},
		},
	},
	development: true,
});
console.log("Server running on ", server.port);
