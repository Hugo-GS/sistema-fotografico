-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sisventafoto
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bonodescuento`
--

DROP TABLE IF EXISTS `bonodescuento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bonodescuento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_detalleventa_venta` int(11) NOT NULL,
  `id_detalleventa_impresion` int(11) NOT NULL,
  `id_conceptodescuento` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_detalleventa_impresion` (`id_detalleventa_impresion`),
  KEY `id_conceptodescuento` (`id_conceptodescuento`),
  CONSTRAINT `bonodescuento_ibfk_1` FOREIGN KEY (`id_detalleventa_impresion`) REFERENCES `detalleventa` (`id_impresion`),
  CONSTRAINT `bonodescuento_ibfk_2` FOREIGN KEY (`id_detalleventa_impresion`) REFERENCES `detalleventa` (`id_venta`),
  CONSTRAINT `bonodescuento_ibfk_3` FOREIGN KEY (`id_conceptodescuento`) REFERENCES `conceptobonodescuento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bonodescuento`
--

LOCK TABLES `bonodescuento` WRITE;
/*!40000 ALTER TABLE `bonodescuento` DISABLE KEYS */;
/*!40000 ALTER TABLE `bonodescuento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES
(1),
(2),
(3),
(4),
(5);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conceptobonodescuento`
--

DROP TABLE IF EXISTS `conceptobonodescuento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conceptobonodescuento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `concepto` varchar(50) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conceptobonodescuento`
--

LOCK TABLES `conceptobonodescuento` WRITE;
/*!40000 ALTER TABLE `conceptobonodescuento` DISABLE KEYS */;
INSERT INTO `conceptobonodescuento` VALUES
(1,'Descuento Antiguedad Enmarcado',20.00);
/*!40000 ALTER TABLE `conceptobonodescuento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conceptoservicio`
--

DROP TABLE IF EXISTS `conceptoservicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conceptoservicio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `concepto` varchar(50) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conceptoservicio`
--

LOCK TABLES `conceptoservicio` WRITE;
/*!40000 ALTER TABLE `conceptoservicio` DISABLE KEYS */;
INSERT INTO `conceptoservicio` VALUES
(1,'Servicio Enmarcado',20.00),
(2,'Servicio de Marqueteria',50.00);
/*!40000 ALTER TABLE `conceptoservicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleventa`
--

DROP TABLE IF EXISTS `detalleventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalleventa` (
  `id_venta` int(11) NOT NULL,
  `id_impresion` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_foto` int(11) NOT NULL,
  PRIMARY KEY (`id_venta`,`id_impresion`),
  KEY `id_impresion` (`id_impresion`),
  KEY `id_foto` (`id_foto`),
  CONSTRAINT `detalleventa_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`),
  CONSTRAINT `detalleventa_ibfk_2` FOREIGN KEY (`id_impresion`) REFERENCES `impresion` (`id`),
  CONSTRAINT `detalleventa_ibfk_3` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleventa`
--

LOCK TABLES `detalleventa` WRITE;
/*!40000 ALTER TABLE `detalleventa` DISABLE KEYS */;
INSERT INTO `detalleventa` VALUES
(2,1,1,10.00,1),
(3,2,2,20.00,2),
(4,3,3,30.00,3),
(5,4,4,40.00,4),
(6,5,5,50.00,5);
/*!40000 ALTER TABLE `detalleventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encargado`
--

DROP TABLE IF EXISTS `encargado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encargado` (
  `id` int(11) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `encargado_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encargado`
--

LOCK TABLES `encargado` WRITE;
/*!40000 ALTER TABLE `encargado` DISABLE KEYS */;
INSERT INTO `encargado` VALUES
(6,'1111111111'),
(7,'3333333333'),
(8,'5555555555'),
(9,'2222222222'),
(10,'4444444444'),
(11,'6666666666');
/*!40000 ALTER TABLE `encargado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encargadosucursal`
--

DROP TABLE IF EXISTS `encargadosucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encargadosucursal` (
  `id_sucursal` int(11) NOT NULL,
  `id_encargado` int(11) NOT NULL,
  `estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_sucursal`,`id_encargado`),
  KEY `id_encargado` (`id_encargado`),
  CONSTRAINT `encargadosucursal_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id`),
  CONSTRAINT `encargadosucursal_ibfk_2` FOREIGN KEY (`id_encargado`) REFERENCES `encargado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encargadosucursal`
--

LOCK TABLES `encargadosucursal` WRITE;
/*!40000 ALTER TABLE `encargadosucursal` DISABLE KEYS */;
INSERT INTO `encargadosucursal` VALUES
(1,6,'A'),
(1,7,'A'),
(1,8,'A'),
(2,9,'A'),
(2,10,'A'),
(3,11,'A');
/*!40000 ALTER TABLE `encargadosucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregatrabajo`
--

DROP TABLE IF EXISTS `entregatrabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entregatrabajo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(1) NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `id_venta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_venta` (`id_venta`),
  CONSTRAINT `entregatrabajo_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregatrabajo`
--

LOCK TABLES `entregatrabajo` WRITE;
/*!40000 ALTER TABLE `entregatrabajo` DISABLE KEYS */;
INSERT INTO `entregatrabajo` VALUES
(2,'A','2023-08-02 15:00:00',2),
(3,'A','2023-09-02 16:00:00',3),
(4,'A','2023-10-02 17:00:00',4),
(5,'A','2023-11-02 18:00:00',5),
(6,'A','2023-12-02 19:00:00',6);
/*!40000 ALTER TABLE `entregatrabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotos`
--

DROP TABLE IF EXISTS `fotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fotos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagen_bin` blob DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_hr` datetime DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `fotos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotos`
--

LOCK TABLES `fotos` WRITE;
/*!40000 ALTER TABLE `fotos` DISABLE KEYS */;
INSERT INTO `fotos` VALUES
(1,NULL,'Foto de paisaje montañoso','2023-02-01 09:00:00','A',1),
(2,NULL,'Foto de retrato familiar','2023-03-01 10:00:00','A',2),
(3,NULL,'Foto de evento corporativo','2023-04-01 11:00:00','A',3),
(4,NULL,'Foto de producto artesanal','2023-05-01 12:00:00','A',4),
(5,NULL,'Foto de boda en playa','2023-06-01 13:00:00','A',5);
/*!40000 ALTER TABLE `fotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impresion`
--

DROP TABLE IF EXISTS `impresion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `impresion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  `descripciondetalleproducto` varchar(50) NOT NULL,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impresion`
--

LOCK TABLES `impresion` WRITE;
/*!40000 ALTER TABLE `impresion` DISABLE KEYS */;
INSERT INTO `impresion` VALUES
(1,'Impresión A','Hoja pequeña 20x27 cm','A'),
(2,'Impresión B','Hoja pequeña 18x26 cm','A'),
(3,'Impresión C','Hoja pequeña 13x20 cm','A'),
(4,'Impresión D','Hoja pequeña 11x17 cm','A'),
(5,'Impresión E','Hoja pequeña 9x13 cm','A');
/*!40000 ALTER TABLE `impresion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(12) DEFAULT NULL,
  `apellido_paterno` varchar(12) DEFAULT NULL,
  `apellido_materno` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES
(1,'Juan','Pérez','Gómez'),
(2,'María','López','Fernández'),
(3,'Carlos','García','Martínez'),
(4,'Ana','Rodríguez','Sánchez'),
(5,'Luis','Hernández','Ruiz'),
(6,'Pedro','González','López'),
(7,'Sofía','Martínez','Díaz'),
(8,'Diego','Hernández','Castro'),
(9,'Laura','Fernández','Méndez'),
(10,'Jorge','Ramírez','Pérez'),
(11,'Camila','Rodríguez','García');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precio`
--

DROP TABLE IF EXISTS `precio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `precio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fech_hr_inicio` datetime NOT NULL,
  `fecha_hr_fin` datetime NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `id_impresion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_impresion` (`id_impresion`),
  CONSTRAINT `precio_ibfk_1` FOREIGN KEY (`id_impresion`) REFERENCES `impresion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precio`
--

LOCK TABLES `precio` WRITE;
/*!40000 ALTER TABLE `precio` DISABLE KEYS */;
INSERT INTO `precio` VALUES
(1,'2024-04-01 00:00:00','2024-04-30 23:59:59',10.00,1),
(2,'2024-04-01 00:00:00','2024-04-30 23:59:59',20.00,2),
(3,'2024-04-01 00:00:00','2024-04-30 23:59:59',30.00,3),
(4,'2024-04-01 00:00:00','2024-04-30 23:59:59',40.00,4),
(5,'2024-04-01 00:00:00','2024-04-30 23:59:59',50.00,5);
/*!40000 ALTER TABLE `precio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicioagregado`
--

DROP TABLE IF EXISTS `servicioagregado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicioagregado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_detalleventa_venta` int(11) NOT NULL,
  `id_detalleventa_impresion` int(11) NOT NULL,
  `id_conceptoservicio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_detalleventa_impresion` (`id_detalleventa_impresion`),
  KEY `id_detalleventa_venta` (`id_detalleventa_venta`),
  KEY `id_conceptoservicio` (`id_conceptoservicio`),
  CONSTRAINT `servicioagregado_ibfk_1` FOREIGN KEY (`id_detalleventa_impresion`) REFERENCES `detalleventa` (`id_impresion`),
  CONSTRAINT `servicioagregado_ibfk_2` FOREIGN KEY (`id_detalleventa_venta`) REFERENCES `detalleventa` (`id_venta`),
  CONSTRAINT `servicioagregado_ibfk_3` FOREIGN KEY (`id_conceptoservicio`) REFERENCES `conceptoservicio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicioagregado`
--

LOCK TABLES `servicioagregado` WRITE;
/*!40000 ALTER TABLE `servicioagregado` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicioagregado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(12) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
INSERT INTO `sucursal` VALUES
(1,'Sucursal A','Calle 123, Ciudad A'),
(2,'Sucursal B','Calle 456, Ciudad B'),
(3,'Sucursal C','Calle 789, Ciudad C'),
(4,'Sucursal D','Calle 101, Ciudad D'),
(5,'Sucursal E','Calle 102, Ciudad E'),
(6,'Centro','Avenida Central 100'),
(7,'Norte','Calle Norte 200'),
(8,'Sur','Calle Sur 300'),
(9,'Este','Calle Este 400'),
(10,'Oeste','Calle Oeste 500'),
(11,'Centro 2','Avenida Central 200');
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES
(1,'Admin'),
(2,'Encargado');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(12) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `id_persona` int(11) DEFAULT NULL,
  `id_tipousuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipousuario` (`id_tipousuario`),
  KEY `id_persona` (`id_persona`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tipousuario`) REFERENCES `tipousuario` (`id`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(1,'pedrog','clave123',6,2),
(2,'sofam','clave456',7,2),
(3,'diegh','clave789',8,2),
(4,'laurf','clave101',9,2),
(5,'jorger','clave112',10,2),
(6,'camilr','clave113',11,2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  `fecha_hr` datetime DEFAULT NULL,
  `total_general` decimal(10,2) NOT NULL,
  `id_encargado` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_encargado` (`id_encargado`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_encargado`) REFERENCES `encargado` (`id`),
  CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES
(2,'Pendiente','2023-08-01 15:00:00',10.00,6,1),
(3,'Completada','2023-09-01 16:00:00',40.00,6,2),
(4,'Pendiente','2023-10-01 17:00:00',90.00,7,3),
(5,'Completada','2023-11-01 18:00:00',160.00,8,4),
(6,'Pendiente','2023-12-01 19:00:00',250.00,9,5);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-15  1:38:01
