CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `model` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `default_photo_id` int(11) DEFAULT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `folder` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `price` double(18,2) DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_sale` tinyint(4) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `info_url` text COLLATE utf8_unicode_ci NOT NULL,
  `attr` longtext COLLATE utf8_unicode_ci NOT NULL,
  `in_stock` tinyint(4) DEFAULT NULL,
  `is_top` tinyint(4) DEFAULT NULL,
  `is_featured` tinyint(4) DEFAULT NULL,
  `hitcounter` int(11) NOT NULL,
  `ip_address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `sort_order` int(11) NOT NULL,
  `created_user_id` int(11) DEFAULT NULL,
  `updated_user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE `product_brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sort_order` int(11) NOT NULL,
  `folder` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hit_counter` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `is_featured` tinyint(4) DEFAULT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `project_category_id` int(11) DEFAULT NULL,
  `language` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'MN',
  `ip_address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_user_id` int(11) DEFAULT NULL,
  `updated_user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `level` tinyint(4) DEFAULT NULL,
  `hitcounter` int(11) NOT NULL,
  `is_featured` tinyint(4) DEFAULT NULL,
  `folder` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `sort_order` int(11) NOT NULL,
  `created_user_id` int(11) DEFAULT NULL,
  `updated_user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

CREATE TABLE `product_photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `caption` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `photo_file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thumb_file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `folder` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT '1',
  `birthday` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `email_verification_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `folder` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ip_address` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_id` int(11) DEFAULT NULL,
  `updated_user_id` int(11) DEFAULT NULL,
  `rank_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `aimag_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'person',
  `person_reg_number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `person_profession` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `person_biography` longtext COLLATE utf8_unicode_ci NOT NULL,
  `person_start_year` int(11) DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `company_register` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `company_description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `company_founded_year` int(11) DEFAULT NULL,
  `tel` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fax` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `timezone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hit_counter` int(11) NOT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `level` varchar(255) COLLATE utf8_unicode_ci DEFAULT '0',
  `level_started_date` datetime DEFAULT NULL,
  `level_expire_date` datetime DEFAULT NULL,
  `fb_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedin_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `instagram_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_registered_by_social` tinyint(4) DEFAULT NULL,
  `registered_from_language` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_creator` tinyint(4) DEFAULT NULL,
  `is_investor` tinyint(4) DEFAULT NULL,
  `is_idea_owner` tinyint(4) DEFAULT NULL,
  `is_idea_buyer` tinyint(4) DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=37 ;



CREATE TABLE IF NOT EXISTS `project_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name_english` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `level` tinyint(4) DEFAULT NULL,
  `sort_order` int(11) NOT NULL,
  `hit_counter` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `is_featured` tinyint(4) DEFAULT NULL,
  `folder` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `icon_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `attributes` text COLLATE utf8_unicode_ci NOT NULL,
  `created_user_id` int(11) DEFAULT NULL,
  `updated_user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name_russian` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name_chinese` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id_idx` (`parent_id`),
  KEY `created_user_id_idx` (`created_user_id`),
  KEY `updated_user_id_idx` (`updated_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=187 ;

--
-- Хүснэгтийн өгөгдлийг устгах `project_category`
--

