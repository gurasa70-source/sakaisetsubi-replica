ALTER TABLE `analyticsEvents` ADD `eventType` varchar(64) DEFAULT 'page_view' NOT NULL;--> statement-breakpoint
ALTER TABLE `analyticsEvents` ADD `eventLabel` varchar(255);