-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Янв 25 2017 г., 21:33
-- Версия сервера: 5.5.25
-- Версия PHP: 5.2.12

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `diary`
--

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE IF NOT EXISTS `lessons` (
  `title` varchar(150) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`title`, `id`) VALUES
('Физика', 1),
('Математика', 2),
('Русский язык', 3),
('Русская литература', 4),
('Астрономия', 5),
('История', 6),
('Обществоведение', 7),
('Трудовое обучение', 8),
('Информатика', 9),
('Белорусский язык', 10),
('Белорусская литература', 11),
('Биология', 12),
('Химия', 13),
('Физическая культура и здоровье', 14),
('География', 15),
('Английский язык', 16);

-- --------------------------------------------------------

--
-- Структура таблицы `marks`
--

CREATE TABLE IF NOT EXISTS `marks` (
  `pupil_id` int(10) NOT NULL,
  `lesson_id` int(10) NOT NULL,
  `teacher_id` int(10) NOT NULL,
  `mark` int(5) NOT NULL,
  `date` varchar(50) NOT NULL,
  `whenAdded` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `marks`
--

INSERT INTO `marks` (`pupil_id`, `lesson_id`, `teacher_id`, `mark`, `date`, `whenAdded`) VALUES
(1, 9, 9, 7, '04.01.2017', '24.01.2017 22:06:44'),
(1, 9, 9, 5, '04.01.2017', '24.01.2017 22:09:51'),
(1, 9, 9, 6, '08.01.2017', '24.01.2017 22:18:46'),
(1, 9, 9, 1, '30.12.2016', '24.01.2017 22:19:11'),
(1, 9, 9, 5, '04.01.2017', '24.01.2017 22:19:45'),
(1, 9, 9, 8, '05.01.2017', '24.01.2017 22:20:17'),
(1, 9, 9, 7, '04.01.2017', '24.01.2017 22:20:34'),
(1, 9, 9, 8, '12.01.2017', '24.01.2017 22:22:18'),
(1, 9, 9, 5, '28.12.2016', '24.01.2017 22:23:35'),
(1, 9, 9, 5, '30.12.2016', '25.01.2017 20:28:39'),
(1, 9, 9, 8, '01.01.2017', '25.01.2017 20:31:01'),
(1, 2, 13, 9, '05.01.2017', '25.01.2017 20:31:47'),
(1, 9, 9, 7, '28.12.2016', '25.01.2017 21:18:12'),
(1, 9, 9, 4, '04.01.2017', '25.01.2017 21:23:46'),
(1, 9, 9, 5, '27.12.2016', '25.01.2017 21:26:07'),
(1, 2, 13, 10, '30.12.2016', '25.01.2017 21:26:23');

-- --------------------------------------------------------

--
-- Структура таблицы `pupils`
--

CREATE TABLE IF NOT EXISTS `pupils` (
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `name` varchar(150) NOT NULL,
  `surname` varchar(150) NOT NULL,
  `otchestvo` varchar(150) NOT NULL,
  `form` int(10) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `pupils`
--

INSERT INTO `pupils` (`email`, `password`, `name`, `surname`, `otchestvo`, `form`, `id`) VALUES
('ankell.game@gmail.com', '123456', 'Александр', 'Пашкевич', 'Юрьевич', 11, 1),
('asdfasd@ngskd.asd', '515151515', 'Александр', 'Пашкевич', 'Афывфывф', 8, 2),
('yurpas@mail.ru', '97321', 'Юрий', 'Пашкевич', 'Владимирович', 8, 3),
('pashpav@mail.ru', '36987412', 'Павел', 'Пашкевич', 'Юрьевич', 8, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `remarks`
--

CREATE TABLE IF NOT EXISTS `remarks` (
  `remark` varchar(300) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `whenAdded` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE IF NOT EXISTS `teachers` (
  `name` varchar(150) NOT NULL,
  `surname` varchar(150) NOT NULL,
  `otchestvo` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `lesson_id` int(10) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`name`, `surname`, `otchestvo`, `email`, `password`, `lesson_id`, `id`) VALUES
('Иван', 'Семенов', 'Петрович', 'petrovich@mail.ru', '1224', 2, 2),
('Петр', 'Петр', 'Петр', 'hh@hh.s', '123', 9, 9),
('Иван', 'Иванов', 'Иванович', 'ivan@mail.rui', '5555', 15, 10),
('Семен', 'Николаев', 'Тарасович', 'semen@ss', '12345', 12, 11),
('Alexandr', 'Pashkevich', '111', 'ss@ss.s', '111', 5, 12),
('Математика', 'Царица', 'Наук', 'math@tt.s', '123', 2, 13);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
