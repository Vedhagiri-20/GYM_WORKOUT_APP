-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: localhost    Database: gym_workout_app
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `muscle_group` varchar(100) DEFAULT NULL,
  `difficulty` enum('beginner','intermediate','advanced') DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,'Push-Up','Chest','beginner','Bodyweight chest exercise'),(2,'Squat','Legs','beginner','Leg strength exercise'),(3,'Deadlift','Back','advanced','Compound lift'),(4,'Bicep Curl','Arms','intermediate','Targets biceps'),(5,'Plank','Core','beginner','Core stability exercise');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress_logs`
--

DROP TABLE IF EXISTS `progress_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `date` date NOT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `progress_logs_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress_logs`
--

LOCK TABLES `progress_logs` WRITE;
/*!40000 ALTER TABLE `progress_logs` DISABLE KEYS */;
INSERT INTO `progress_logs` VALUES (1,1,'2025-01-10',72.50,'Feeling good'),(2,1,'2025-01-15',72.00,'More energy'),(3,2,'2025-01-11',85.00,'Starting program'),(4,2,'2025-01-18',84.30,'Progressing'),(5,1,'2025-01-20',71.80,'Improved strength');
/*!40000 ALTER TABLE `progress_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `trainer_id` int NOT NULL,
  `session_date` date NOT NULL,
  `session_time` time NOT NULL,
  `status` enum('scheduled','completed','cancelled') DEFAULT 'scheduled',
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `trainer_id` (`trainer_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,1,3,'2025-01-21','10:00:00','scheduled'),(2,2,3,'2025-01-22','11:00:00','completed'),(3,1,4,'2025-01-23','09:00:00','scheduled'),(4,2,4,'2025-01-24','14:00:00','cancelled'),(5,1,3,'2025-01-25','16:00:00','scheduled');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer_client_map`
--

DROP TABLE IF EXISTS `trainer_client_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer_client_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainer_id` int NOT NULL,
  `client_id` int NOT NULL,
  `assigned_date` date DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `trainer_id` (`trainer_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `trainer_client_map_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `trainer_client_map_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer_client_map`
--

LOCK TABLES `trainer_client_map` WRITE;
/*!40000 ALTER TABLE `trainer_client_map` DISABLE KEYS */;
INSERT INTO `trainer_client_map` VALUES (1,3,1,'2025-12-05'),(2,3,2,'2025-12-05'),(3,4,1,'2025-12-05'),(4,4,2,'2025-12-05'),(5,3,1,'2025-12-05');
/*!40000 ALTER TABLE `trainer_client_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('client','trainer','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alex Johnson','alex.client@example.com','client123','client'),(2,'Maria Stevens','maria.client@example.com','client123','client'),(3,'John Carter','john.trainer@example.com','trainer123','trainer'),(4,'Sophie Williams','sophie.trainer@example.com','trainer123','trainer'),(5,'Admin User','admin@gymapp.com','admin123','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_plans`
--

DROP TABLE IF EXISTS `workout_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `trainer_id` int NOT NULL,
  `plan_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `trainer_id` (`trainer_id`),
  CONSTRAINT `workout_plans_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  CONSTRAINT `workout_plans_ibfk_2` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_plans`
--

LOCK TABLES `workout_plans` WRITE;
/*!40000 ALTER TABLE `workout_plans` DISABLE KEYS */;
INSERT INTO `workout_plans` VALUES (1,1,3,'Beginner Strength','2025-12-05 22:39:40'),(2,2,3,'Fat Loss Program','2025-12-05 22:39:40'),(3,1,4,'Upper Body Routine','2025-12-05 22:39:40'),(4,2,4,'Core Strength','2025-12-05 22:39:40'),(5,1,3,'Full Body Circuit','2025-12-05 22:39:40');
/*!40000 ALTER TABLE `workout_plans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 19:15:57
