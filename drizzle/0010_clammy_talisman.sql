CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(64),
	`message` text NOT NULL,
	`sourcePath` varchar(512) NOT NULL DEFAULT '/',
	`status` enum('new','reviewing','completed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
