-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 09:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `implicit_feedback_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL,
  `total_user_clicks` int(11) DEFAULT NULL,
  `total_mouse_movement_y` int(11) DEFAULT NULL,
  `total_mouse_movement_x` int(11) DEFAULT NULL,
  `total_user_scroll` int(11) DEFAULT NULL,
  `total_key_strokes` int(11) DEFAULT NULL,
  `total_active_time` int(11) DEFAULT NULL,
  `total_mouse_distance` int(11) DEFAULT NULL,
  `total_mouse_speed` int(11) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `userID` varchar(256) DEFAULT NULL,
  `total_copy` int(11) DEFAULT NULL,
  `openTimeStamp` timestamp NULL DEFAULT NULL,
  `closeTimeStamp` timestamp NULL DEFAULT NULL,
  `velocity_time_count` int(11) DEFAULT NULL,
  `average_mouse_speed` int(11) DEFAULT NULL,
  `total_text_selections` int(11) DEFAULT NULL,
  `bookmarked` int(11) DEFAULT NULL,
  `printed_document` int(11) DEFAULT NULL,
  `page_saved` int(11) DEFAULT NULL,
  `search_query` varchar(256) DEFAULT NULL,
  `user_rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `total_user_clicks`, `total_mouse_movement_y`, `total_mouse_movement_x`, `total_user_scroll`, `total_key_strokes`, `total_active_time`, `total_mouse_distance`, `total_mouse_speed`, `url`, `userID`, `total_copy`, `openTimeStamp`, `closeTimeStamp`, `velocity_time_count`, `average_mouse_speed`, `total_text_selections`, `bookmarked`, `printed_document`, `page_saved`, `search_query`, `user_rating`) VALUES