INSERT INTO `project_category` (`id`, `name`, `name_english`, `description`, `parent_id`, `level`, `sort_order`, `hit_counter`, `is_active`, `is_featured`, `folder`, `icon_image`, `attributes`, `created_user_id`, `updated_user_id`, `created_at`, `updated_at`, `name_russian`, `name_chinese`) VALUES
(1, 'Бизнес', 'Business', '', NULL, 1, 1, 0, 1, NULL, '2016-05', '', '', 1, 799, '2016-05-31 10:30:33', '2017-08-04 04:54:11', '', ''),
(2, 'Зам барилга', 'Road and Bridge', '', 1, 2, 2, 0, 1, NULL, '2016-05', '', '', 1, 799, '2016-05-31 10:30:58', '2017-08-04 04:54:11', '', ''),
(3, 'Сайн дурын үйл ажиллагаа', 'Volunteer activities', '', NULL, 1, 223, 0, 1, NULL, '2016-05', '', '', 1, 498, '2016-05-31 10:31:13', '2017-08-08 04:08:08', '', ''),
(4, 'Нийгэм', 'Social', '', 3, 2, 224, 0, 1, NULL, '2016-05', '', '', 1, 169, '2016-05-31 10:31:27', '2017-03-29 10:34:27', '', ''),
(5, 'Барилга угсралт', 'Construction', '', 1, 2, 8, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 17:56:04', '2017-07-21 12:32:03', '', ''),
(6, 'Машин механизм', 'Machinery', '', 1, 2, 19, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 17:56:52', '2017-08-10 03:40:43', '', ''),
(7, 'Үйлдвэрлэл', 'Industry and Manufacture', '\r\n', 1, 2, 31, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 17:57:39', '2017-03-29 11:02:27', '', ''),
(8, 'Хөдөө аж ахуй ба хүнс', 'Agriculture and Food', '', 1, 2, 44, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 17:58:04', '2017-08-09 07:15:35', '', ''),
(9, 'Эрүүл мэнд ба гоо сайхан', 'Health and Beauty', '', 1, 2, 60, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 17:58:30', '2017-03-31 02:20:17', '', ''),
(10, 'Программ хангамж, IT', 'Program and IT', '', 1, 2, 76, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 17:59:37', '2017-03-31 10:48:27', '', ''),
(11, 'Компьютер, таблет, гар утас', 'Computer, tablet and phone', '', 1, 2, 90, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 18:00:16', '2017-03-15 07:44:39', '', ''),
(12, 'Электрон тоног төхөөрөмж', 'Electrical Equipment, Components & Telecom', '', 1, 2, 107, 0, 1, NULL, '2016-05', '', '', 10, 323, '2016-05-31 18:00:33', '2017-06-16 09:00:25', '', ''),
(13, 'Гоёл чимэглэл, хувцас загвар', 'Apparel and Accessories', '<p>\r\n  Гоёл чимэглэл&nbsp;</p>\r\n', 1, 2, 126, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:01:15', '2017-03-31 08:45:13', '', ''),
(14, 'Гэр ахуйн хэрэглээ', 'Home and Household', '', 1, 2, 142, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 18:01:32', '2016-09-26 07:42:55', '', ''),
(15, 'Үйлчилгээ', 'Service', '', 1, 2, 160, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 18:01:56', '2017-08-09 07:08:49', '', ''),
(16, 'Байгаль орчин', 'Environment', '', 1, 2, 180, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:02:28', '2017-03-30 10:02:10', '', ''),
(17, 'Боловсрол ', 'Education', '', 1, 2, 199, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:02:48', '2017-03-31 11:19:39', '', ''),
(18, 'Соёл урлаг , спорт', 'Culture and Sports', '', 1, 2, 222, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:03:09', '2017-03-31 07:52:09', '', ''),
(20, 'Тэжээвэр амьтан', 'Domestic', '', 3, 2, 458, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:05:16', '2017-03-30 10:12:48', '', ''),
(21, 'Эрдэм шинжилгээ', 'Scientist', '\r\n', 3, 2, 686, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:06:30', '2017-03-30 10:18:51', '', ''),
(22, 'Боловсрол', 'Education', '', 3, 2, 919, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:06:52', '2017-03-29 11:06:14', '', ''),
(23, 'Байгаль орчин', 'Environment', '', 3, 2, 1153, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 18:07:04', '2017-08-08 04:08:08', '', ''),
(24, 'Соёл спорт', 'Culture and Sports', '', 3, 2, 1620, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 18:07:19', '2017-03-31 02:15:03', '', ''),
(25, 'Зам барилгын ажил', 'Road and bridge construction', '', 2, 3, 3, 0, 1, NULL, '2016-05', '', '', 10, 799, '2016-05-31 18:54:10', '2017-08-04 04:54:11', '', ''),
(26, 'Тоног төхөөрөмж', 'Road and bridge equipment', '\r\n', 2, 3, 4, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 18:58:04', '2016-09-26 07:42:55', '', ''),
(27, 'Зам барилгын материал', 'Road and bridge materials', '', 2, 3, 5, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:01:02', '2016-09-26 07:42:55', '', ''),
(28, 'Бусад', 'Other', '', 2, 3, 6, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:02:08', '2016-09-26 07:42:55', '', ''),
(29, 'Архитектур', 'Architecture', '', 5, 3, 9, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:03:03', '2017-03-31 08:07:28', '', ''),
(30, 'Зураг төсөл', 'Graphics', '', 5, 3, 10, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:04:08', '2017-03-31 10:15:34', '', ''),
(31, 'Интерьер, экстрьер', 'interior and exterior', '', 5, 3, 11, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:07:51', '2016-09-26 07:42:55', '', ''),
(32, 'Тоног төхөөрөмж', 'Construction Equipment', '', 5, 3, 12, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:08:39', '2016-09-26 07:42:55', '', ''),
(33, 'Барилгын материал', 'Construction material', '', 5, 3, 13, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 19:09:14', '2017-07-21 12:32:03', '', ''),
(34, 'Ногоон байгууламж', 'Garden', '', 5, 3, 14, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:09:37', '2016-09-26 07:42:55', '', ''),
(35, 'Тоглоомын талбай', 'Kid garden', '', 5, 3, 15, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:09:44', '2016-09-26 07:42:55', '', ''),
(36, 'Бусад', 'Other', '', 5, 3, 16, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:09:51', '2016-09-26 07:42:55', '', ''),
(37, 'Замын машин механизм', 'Road Truck', '', 6, 3, 20, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:11:11', '2016-09-26 07:42:55', '', ''),
(38, 'Уул уурхайн машин механизм', 'Mining Truck', '', 6, 3, 22, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:11:38', '2016-09-26 07:42:55', '', ''),
(39, 'Барилгын машин механизм', 'Construction Truck', '', 6, 3, 21, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:13:48', '2016-09-26 07:42:55', '', ''),
(41, 'Хүнд даацын машин механизм', 'Truck', '', 6, 3, 23, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:14:15', '2016-09-26 07:42:55', '', ''),
(43, 'Суудлын машин', 'Cars', '', 6, 3, 24, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:14:31', '2016-09-26 07:42:55', '', ''),
(44, 'Нийтийн тээвэр', 'Transportation', '', 6, 3, 25, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:14:39', '2016-09-26 07:42:55', '', ''),
(45, 'Тоног төхөөрөмж', 'Equipment', '', 6, 3, 26, 0, 1, NULL, '2016-05', '', '', 10, 485, '2016-05-31 19:14:46', '2017-01-26 11:24:36', '', ''),
(46, 'Багаж хэрэгсэл', 'Tools', '', 6, 3, 27, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:14:55', '2016-09-26 07:42:55', '', ''),
(47, 'Тоног төхөөрөмж', 'Equipment', '\r\n', 7, 3, 32, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:17:30', '2017-03-31 08:38:24', '', ''),
(48, 'Хүнсний үйлдвэр ', 'Food Industry', '', 7, 3, 33, 0, 1, NULL, '2016-05', '', '', 10, 475, '2016-05-31 19:17:35', '2017-02-04 10:07:57', '', ''),
(49, 'Хувцас бөс бараа', 'Apparel and silk, cotton', '', 7, 3, 34, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:17:41', '2016-09-26 07:42:55', '', ''),
(50, 'Хуванцар эдлэл', 'Plastic', '\r\n', 7, 3, 36, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:17:46', '2016-09-26 07:42:55', '', ''),
(51, 'Шил, шилэн эдлэл ', 'Glass', '', 7, 3, 37, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:17:51', '2016-09-26 07:42:55', '', ''),
(52, 'Тоглоом ', 'Toys', '', 7, 3, 38, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:17:57', '2016-09-26 07:42:55', '', ''),
(53, 'Бусад ', 'Other', '', 7, 3, 39, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:18:05', '2017-03-31 02:39:38', '', ''),
(54, 'Тоног төхөөрөмж ', 'Agriculture Equipment', '', 8, 3, 45, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:19:10', '2017-03-31 08:22:19', '', ''),
(55, 'Цэцэрлэгийн багаж', 'Garden equipment', '', 8, 3, 46, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:19:15', '2016-09-26 07:42:55', '', ''),
(56, 'Ургамал, амьтны гаралтай бүтээгдэхүүн ', 'Vegetable and animal’s product', '', 8, 3, 47, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:19:22', '2016-09-29 07:25:17', '', ''),
(57, 'Үр тариа ', 'Grain', '', 8, 3, 48, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:19:28', '2017-03-31 02:59:03', '', ''),
(58, 'Эрүүл мэндийн тэжээл ', 'Healthy food', '', 8, 3, 49, 0, 1, NULL, '2016-05', '', '', 10, 484, '2016-05-31 19:19:34', '2017-01-26 11:35:15', '', ''),
(59, 'Ундаа, ус', 'Drinks', '', 8, 3, 50, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:19:39', '2016-09-26 07:42:55', '', ''),
(60, 'Амттан ', 'Sweets', '', 8, 3, 51, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:20:02', '2017-03-31 10:50:46', '', ''),
(61, 'Жимс жимсгэний бүтээгдэхүүн ', 'Fruit and Fruit product', '', 8, 3, 52, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:20:08', '2017-03-31 10:07:12', '', ''),
(62, 'Хүнсний ногоо ', 'Vegetable', '', 8, 3, 53, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:20:13', '2017-03-31 09:19:50', '', ''),
(63, 'Бусад ', 'Other', '', 8, 3, 54, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:20:18', '2017-03-30 10:16:15', '', ''),
(64, 'Эм эмийн бүтээгдэхүүн', 'Medicine and Medical Product', '', 9, 3, 61, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:21:42', '2017-03-31 07:57:59', '', ''),
(65, 'Тоног төхөөрөмж', 'Equipment', '', 9, 3, 62, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:21:50', '2016-09-26 07:42:55', '', ''),
(66, 'Витамин амин дэм', 'Vitamins', '', 9, 3, 63, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:21:57', '2016-09-26 07:42:55', '', ''),
(67, 'Клиникийн эрдэм шинжилгээ', 'Clinical scientist', '', 9, 3, 64, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:22:03', '2016-09-26 07:42:55', '', ''),
(68, 'Эрүүл мэндийн бүтээгдэхүүн', 'Healthy product', '', 9, 3, 65, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:22:10', '2016-09-26 07:42:55', '', ''),
(69, 'Бусад ', 'Other', '', 9, 3, 69, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:22:14', '2016-09-26 07:42:55', '', ''),
(70, 'Програм хангамж', 'Software', '', 10, 3, 77, 0, 1, NULL, '2016-05', '', '', 10, 250, '2016-05-31 19:45:07', '2017-03-15 03:50:44', '', ''),
(71, 'Тоглоом', 'Games', '', 10, 3, 78, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:45:12', '2016-09-26 07:42:55', '', ''),
(72, 'Аппликейшн', 'Application', '', 10, 3, 79, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:45:19', '2017-03-31 11:04:53', '', ''),
(73, 'Хамгаалалтын систем', 'Security system', '', 10, 3, 80, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:45:25', '2016-09-26 07:42:55', '', ''),
(74, 'Ухаалаг систем', 'Smart system', '', 10, 3, 81, 0, 1, NULL, '2016-05', '', '', 10, 343, '2016-05-31 19:45:33', '2016-11-15 03:23:02', '', ''),
(75, 'Бусад', 'Other', '', 10, 3, 82, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:45:40', '2017-03-31 11:10:18', '', ''),
(76, 'Тоног төхөөрөмж', 'Equipment', '', 11, 3, 91, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:47:14', '2016-09-26 07:42:55', '', ''),
(77, 'Компьютер таблет', 'Computer and Tablet', '\r\n', 11, 3, 92, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 19:47:19', '2017-03-15 07:44:39', '', ''),
(78, 'Зурагт', 'Television HD', '', 11, 3, 93, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:47:24', '2016-09-26 07:42:55', '', ''),
(79, 'Чанга яригч', 'Speaker', '', 11, 3, 94, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:47:30', '2016-09-26 07:42:55', '', ''),
(80, 'Принтер', 'Printer', '', 11, 3, 95, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:47:37', '2016-09-26 07:42:55', '', ''),
(81, 'Гэр ахуйн цахилгаан хэрэглэл', 'Home light and electronics', '', 11, 3, 96, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:47:44', '2016-09-26 07:42:55', '', ''),
(82, 'Гар утас', 'Phone and Sell phone', '', 11, 3, 97, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:47:51', '2016-09-26 07:42:55', '', ''),
(83, 'Бусад', 'Other', '', 11, 3, 98, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:47:57', '2016-09-26 07:42:55', '', ''),
(84, 'Батерей', 'Batteries', '', 12, 3, 108, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:49:21', '2017-03-31 08:18:51', '', ''),
(85, 'Мотор', 'Generator', '', 12, 3, 109, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:49:28', '2016-09-26 07:42:55', '', ''),
(86, 'Хувиргагч', 'Convertor', '', 12, 3, 110, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:49:35', '2016-09-26 07:42:55', '', ''),
(87, 'Залгуур, уртасгагч', 'Switch', '', 12, 3, 111, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:49:41', '2016-09-26 07:42:55', '', ''),
(88, 'Дамжуулагч', 'Transmission', '', 12, 3, 112, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:49:46', '2016-09-26 07:42:55', '', ''),
(89, 'Цэнэглэгч', 'Charger', '', 12, 3, 113, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:49:52', '2016-09-26 07:42:55', '', ''),
(90, 'Холбогч', 'Connector', '', 12, 3, 114, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:49:57', '2016-09-26 07:42:55', '', ''),
(91, 'кабель', 'Cable', '', 12, 3, 115, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:50:06', '2016-09-26 07:42:55', '', ''),
(92, 'Бусад', 'Other', '', 12, 3, 116, 0, 1, NULL, '2016-05', '', '', 10, 323, '2016-05-31 19:50:14', '2016-12-08 10:42:42', '', ''),
(93, 'Тоног төхөөрөмж', 'Equipment', '', 13, 3, 127, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:52:02', '2017-03-31 08:45:13', '', ''),
(94, 'Багаж хэрэгсэл', 'Tools', '', 13, 3, 128, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:52:13', '2016-09-26 07:42:55', '', ''),
(95, 'Хувцас хэрэглэл', 'Apparel', '', 13, 3, 129, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 19:52:46', '2017-03-15 06:46:03', '', ''),
(96, 'Гоо сайхны бүтээгдэхүүн', 'Beauty product', '', 9, 3, 67, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:52:53', '2016-09-26 07:42:55', '', ''),
(97, 'Гоо сайхны хэрэглэл', 'Beauty accessories', '', 9, 3, 68, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:53:02', '2016-09-26 07:42:55', '', ''),
(98, 'Гоо сайхны эмнэлэг', 'Beauty Hospital', '', 9, 3, 66, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:53:12', '2016-09-26 07:42:55', '', ''),
(99, 'Бусад', 'Other', '', 13, 3, 131, 0, 1, NULL, '2016-05', '', '', 10, 9, '2016-05-31 19:53:20', '2016-12-12 03:51:53', '', ''),
(100, 'Тавилга', 'Furniture', '', 14, 3, 143, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:56:29', '2016-09-26 07:42:55', '', ''),
(102, 'Цэвэрлэгээний бодис', 'Cleaner materials', '', 14, 3, 144, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:56:36', '2016-09-26 07:42:55', '', ''),
(103, 'Цэвэрлэгээний багаж', 'Cleaning tools', '', 14, 3, 145, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:56:41', '2016-09-26 07:42:55', '', ''),
(104, 'Гал тогооны хэрэглэл', 'Kitchen', '', 14, 3, 146, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:56:49', '2016-09-26 07:42:55', '', ''),
(105, 'Ванны өрөөний хэрэглэл', 'Washroom', '', 14, 3, 147, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:56:55', '2016-09-26 07:42:55', '', ''),
(106, 'Бусад', 'Other', '', 14, 3, 148, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:57:01', '2016-09-26 07:42:55', '', ''),
(107, 'Зочид буудал', 'Hotel', '', 15, 3, 161, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:58:51', '2016-09-26 07:42:55', '', ''),
(108, 'Зоогийн газар', 'Restaurant and Cafе', '', 15, 3, 162, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:59:04', '2016-09-26 07:42:55', '', ''),
(109, 'Аялал жуулчлал', 'Tourism', '', 15, 3, 163, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:59:11', '2017-03-31 10:42:38', '', ''),
(110, 'Авто үйлчилгээ', 'Car service', '', 15, 3, 164, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 19:59:16', '2016-09-26 07:42:55', '', ''),
(111, 'Дэлгүүр', 'Shop', '', 15, 3, 165, 0, 1, NULL, '2016-05', '', '', 10, 483, '2016-05-31 19:59:22', '2017-01-26 11:31:04', '', ''),
(112, 'Тоног төхөөрөмж', 'Equipment service', '', 15, 3, 166, 0, 1, NULL, '2016-05', '', '', 10, 485, '2016-05-31 19:59:28', '2017-01-22 12:35:08', '', ''),
(113, 'Бусад', 'Other', '', 15, 3, 167, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 19:59:35', '2017-03-31 02:29:24', '', ''),
(114, 'Сэргээгдэх эрчим хүч', 'Renewable energy', '', 16, 3, 181, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:01:16', '2017-03-30 10:02:10', '', ''),
(115, 'Байгалийн гаралтай бүтээгдэхүүн', 'Natural Product', '', 16, 3, 182, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:01:22', '2016-09-26 07:42:55', '', ''),
(116, 'Ус хэмнэх төхөөрөмж', 'Equipment of save water', '', 16, 3, 183, 0, 1, NULL, '2016-05', '', '', 10, 247, '2016-05-31 20:01:28', '2016-10-19 07:07:37', '', ''),
(117, 'Байгалийн гаралтай бодис', 'Natural substance', '', 16, 3, 184, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:01:34', '2016-09-26 07:42:55', '', ''),
(118, 'Хог хаягдал', 'Waste', '', 16, 3, 185, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:01:40', '2017-03-31 09:17:49', '', ''),
(119, 'Сургалтын програм', 'Educational package', '', 17, 3, 200, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:03:06', '2017-03-31 11:19:39', '', ''),
(120, 'Бичгийн хэрэгсэл', 'Stationery', '', 17, 3, 201, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:03:13', '2016-09-26 07:42:55', '', ''),
(121, 'Сургуулийн тоног төхөөрөмж', 'School equipment', '', 17, 3, 202, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:03:22', '2016-09-26 07:42:55', '', ''),
(122, 'Дуу, хөгжим', 'Song and Instrument', '', 18, 3, 223, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:05:18', '2017-03-31 07:52:09', '', ''),
(123, 'Ном хэвлэл', 'Publishing', '', 18, 3, 224, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:05:23', '2016-09-26 07:42:55', '', ''),
(124, 'Номын худалдаа', 'Book sale', '', 18, 3, 225, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:05:29', '2016-09-26 07:42:55', '', ''),
(125, 'Сэтгүүл зүй', 'Magazine', '', 18, 3, 226, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:05:36', '2016-09-26 07:42:55', '', ''),
(126, 'Зохиол', 'Literature and story', '', 18, 3, 227, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:05:42', '2016-09-26 07:42:55', '', ''),
(127, 'Бүжиг', 'Dance', '', 18, 3, 228, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:05:49', '2016-09-26 07:42:55', '', ''),
(128, 'Жүжиг', 'Act and Drama', '', 18, 3, 229, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:05:55', '2016-09-26 07:42:55', '', ''),
(129, 'DVD, Audio, CD', 'DVD, Audio, CD', '', 18, 3, 230, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:06:01', '2016-09-26 07:42:55', '', ''),
(131, 'Кино', 'Film', '', 18, 3, 231, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:06:07', '2016-09-26 07:42:55', '', ''),
(132, 'Уран зураг', 'Art', '', 18, 3, 232, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:06:15', '2016-09-26 07:42:55', '', ''),
(134, 'Бусад', 'Other', '', 18, 3, 233, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 20:06:27', '2017-03-15 07:31:22', '', ''),
(135, 'Сурах бичиг бүтээх', 'Lesson book', '', 17, 3, 203, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:09:03', '2016-09-26 07:42:55', '', ''),
(136, 'Судалгааны ажил', 'Research', '', 17, 3, 204, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:09:09', '2016-09-26 07:42:55', '', ''),
(137, 'Шинжлэх ухаан', 'Science', '', 17, 3, 205, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:09:14', '2016-09-26 07:42:55', '', ''),
(138, 'Лаборатори', 'Laboratory', '', 17, 3, 206, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:09:16', '2016-09-26 07:42:55', '', ''),
(139, 'Эрдэм шинжилгээний ажил', 'Research work', '', 17, 3, 207, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:09:22', '2016-09-26 07:42:55', '', ''),
(141, 'Тусламжийн үйл ажиллагаа', 'Aid operations', '\r\n', 4, 3, 225, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:12:20', '2017-03-31 08:23:47', '', ''),
(142, 'Эрүүл мэнд', 'Health', '', 4, 3, 226, 0, 1, NULL, '2016-05', '', '', 10, 498, '2016-05-31 20:12:30', '2017-03-15 09:26:06', '', ''),
(143, 'Эмэгтэйчүүд', 'Women', '', 4, 3, 227, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:12:36', '2017-03-30 10:24:39', '', ''),
(144, 'Хүүхэд', 'Children', '', 4, 3, 228, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:12:41', '2017-03-30 10:21:37', '', ''),
(145, 'Хүний эрх хамгаалах', 'Human right', '', 4, 3, 229, 0, 1, NULL, '2016-05', '', '', 10, 9, '2016-05-31 20:12:47', '2016-12-06 08:12:39', '', ''),
(146, ' Ядуурал', 'Poverty', '', 4, 3, 230, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:12:55', '2016-09-26 07:42:55', '', ''),
(147, 'Хөгжлийн бэрхшээлтэй иргэд', 'Impairment', '', 4, 3, 231, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:13:02', '2016-09-26 07:42:55', '', ''),
(148, 'Алслагдмал бүс нутгийн иргэдэд туслах', 'Help to isolated people', '', 4, 3, 232, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:13:09', '2016-09-26 07:42:55', '', ''),
(149, 'Буурай орнуудад туслах', 'help to least countries', '', 4, 3, 233, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:13:14', '2016-09-26 07:42:55', '', ''),
(151, 'Амжиргааг сайжруулах', 'Improve the livelihoods', '', 4, 3, 234, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:13:25', '2017-03-29 10:34:27', '', ''),
(153, 'Тэжээвэр амьтан хамгаалах', 'Protect Domestic', '\r\n', 20, 3, 459, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:15:54', '2017-03-30 10:12:48', '', ''),
(154, 'Хоол тэжээл', 'Nutrition', '', 20, 3, 460, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:16:02', '2016-09-26 07:42:55', '', ''),
(155, 'Тэжээвэр амьтны эрхийг хамгаалах', 'Domestic’s right ', '\r\n', 20, 3, 461, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:16:11', '2016-09-26 07:42:55', '', ''),
(156, 'Нийгмийн судалгаа, шинжилгээ', 'Social Research', '', 21, 3, 687, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:20:04', '2017-03-30 10:18:51', '', ''),
(157, 'Байгаль орчны судалгаа', 'Environmental Research', '\r\n', 21, 3, 688, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:20:11', '2016-09-26 07:42:55', '', ''),
(158, 'Амьтан ургамлын судалгаа', 'Fauna and Flora Research', '', 21, 3, 689, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:20:21', '2016-09-26 07:42:55', '', ''),
(159, 'Газарзүйн судалгаа', 'Geography Research', '', 21, 3, 690, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:20:27', '2016-09-26 07:42:55', '', ''),
(160, 'Эрүүл мэндийн ач холбогдол бүхий судалгаа', 'Health Research', '', 21, 3, 691, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:20:32', '2016-09-26 07:42:55', '', ''),
(161, 'Бусад', 'Other', '', 21, 3, 693, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:20:37', '2016-09-26 07:42:55', '', ''),
(162, 'Тэтгэлэг олгох', 'Scholarship', '', 22, 3, 920, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:21:57', '2017-03-29 11:06:14', '', ''),
(163, 'Бага болон суурь боловсролыг дэмжих', 'Improve Basic and Secondary education', '', 22, 3, 921, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:22:03', '2017-03-31 11:21:34', '', ''),
(165, 'Эмэгтэйчүүдийн боловсрол', 'Women education', '', 22, 3, 922, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:22:14', '2016-09-26 07:42:55', '', ''),
(166, 'Сайн дурын боловсрол олгох', 'Educate volunteer', '', 22, 3, 924, 0, 1, NULL, '2016-05', '', '', 10, 198, '2016-05-31 20:22:19', '2016-11-27 11:42:41', '', ''),
(167, 'Мэргэжил олгох', 'Vocational training', '', 22, 3, 925, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:22:26', '2017-03-31 02:16:57', '', ''),
(168, 'Чадавхижуулах', 'Empowerment', '', 22, 3, 926, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:22:31', '2016-09-26 07:42:55', '', ''),
(169, 'Ойжуулалт', 'Forestation', '', 23, 3, 1155, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:24:20', '2016-09-26 07:42:55', '', ''),
(170, 'Цөлжилттэй тэмцэх', 'To Combat desertification', '', 23, 3, 1156, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:24:28', '2017-03-31 09:25:50', '', ''),
(171, 'Хөрсний элэгдлийг бууруулах', 'To combat degradation', '', 23, 3, 1157, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:24:37', '2016-09-26 07:42:55', '', ''),
(172, 'Уур амьсгалын өөрчлөлтийг бууруулах', 'To combat climate change', '', 23, 3, 1158, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:24:44', '2016-09-26 07:42:55', '', ''),
(173, 'Биологийн төрөл зүйлийг хамгаалах', 'Protect biodiversity', '', 23, 3, 1159, 0, 1, NULL, '2016-05', '', '', 10, 9, '2016-05-31 20:24:49', '2016-12-06 07:27:14', '', ''),
(174, 'Байгальд ээлтэй технологи', 'Environmental friendly technology', '', 23, 3, 1160, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:24:57', '2016-09-26 07:42:55', '', ''),
(175, 'Усны нөөцийг хамгаалах', 'Save water resource', '', 23, 3, 1161, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:25:05', '2016-09-29 07:25:18', '', ''),
(176, 'Урлагийн арга хэмжээ', 'Performance', '', 24, 3, 1621, 0, 1, NULL, '2016-05', '', '', 10, 169, '2016-05-31 20:26:15', '2017-03-31 02:15:03', '', ''),
(177, 'Уран бүтээл', 'Art', '', 24, 3, 1622, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:26:23', '2016-09-26 07:42:55', '', ''),
(178, 'CD, DVD, Audio', 'CD, DVD, Audio ', '', 180, 3, 1390, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:26:29', '2016-09-26 07:42:55', '', ''),
(179, 'Спортын арга хэмжээ', 'Sports', '', 24, 3, 1623, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:26:34', '2016-09-26 07:42:56', '', ''),
(180, 'Ном хэвлэх', 'Publishing', '', 3, 2, 1389, 0, 1, NULL, '2016-05', '', '', 10, 1, '2016-05-31 20:26:40', '2016-09-26 07:42:55', '', ''),
(181, 'Уран зохиол', 'Literature', '', 180, 3, 1391, 0, 1, NULL, '2016-06', '', '', 10, 1, '2016-06-06 19:13:38', '2016-09-26 07:42:55', '', ''),
(182, 'Байгаль хамгаалах, нөхөн сэргээх', 'Conservation and Restoration', '', 23, 3, 1154, 0, 1, NULL, '2016-06', '', '', 10, 498, '2016-06-06 20:26:59', '2017-08-08 04:08:08', '', ''),
(183, 'Оёдол нэмхмэл', 'Sewing and Textile', '', 7, 3, 35, 0, 1, NULL, '2016-06', '', '', 9, 1, '2016-06-22 04:30:05', '2016-09-26 07:42:55', '', ''),
(184, 'Оёдол нэмхмэл', 'Sewing and Textile', '', 13, 3, 130, 0, 1, NULL, '2016-06', '', '', 9, 349, '2016-06-22 07:12:06', '2016-11-14 06:26:01', '', ''),
(185, 'Эрүүл мэндийн тусламж үйлчилгээ ', 'Health care', '', 21, 3, 692, 0, 1, NULL, '2016-06', '', '', 9, 1, '2016-06-25 05:12:35', '2016-09-26 07:42:55', '', ''),
(186, 'Хүүхдийн боловсрол', 'Children Education', '', 22, 3, 923, 0, 1, NULL, '2016-09', '', '', 9, 169, '2016-09-07 11:03:04', '2017-03-31 09:44:43', '', '');

--
-- Асгарсан хүснэгтийг хүчлэх
--

--
-- Constraints for table `project_category`
--
ALTER TABLE `project_category`
  ADD CONSTRAINT `project_category_created_user_id_user_id` FOREIGN KEY (`created_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_category_parent_id_project_category_id` FOREIGN KEY (`parent_id`) REFERENCES `project_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_category_updated_user_id_user_id` FOREIGN KEY (`updated_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

ALTER TABLE `product`
  ADD CONSTRAINT `product_brand_id_product_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `product_brand` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_created_user_id_user_id` FOREIGN KEY (`created_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_default_photo_id_product_photo_id` FOREIGN KEY (`default_photo_id`) REFERENCES `product_photo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_updated_user_id_user_id` FOREIGN KEY (`updated_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_brand`
--
ALTER TABLE `product_brand`
  ADD CONSTRAINT `product_brand_created_user_id_user_id` FOREIGN KEY (`created_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_brand_project_category_id_project_category_id` FOREIGN KEY (`project_category_id`) REFERENCES `project_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_brand_updated_user_id_user_id` FOREIGN KEY (`updated_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `product_category_created_user_id_user_id` FOREIGN KEY (`created_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_category_parent_id_product_category_id` FOREIGN KEY (`parent_id`) REFERENCES `product_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_category_updated_user_id_user_id` FOREIGN KEY (`updated_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
ALTER TABLE `product_photo`
  ADD CONSTRAINT `product_photo_created_user_id_user_id` FOREIGN KEY (`created_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_photo_product_id_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
