-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: fashion-infinity
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL DEFAULT '0',
  `Password` varchar(100) NOT NULL DEFAULT '0',
  `AccountType` tinyint NOT NULL DEFAULT (0),
  `Email` varchar(100) NOT NULL DEFAULT '0',
  `otp` varchar(4) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `id_Account` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `FK_card_account` (`id_Account`),
  CONSTRAINT `FK_card_account` FOREIGN KEY (`id_Account`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_product` (
  `id_product` int NOT NULL,
  `id_category` int NOT NULL,
  `size` int NOT NULL,
  `Color` varchar(100) NOT NULL DEFAULT '',
  KEY `FK_cp_category` (`id_category`),
  KEY `FK_cp_product` (`id_product`),
  CONSTRAINT `FK_cp_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`ID`),
  CONSTRAINT `FK_cp_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_product`
--

LOCK TABLES `category_product` WRITE;
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailcard`
--

DROP TABLE IF EXISTS `detailcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailcard` (
  `id_card` int NOT NULL,
  `id_product` int NOT NULL,
  `Quantity` int NOT NULL,
  KEY `FK_dc_card` (`id_card`),
  KEY `FK_dc_product` (`id_product`),
  CONSTRAINT `FK_dc_card` FOREIGN KEY (`id_card`) REFERENCES `card` (`ID`),
  CONSTRAINT `FK_dc_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailcard`
--

LOCK TABLES `detailcard` WRITE;
/*!40000 ALTER TABLE `detailcard` DISABLE KEYS */;
/*!40000 ALTER TABLE `detailcard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailorder`
--

DROP TABLE IF EXISTS `detailorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailorder` (
  `id_order` int NOT NULL,
  `id_product` int NOT NULL,
  `Quantity` int NOT NULL,
  KEY `FK_do_order` (`id_order`),
  KEY `FK_do_product` (`id_product`),
  CONSTRAINT `FK_do_order` FOREIGN KEY (`id_order`) REFERENCES `order` (`ID`),
  CONSTRAINT `FK_do_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailorder`
--

LOCK TABLES `detailorder` WRITE;
/*!40000 ALTER TABLE `detailorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `detailorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Start_Order` datetime NOT NULL,
  `End_Order` datetime NOT NULL,
  `status` int NOT NULL DEFAULT (0),
  `id_Account` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`ID`),
  KEY `FK_order_account` (`id_Account`),
  CONSTRAINT `FK_order_account` FOREIGN KEY (`id_Account`) REFERENCES `account` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_account`
--

DROP TABLE IF EXISTS `payment_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_account` (
  `id_Account` int NOT NULL,
  `id_Payment` int NOT NULL,
  `NumberCard` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CSV` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `EXP_date` date NOT NULL,
  `status` int NOT NULL,
  KEY `FK_pa_account` (`id_Account`),
  KEY `FK_pa_payment` (`id_Payment`),
  CONSTRAINT `FK_pa_account` FOREIGN KEY (`id_Account`) REFERENCES `account` (`ID`),
  CONSTRAINT `FK_pa_payment` FOREIGN KEY (`id_Payment`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_account`
--

LOCK TABLES `payment_account` WRITE;
/*!40000 ALTER TABLE `payment_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_order`
--

DROP TABLE IF EXISTS `payment_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_order` (
  `id_Payment` int NOT NULL,
  `id_order` int NOT NULL,
  `status` int NOT NULL,
  KEY `FK_po_payment` (`id_Payment`),
  KEY `FK_po_order` (`id_order`),
  CONSTRAINT `FK_po_order` FOREIGN KEY (`id_order`) REFERENCES `order` (`ID`),
  CONSTRAINT `FK_po_payment` FOREIGN KEY (`id_Payment`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_order`
--

LOCK TABLES `payment_order` WRITE;
/*!40000 ALTER TABLE `payment_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `ID` int NOT NULL,
  `link` varchar(50) NOT NULL DEFAULT '',
  `status` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `id_picture` int NOT NULL,
  `content` text NOT NULL,
  `delete_At` date NOT NULL,
  `id_provider` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`ID`),
  KEY `FK_product_provider` (`id_provider`),
  KEY `FK_product_picture` (`id_picture`),
  CONSTRAINT `FK_product_picture` FOREIGN KEY (`id_picture`) REFERENCES `picture` (`ID`),
  CONSTRAINT `FK_product_provider` FOREIGN KEY (`id_provider`) REFERENCES `provider` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider` (
  `ID` int NOT NULL,
  `Name` varchar(100) NOT NULL DEFAULT '',
  `Address` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-21 12:33:53
