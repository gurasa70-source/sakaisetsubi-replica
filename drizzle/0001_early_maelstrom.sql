CREATE TABLE `works` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` varchar(64) NOT NULL,
	`date` varchar(64) NOT NULL,
	`workContent` text NOT NULL,
	`requestContent` text NOT NULL,
	`cause` text NOT NULL,
	`method` text NOT NULL,
	`comment` text NOT NULL,
	`imageUrl` text,
	`beforeImageUrl` text,
	`afterImageUrl` text,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `works_id` PRIMARY KEY(`id`)
);