(242, 4, 17129, 1916, 584, 0, 67, 18470, 184876, 'https://www.imdb.com/title/tt0330373/', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 402, 460, 2, 0, 0, 0, 'harry potter', 1),
(243, 4, 3652, 3251, 157, 12, 106, 6199, 62121, 'https://www.britannica.com/topic/Nephilim', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 390, 159, 22, 0, 1, 1, 'nephilim in the bible', 1),
(244, 0, 171, 733, 1, 0, 19, 770, 7737, 'https://www.cdc.gov/ncbddd/adhd/index.html', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 32, 242, 0, 0, 0, 0, 'adhd', 1),
(245, 0, 438, 1096, 0, 0, 16, 1263, 12643, 'https://en.wikipedia.org/wiki/Firebreather_(film)', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 41, 308, 0, 0, 0, 0, 'firebreather', 1),
(246, 0, 4012, 1306, 132, 0, 63, 4857, 48653, 'https://fire-breather.fandom.com/wiki/Firebreather_(film)', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 274, 178, 0, 1, 0, 0, 'firebreather', 1),
(247, 1, 5010, 1377, 427, 0, 58, 5922, 59281, 'https://bibleproject.com/', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 206, 288, 1, 0, 0, 0, 'the bible project', 1),
(248, 0, 128, 700, 0, 0, 17, 738, 7388, 'https://bibleproject.com/', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 38, 194, 0, 1, 0, 0, 'the bible project', 1),
(249, 0, 809, 1181, 0, 0, 42, 1536, 15415, 'https://en.wikipedia.org/wiki/Biscuit', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 84, 184, 0, 1, 0, 0, 'biscuit', 1),
(250, 0, 1857, 2158, 0, 0, 89, 3326, 33317, 'https://en.wikipedia.org/wiki/French_fries', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 152, 219, 0, 1, 0, 0, 'fries', 1),
(251, 1, 1614, 2165, 0, 0, 29, 3030, 30472, 'https://en.wikipedia.org/wiki/Doughnut', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 272, 112, 25, 1, 0, 0, 'doughnut', 1),
(252, 7, 37029, 4505, 336, 63, 73, 40099, 401126, 'https://en.wikipedia.org/wiki/Denver', '105.113.27.22', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 340, 1180, 30, 1, 1, 1, 'denver', 1),
(254, 0, 470, 824, 0, 0, 3, 1038, 10374, 'https://en.wikipedia.org/wiki/Hansel_and_Gretel', '105.113.27.22', 0, NULL, NULL, 79, 131, 0, 0, 0, 0, 'undefined', 1),
(256, 0, 213, 613, 0, 0, 4, 672, 6790, 'https://storiestogrowby.org/story/hansel-and-gretel-bedtime-stories-for-kids/', '105.113.25.6', 0, NULL, NULL, 72, 94, 0, 0, 0, 0, 'hansel and gretel', 1),
(258, 0, 449, 596, 0, 0, 5, 783, 7866, 'https://en.wikipedia.org/wiki/Hercules', '105.113.27.22', 0, NULL, NULL, 100, 79, 0, 0, 0, 0, 'hercules', 1),
(260, 1, 3992, 2097, 254, 0, 27, 5191, 52120, 'https://en.wikipedia.org/wiki/Thor_(Marvel_Cinematic_Universe)', '105.113.27.22', 0, NULL, NULL, 406, 128, 1, 0, 0, 0, 'thor', 1),
(262, 0, 288, 213, 668, 0, 97, 370, 3731, 'https://www.marvel.com/characters/thor-thor-odinson', '105.113.26.183', 0, NULL, NULL, 37, 101, 0, 0, 0, 0, 'thor', 1),
(265, 0, 4004, 1104, 232, 0, 92, 4709, 47189, 'https://en.wikipedia.org/wiki/Steppenwolf_(character)', '105.113.27.22', 0, NULL, NULL, 172, 274, 0, 0, 0, 0, 'steppenwolf', 1),
(267, 2, 1582, 899, 166, 0, 64, 2152, 21541, 'https://en.wikipedia.org/wiki/Darkseid', '105.113.27.22', 0, NULL, NULL, 207, 104, 10, 0, 0, 0, 'darkseid', 1),
(268, 2, 19107, 2426, 1863, 0, 318, 20220, 202359, 'https://www.cbr.com/thanos-darkseid-who-stronger/#winner-darkseid', '105.113.25.0', 0, NULL, NULL, 542, 373, 4, 0, 0, 0, 'darkseid vs thanos', 1),
(270, 0, 415, 1087, 0, 0, 14, 1240, 12473, 'https://en.wikipedia.org/wiki/Mr._Peabody_%26_Sherman', '105.113.27.22', 0, NULL, NULL, 240, 52, 0, 0, 0, 0, 'peabody and sherman', 1),
(272, 2, 655, 1139, 111, 0, 38, 1396, 14037, 'https://www.imdb.com/title/tt0864835/', '105.113.27.22', 0, NULL, NULL, 241, 58, 2, 0, 0, 0, 'peabody and sherman', 1),
(274, 0, 337, 430, 0, 0, 2, 574, 5743, 'https://en.wikipedia.org/wiki/Hey_Arnold!', '105.113.27.22', 0, NULL, NULL, 64, 90, 0, 0, 0, 0, 'hey arnold', 1),
(276, 4, 1903, 1056, 91, 0, 20, 2606, 26122, 'https://www.quora.com/How-do-you-insert-the-current-timestamp-into-MySQL', '105.113.25.0', 0, NULL, NULL, 183, 143, 4, 0, 0, 0, 'how to insert current timestamp in mysql using php', 1),
(286, 1, 92, 211, 9, 0, 3, 232, 2328, 'https://livescores.biz/game_info/senegal-poland-2023-11-14', '105.113.25.0', 0, NULL, NULL, 9, 259, 0, 0, 0, 0, 'senegal vs poland', 1),
(288, 1, 358, 97, 0, 0, 3, 402, 4059, 'https://en.wikipedia.org/wiki/World_War_I', '105.113.27.22', 0, NULL, NULL, 48, 85, 1, 0, 0, 0, 'WWI', 1),
(290, 0, 497, 324, 0, 0, 5, 607, 6111, 'https://www.britannica.com/event/World-War-I', '105.113.26.183', 0, NULL, NULL, 57, 107, 0, 0, 0, 0, 'undefined', 1),
(292, 3, 1696, 1333, 165, 0, 100, 2662, 26698, 'https://en.wikipedia.org/wiki/World_War_II', '105.113.27.22', 0, NULL, NULL, 100, 267, 3, 0, 0, 0, 'wwii', 1),
(294, 1, 3771, 1452, 295, 0, 99, 4749, 47605, 'https://en.wikipedia.org/wiki/Wendy_Williams', '105.113.27.22', 0, NULL, NULL, 279, 171, 1, 0, 0, 0, 'wwii', 1),
(295, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(296, 3, 2664, 942, 528, 0, 74, 3214, 32200, 'https://www.geeksforgeeks.org/how-to-convert-javascript-datetime-to-mysql-datetime/', '105.113.27.22', 0, NULL, NULL, 178, 181, 3, 0, 0, 0, 'how to store javascript timestamp in mysql', 1),
(297, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(298, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(299, 1, 364, 283, 6, 0, 15, 539, 5407, 'https://www.history.com/topics/renaissance/renaissance', '105.113.25.0', 0, NULL, NULL, 44, 123, 2, 0, 0, 0, 'the renaissance', 1),
(300, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(301, 0, 6874, 9963, 73, 0, 56, 14078, 141380, 'https://en.wikipedia.org/wiki/Renaissance', '105.113.27.22', 0, NULL, NULL, 1493, 95, 0, 0, 0, 0, 'the renaissance', 1),
(302, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(303, 0, 125, 761, 0, 0, 21, 817, 8248, 'https://en.wikipedia.org/wiki/China', '105.113.27.22', 0, NULL, NULL, 196, 42, 0, 0, 0, 0, 'china', 1),
(304, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(305, 0, 6309, 3508, 238, 0, 29, 8910, 89407, 'https://stackoverflow.com/questions/34518417/convert-javascript-date-to-php-unix-timestamp', '105.113.27.22', 0, NULL, NULL, 666, 134, 0, 0, 0, 0, 'how to handle javascript timestamp in php', 1),
(306, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(307, 0, 99, 421, 0, 0, 100, 449, 4493, 'https://copyprogramming.com/howto/timestamp-between-javascript-and-php', '105.113.29.42', 0, NULL, NULL, 2, 2247, 0, 0, 0, 0, 'how to handle javascript timestamp in php', 1),
(308, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(309, 0, 6174, 2111, 373, 0, 68, 7816, 78388, 'https://en.wikipedia.org/wiki/Japanese_language', '105.113.27.22', 0, NULL, NULL, 502, 156, 0, 0, 0, 0, 'japanese', 1),
(310, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(311, 0, 2608, 2133, 79, 0, 14, 3944, 39644, 'https://www.britannica.com/topic/Japanese-language', '105.113.26.183', 0, NULL, NULL, 419, 95, 0, 0, 0, 0, 'japanese', 1),
(312, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(313, 0, 589, 800, 0, 0, 4, 1151, 11573, 'https://en.wikipedia.org/wiki/Japan', '105.113.27.22', 0, NULL, NULL, 86, 135, 0, 0, 0, 0, 'japanese', 1),
(314, 0, 2555, 1402, 105, 0, 8, 3620, 36355, 'https://en.wikipedia.org/wiki/French_language', '105.113.27.22', 0, NULL, NULL, 299, 122, 0, 0, 0, 0, 'french', 1),
(315, 0, 1345, 1943, 34, 0, 43, 2689, 26901, 'https://stackoverflow.com/questions/15593759/timestamp-between-javascript-and-php', '105.113.27.22', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 139, 194, 0, 0, 0, 0, 'how to handle javascript timestamp in php', 1),
(316, 0, 4164, 8084, 219, 0, 146, 11025, 111541, 'https://en.wikipedia.org/wiki/Shrek', '105.113.27.22', 0, '2023-11-15 03:53:46', '2023-11-15 03:56:12', 2325, 48, 0, 0, 0, 0, 'shrek', 1),
(317, 0, 415, 338, 9, 0, 5, 612, 6119, 'https://stackoverflow.com/questions/10065014/how-access-localstorage-using-chrome-extension', '105.113.27.22', 0, '2023-11-15 03:58:13', '2023-11-15 03:58:19', 21, 291, 0, 0, 0, 0, 'shrek', 1),
(318, 0, 0, 0, 0, 0, 23, 0, 0, 'https://www.gsa.gov/system/files/central_filing_R2-w-rE0_0Z5RDZ-i34K-pR.pdf', '105.113.29.42', 0, '2023-11-15 04:20:01', '2023-11-15 04:24:43', 0, 0, 0, 0, 0, 0, 'centralised filing system', 1),
(319, 0, 6121, 3232, 429, 0, 99, 8783, 88375, 'https://en.wikipedia.org/wiki/Ben_10', '105.113.27.22', 0, '2023-11-15 04:25:19', '2023-11-15 04:26:59', 848, 104, 0, 0, 0, 0, 'ben 10', 1),
(320, 7, 5627, 5252, 242, 0, 196, 9676, 97379, 'https://www.imdb.com/title/tt0760437/', '105.113.27.22', 0, '2023-11-15 04:28:29', '2023-11-15 04:31:46', 1404, 69, 4, 0, 0, 0, 'ben 10', 1),
(321, 0, 572, 1439, 0, 0, 24, 1745, 17535, 'https://en.wikipedia.org/wiki/Fantastic_Beasts_and_Where_to_Find_Them_(film)', '105.113.27.22', 0, '2023-11-15 04:32:27', '2023-11-15 04:36:03', 166, 106, 0, 0, 0, 0, 'fantastic beasts and where to find them', 1),
(322, 0, 666, 186, 26, 0, 9, 724, 7297, 'https://en.wikipedia.org/wiki/Justice_League:_The_Flashpoint_Paradox', '105.113.27.22', 0, '2023-11-15 04:37:51', '2023-11-15 04:38:01', 127, 57, 0, 0, 0, 0, 'flashpoint paradox', 1),
(323, 0, 1196, 1801, 28, 0, 72, 2663, 26725, 'https://www.imdb.com/title/tt1946347/', '105.113.27.22', 0, '2023-11-15 04:44:51', '2023-11-15 04:46:47', 237, 113, 0, 0, 0, 0, 'gladiators of rome', 1),
(324, 0, 19667, 16315, 928, 0, 372, 33404, 337312, 'https://en.wikipedia.org/wiki/Toy_Story', '105.113.27.22', 0, '2023-11-15 04:47:21', '2023-11-15 04:53:34', 6655, 51, 0, 0, 0, 0, 'toy story', 1),
(325, 0, 0, 0, 0, 0, 0, 0, 0, 'https://www.imdb.com/title/tt0114709/', '105.113.27.22', 0, '2023-11-15 04:54:23', '2023-11-15 04:54:24', 0, 0, 0, 0, 0, 0, 'toy story', 1),
(326, 0, 633, 1222, 0, 0, 15, 1726, 17266, 'https://www.rottentomatoes.com/m/toy_story', '105.113.29.42', 0, '2023-11-15 05:01:19', '2023-11-15 05:02:24', 89, 194, 0, 0, 0, 0, 'toy story', 1),
(327, 2, 2007, 2672, 0, 164, 98, 3673, 36884, 'https://chat.openai.com/c/32ca9d7d-e44e-4d55-a892-6b895f37eb52', '105.113.29.42', 1, '2023-11-15 05:04:10', '2023-11-15 05:05:48', 336, 110, 195, 0, 0, 0, 'toy story', 1),
(328, 4, 10833, 11216, 192, 0, 143, 18967, 190448, 'https://developer.chrome.com/docs/extensions/reference/storage/', '105.113.27.22', 2, '2023-11-15 03:59:25', '2023-11-15 05:06:32', 1789, 106, 11, 0, 0, 0, 'chrome local storage extension', 1),
(329, 0, 5565, 9076, 403, 0, 226, 13194, 133004, 'https://en.wikipedia.org/wiki/Jack_and_the_Beanstalk', 'VMzeIOT4', 0, '2023-11-15 05:07:00', '2023-11-15 05:10:46', 2599, 51, 0, 0, 0, 0, 'jack and the beanstalk', 1),
(330, 37, 23148, 45640, 0, 204, 525, 57656, 579421, 'https://web.whatsapp.com/', NULL, 0, '2023-11-15 03:44:46', '2023-11-15 05:28:22', 5767, 100, 294, 0, 0, 0, 'japanese', 1),
(331, 2, 11196, 7216, 446, 0, 88, 16180, 162071, 'https://gradcoach.com/what-is-research-methodology/', 'VMzeIOT4', 3, '2023-11-15 05:32:49', '2023-11-15 05:34:19', 613, 264, 66, 1, 2, 1, 'research methodology', 1),
(332, 2, 3672, 3959, 71, 0, 58, 6327, 63565, 'https://libguides.wits.ac.za/c.php?g=693518&p=4914913', 'VMzeIOT4', 0, '2023-11-15 05:40:18', '2023-11-15 05:41:17', 651, 98, 1, 0, 0, 0, 'research methodology', 1),
(333, 1, 4531, 1731, 332, 0, 37, 5914, 59274, 'https://solr.apache.org/', 'VMzeIOT4', 0, '2023-11-15 06:03:18', '2023-11-15 06:03:55', 231, 257, 0, 0, 0, 0, '', 1),
(334, 1, 3216, 637, 196, 0, 15, 3676, 36857, 'https://solr.apache.org/resources.html', 'VMzeIOT4', 0, '2023-11-15 06:03:57', '2023-11-15 06:04:12', 211, 175, 0, 0, 0, 0, '', 1),
(335, 0, 1783, 2321, 94, 0, 16, 3783, 37942, 'https://solr.apache.org/guide/solr/latest/getting-started/solr-tutorial.html', 'VMzeIOT4', 0, '2023-11-15 06:04:13', '2023-11-15 06:04:29', 228, 166, 0, 0, 0, 0, '', 1),
(336, 0, 3170, 449, 186, 0, 14, 3422, 34241, 'https://solr.apache.org/guide/solr/latest/getting-started/tutorial-diy.html', 'VMzeIOT4', 0, '2023-11-15 06:04:30', '2023-11-15 06:04:45', 37, 925, 0, 0, 0, 0, '', 1),
(337, 1, 3622, 5660, 127, 0, 47, 7893, 79130, 'https://lucene.apache.org/', 'VMzeIOT4', 0, '2023-11-15 06:02:33', '2023-11-15 06:08:49', 542, 146, 0, 0, 0, 0, 'lucene search', 1),
(338, 0, 231, 409, 0, 0, 3, 499, 4998, 'https://lucene.apache.org/core/8_0_0/core/overview-summary.html', 'VMzeIOT4', 0, '2023-11-15 06:35:38', '2023-11-15 06:35:41', 37, 135, 0, 0, 0, 0, 'apache lucene api', 1),
(339, 0, 2114, 204, 82, 0, 7, 2147, 21566, 'https://lucene.apache.org/core/9_1_0/index.html', 'VMzeIOT4', 0, '2023-11-15 06:35:45', '2023-11-15 06:35:52', 145, 149, 0, 0, 0, 0, 'apache lucene api', 1),
(340, 0, 6441, 3375, 207, 0, 102, 9096, 91524, 'https://lucene.apache.org/core/8_0_0/core/overview-summary.html', 'VMzeIOT4', 0, '2023-11-15 06:35:56', '2023-11-15 06:37:38', 1180, 78, 0, 0, 0, 0, 'apache lucene api', 1),
(341, 2, 2489, 3200, 0, 109, 69, 4783, 47969, 'https://chat.openai.com/c/c3de51c2-b614-4f07-83c1-6feb1155b208', 'VMzeIOT4', 0, '2023-11-15 06:38:05', '2023-11-15 06:39:27', 240, 200, 111, 0, 0, 0, 'apache lucene api', 1),
(342, 2, 4190, 5418, 34, 0, 273, 7922, 79354, 'https://www.youtube.com/watch?v=0otOwA2aNqM', 'VMzeIOT4', 0, '2023-11-15 06:39:45', '2023-11-15 06:44:18', 406, 195, 0, 0, 0, 0, 'solr api', 1),
(343, 0, 286, 381, 0, 0, 1, 509, 5099, 'https://solr.apache.org/guide/6_6/client-apis.html', 'VMzeIOT4', 0, '2023-11-15 06:44:35', '2023-11-15 06:44:37', 38, 134, 0, 0, 0, 0, 'solr api', 1),
(344, 1, 395, 134, 20, 0, 7, 449, 4514, 'https://solr.apache.org/guide/8_5/client-apis.html', 'VMzeIOT4', 0, '2023-11-15 06:44:42', '2023-11-15 06:44:49', 63, 72, 0, 0, 0, 0, 'solr api', 1),
(345, 1, 1172, 2769, 57, 0, 15, 3532, 35450, 'https://solr.apache.org/guide/8_5/introduction-to-client-apis.html#introduction-to-client-apis', 'VMzeIOT4', 0, '2023-11-15 06:44:50', '2023-11-15 06:45:06', 225, 158, 0, 0, 0, 0, '', 1),
(346, 1, 256, 879, 10, 0, 2, 1006, 10107, 'https://solr.apache.org/guide/8_5/choosing-an-output-format.html', 'VMzeIOT4', 0, '2023-11-15 06:45:07', '2023-11-15 06:45:10', 57, 177, 0, 0, 0, 0, '', 1),
(347, 1, 10824, 4259, 479, 0, 371, 13725, 137502, 'https://solr.apache.org/guide/8_5/using-solrj.html', 'VMzeIOT4', 0, '2023-11-15 06:45:11', '2023-11-15 06:51:23', 500, 275, 0, 0, 0, 0, '', 1),
(348, 1, 280, 1033, 0, 0, 5, 1164, 11700, 'https://solr.apache.org/guide/8_5/using-javascript.html', 'VMzeIOT4', 0, '2023-11-15 06:51:24', '2023-11-15 06:51:30', 155, 75, 0, 0, 0, 0, '', 1),
(349, 0, 0, 0, 0, 0, 0, 0, 0, 'https://www.searchstax.com/lp/solr-cloud-automation/?kw=solr%20configuration&cpn=20612592626&utm_term=solr%20configuration&utm_campaign=Cloud+-+Solr+HighAvailability&utm_source=adwords&utm_medium=ppc&hsa_acc=4516396159&hsa_net=adwords&hsa_grp=1579002', 'VMzeIOT4', 0, '2023-11-15 07:02:35', '2023-11-15 07:02:35', 0, 0, 0, 0, 0, 0, 'how to use apache solr in web application', 1),
(350, 1, 603, 609, 38, 0, 3, 1124, 11283, 'https://solr.apache.org/guide/8_0/solr-tutorial.html', 'VMzeIOT4', 0, '2023-11-15 07:02:40', '2023-11-15 07:02:44', 59, 191, 0, 0, 0, 0, 'how to use apache solr in web application', 1),
(351, 4, 631, 2145, 0, 0, 9, 2339, 23496, 'https://solr.apache.org/docs/8_0_0/SYSTEM_REQUIREMENTS.html', 'VMzeIOT4', 0, '2023-11-15 07:02:45', '2023-11-15 07:02:55', 232, 101, 52, 0, 0, 0, '', 1),
(352, 1, 249, 570, 0, 0, 1, 636, 6360, 'https://solr.apache.org/guide/8_0/solr-tutorial.html', 'VMzeIOT4', 0, '2023-11-15 07:02:55', '2023-11-15 07:02:57', 30, 212, 0, 0, 0, 0, '', 1),
(353, 1, 1449, 1582, 134, 0, 36, 2625, 26429, 'https://solr.apache.org/downloads.html', 'VMzeIOT4', 0, '2023-11-15 07:02:58', '2023-11-15 07:03:35', 367, 72, 0, 0, 0, 0, '', 1),
(354, 0, 5240, 1057, 212, 0, 38, 5822, 58369, 'https://cwiki.apache.org/confluence/display/solr/IntegratingSolr', 'VMzeIOT4', 0, '2023-11-15 07:05:20', '2023-11-15 07:05:59', 348, 168, 0, 0, 0, 0, '', 1),
(355, 1, 2534, 2561, 248, 0, 61, 4345, 43729, 'https://solr.apache.org/downloads.html', 'VMzeIOT4', 0, '2023-11-15 07:02:58', '2023-11-15 07:08:19', 534, 82, 0, 0, 0, 0, '', 1),
(356, 0, 2074, 8517, 39, 0, 571, 9392, 94247, 'https://solr.apache.org/downloads.html', 'VMzeIOT4', 0, '2023-11-15 06:52:42', '2023-11-15 07:08:27', 640, 147, 0, 0, 0, 0, 'download solr', 1),
(357, 0, 5203, 14553, 211, 0, 268, 17741, 178129, 'https://en.wikipedia.org/wiki/Apache_Lucene', 'VMzeIOT4', 0, '2023-11-15 06:09:00', '2023-11-15 07:08:32', 2107, 85, 0, 0, 0, 0, 'lucene search', 1),
(358, 1, 3390, 7844, 0, 72, 116, 9852, 98980, 'https://chat.openai.com/c/5f0f658c-bbe5-4885-95af-b8179204c0f1', 'VMzeIOT4', 0, '2023-11-15 07:08:51', '2023-11-15 07:11:16', 1314, 75, 73, 0, 0, 0, 'solr tutorial', 1),
(359, 0, 152, 657, 0, 0, 3, 706, 7079, 'file:///C:/Users/LENOVO%20X220/Downloads/solr-9.4.0/solr-9.4.0/docs/index.html', 'VMzeIOT4', 0, '2023-11-15 07:20:57', '2023-11-15 07:21:00', 61, 116, 0, 0, 0, 0, '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=360;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
