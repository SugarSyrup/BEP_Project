CREATE DATABASE IF NOT EXISTS BEP_project;

USE BEP_project;

CREATE TABLE `asks` (
  `ask_id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `recommendation` int DEFAULT '0',
  `writer_name` varchar(15) NOT NULL,
  `password` int NOT NULL,
  `content` varchar(1500) NOT NULL,
  PRIMARY KEY (`ask_id`),
  KEY `fk_asks_type_id_idx` (`type_id`),
  CONSTRAINT `fk_asks_type_id` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `policy` (
  `policy_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `type_id` int NOT NULL,
  `introduction` varchar(500) NOT NULL,
  `organizer` varchar(45) DEFAULT NULL,
  `management` varchar(45) DEFAULT NULL,
  `target_min` varchar(5) DEFAULT NULL,
  `target_max` varchar(5) DEFAULT NULL,
  `target_restriction` varchar(650) DEFAULT NULL,
  `target_education` varchar(20) DEFAULT NULL,
  `target_employment` varchar(30) DEFAULT NULL,
  `support_size` varchar(60) DEFAULT NULL,
  `support_info` varchar(400) DEFAULT NULL,
  `support_detail` varchar(400) DEFAULT NULL,
  `link` varchar(350) DEFAULT NULL,
  PRIMARY KEY (`policy_id`),
  KEY `type_id_idx` (`type_id`),
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=512 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `policy_comment` (
  `policy_comment_id` int NOT NULL AUTO_INCREMENT,
  `policy_id` int NOT NULL,
  `writer_name` varchar(45) NOT NULL,
  `password` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `recommendation` int DEFAULT '0',
  PRIMARY KEY (`policy_comment_id`),
  KEY `policy_id_idx` (`policy_id`),
  CONSTRAINT `fk_policy_comment_policy_id` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`policy_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;