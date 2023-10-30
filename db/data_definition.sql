CREATE TABLE `User` (
  `user_id` INTEGER PRIMARY KEY,
  `name` VARCHAR(50),
  `graduation_school` VARCHAR(50)
);

CREATE TABLE `Category` (
  `category_id` INTEGER PRIMARY KEY,
  `category_name` VARCHAR(50)
);

CREATE TABLE `Company` (
  `company_id` INTEGER PRIMARY KEY,
  `company_name` VARCHAR(50)
);

CREATE TABLE `Position` (
  `position_id` INTEGER PRIMARY KEY,
  `title` VARCHAR(50),
  `company_id` INTEGER,
  `category_id` INTEGER,
  `base_salary` INTEGER,
  `bonus` INTEGER,
  `RSU` INTEGER,
  FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`),
  FOREIGN KEY (`company_id`) REFERENCES `Company`(`company_id`)
);

CREATE TABLE `Application` (
  `application_id` INTEGER PRIMARY KEY,
  `date` Date,
  `user_id` INTEGER,
  `position_id` INTEGER,
  `status` VARCHAR(50),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`position_id`) REFERENCES `Position`(`position_id`)
);

CREATE TABLE `Interview` (
  `interview_id` INTEGER PRIMARY KEY,
  `application_id` INTEGER,
  `type` VARCHAR(50),
  `result` Boolean,
  `stage` VARCHAR(50),
  `date` Date,
  `rating` INTEGER,
  FOREIGN KEY (`application_id`) REFERENCES `Application`(`application_id`)
);

CREATE TABLE `JobUpdate` (
  `update_id` INTEGER PRIMARY KEY,
  `current_position` INTEGER,
  `user_id` INTEGER,
  `update_type` VARCHAR(50),
  `current_job_experience` INTEGER,
  `date` Date,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
CONSTRAINT `check_type` CHECK (`update_type` IN ('Layoff', 'Promotion'))
);

CREATE TABLE `Interest` (
  `user_id` INTEGER,
  `category_id` INTEGER,
PRIMARY KEY(`user_id`, `category_id`),
  FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);

CREATE TABLE `Layoff` (
  `update_id` INTEGER PRIMARY KEY,
  `compensation` INTEGER,
FOREIGN KEY (`update_id`) REFERENCES `JobUpdate`(`update_id`)
);

CREATE TABLE `Promotion` (
  `update_id` INTEGER PRIMARY KEY,
  `new_position` INTEGER,
FOREIGN KEY (`update_id`) REFERENCES `JobUpdate`(`update_id`)
);

CREATE TABLE `Hold` (
  `user_id` INTEGER,
  `position_id` INTEGER,
PRIMARY KEY(`user_id`, `position_id`),
FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
FOREIGN KEY (`position_id`) REFERENCES `Position`(`position_id`)
);
