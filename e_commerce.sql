-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2019 at 06:54 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL,
  `cart_timestamp` date NOT NULL,
  `cart_quantity` int(11) NOT NULL,
  `cart_price` double NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `cart_timestamp`, `cart_quantity`, `cart_price`, `transaction_id`, `product_id`) VALUES
(1, '2019-08-15', 1, 2596.6, 1, 2),
(2, '2019-08-15', 1, 2596.6, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(100) NOT NULL,
  `category_name` varchar(200) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Men', '2019-08-12', '2019-08-12'),
(2, 'Women', '2019-08-12', '2019-08-12');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(150) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `product_brand` varchar(225) NOT NULL,
  `product_description` longtext NOT NULL,
  `product_price` double DEFAULT NULL,
  `product_quantity` int(50) NOT NULL,
  `sub_category_id` int(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_brand`, `product_description`, `product_price`, `product_quantity`, `sub_category_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Tiger head and symbols fil coupé shirt', 'Gucci', '<p style=\"margin: 0px 0px 20px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\"><br class=\"Apple-interchange-newline\">Designed in a style that recalls vintage illustrations found in children\'s books, the tiger head repeats in the fil coupé pattern decorating this light blue cotton shirt. Among the wild animals populating the House\'s imagined garden, the feline combines with other distinctive Gucci symbols, like the anchor, the bee, and the 25. Mother of pearl buttons complete the classic silhouette.</p><ul style=\"margin: 10px 0px; padding: 0px 0px 0px 16px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; list-style: disc; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\"><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Tiger head and symbols fil coupé light blue cotton</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Mother of pearl buttons</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Regular fit</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">28.3\" length</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">19.8\" sleeve length</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Measurements are based on a size 46 (IT)</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">100% cotton</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Made in Italy</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">The model is 5\'9\" and is wearing size 46 (IT)</li></ul>', 6803.6, 10, 1, '2019-08-12', '2019-08-14'),
(2, 'Acetate bowling shirt with GG star', 'Gucci', '<p style=\"margin: 0px 0px 20px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\">A recurring element of the Pre-Fall 2019 collection that speaks to Gucci\'s whimsical narrative, a star patch embroidered with the GG logo decorates the back of this acetate bowling shirt. A blue, red and white ribbon, reminiscent of the Sylvie Web, profiles the silhouette. Evoking the nostalgic atmosphere of wooden bowling alleys, the retro-infused design is reimagined in contemporary takes and elevated through refined details.</p><ul style=\"margin: 10px 0px; padding: 0px 0px 0px 16px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; list-style: disc; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\"><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Red acetate with black sleeves, treated for a vintage effect and a wrinkled finish</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Blue, red and white grosgrain trim</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">GG star patch on the back</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Mother of pearl buttons</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">28.3\" length</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">19.8\" sleeve length</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Measurements are based on a size 46 (IT)</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">100% acetate</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Made in Italy</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">The model is 5\'9\" and is wearing size 46 (IT)</li></ul>', 2596.6, 18, 1, '2019-08-12', '2019-08-15'),
(3, 'Symbols fil coupé bowling shirt', 'Gucci', '<p style=\"margin: 0px 0px 20px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\">In a rainbow mix of colors, the House\'s emblematic symbols, like the bee, the heart, the star, and the GG logo, form the fil coupé motif decorating this white cotton bowling shirt. Evoking the nostalgic atmosphere of wooden bowling alleys, the retro-infused silhouette is reimagined in contemporary takes.</p><ul style=\"margin: 10px 0px; padding: 0px 0px 0px 16px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; list-style: disc; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\"><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">White cotton with multicolor symbols fil coupé</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Blue, white and red grosgrain ribbon trim</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Mother of pearl buttons</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">28.3\" length</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">19.8\" sleeve length</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Measurements are based on a size 46 (IT)</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">100% cotton</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Made in Italy</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">The model is 6\'1\" and is wearing size 46 (IT)</li></ul>', 1289.64, 20, 1, '2019-08-12', '2019-08-15'),
(5, 'Canvas kaftan with paisley print', 'Gucci', '<p style=\"margin: 0px 0px 20px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\">First introduced as part of Gucci\'s Spring 1996 collection, the kaftan is once again brought back into the forefront. This \'60s inspired style is presented in a colorful paisley print with GG trim and crystal embroidery.</p><ul style=\"margin: 10px 0px; padding: 0px 0px 0px 16px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; line-height: inherit; font-family: Futura, Helvetica, Arial, sans-serif; font-size: 12px; vertical-align: baseline; list-style: disc; color: rgb(75, 75, 75); letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;\"><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Paisley print brown canvas</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">GG motif trim</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Crystal embroidery at the top</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Round neck</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Long sleeves</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Back zip closure</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Maxi dress</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">60% linen and 40% cotton</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">Made in Italy</li><li style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; vertical-align: baseline;\">The model is 5\'8\" and is wearing size 40 (IT)</li></ul>', 1250.6, 15, 3, '2019-08-12', '2019-08-15');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `product_img_id` int(11) NOT NULL,
  `product_img_name` varchar(225) NOT NULL,
  `product_img_path` varchar(225) NOT NULL,
  `product_id` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`product_img_id`, `product_img_name`, `product_img_path`, `product_id`, `createdAt`, `updatedAt`) VALUES
(1, '574566_ZABOF_4159_001_100_0000_Light-Tiger-head-and-symbols-fil-coup-shirt.jpg', '574566_ZABOF_4159_001_100_0000_Light-Tiger-head-and-symbols-fil-coup-shirt.jpg', 1, '2019-08-12', '2019-08-12'),
(2, '568300_ZABX9_6429_001_100_0000_Light-Acetate-bowling-shirt-with-GG-star.jpg', '568300_ZABX9_6429_001_100_0000_Light-Acetate-bowling-shirt-with-GG-star.jpg', 2, '2019-08-12', '2019-08-12'),
(3, '575542_ZABNF_9692_001_100_0000_Light-Symbols-fil-coup-bowling-shirt.jpg', '575542_ZABNF_9692_001_100_0000_Light-Symbols-fil-coup-bowling-shirt.jpg', 3, '2019-08-12', '2019-08-12'),
(4, '578414_ZACDJ_2096_001_100_0000_Light-Canvas-kaftan-with-paisley-print.jpg', '578414_ZACDJ_2096_001_100_0000_Light-Canvas-kaftan-with-paisley-print.jpg', 5, '2019-08-12', '2019-08-12');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `review_rating` int(11) DEFAULT NULL,
  `review_comment` varchar(45) DEFAULT NULL,
  `review_timestamp` varchar(45) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `product_id` varchar(45) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `review_rating`, `review_comment`, `review_timestamp`, `account_id`, `product_id`, `createdAt`, `updatedAt`) VALUES
