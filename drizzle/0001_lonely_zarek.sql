PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_games_table` (
	`id` text(4) PRIMARY KEY DEFAULT '01tr' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_games_table`("id") SELECT "id" FROM `games_table`;--> statement-breakpoint
DROP TABLE `games_table`;--> statement-breakpoint
ALTER TABLE `__new_games_table` RENAME TO `games_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;