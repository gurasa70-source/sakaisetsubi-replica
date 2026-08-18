CREATE TABLE `analyticsEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(128) NOT NULL,
	`path` varchar(512) NOT NULL,
	`referrer` text,
	`searchQuery` varchar(255),
	`device` varchar(64) NOT NULL DEFAULT 'Desktop',
	`userAgent` text,
	`durationSeconds` int NOT NULL DEFAULT 0,
	`isBounce` int NOT NULL DEFAULT 1,
	`userName` varchar(128),
	`userEmail` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analyticsEvents_id` PRIMARY KEY(`id`)
);
