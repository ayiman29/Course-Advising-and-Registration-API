-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: university5
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `advisor`
--

DROP TABLE IF EXISTS `advisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advisor` (
  `advisor_id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`advisor_id`,`email`),
  KEY `fk_advisor_user` (`email`),
  CONSTRAINT `fk_advisor_user` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advisor`
--

LOCK TABLES `advisor` WRITE;
/*!40000 ALTER TABLE `advisor` DISABLE KEYS */;
INSERT INTO `advisor` VALUES (10000501,'forhad.emin.khan@bracu.ac.bd'),(10000503,'mahmud.nayeem.sifat@bracu.ac.bd'),(10000502,'rafid.nazmul.faisal@bracu.ac.bd'),(10000504,'tanjim.pial.hasan@bracu.ac.bd'),(10000505,'zahid.ahmed.rahman@bracu.ac.bd');
/*!40000 ALTER TABLE `advisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `exam_schedule` datetime DEFAULT NULL,
  `course_credit` int DEFAULT NULL,
  `registrar_id` int NOT NULL,
  `registrar_email` varchar(100) NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `fk_course_registrar` (`registrar_id`,`registrar_email`),
  CONSTRAINT `fk_course_registrar` FOREIGN KEY (`registrar_id`, `registrar_email`) REFERENCES `registrar` (`registrar_id`, `email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (101,'CSE101','Introduction to Computer Science','2025-12-10 06:07:00',3,10012134,'shakib.ahmed@bracu.ac.bd'),(102,'MAT204','Linear Algebra','2025-12-12 13:00:00',3,10012134,'shakib.ahmed@bracu.ac.bd'),(103,'CSE220','Data Structures and Algorithms','2025-12-14 09:00:00',3,10012134,'shakib.ahmed@bracu.ac.bd'),(104,'EEE110','Basic Electrical Engineering','2025-12-14 06:00:00',3,10012134,'shakib.ahmed@bracu.ac.bd'),(105,'ENG101','English Composition','2025-12-16 15:00:00',3,10012134,'shakib.ahmed@bracu.ac.bd'),(106,'PHY101','General Physics I','2025-12-18 09:00:00',3,10012134,'shakib.ahmed@bracu.ac.bd'),(107,'CSE310','Operating Systems','2025-12-20 10:00:00',3,10012134,'shakib.ahmed@bracu.ac.bd'),(108,'CSE320','Data Communication','2025-12-22 09:00:00',3,10012134,'shakib.ahmed@bracu.ac.bd');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manages`
--

DROP TABLE IF EXISTS `manages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manages` (
  `course_id` int NOT NULL,
  `section_id` int NOT NULL,
  `student_id` int NOT NULL,
  `advisor_id` int NOT NULL,
  PRIMARY KEY (`course_id`,`section_id`,`student_id`,`advisor_id`),
  KEY `fk_manages_student` (`student_id`),
  KEY `fk_manages_advisor` (`advisor_id`),
  CONSTRAINT `fk_manages_advisor` FOREIGN KEY (`advisor_id`) REFERENCES `advisor` (`advisor_id`),
  CONSTRAINT `fk_manages_section` FOREIGN KEY (`course_id`, `section_id`) REFERENCES `section` (`course_id`, `section_id`),
  CONSTRAINT `fk_manages_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manages`
--

LOCK TABLES `manages` WRITE;
/*!40000 ALTER TABLE `manages` DISABLE KEYS */;
INSERT INTO `manages` VALUES (101,1,23301211,10000503),(102,1,23301211,10000503),(107,1,23301211,10000503),(101,1,23341038,10000505);
/*!40000 ALTER TABLE `manages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrar`
--

DROP TABLE IF EXISTS `registrar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrar` (
  `registrar_id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`registrar_id`,`email`),
  KEY `fk_registrar_user` (`email`),
  CONSTRAINT `fk_registrar_user` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrar`
--

LOCK TABLES `registrar` WRITE;
/*!40000 ALTER TABLE `registrar` DISABLE KEYS */;
INSERT INTO `registrar` VALUES (10012134,'shakib.ahmed@bracu.ac.bd');
/*!40000 ALTER TABLE `registrar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `course_id` int NOT NULL,
  `section_id` int NOT NULL,
  `schedule` varchar(100) DEFAULT NULL,
  `faculty` varchar(100) DEFAULT NULL,
  `seat_availability` int DEFAULT '40',
  PRIMARY KEY (`course_id`,`section_id`),
  CONSTRAINT `fk_section_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (101,1,'Mon 9-11am','Dr. Rahman',38),(101,2,'Wed 2-4pm','Prof. Karim',40),(101,3,'Mon 9-11am','MrBeast',40),(101,4,'Fri 4-6pm','Dr. Latif',40),(102,1,'Tue 10-12am','Dr. Sultana',39),(102,2,'Thu 3-5pm','Dr. Hasan',40),(102,3,'Fri 2-4pm','Berg',40),(103,1,'Mon 1-3pm','Prof. Akter',40),(103,2,'Fri 9-11am','Dr. Ahmed',40),(104,1,'Tue 9-11am','Dr. Chowdhury',40),(104,2,'Thu 10-12am','Prof. Nahar',40),(105,1,'Wed 1-3pm','Dr. Islam',40),(105,2,'Fri 2-4pm','Prof. Hasan',40),(106,1,'Wed 11-1pm','Dr. Newton',40),(106,2,'Thu 1-3pm','Dr. Faraday',40),(107,1,'Tue 3-5pm','Dr. Khan',39),(107,3,'Tue 3-5pm','Dr. Khan',40);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `credit` int DEFAULT '0',
  `status` enum('waiting','approved','denied') DEFAULT NULL,
  PRIMARY KEY (`student_id`,`email`),
  KEY `fk_student_user` (`email`),
  CONSTRAINT `fk_student_user` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (23301001,'aminul.islam@g.bracu.ac.bd',15,NULL),(23301002,'fatima.noor@g.bracu.ac.bd',3,NULL),(23301003,'rahim.uddin@g.bracu.ac.bd',9,NULL),(23301004,'nusrat.jahan@g.bracu.ac.bd',12,NULL),(23301005,'tariq.hasan@g.bracu.ac.bd',15,NULL),(23301006,'mohammed.islam@g.bracu.ac.bd',9,NULL),(23301211,'raiyan.zakir.ayiman@g.bracu.ac.bd',60,'approved'),(23341038,'muntaha.fatema.tahiat@g.bracu.ac.bd',60,'approved');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('aminul.islam@g.bracu.ac.bd','Aminul Islam','pass1234'),('fatima.noor@g.bracu.ac.bd','Fatima Noor','password567'),('forhad.emin.khan@bracu.ac.bd','Forhad Emin Khan','password1'),('mahmud.nayeem.sifat@bracu.ac.bd','Mahmud Nayeem Sifat','password3'),('mohammed.islam@g.bracu.ac.bd','Mohammed Islam','ij*RJUiAJ09jrf'),('muntaha.fatema.tahiat@g.bracu.ac.bd','Muntaha Fatema Tahiat','tahiandherlazypasswords;('),('nusrat.jahan@g.bracu.ac.bd','Nusrat Jahan','nusrat789'),('rafid.nazmul.faisal@bracu.ac.bd','Rafid Nazmul Faisal','password2'),('rahim.uddin@g.bracu.ac.bd','Rahim Uddin','rahim2025'),('raiyan.zakir.ayiman@g.bracu.ac.bd','Raiyan Zakir Ayiman','superhardpasswordnoonecancrack'),('shakib.ahmed@bracu.ac.bd','Md. Shakib Ahmed','password123'),('tanjim.pial.hasan@bracu.ac.bd','Tanjim Pial Hasan','password4'),('tariq.hasan@g.bracu.ac.bd','Tariq Hasan','tariq321'),('zahid.ahmed.rahman@bracu.ac.bd','Zahid Ahmed Rahman','password5');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-23 20:08:00
