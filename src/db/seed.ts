import { db } from "@/db";
import { gamesTable } from "@/db/schema";

await db.insert(gamesTable).values({});

console.log("Seeded!");
