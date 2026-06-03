CREATE TABLE `designProjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`building` varchar(255) NOT NULL,
	`businessContent` text NOT NULL,
	`scope` text NOT NULL,
	`description` text NOT NULL,
	`imageUrl` text,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `designProjects_id` PRIMARY KEY(`id`)
);
