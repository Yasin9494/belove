-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Авг 11 2022 г., 02:14
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
-- Структура таблицы `qr_visit_list`
--

CREATE TABLE `qr_visit_list` (
  `id` int(255) NOT NULL,
  `date` mediumtext NOT NULL,
  `ip` mediumtext NOT NULL,
  `page` mediumtext NOT NULL,
  `browser` mediumtext NOT NULL,
  `platform` mediumtext NOT NULL,
  `isMobile` tinyint(1) NOT NULL,
  `isBot` tinyint(1) NOT NULL,
  `agent` mediumtext NOT NULL,
  `new` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `qr_visit_list`
--
ALTER TABLE `qr_visit_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `qr_visit_list`
--
ALTER TABLE `qr_visit_list`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
