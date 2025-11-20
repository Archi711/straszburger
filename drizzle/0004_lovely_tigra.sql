PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_games_table` (
	`id` text(4) PRIMARY KEY NOT NULL,
	`pass` text NOT NULL,
	`questions` text,
	`gameState` text DEFAULT '{"currentFails":0,"currentRound":0,"currentTeam":"none","reboundFailed":false}'
);
--> statement-breakpoint
INSERT INTO `__new_games_table`("id", "pass", "questions", "gameState") SELECT "id", "pass", "questions", "gameState" FROM `games_table`;--> statement-breakpoint
DROP TABLE `games_table`;--> statement-breakpoint
ALTER TABLE `__new_games_table` RENAME TO `games_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;