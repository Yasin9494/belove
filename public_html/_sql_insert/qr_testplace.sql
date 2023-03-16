-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Авг 11 2022 г., 02:13
-- Версия сервера: 5.7.27-30
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `u1581388_testplace`
--

-- --------------------------------------------------------

--
-- Структура таблицы `qr_testplace`
--

CREATE TABLE `qr_testplace` (
  `id` int(255) NOT NULL,
  `uid` mediumtext NOT NULL,
  `fio` mediumtext NOT NULL,
  `doc_type` mediumtext NOT NULL,
  `doc_num` mediumtext NOT NULL,
  `doc_date` mediumtext NOT NULL,
  `reg_type` mediumtext NOT NULL,
  `reg_num` mediumtext NOT NULL,
  `reg_address` mediumtext NOT NULL,
  `reg_date_from` mediumtext NOT NULL,
  `reg_date_to` mediumtext NOT NULL,
  `status` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `qr_testplace`
--
ALTER TABLE `qr_testplace`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `qr_testplace`
--
ALTER TABLE `qr_testplace`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
