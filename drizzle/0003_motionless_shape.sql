PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_games_table` (
	`id` text(4) PRIMARY KEY DEFAULT '2OXI' NOT NULL,
	`pass` text NOT NULL,
	`players` text,
	`questions` text
);
--> statement-breakpoint
INSERT INTO `__new_games_table`("id", "pass", "players", "questions") SELECT "id", "pass", "players", "questions" FROM `games_table`;--> statement-breakpoint
DROP TABLE `games_table`;--> statement-breakpoint
ALTER TABLE `__new_games_table` RENAME TO `games_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;