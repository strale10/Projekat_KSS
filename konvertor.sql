-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 15, 2020 at 09:50 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konvertor`
--

-- --------------------------------------------------------

--
-- Table structure for table `duzina`
--

DROP TABLE IF EXISTS `duzina`;
CREATE TABLE IF NOT EXISTS `duzina` (
  `id_duzina` int(11) NOT NULL AUTO_INCREMENT,
  `uneta_vrednost` varchar(200) NOT NULL,
  `dobijena_vrednost` varchar(200) NOT NULL,
  PRIMARY KEY (`id_duzina`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `duzinaobrnuta`
--

DROP TABLE IF EXISTS `duzinaobrnuta`;
CREATE TABLE IF NOT EXISTS `duzinaobrnuta` (
  `id_duzina` int(11) NOT NULL AUTO_INCREMENT,
  `uneta_vrednost` varchar(200) NOT NULL,
  `dobijena_vrednost` varchar(200) NOT NULL,
  PRIMARY KEY (`id_duzina`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `snaga`
--

DROP TABLE IF EXISTS `snaga`;
CREATE TABLE IF NOT EXISTS `snaga` (
  `id_snaga` int(11) NOT NULL AUTO_INCREMENT,
  `uneta_vrednost` varchar(200) NOT NULL,
  `dobijena_vrednost` varchar(200) NOT NULL,
  PRIMARY KEY (`id_snaga`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `snagaobrnuta`
--

DROP TABLE IF EXISTS `snagaobrnuta`;
CREATE TABLE IF NOT EXISTS `snagaobrnuta` (
  `id_snaga` int(11) NOT NULL AUTO_INCREMENT,
  `uneta_vrednost` varchar(200) NOT NULL,
  `dobijena_vrednost` varchar(200) NOT NULL,
  PRIMARY KEY (`id_snaga`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `valute`
--

DROP TABLE IF EXISTS `valute`;
CREATE TABLE IF NOT EXISTS `valute` (
  `id_valute` int(11) NOT NULL AUTO_INCREMENT,
  `uneta_vrednost` varchar(200) NOT NULL,
  `dobijena_vrednost` varchar(200) NOT NULL,
  PRIMARY KEY (`id_valute`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `valuteobrnuta`
--

DROP TABLE IF EXISTS `valuteobrnuta`;
CREATE TABLE IF NOT EXISTS `valuteobrnuta` (
  `id_valute` int(11) NOT NULL AUTO_INCREMENT,
  `uneta_vrednost` varchar(200) NOT NULL,
  `dobijena_vrednost` varchar(200) NOT NULL,
  PRIMARY KEY (`id_valute`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