(1, 5, 'Nindota sa yawa oy hahaha', '2019-07-15  10:20:11', 1, '1', '0000-00-00', '0000-00-00'),
(2, 4, 'Medyo naay kulang pero okay na gamay ra man p', '2019-07-15  05:20:11', 2, '1', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20190803114000-create_categories_table.js'),
('20190803115442-create_users_table.js'),
('20190803115815-create_sub_categories_table.js');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `sub_category_id` int(100) NOT NULL,
  `sub_category_name` varchar(225) NOT NULL,
  `category_id` int(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`sub_category_id`, `sub_category_name`, `category_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Shirts', 1, '2019-08-12', '2019-08-12'),
(2, 'Shirts', 2, '2019-08-12', '2019-08-12'),
(3, 'Dresses', 2, '2019-08-12', '2019-08-12');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `transaction_timestamp` date NOT NULL,
  `transaction_total` double NOT NULL,
  `transaction_tendered` double NOT NULL,
  `transaction_change` double NOT NULL,
  `transaction_method` varchar(50) NOT NULL,
  `transaction_status` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `transaction_timestamp`, `transaction_total`, `transaction_tendered`, `transaction_change`, `transaction_method`, `transaction_status`, `user_id`) VALUES
(1, '2019-08-15', 2796, 3000, 204, 'COD', 'Delivered', 2),
(2, '2019-08-15', 2796, 0, 0, 'COD', 'Processing', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_lastname` varchar(45) DEFAULT NULL,
  `user_firstname` varchar(45) DEFAULT NULL,
  `user_address` varchar(45) DEFAULT NULL,
  `user_birthdate` date DEFAULT NULL,
  `user_gender` varchar(45) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(80) NOT NULL,
  `user_role` varchar(11) NOT NULL,
  `user_photo` varchar(225) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_lastname`, `user_firstname`, `user_address`, `user_birthdate`, `user_gender`, `user_email`, `user_password`, `user_role`, `user_photo`, `createdAt`, `updatedAt`) VALUES
(1, 'Abrasaldo', 'Adrian Manuel', 'Santol Street, San Nicolas Buhangin Davao Cit', '2019-08-14', 'Male', 'adrianmanuelabrasaldo@yahoo.com', '$2b$10$6FT2BeE1NasvnP3VBLjeEeGncZcLGQGMvDBhFbOwii7q//Zi3kMJ.', 'admin', 'default_user.jpg', '2019-08-12', '2019-08-12'),
(2, 'Padilla', 'Bella', 'Santo Nino St, Maa Davao City', '2019-08-13', 'Male', 'bellapadilla@yaho.com', '$2b$10$2A.X4Jc3QWJzPOrJ5JYRUOR/0Pp3u/t8DUEMaBBphUyRj/IoXxDay', 'user', 'default_user.jpg', '2019-08-12', '2019-08-12'),
(3, 'Steinfeld', 'Hailee', 'San Diego, California', '2019-08-13', 'Male', 'HaileeSteinfeld@yahoo.com', '$2b$10$wZ7RN9xaRPiTyIUxGFUdtu0JmHREo/1GVDdwXt1w7r8THsgr7peoa', 'user', 'default_user.jpg', '2019-08-13', '2019-08-13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`product_img_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`sub_category_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(150) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `product_img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `sub_category_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
