-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 16, 2021 at 11:53 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `hivechat`
--

-- --------------------------------------------------------

--
-- Table structure for table `perch3_backup_plans`
--

CREATE TABLE `perch3_backup_plans` (
  `planID` int(11) UNSIGNED NOT NULL,
  `planTitle` char(255) NOT NULL DEFAULT '',
  `planRole` enum('all','db') NOT NULL DEFAULT 'all',
  `planCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `planCreatedBy` char(32) NOT NULL DEFAULT '',
  `planUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `planUpdatedBy` char(32) NOT NULL DEFAULT '',
  `planActive` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `planDynamicFields` text NOT NULL,
  `planFrequency` int(10) UNSIGNED NOT NULL DEFAULT '24',
  `planBucket` char(16) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_backup_resources`
--

CREATE TABLE `perch3_backup_resources` (
  `planID` int(10) UNSIGNED NOT NULL,
  `resourceID` int(10) UNSIGNED NOT NULL,
  `runID` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_backup_runs`
--

CREATE TABLE `perch3_backup_runs` (
  `runID` int(10) UNSIGNED NOT NULL,
  `planID` int(10) UNSIGNED NOT NULL,
  `runDateTime` datetime NOT NULL,
  `runType` enum('db','resources') NOT NULL DEFAULT 'resources',
  `runResult` enum('OK','FAILED','IN PROGRESS') NOT NULL DEFAULT 'OK',
  `runMessage` char(255) NOT NULL DEFAULT '',
  `runDbFile` char(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blogs`
--

CREATE TABLE `perch3_blogs` (
  `blogID` int(10) UNSIGNED NOT NULL,
  `blogTitle` char(255) NOT NULL DEFAULT 'Blog',
  `blogSlug` char(255) DEFAULT 'blog',
  `setSlug` char(255) DEFAULT 'blog',
  `postTemplate` char(255) DEFAULT 'post.html',
  `blogDynamicFields` mediumtext
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_blogs`
--

INSERT INTO `perch3_blogs` (`blogID`, `blogTitle`, `blogSlug`, `setSlug`, `postTemplate`, `blogDynamicFields`) VALUES
(1, 'Blog', 'blog', 'blog', 'post.html', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_authors`
--

CREATE TABLE `perch3_blog_authors` (
  `authorID` int(10) UNSIGNED NOT NULL,
  `authorGivenName` varchar(255) NOT NULL DEFAULT '',
  `authorFamilyName` varchar(255) NOT NULL DEFAULT '',
  `authorEmail` varchar(255) NOT NULL DEFAULT '',
  `authorPostCount` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `authorSlug` varchar(255) NOT NULL DEFAULT '',
  `authorImportRef` varchar(64) DEFAULT NULL,
  `authorDynamicFields` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_blog_authors`
--

INSERT INTO `perch3_blog_authors` (`authorID`, `authorGivenName`, `authorFamilyName`, `authorEmail`, `authorPostCount`, `authorSlug`, `authorImportRef`, `authorDynamicFields`) VALUES
(1, 'Jack', 'Barber', 'jack@jackbarber.co.uk', 1, 'jack-barber', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_comments`
--

CREATE TABLE `perch3_blog_comments` (
  `commentID` int(10) UNSIGNED NOT NULL,
  `postID` int(10) UNSIGNED NOT NULL,
  `commentName` varchar(255) NOT NULL DEFAULT '',
  `commentEmail` varchar(255) NOT NULL DEFAULT '',
  `commentURL` varchar(255) NOT NULL DEFAULT '',
  `commentIP` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `commentDateTime` datetime NOT NULL,
  `commentHTML` text NOT NULL,
  `commentStatus` enum('LIVE','PENDING','SPAM','REJECTED') NOT NULL DEFAULT 'PENDING',
  `commentSpamData` text NOT NULL,
  `commentDynamicFields` text NOT NULL,
  `webmention` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `webmentionType` enum('comment','like','repost') DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_index`
--

CREATE TABLE `perch3_blog_index` (
  `indexID` int(10) NOT NULL,
  `itemKey` char(64) NOT NULL DEFAULT '-',
  `itemID` int(10) NOT NULL DEFAULT '0',
  `indexKey` char(64) NOT NULL DEFAULT '-',
  `indexValue` char(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_blog_index`
--

INSERT INTO `perch3_blog_index` (`indexID`, `itemKey`, `itemID`, `indexKey`, `indexValue`) VALUES
(277, 'postID', 1, '_id', '1'),
(276, 'postID', 1, 'postURLFull', 'http://hivechat.co.uk/blog/2021-01-27-test-post'),
(275, 'postID', 1, 'postURL', '/blog/2021-01-27-test-post'),
(274, 'postID', 1, 'authorImportRef', ''),
(273, 'postID', 1, 'authorSlug', 'jack-barber'),
(272, 'postID', 1, 'authorPostCount', '1'),
(271, 'postID', 1, 'authorEmail', 'jack@jackbarber.co.uk'),
(270, 'postID', 1, 'authorFamilyName', 'Barber'),
(269, 'postID', 1, 'authorGivenName', 'Jack'),
(268, 'postID', 1, 'itemRowID', ''),
(267, 'postID', 1, 'itemID', ''),
(266, 'postID', 1, 'postIsPublished', '0'),
(265, 'postID', 1, 'postMetaTemplate', 'post_meta.html'),
(264, 'postID', 1, 'postTemplate', 'post.html'),
(263, 'postID', 1, 'postAllowComments', '1'),
(262, 'postID', 1, 'postLegacyURL', ''),
(261, 'postID', 1, 'postImportID', ''),
(260, 'postID', 1, 'postCommentCount', '0'),
(259, 'postID', 1, 'sectionID', '1'),
(258, 'postID', 1, 'authorID', '1'),
(257, 'postID', 1, 'postStatus', 'Published'),
(256, 'postID', 1, 'postTags', ''),
(255, 'postID', 1, 'postDescHTML', '<p>Hello world</p>\r\n<p></p>'),
(254, 'postID', 1, 'postDescRaw', '<p>Hello world</p>\r\n<p></p>'),
(253, 'postID', 1, 'postDateTime', '2021-01-27 20:28:00'),
(252, 'postID', 1, 'postSlug', '2021-01-27-test-post'),
(251, 'postID', 1, 'postTitle', 'Test Post'),
(250, 'postID', 1, 'blogID', '1'),
(249, 'postID', 1, 'postID', '1'),
(248, 'postID', 1, 'image', '/perch/resources/lucas-carl-pqfuaviwngm-unsplash.jpg'),
(247, 'postID', 1, 'excerpt', 'Hello world'),
(399, 'postID', 2, '_id', '2'),
(398, 'postID', 2, 'postURLFull', 'http://hivechat.co.uk/blog/2021-01-27-welcome-to-hivechat'),
(397, 'postID', 2, 'postURL', '/blog/2021-01-27-welcome-to-hivechat'),
(396, 'postID', 2, 'authorImportRef', ''),
(395, 'postID', 2, 'authorSlug', 'jack-barber'),
(394, 'postID', 2, 'authorPostCount', '1'),
(393, 'postID', 2, 'authorEmail', 'jack@jackbarber.co.uk'),
(392, 'postID', 2, 'authorFamilyName', 'Barber'),
(391, 'postID', 2, 'authorGivenName', 'Jack'),
(390, 'postID', 2, 'itemRowID', ''),
(389, 'postID', 2, 'itemID', ''),
(388, 'postID', 2, 'postIsPublished', '0'),
(387, 'postID', 2, 'postMetaTemplate', 'post_meta.html'),
(386, 'postID', 2, 'postTemplate', 'post.html'),
(385, 'postID', 2, 'postAllowComments', '1'),
(384, 'postID', 2, 'postLegacyURL', ''),
(383, 'postID', 2, 'postImportID', ''),
(382, 'postID', 2, 'postCommentCount', '0'),
(381, 'postID', 2, 'sectionID', '1'),
(380, 'postID', 2, 'authorID', '1'),
(379, 'postID', 2, 'postStatus', 'Published'),
(378, 'postID', 2, 'postTags', ''),
(377, 'postID', 2, 'postDescHTML', '<p><strong>Hivechat is an online communication platform. It\'s designed to be simple to use. But it\'s also powerful. Hivechat combines various aspects of existing communication tools. By bringing familiar technologies together in a single place ideas can g'),
(376, 'postID', 2, 'postDescRaw', '<p><strong>Hivechat is an online communication platform. It\'s designed to be simple to use. But it\'s also powerful. Hivechat combines various aspects of existing communication tools. By bringing familiar technologies together in a single place ideas can g'),
(375, 'postID', 2, 'postDateTime', '2021-01-27 20:38:00'),
(374, 'postID', 2, 'postSlug', '2021-01-27-welcome-to-hivechat'),
(373, 'postID', 2, 'postTitle', 'Welcome to Hivechat'),
(372, 'postID', 2, 'blogID', '1'),
(371, 'postID', 2, 'postID', '2'),
(370, 'postID', 2, 'image', '/perch/resources/lucas-carl-pqfuaviwngm-unsplash.jpg'),
(369, 'postID', 2, 'excerpt', 'Hivechat is an online communication platform. It’s designed to be simple to use. But it’s also powerful. Hivechat combines various aspects of existing communication tools. By bringing familiar technologies together in a single place ideas can grow without');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_posts`
--

CREATE TABLE `perch3_blog_posts` (
  `postID` int(11) NOT NULL,
  `blogID` int(10) UNSIGNED DEFAULT '1',
  `postTitle` varchar(255) NOT NULL DEFAULT '',
  `postSlug` varchar(255) NOT NULL DEFAULT '',
  `postDateTime` datetime DEFAULT NULL,
  `postDescRaw` text,
  `postDescHTML` text,
  `postDynamicFields` mediumtext,
  `postTags` varchar(255) NOT NULL DEFAULT '',
  `postStatus` enum('Published','Draft') NOT NULL DEFAULT 'Published',
  `authorID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `sectionID` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `postCommentCount` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `postImportID` varchar(64) DEFAULT NULL,
  `postLegacyURL` varchar(255) DEFAULT NULL,
  `postAllowComments` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `postTemplate` varchar(255) NOT NULL DEFAULT 'post.html',
  `postMetaTemplate` varchar(255) NOT NULL DEFAULT 'post_meta.html',
  `postIsPublished` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `perch3_blog_posts`
--

INSERT INTO `perch3_blog_posts` (`postID`, `blogID`, `postTitle`, `postSlug`, `postDateTime`, `postDescRaw`, `postDescHTML`, `postDynamicFields`, `postTags`, `postStatus`, `authorID`, `sectionID`, `postCommentCount`, `postImportID`, `postLegacyURL`, `postAllowComments`, `postTemplate`, `postMetaTemplate`, `postIsPublished`) VALUES
(2, 1, 'Welcome to Hivechat', '2021-01-27-welcome-to-hivechat', '2021-01-27 20:38:00', '<p><strong>Hivechat is an online communication platform. It\'s designed to be simple to use. But it\'s also powerful. Hivechat combines various aspects of existing communication tools. By bringing familiar technologies together in a single place ideas can grow without the distraction of having to learn yet another platform. Join Hivechat today and bring your ideas to life through effective and efficient online communication.</strong></p>\r\n<h2>A Conduit for Focussed Communication</h2>\r\n<p>Hivechat was created to provide a simple way to share ideas online. The internet is full of useful information, but it\'s also overwhelming. Wikipedia, YouTube, Google,&nbsp;Facebook... where do you go to find information? Usually there\'s no single answer.</p>\r\n<p>With Hivechat, we wanted to create a platform which would allow people to share ideas and information and facilitate conversation in a single location. Hivechat incorporates video, documents, Zoom meetings, images, interactive chat and a variety of other communication technologies. Use whichever tools are appropriate for the information you wish to share - then watch your idea grow.</p>\r\n<h2>Simple To Use, Yet Powerful</h2><p>Hivechat is simple to use. Sign up in a matter of seconds and begin creating your content. At Hivechat we call a single page of content a \'cell\'.&nbsp;Cells can be connected to form a larger body of content, or standalone as an individual concept or idea.</p><p>Behind the scenes the Hivechat platform keeps everything running smoothly. You can search the platform for keywords or phrases and keep track of ongoing discussions by subscribing to any cells which interest you.</p>\r\n<h2>Accessible to Everyone</h2><p>Hivechat is free to use and works across all devices. It\'s web-based so it\'ll run in any web browser.</p><p>So, what\'s stopping you? <a href=\"/admin\">Get started today!</a></p>', '<p><strong>Hivechat is an online communication platform. It\'s designed to be simple to use. But it\'s also powerful. Hivechat combines various aspects of existing communication tools. By bringing familiar technologies together in a single place ideas can grow without the distraction of having to learn yet another platform. Join Hivechat today and bring your ideas to life through effective and efficient online communication.</strong></p>\r\n<h2>A Conduit for Focussed Communication</h2>\r\n<p>Hivechat was created to provide a simple way to share ideas online. The internet is full of useful information, but it\'s also overwhelming. Wikipedia, YouTube, Google,&nbsp;Facebook... where do you go to find information? Usually there\'s no single answer.</p>\r\n<p>With Hivechat, we wanted to create a platform which would allow people to share ideas and information and facilitate conversation in a single location. Hivechat incorporates video, documents, Zoom meetings, images, interactive chat and a variety of other communication technologies. Use whichever tools are appropriate for the information you wish to share - then watch your idea grow.</p>\r\n<h2>Simple To Use, Yet Powerful</h2><p>Hivechat is simple to use. Sign up in a matter of seconds and begin creating your content. At Hivechat we call a single page of content a \'cell\'.&nbsp;Cells can be connected to form a larger body of content, or standalone as an individual concept or idea.</p><p>Behind the scenes the Hivechat platform keeps everything running smoothly. You can search the platform for keywords or phrases and keep track of ongoing discussions by subscribing to any cells which interest you.</p>\r\n<h2>Accessible to Everyone</h2><p>Hivechat is free to use and works across all devices. It\'s web-based so it\'ll run in any web browser.</p><p>So, what\'s stopping you? <a href=\"/admin\">Get started today!</a></p>', '{\"excerpt\":{\"_flang\":\"markdown\",\"raw\":\"Hivechat is an online communication platform. It\'s designed to be simple to use. But it\'s also powerful. Hivechat combines various aspects of existing communication tools. By bringing familiar technologies together in a single place ideas can grow without the distraction of having to learn yet another platform. Join Hivechat today and bring your ideas to life through effective and efficient online communication.\",\"processed\":\"<p>Hivechat is an online communication platform. It\\u2019s designed to be simple to use. But it\\u2019s also powerful. Hivechat combines various aspects of existing communication tools. By bringing familiar technologies together in a single place ideas can grow without the distraction of having to learn yet another platform. Join Hivechat today and bring your ideas to life through effective and efficient online communication.<\\/p>\"},\"image\":{\"assetID\":\"16\",\"title\":\"Lucas carl PQfuavIwNGM unsplash\",\"_default\":\"\\/perch\\/resources\\/lucas-carl-pqfuaviwngm-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"lucas-carl-pqfuaviwngm-unsplash.jpg\",\"size\":2617308,\"w\":5472,\"h\":3648,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"150\",\"h\":\"100\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"lucas-carl-pqfuaviwngm-unsplash-thumb@2x.jpg\",\"size\":18714,\"mime\":\"image\\/jpeg\",\"assetID\":\"17\"},\"w1024hc0\":{\"w\":\"1024\",\"h\":\"682\",\"target_w\":\"1024\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"lucas-carl-pqfuaviwngm-unsplash-w1024.jpg\",\"size\":123699,\"mime\":\"\",\"assetID\":\"18\"},\"w200h200c1\":{\"w\":\"200\",\"h\":\"200\",\"target_w\":\"200\",\"target_h\":\"200\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"lucas-carl-pqfuaviwngm-unsplash-w200h200.jpg\",\"size\":14275,\"mime\":\"\",\"assetID\":\"20\"}}},\"categories\":null}', '', 'Published', 1, 1, 0, NULL, NULL, 1, 'post.html', 'post_meta.html', 0);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_posts_to_tags`
--

CREATE TABLE `perch3_blog_posts_to_tags` (
  `postID` int(11) NOT NULL DEFAULT '0',
  `tagID` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_sections`
--

CREATE TABLE `perch3_blog_sections` (
  `sectionID` int(11) NOT NULL,
  `blogID` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `sectionTitle` varchar(255) NOT NULL DEFAULT '',
  `sectionSlug` varchar(255) NOT NULL DEFAULT '',
  `sectionPostCount` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `sectionDynamicFields` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `perch3_blog_sections`
--

INSERT INTO `perch3_blog_sections` (`sectionID`, `blogID`, `sectionTitle`, `sectionSlug`, `sectionPostCount`, `sectionDynamicFields`) VALUES
(1, 1, 'Posts', 'posts', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_tags`
--

CREATE TABLE `perch3_blog_tags` (
  `tagID` int(11) NOT NULL,
  `tagTitle` varchar(255) NOT NULL DEFAULT '',
  `tagSlug` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_blog_webmention_queue`
--

CREATE TABLE `perch3_blog_webmention_queue` (
  `entryID` int(10) UNSIGNED NOT NULL,
  `entryCreated` timestamp NOT NULL DEFAULT '2000-01-01 00:00:00',
  `entrySource` char(255) NOT NULL DEFAULT '',
  `entryTarget` char(255) NOT NULL DEFAULT '',
  `entryType` enum('post','comment') NOT NULL DEFAULT 'post',
  `entryFK` int(10) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_categories`
--

CREATE TABLE `perch3_categories` (
  `catID` int(10) NOT NULL,
  `setID` int(10) UNSIGNED NOT NULL,
  `catParentID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `catTitle` char(64) NOT NULL DEFAULT '',
  `catSlug` char(64) NOT NULL DEFAULT '',
  `catPath` char(255) NOT NULL DEFAULT '',
  `catDisplayPath` char(255) NOT NULL DEFAULT '',
  `catOrder` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `catTreePosition` char(255) NOT NULL DEFAULT '000',
  `catDynamicFields` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_category_counts`
--

CREATE TABLE `perch3_category_counts` (
  `countID` int(10) UNSIGNED NOT NULL,
  `catID` int(10) UNSIGNED NOT NULL,
  `countType` char(64) NOT NULL DEFAULT '',
  `countValue` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_category_sets`
--

CREATE TABLE `perch3_category_sets` (
  `setID` int(10) NOT NULL,
  `setTitle` char(64) NOT NULL DEFAULT '',
  `setSlug` char(64) NOT NULL DEFAULT '',
  `setTemplate` char(255) NOT NULL DEFAULT 'set.html',
  `setCatTemplate` char(255) NOT NULL DEFAULT 'category.html',
  `setDynamicFields` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_category_sets`
--

INSERT INTO `perch3_category_sets` (`setID`, `setTitle`, `setSlug`, `setTemplate`, `setCatTemplate`, `setDynamicFields`) VALUES
(1, 'Blog', 'blog', '~/perch_blog/templates/blog/category_set.html', '~/perch_blog/templates/blog/category.html', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_cells`
--

CREATE TABLE `perch3_cells` (
  `cellID` int(11) NOT NULL,
  `hiveID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `cellTitle` varchar(255) NOT NULL,
  `cellDateTime` datetime NOT NULL,
  `cellLive` varchar(255) NOT NULL,
  `cellDynamicFields` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `perch3_cells`
--

INSERT INTO `perch3_cells` (`cellID`, `hiveID`, `memberID`, `cellTitle`, `cellDateTime`, `cellLive`, `cellDynamicFields`) VALUES
(3, 4, 1, 'Create an Account', '0000-00-00 00:00:00', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"<p>To get started with Hivechat, visit <a href=\\\"http:\\/\\/hivechat.com\\/admin\\\" target=\\\"_blank\\\">hivechat.com\\/admin<\\/a> and register for an account. It\'s free. We just need your name, email address and a secure password to get started.<\\/p>\\r\\n<p>Once you\'ve registered your account you can sign in to the platform. You\'ll find options to manage your account settings, if you need to change your email address or password, for example.<\\/p>\\r\\n<p>You\'ll also find that you can proceed with creating your own Hivechat Hives - which we\'ll cover in the next Cell.<\\/p>\",\"processed\":\"<p>To get started with Hivechat, visit <a href=\\\"http:\\/\\/hivechat.com\\/admin\\\" target=\\\"_blank\\\">hivechat.com\\/admin<\\/a> and register for an account. It\'s free. We just need your name, email address and a secure password to get started.<\\/p>\\r\\n<p>Once you\'ve registered your account you can sign in to the platform. You\'ll find options to manage your account settings, if you need to change your email address or password, for example.<\\/p>\\r\\n<p>You\'ll also find that you can proceed with creating your own Hivechat Hives - which we\'ll cover in the next Cell.<\\/p>\"},\"video\":\"\"}'),
(4, 4, 1, 'Create a Hive', '0000-00-00 00:00:00', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"<p>In Hivechat, a Hive is a container for a number of distinct Cells. Hives are given a title and a short introduction. These introduce the big idea - the purpose and scope of the information you want to share.<\\/p><p>For example, you could think of a Hive as a container for a number of pieces of information grouped around a similar theme. Or, a Hive could act as a container for a similar kind of information. You might want to group all your poems or short stories in a single Hive, for instance.<\\/p><p>To create a Hive, click \'Your Hives\' from the main menu. You\'ll then see a form which allows you to create a Hive. Enter a title and choose an appropriate category - this is used to help people find information relevant to them. Once you\'ve created your Hive you\'ll see it listed - you can then click \'Manage\' which will give you more options and settings to help you make the most of the Hivechat platform.<\\/p><p>You\'re free to experiment and come up with a structure which suits you and the information you want to share on Hivechat. The key thing to remember is that the Hive is a collection of information, but not the information itself. That is stored in individual Cells.<\\/p>\",\"processed\":\"<p>In Hivechat, a Hive is a container for a number of distinct Cells. Hives are given a title and a short introduction. These introduce the big idea - the purpose and scope of the information you want to share.<\\/p><p>For example, you could think of a Hive as a container for a number of pieces of information grouped around a similar theme. Or, a Hive could act as a container for a similar kind of information. You might want to group all your poems or short stories in a single Hive, for instance.<\\/p><p>To create a Hive, click \'Your Hives\' from the main menu. You\'ll then see a form which allows you to create a Hive. Enter a title and choose an appropriate category - this is used to help people find information relevant to them. Once you\'ve created your Hive you\'ll see it listed - you can then click \'Manage\' which will give you more options and settings to help you make the most of the Hivechat platform.<\\/p><p>You\'re free to experiment and come up with a structure which suits you and the information you want to share on Hivechat. The key thing to remember is that the Hive is a collection of information, but not the information itself. That is stored in individual Cells.<\\/p>\"},\"video\":\"\"}'),
(5, 4, 1, 'Create a Cell', '0000-00-00 00:00:00', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"<p>To create your Cells visit the Your Hives page, then click \'Manage\' under any of your Hives. Use the \'Create a Cell\' form to create as many Cells as you need.&nbsp;Each one gets a title and a date\\/time (if applicable).<\\/p>\\r\\n<p>Once created you\'ll see your Cells listed within the Hive page. Click \'Manage\' under any individual Cell to make any changes to your Cell.<\\/p>\\r\\n<p>There are lots of ways you can add information to a Cell, for example:<\\/p>\\r\\n<ul><li>Text - you can include an unlimited amount of text, so you can use Hivechat as a kind of blog paltform, if you like<\\/li><li>Video - embed videos from YouTube (or anywhere else), simply copy and paste any \'embed\' code into the Hivechat system<\\/li><li>Live Chat - you can include a chat feature on your page, you\'ll be notified of any comments and can respond as appropriate<\\/li><li>Question & Answer - allow people to ask specific questions, then post your answer below<\\/li><li>Documents - upload PDFs, Office documents and image, share them directly from your Cell<\\/li><\\/ul><p>We\'re planning on adding more communication tools over the coming months and we\'d love to hear your feedback. So <a href=\\\"\\/contact\\\" target=\\\"_blank\\\">let us know<\\/a> if you have any suggestions.<\\/p>\",\"processed\":\"<p>To create your Cells visit the Your Hives page, then click \'Manage\' under any of your Hives. Use the \'Create a Cell\' form to create as many Cells as you need.&nbsp;Each one gets a title and a date\\/time (if applicable).<\\/p>\\r\\n<p>Once created you\'ll see your Cells listed within the Hive page. Click \'Manage\' under any individual Cell to make any changes to your Cell.<\\/p>\\r\\n<p>There are lots of ways you can add information to a Cell, for example:<\\/p>\\r\\n<ul><li>Text - you can include an unlimited amount of text, so you can use Hivechat as a kind of blog paltform, if you like<\\/li><li>Video - embed videos from YouTube (or anywhere else), simply copy and paste any \'embed\' code into the Hivechat system<\\/li><li>Live Chat - you can include a chat feature on your page, you\'ll be notified of any comments and can respond as appropriate<\\/li><li>Question & Answer - allow people to ask specific questions, then post your answer below<\\/li><li>Documents - upload PDFs, Office documents and image, share them directly from your Cell<\\/li><\\/ul><p>We\'re planning on adding more communication tools over the coming months and we\'d love to hear your feedback. So <a href=\\\"\\/contact\\\" target=\\\"_blank\\\">let us know<\\/a> if you have any suggestions.<\\/p>\"},\"video\":\"\"}'),
(6, 4, 1, 'Share Your Hive', '0000-00-00 00:00:00', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"<p>Once you\'ve create your Hive and any number of Cells you can choose to make them \'live\'. Any Hive or Cell which is \'live\' is available to view via our website.&nbsp;They can also be shared using the URLs shown on the individual Hive and Cell pages<\\/p><p>Why not share your Hive pages with your contacts on other platforms, like Facebook or Twitter, if you use them? Alternatively, you can send the links via email, WhatsApp or any other messaging service.<\\/p><p>Hives and Cells which are \'live\' are accessible to search engines like Google via our website. Your ideas and information will be crawled and could be discovered by people search the internet for a particular topic.<\\/p><p><strong>Need to delete something?<\\/strong><\\/p><p>No problem! You\'re in control. Simply hit the red \'Delete\' button on any Hive or Cell page and your content will be immediately removed. However, we\'d recommend only doing this when necessary. Even if your ideas aren\'t fully formed, keeping them online can provide a valuable resource for others thinking similar thoughts.<\\/p>\",\"processed\":\"<p>Once you\'ve create your Hive and any number of Cells you can choose to make them \'live\'. Any Hive or Cell which is \'live\' is available to view via our website.&nbsp;They can also be shared using the URLs shown on the individual Hive and Cell pages<\\/p><p>Why not share your Hive pages with your contacts on other platforms, like Facebook or Twitter, if you use them? Alternatively, you can send the links via email, WhatsApp or any other messaging service.<\\/p><p>Hives and Cells which are \'live\' are accessible to search engines like Google via our website. Your ideas and information will be crawled and could be discovered by people search the internet for a particular topic.<\\/p><p><strong>Need to delete something?<\\/strong><\\/p><p>No problem! You\'re in control. Simply hit the red \'Delete\' button on any Hive or Cell page and your content will be immediately removed. However, we\'d recommend only doing this when necessary. Even if your ideas aren\'t fully formed, keeping them online can provide a valuable resource for others thinking similar thoughts.<\\/p>\"},\"video\":\"\"}'),
(7, 23, 1, 'Hivechat MVP', '0000-00-00 00:00:00', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"<p>So, this is it. You\'re using it. This is the Hivechat MVP (that stands for Minimum Viable Product). Under the hood this site is built on Perch Runway. Perch is a great CMS, but it\'s also a great platform for building bespoke web applications which plug-in to \'standard\' websites. <br><\\/p><p>Hivechat is a bit of a hybrid - part website, part web-application. Subsequently, Perch is a good option for building the Hivechat platform.<\\/p>\",\"processed\":\"<p>So, this is it. You\'re using it. This is the Hivechat MVP (that stands for Minimum Viable Product). Under the hood this site is built on Perch Runway. Perch is a great CMS, but it\'s also a great platform for building bespoke web applications which plug-in to \'standard\' websites. <br><\\/p><p>Hivechat is a bit of a hybrid - part website, part web-application. Subsequently, Perch is a good option for building the Hivechat platform.<\\/p>\"},\"video\":\"\"}');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_collections`
--

CREATE TABLE `perch3_collections` (
  `collectionID` int(10) NOT NULL,
  `collectionKey` char(64) NOT NULL DEFAULT '',
  `collectionOrder` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `collectionTemplate` char(255) NOT NULL DEFAULT '',
  `collectionOptions` text NOT NULL,
  `collectionSearchable` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `collectionEditRoles` char(255) NOT NULL DEFAULT '*',
  `collectionPublishRoles` char(255) NOT NULL DEFAULT '*',
  `collectionUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `collectionInAppMenu` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_collection_index`
--

CREATE TABLE `perch3_collection_index` (
  `indexID` int(10) NOT NULL,
  `itemID` int(10) NOT NULL DEFAULT '0',
  `collectionID` int(10) NOT NULL DEFAULT '0',
  `itemRev` int(10) NOT NULL DEFAULT '0',
  `indexKey` char(64) NOT NULL DEFAULT '-',
  `indexValue` char(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_collection_items`
--

CREATE TABLE `perch3_collection_items` (
  `itemRowID` int(10) UNSIGNED NOT NULL,
  `itemID` int(10) UNSIGNED NOT NULL,
  `itemRev` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `collectionID` int(10) UNSIGNED NOT NULL,
  `itemJSON` mediumtext NOT NULL,
  `itemSearch` mediumtext NOT NULL,
  `itemUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemUpdatedBy` char(32) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_collection_revisions`
--

CREATE TABLE `perch3_collection_revisions` (
  `itemID` int(10) UNSIGNED NOT NULL,
  `collectionID` int(10) UNSIGNED NOT NULL,
  `itemOrder` int(10) UNSIGNED DEFAULT '1000',
  `itemRev` int(10) UNSIGNED NOT NULL,
  `itemLatestRev` int(10) UNSIGNED NOT NULL,
  `itemCreated` datetime NOT NULL DEFAULT '2014-02-21 06:53:00',
  `itemCreatedBy` char(32) NOT NULL DEFAULT '',
  `itemSearchable` tinyint(1) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_content_index`
--

CREATE TABLE `perch3_content_index` (
  `indexID` int(10) NOT NULL,
  `itemID` int(10) NOT NULL DEFAULT '0',
  `regionID` int(10) NOT NULL DEFAULT '0',
  `pageID` int(10) NOT NULL DEFAULT '0',
  `itemRev` int(10) NOT NULL DEFAULT '0',
  `indexKey` char(64) NOT NULL DEFAULT '-',
  `indexValue` char(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_content_index`
--

INSERT INTO `perch3_content_index` (`indexID`, `itemID`, `regionID`, `pageID`, `itemRev`, `indexKey`, `indexValue`) VALUES
(1, 1, 2, 2, 1, '_id', '1'),
(2, 1, 2, 2, 1, '_order', '1000'),
(3, 1, 2, 2, 2, '_id', '1'),
(4, 1, 2, 2, 2, '_order', '1000'),
(5, 1, 2, 2, 3, '_id', '1'),
(6, 1, 2, 2, 3, '_order', '1000'),
(7, 2, 4, 8, 1, 'text', 'Hivechat\nWe’re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat.'),
(8, 2, 4, 8, 1, '_id', '2'),
(9, 2, 4, 8, 1, '_order', '1000'),
(10, 2, 4, 8, 2, 'text', 'Hivechat\nWe’re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat.'),
(11, 2, 4, 8, 2, '_id', '2'),
(12, 2, 4, 8, 2, '_order', '1000'),
(180, 3, 3, 8, 57, '_order', '1000'),
(179, 3, 3, 8, 57, '_id', '3'),
(182, 3, 3, 8, 58, '_order', '1000'),
(181, 3, 3, 8, 58, '_id', '3'),
(114, 3, 3, 8, 51, '_order', '1000'),
(113, 3, 3, 8, 51, '_id', '3'),
(116, 3, 3, 8, 52, '_order', '1000'),
(115, 3, 3, 8, 52, '_id', '3'),
(118, 3, 3, 8, 53, '_order', '1000'),
(117, 3, 3, 8, 53, '_id', '3'),
(174, 3, 3, 8, 54, '_order', '1000'),
(173, 3, 3, 8, 54, '_id', '3'),
(176, 3, 3, 8, 55, '_order', '1000'),
(175, 3, 3, 8, 55, '_id', '3'),
(178, 3, 3, 8, 56, '_order', '1000'),
(177, 3, 3, 8, 56, '_id', '3'),
(119, 4, 7, 11, 1, '_id', '4'),
(120, 4, 7, 11, 1, '_order', '1000'),
(156, 5, 5, 9, 17, '_order', '1000'),
(155, 5, 5, 9, 17, '_id', '5'),
(168, 5, 5, 9, 18, '_order', '1000'),
(167, 5, 5, 9, 18, '_id', '5'),
(170, 5, 5, 9, 19, '_order', '1000'),
(169, 5, 5, 9, 19, '_id', '5'),
(150, 5, 5, 9, 14, '_order', '1000'),
(149, 5, 5, 9, 14, '_id', '5'),
(152, 5, 5, 9, 15, '_order', '1000'),
(151, 5, 5, 9, 15, '_id', '5'),
(154, 5, 5, 9, 16, '_order', '1000'),
(153, 5, 5, 9, 16, '_id', '5'),
(135, 6, 6, 10, 1, '_id', '6'),
(136, 6, 6, 10, 1, '_order', '1000'),
(137, 6, 6, 10, 2, '_id', '6'),
(138, 6, 6, 10, 2, '_order', '1000'),
(139, 6, 6, 10, 3, '_id', '6'),
(140, 6, 6, 10, 3, '_order', '1000'),
(145, 5, 5, 9, 12, '_id', '5'),
(146, 5, 5, 9, 12, '_order', '1000'),
(147, 5, 5, 9, 13, '_id', '5'),
(148, 5, 5, 9, 13, '_order', '1000'),
(157, 7, 8, 12, 1, '_id', '7'),
(158, 7, 8, 12, 1, '_order', '1000'),
(159, 7, 8, 12, 2, '_id', '7'),
(160, 7, 8, 12, 2, '_order', '1000'),
(161, 7, 8, 12, 3, '_id', '7'),
(162, 7, 8, 12, 3, '_order', '1000'),
(163, 7, 8, 12, 4, '_id', '7'),
(164, 7, 8, 12, 4, '_order', '1000'),
(165, 7, 8, 12, 5, '_id', '7'),
(166, 7, 8, 12, 5, '_order', '1000'),
(171, 1, 2, 2, 4, '_id', '1'),
(172, 1, 2, 2, 4, '_order', '1000'),
(183, 1, 2, 2, 5, '_id', '1'),
(184, 1, 2, 2, 5, '_order', '1000');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_content_items`
--

CREATE TABLE `perch3_content_items` (
  `itemRowID` int(10) UNSIGNED NOT NULL,
  `itemID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `regionID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `pageID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `itemRev` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `itemOrder` int(10) UNSIGNED NOT NULL DEFAULT '1000',
  `itemJSON` mediumtext NOT NULL,
  `itemSearch` mediumtext NOT NULL,
  `itemUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemUpdatedBy` char(32) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_content_items`
--

INSERT INTO `perch3_content_items` (`itemRowID`, `itemID`, `regionID`, `pageID`, `itemRev`, `itemOrder`, `itemJSON`, `itemSearch`, `itemUpdated`, `itemUpdatedBy`) VALUES
(1, 1, 2, 2, 0, 1000, '', '', '2021-01-15 10:53:56', ''),
(2, 1, 2, 2, 1, 1000, '{\"_id\":\"1\",\"_blocks\":[{\"heading\":\"Welcome to Hivechat\",\"text\":{\"_flang\":\"html\",\"raw\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.<\\/p>\",\"processed\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.<\\/p>\"},\"_block_type\":\"text\",\"_block_id\":\"qmz29x\",\"_block_index\":\"0\"}]}', ' Welcome to Hivechat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.    ', '2021-01-15 10:54:20', '1'),
(3, 1, 2, 2, 2, 1000, '{\"_id\":\"1\",\"_blocks\":[{\"heading\":\"Welcome to Hivechat\",\"text\":{\"_flang\":\"html\",\"raw\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.<\\/p>\",\"processed\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.<\\/p>\"},\"_block_type\":\"text\",\"_block_id\":\"qmz29x\",\"_block_index\":\"0\"}]}', ' Welcome to Hivechat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.    ', '2021-01-15 10:54:35', '1'),
(4, 1, 2, 2, 3, 1000, '{\"_id\":\"1\",\"_blocks\":[{\"heading\":\"Welcome to Hivechat\",\"text\":{\"_flang\":\"html\",\"raw\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.<\\/p>\",\"processed\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.<\\/p>\"},\"_block_type\":\"text\",\"_block_id\":\"qmz29x\",\"_block_index\":\"0\"}]}', ' Welcome to Hivechat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper libero vel urna sagittis, eu dapibus mi tempor. In porttitor finibus lobortis. Aliquam et viverra lorem, sit amet interdum ex. Pellentesque aliquet augue nec ante porttitor dignissim. Mauris porttitor arcu massa, eget suscipit lorem volutpat cursus. Integer et scelerisque libero. Duis condimentum luctus faucibus. Mauris sit amet suscipit velit, non commodo arcu. Phasellus sed quam tellus. Pellentesque nec metus felis. Vivamus volutpat congue turpis, in eleifend dui gravida sollicitudin. Praesent dapibus viverra luctus. Nunc molestie leo sed nunc egestas, in vulputate felis imperdiet.    ', '2021-01-15 10:59:42', '1'),
(5, 2, 4, 8, 0, 1000, '', '', '2021-01-27 13:26:16', ''),
(6, 2, 4, 8, 1, 1000, '{\"_id\":\"2\",\"text\":{\"_flang\":\"markdown\",\"raw\":\"### Hivechat\\r\\nWe\'re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat.\",\"processed\":\"<h3>Hivechat<\\/h3>\\n<p>We\\u2019re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat.<\\/p>\"}}', ' Hivechat\nWe’re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat. ', '2021-01-27 13:26:58', '1'),
(7, 2, 4, 8, 2, 1000, '{\"_id\":\"2\",\"text\":{\"_flang\":\"markdown\",\"raw\":\"### Hivechat\\r\\nWe\'re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat.\",\"processed\":\"<h3>Hivechat<\\/h3>\\n<p>We\\u2019re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat.<\\/p>\"}}', ' Hivechat\nWe’re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat. ', '2021-01-27 13:27:08', '1'),
(62, 4, 7, 11, 0, 1000, '', '', '2021-01-27 17:14:19', ''),
(63, 4, 7, 11, 1, 1000, '{\"_id\":\"4\",\"_blocks\":[{\"headline\":\"Thank You\",\"description\":\"We\'ll be in touch soon to discuss your query. We appreciate you taking the time to send us a message.\",\"url\":\"\\/\",\"button\":\"Home\",\"_block_type\":\"herosmall\",\"_block_id\":\"qnlrvx\",\"_block_index\":\"0\"}]}', ' Thank You We\'ll be in touch soon to discuss your query. We appreciate you taking the time to send us a message. / Home    ', '2021-01-27 17:14:53', '1'),
(74, 6, 6, 10, 0, 1000, '', '', '2021-01-27 17:22:26', ''),
(75, 6, 6, 10, 1, 1000, '{\"_id\":\"6\",\"_blocks\":[{\"headline\":\"Contact Us\",\"description\":\"Use the contact form below to get in touch with the Hivechat team. We\'d love to hear your feebdack on the project, or discuss feature requests you might have.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnls9g\",\"_block_index\":\"0\"}]}', ' Contact Us Use the contact form below to get in touch with the Hivechat team. We\'d love to hear your feebdack on the project, or discuss feature requests you might have.      ', '2021-01-27 17:23:02', '1'),
(81, 5, 5, 9, 13, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<h2>A Communication&nbsp;Tool<\\/h2><p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p><p>When you create an event in Hivechat you can choose what to include. Video?&nbsp;Text? Images? Interactive chat? Zoom? We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\",\"processed\":\"<h2>A Communication&nbsp;Tool<\\/h2><p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p><p>When you create an event in Hivechat you can choose what to include. Video?&nbsp;Text? Images? Interactive chat? Zoom? We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"<h2>Built to be Simple<\\/h2><p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p><p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\",\"processed\":\"<h2>Built to be Simple<\\/h2><p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p><p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.          A Communication&nbsp;ToolHivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.When you create an event in Hivechat you can choose what to include. Video?&nbsp;Text? Images? Interactive chat? Zoom? We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur. Built to be SimpleWhilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.    ', '2021-01-27 17:29:56', '1'),
(82, 5, 5, 9, 14, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. Video? Text? Images? Interactive chat? Zoom? We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\",\"processed\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. Video? Text? Images? Interactive chat? Zoom? We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\",\"processed\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.          A Communication&nbsp;Tool\r\nHivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.\r\nWhen you create an event in Hivechat you can choose what to include. Video? Text? Images? Interactive chat? Zoom? We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur. Built to be Simple\r\nWhilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.\r\nBehind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.    ', '2021-01-27 17:30:20', '1'),
(61, 3, 3, 8, 53, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create an Event\",\"subdesc2\":\"An event can be a single item, like a blog post, or multiple linked items, like an online conference.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create an Event An event can be a single item, like a blog post, or multiple linked items, like an online conference. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 17:13:10', '1'),
(96, 3, 3, 8, 55, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create a Cell\",\"subdesc2\":\"A \'cell\' is a single collection of content. Create multiple cells and link them together to form a hive.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create a Cell A \'cell\' is a single collection of content. Create multiple cells and link them together to form a hive. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 22:18:21', '1'),
(59, 3, 3, 8, 51, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create an Event\",\"subdesc2\":\"An event can be a single item, like a blog post, or multiple linked items, like an online conference.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create an Event An event can be a single item, like a blog post, or multiple linked items, like an online conference. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 17:06:22', '1');
INSERT INTO `perch3_content_items` (`itemRowID`, `itemID`, `regionID`, `pageID`, `itemRev`, `itemOrder`, `itemJSON`, `itemSearch`, `itemUpdated`, `itemUpdatedBy`) VALUES
(60, 3, 3, 8, 52, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create an Event\",\"subdesc2\":\"An event can be a single item, like a blog post, or multiple linked items, like an online conference.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create an Event An event can be a single item, like a blog post, or multiple linked items, like an online conference. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 17:12:33', '1'),
(85, 5, 5, 9, 17, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\",\"processed\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\",\"processed\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"},{\"intro\":\"Discover More\",\"headline\":\"We\'re using Hivechat to help built Hivechat\",\"description\":\"Our \'how-to\' information is all created within Hivechat itself. There\'s no point building a tool if you\'re not going to use it, right?\",\"list\":[{\"highlight\":\"We test every feature we build\"},{\"highlight\":\"We listen to our users and respond to requests\"},{\"highlight\":\"We\'re building Hivechat into the net\'s #1 communication tool\"}],\"buttonurl\":\"\\/how-to\",\"button\":\"Explore our How-To Guides\",\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w700hc0\":{\"w\":700,\"h\":1046,\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w700.jpg\",\"size\":160476,\"mime\":\"image\\/jpeg\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlsoi\",\"_block_index\":\"3\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.          A Communication&nbsp;Tool\r\nHivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.\r\nWhen you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur. Built to be Simple\r\nWhilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.\r\nBehind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.    Discover More We\'re using Hivechat to help built Hivechat Our \'how-to\' information is all created within Hivechat itself. There\'s no point building a tool if you\'re not going to use it, right? We test every feature we build We listen to our users and respond to requests We\'re building Hivechat into the net\'s #1 communication tool /how-to Explore our How-To Guides     ', '2021-01-27 17:33:47', '1'),
(76, 6, 6, 10, 2, 1000, '{\"_id\":\"6\",\"_blocks\":[{\"headline\":\"Contact Us\",\"description\":\"Use the contact form below to get in touch with the Hivechat team. We\'d love to hear your feebdack on the project, or discuss feature requests you might have.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnls9g\",\"_block_index\":\"0\"},{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"We want to make sure Hivechat is as useful as it can be. We\'re not building the platform in a silo - this is software for the real world.\",\"name\":\"Jack Barber\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlsan\",\"_block_index\":\"1\"}]}', ' Contact Us Use the contact form below to get in touch with the Hivechat team. We\'d love to hear your feebdack on the project, or discuss feature requests you might have.       We want to make sure Hivechat is as useful as it can be. We\'re not building the platform in a silo - this is software for the real world. Jack Barber Hivechat    ', '2021-01-27 17:23:57', '1'),
(77, 6, 6, 10, 3, 1000, '{\"_id\":\"6\",\"_blocks\":[{\"headline\":\"Contact Us\",\"description\":\"Use the contact form below to get in touch with the Hivechat team. We\'d love to hear your feebdack on the project, or discuss feature requests you might have.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnls9g\",\"_block_index\":\"0\"},{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"We want to make sure Hivechat is as useful as it can be. We\'re not building the platform in a silo - this is software for the real world.\",\"name\":\"Jack Barber\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlsan\",\"_block_index\":\"1\"}]}', ' Contact Us Use the contact form below to get in touch with the Hivechat team. We\'d love to hear your feebdack on the project, or discuss feature requests you might have.       We want to make sure Hivechat is as useful as it can be. We\'re not building the platform in a silo - this is software for the real world. Jack Barber Hivechat    ', '2021-01-27 17:24:17', '1'),
(93, 5, 5, 9, 19, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, forum or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\",\"processed\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. <a href=\\\"\\/admin\\\">Register an account<\\/a> in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\",\"processed\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. <a href=\\\"\\/admin\\\">Register an account<\\/a> in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"},{\"intro\":\"Discover More\",\"headline\":\"We\'re using Hivechat to help built Hivechat\",\"description\":\"Our \'how-to\' information is all created within Hivechat itself. There\'s no point building a tool if you\'re not going to use it, right?\",\"list\":[{\"highlight\":\"We test every feature we build\"},{\"highlight\":\"We listen to our users and respond to requests\"},{\"highlight\":\"We\'re building Hivechat into the net\'s #1 communication tool\"}],\"buttonurl\":\"\\/how-to\",\"button\":\"Explore our How-To Guides\",\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1046\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w700.jpg\",\"size\":160476,\"mime\":\"\",\"assetID\":\"12\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlsoi\",\"_block_index\":\"3\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, forum or wiki - but it does share its DNA with all of these.          A Communication&nbsp;Tool\r\nHivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.\r\nWhen you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur. Built to be Simple\r\nWhilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.\r\nBehind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.    Discover More We\'re using Hivechat to help built Hivechat Our \'how-to\' information is all created within Hivechat itself. There\'s no point building a tool if you\'re not going to use it, right? We test every feature we build We listen to our users and respond to requests We\'re building Hivechat into the net\'s #1 communication tool /how-to Explore our How-To Guides     ', '2021-01-27 20:23:13', '1'),
(80, 5, 5, 9, 12, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"A&nbsp;<h2><\\/h2>\",\"processed\":\"A&nbsp;<h2><\\/h2>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"\",\"processed\":\"\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.          A&nbsp;     ', '2021-01-27 17:26:03', '1'),
(83, 5, 5, 9, 15, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\",\"processed\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\",\"processed\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.          A Communication&nbsp;Tool\r\nHivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.\r\nWhen you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur. Built to be Simple\r\nWhilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.\r\nBehind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.    ', '2021-01-27 17:30:45', '1'),
(84, 5, 5, 9, 16, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\",\"processed\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\",\"processed\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, form or wiki - but it does share its DNA with all of these.          A Communication&nbsp;Tool\r\nHivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.\r\nWhen you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur. Built to be Simple\r\nWhilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.\r\nBehind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.    ', '2021-01-27 17:31:04', '1'),
(86, 7, 8, 12, 0, 1000, '', '', '2021-01-27 17:34:37', ''),
(87, 7, 8, 12, 1, 1000, '{\"_id\":\"7\",\"_blocks\":[{\"headline\":\"How To\",\"description\":\"Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlstr\",\"_block_index\":\"0\"}]}', ' How To Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.      ', '2021-01-27 17:35:09', '1'),
(88, 7, 8, 12, 2, 1000, '{\"_id\":\"7\",\"_blocks\":[{\"headline\":\"How To\",\"description\":\"Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlstr\",\"_block_index\":\"0\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<p>Coming soon.<\\/p>\",\"processed\":\"<p>Coming soon.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"\",\"processed\":\"\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsuy\",\"_block_index\":\"1\"}]}', ' How To Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.      Coming soon.     ', '2021-01-27 17:35:29', '1'),
(89, 7, 8, 12, 3, 1000, '{\"_id\":\"7\",\"_blocks\":[{\"headline\":\"How To\",\"description\":\"Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlstr\",\"_block_index\":\"0\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<p><strong>Won\'t be long...<\\/strong> \'How To\' guides are coming soon.<\\/p>\",\"processed\":\"<p><strong>Won\'t be long...<\\/strong> \'How To\' guides are coming soon.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"\",\"processed\":\"\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsuy\",\"_block_index\":\"1\"}]}', ' How To Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.      Won\'t be long... \'How To\' guides are coming soon.     ', '2021-01-27 17:35:57', '1'),
(90, 7, 8, 12, 4, 1000, '{\"_id\":\"7\",\"_blocks\":[{\"headline\":\"How To\",\"description\":\"Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlstr\",\"_block_index\":\"0\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<p><strong>Sorry, no quite readt yet, but won\'t be long...<\\/strong> \'How To\' guides are coming soon!<\\/p>\",\"processed\":\"<p><strong>Sorry, no quite readt yet, but won\'t be long...<\\/strong> \'How To\' guides are coming soon!<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"\",\"processed\":\"\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsuy\",\"_block_index\":\"1\"}]}', ' How To Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.      Sorry, no quite readt yet, but won\'t be long... \'How To\' guides are coming soon!     ', '2021-01-27 17:36:18', '1'),
(91, 7, 8, 12, 5, 1000, '{\"_id\":\"7\",\"_blocks\":[{\"headline\":\"How To\",\"description\":\"Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlstr\",\"_block_index\":\"0\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<p><strong>Sorry, no quite readt yet, but won\'t be long...<\\/strong> <br>\'How To\' guides are coming soon!<\\/p>\",\"processed\":\"<p><strong>Sorry, no quite readt yet, but won\'t be long...<\\/strong> <br>\'How To\' guides are coming soon!<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"\",\"processed\":\"\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsuy\",\"_block_index\":\"1\"}]}', ' How To Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.      Sorry, no quite readt yet, but won\'t be long... \'How To\' guides are coming soon!     ', '2021-01-27 17:36:28', '1'),
(92, 5, 5, 9, 18, 1000, '{\"_id\":\"5\",\"_blocks\":[{\"headline\":\"About Hivechat\",\"description\":\"Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, forum or wiki - but it does share its DNA with all of these.\",\"url\":null,\"button\":null,\"_block_type\":\"herosmall\",\"_block_id\":\"qnlry5\",\"_block_index\":\"0\"},{\"images\":[{\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w1440h768c1\":{\"w\":\"1440\",\"h\":\"768\",\"target_w\":\"1440\",\"target_h\":\"768\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\",\"size\":127175,\"mime\":\"\",\"assetID\":\"11\"}}}}],\"_block_type\":\"slider\",\"_block_id\":\"qnls7x\",\"_block_index\":\"1\"},{\"left\":{\"_flang\":\"html\",\"raw\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\",\"processed\":\"<h2>A Communication&nbsp;Tool<\\/h2>\\r\\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.<\\/p>\\r\\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.<\\/p>\"},\"right\":{\"_flang\":\"html\",\"raw\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\",\"processed\":\"<h2>Built to be Simple<\\/h2>\\r\\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.<\\/p>\\r\\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.<\\/p>\"},\"_block_type\":\"columns\",\"_block_id\":\"qnlsf2\",\"_block_index\":\"2\"},{\"intro\":\"Discover More\",\"headline\":\"We\'re using Hivechat to help built Hivechat\",\"description\":\"Our \'how-to\' information is all created within Hivechat itself. There\'s no point building a tool if you\'re not going to use it, right?\",\"list\":[{\"highlight\":\"We test every feature we build\"},{\"highlight\":\"We listen to our users and respond to requests\"},{\"highlight\":\"We\'re building Hivechat into the net\'s #1 communication tool\"}],\"buttonurl\":\"\\/how-to\",\"button\":\"Explore our How-To Guides\",\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1046\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w700.jpg\",\"size\":160476,\"mime\":\"\",\"assetID\":\"12\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlsoi\",\"_block_index\":\"3\"}]}', ' About Hivechat Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, forum or wiki - but it does share its DNA with all of these.          A Communication&nbsp;Tool\r\nHivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.\r\nWhen you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur. Built to be Simple\r\nWhilst easy to use, Hivechat\'s simplicity is key to its success. Register an account in a few seconds, then start creating your events.\r\nBehind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.    Discover More We\'re using Hivechat to help built Hivechat Our \'how-to\' information is all created within Hivechat itself. There\'s no point building a tool if you\'re not going to use it, right? We test every feature we build We listen to our users and respond to requests We\'re building Hivechat into the net\'s #1 communication tool /how-to Explore our How-To Guides     ', '2021-01-27 20:22:27', '1'),
(94, 1, 2, 2, 4, 1000, '{\"_id\":\"1\",\"_blocks\":[{\"heading\":\"Welcome to Hivechat\",\"text\":{\"_flang\":\"html\",\"raw\":\"<p>Thanks for using Hivechat. From here you can manage your account settings, create your own Hivechat Cells and interact with others.<\\/p><ul><li><a href=\\\"\\/admin\\/account\\\">Your Account<\\/a><\\/li><li><a href=\\\"\\/admin\\/cell\\/create\\\">Create a Cell<\\/a><\\/li><li><a href=\\\"\\/admin\\/cells\\\">Your Cells<\\/a><\\/li><\\/ul>\",\"processed\":\"<p>Thanks for using Hivechat. From here you can manage your account settings, create your own Hivechat Cells and interact with others.<\\/p><ul><li><a href=\\\"\\/admin\\/account\\\">Your Account<\\/a><\\/li><li><a href=\\\"\\/admin\\/cell\\/create\\\">Create a Cell<\\/a><\\/li><li><a href=\\\"\\/admin\\/cells\\\">Your Cells<\\/a><\\/li><\\/ul>\"},\"_block_type\":\"text\",\"_block_id\":\"qmz29x\",\"_block_index\":\"0\"}]}', ' Welcome to Hivechat Thanks for using Hivechat. From here you can manage your account settings, create your own Hivechat Cells and interact with others.Your AccountCreate a CellYour Cells    ', '2021-01-27 20:59:35', '1');
INSERT INTO `perch3_content_items` (`itemRowID`, `itemID`, `regionID`, `pageID`, `itemRev`, `itemOrder`, `itemJSON`, `itemSearch`, `itemUpdated`, `itemUpdatedBy`) VALUES
(95, 3, 3, 8, 54, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create a Cell\",\"subdesc2\":\"A \'cell\' is a single collection of content, like a blog post. Create multiple cells and link them together.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create a Cell A \'cell\' is a single collection of content, like a blog post. Create multiple cells and link them together. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 22:17:44', '1'),
(97, 3, 3, 8, 56, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create a Cell\",\"subdesc2\":\"A \'cell\' is a single collection of content. Create multiple cells and link them together to form a \'hive\'.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create a Cell A \'cell\' is a single collection of content. Create multiple cells and link them together to form a \'hive\'. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 22:18:43', '1'),
(98, 3, 3, 8, 57, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create a Cell\",\"subdesc2\":\"A \'cell\' is a single collection of content. Link multiple cells together to form a \'hive\'.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create a Cell A \'cell\' is a single collection of content. Link multiple cells together to form a \'hive\'. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your event. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 22:19:01', '1'),
(99, 3, 3, 8, 58, 1000, '{\"_id\":\"3\",\"_blocks\":[{\"headline\":\"Build Community Through Communication.\",\"description\":\"Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.\",\"subheading1\":\"Easy to Build\",\"subdescription1\":\"Our tools make it simple - include video, images, text, downloadable files and interactive elements.\",\"subheading2\":\"Easy to Share\",\"subdescription2\":\"Share your content via your favourite social networks. Get discovered by search engines like Google.\",\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1048\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w700.jpg\",\"size\":302553,\"mime\":\"\",\"assetID\":\"3\"}}},\"quote\":\"Hivechat has revolutionised how we create and distribute our online content.\",\"name\":\"James Fearnley\",\"business\":\"IPRG\",\"_block_type\":\"hero\",\"_block_id\":\"qnlk9g\",\"_block_index\":\"0\"},{\"items\":[{\"stat\":\"1+\",\"label\":\"A Growing Community\",\"description\":\"We\'re just getting started - sign up!\"},{\"stat\":\"10+\",\"label\":\"Pages of Interactive Content\",\"description\":\"Our users are creating a wide range of content\"},{\"stat\":\"100+\",\"label\":\"Visitors\",\"description\":\"A growing number of visitors learning together\"},{\"stat\":\"1000+\",\"label\":\"Ways to Use Hivechat\",\"description\":\"We\'re building a flexible and powerful platform\"}],\"_block_type\":\"achievements\",\"_block_id\":\"qnlli9\",\"_block_index\":\"1\"},{\"headline\":\"How It Works\",\"description\":\"Hivechat is designed to be simple to use. Follow the steps below to get started.\",\"subhead1\":\"Register an Account\",\"subdesc1\":\"It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!\",\"subhead2\":\"Create a Cell\",\"subdesc2\":\"A \'cell\' is a single collection of content. Link multiple cells together to form a \'hive\'.\",\"subhead3\":\"Add Your Content\",\"subdesc3\":\"Add video, text, downloads, Zoom links and more using our tools. Then share your Cell. Simple!\",\"_block_type\":\"howitworks\",\"_block_id\":\"qnlke7\",\"_block_index\":\"2\"},{\"intro\":\"Who\'s Behind Hivechat?\",\"headline\":\"This is democratic software, built by the people, for the people!\",\"description\":\"Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.\",\"list\":[{\"highlight\":\"Securely hosted in the UK\"},{\"highlight\":\"Built to be fast and accessible\"},{\"highlight\":\"Available to everyone\"}],\"buttonurl\":\"\\/about\",\"button\":\"Find Out More\",\"image\":{\"assetID\":\"4\",\"title\":\"Chuttersnap bUZONzxkW8M unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2.jpg\",\"size\":383323,\"w\":1920,\"h\":2880,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg\",\"size\":9685,\"mime\":\"image\\/jpeg\",\"assetID\":\"5\"},\"w700hc0\":{\"w\":\"700\",\"h\":\"1050\",\"target_w\":\"700\",\"target_h\":false,\"crop\":false,\"density\":\"1\",\"path\":\"chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\",\"size\":76795,\"mime\":\"\",\"assetID\":\"6\"}}},\"_block_type\":\"service\",\"_block_id\":\"qnlke8\",\"_block_index\":\"3\"},{\"testimonials\":[{\"image\":{\"assetID\":\"7\",\"title\":\"Joshua hibbert Pn6iimgM wo unsplash\",\"_default\":\"\\/perch\\/resources\\/joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash.jpg\",\"size\":2016574,\"w\":2900,\"h\":4334,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg\",\"size\":13102,\"mime\":\"image\\/jpeg\",\"assetID\":\"8\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\",\"size\":20540,\"mime\":\"\",\"assetID\":\"9\"}}},\"quote\":\"Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!\",\"name\":\"Jack Barber\",\"business\":\"Jack Barber Ltd\"}],\"_block_type\":\"testimonials\",\"_block_id\":\"qnlkea\",\"_block_index\":\"4\"},{\"headline\":\"FAQ\",\"items\":[{\"id\":\"one\",\"heading\":\"Are Hivechat events accessible to anyone?\",\"answer\":\"By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account.\"},{\"id\":\"two\",\"heading\":\"Can I use Hivechat commercially?\",\"answer\":\"Yes! We would encourage you to make full use of the platform.\"},{\"id\":\"three\",\"heading\":\"Have you got a demo event I can look at?\",\"answer\":\"We\'re working on that!\"}],\"_block_type\":\"accordion\",\"_block_id\":\"qnlkjk\",\"_block_index\":\"5\"},{\"image\":{\"assetID\":\"1\",\"title\":\"Chuttersnap ay7kdns6UuI unsplash\",\"_default\":\"\\/perch\\/resources\\/chuttersnap-ay7kdns6uui-unsplash.jpg\",\"bucket\":\"default\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash.jpg\",\"size\":2157919,\"w\":4016,\"h\":6016,\"mime\":\"image\\/jpeg\",\"sizes\":{\"thumb\":{\"w\":\"100\",\"h\":\"150\",\"target_w\":150,\"target_h\":150,\"density\":2,\"path\":\"chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg\",\"size\":38794,\"mime\":\"image\\/jpeg\",\"assetID\":\"2\"},\"w300h300c1\":{\"w\":\"300\",\"h\":\"300\",\"target_w\":\"300\",\"target_h\":\"300\",\"crop\":\"true\",\"density\":\"1\",\"path\":\"chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\",\"size\":59888,\"mime\":\"\",\"assetID\":\"10\"}}},\"quote\":\"If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.\",\"name\":\"Lucy Kaya\",\"business\":\"Hivechat\",\"_block_type\":\"contact\",\"_block_id\":\"qnlkro\",\"_block_index\":\"6\"}]}', ' Build Community Through Communication. Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs. Easy to Build Our tools make it simple - include video, images, text, downloadable files and interactive elements. Easy to Share Share your content via your favourite social networks. Get discovered by search engines like Google.  Hivechat has revolutionised how we create and distribute our online content. James Fearnley IPRG    1+ A Growing Community We\'re just getting started - sign up! 10+ Pages of Interactive Content Our users are creating a wide range of content 100+ Visitors A growing number of visitors learning together 1000+ Ways to Use Hivechat We\'re building a flexible and powerful platform    How It Works Hivechat is designed to be simple to use. Follow the steps below to get started. Register an Account It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required! Create a Cell A \'cell\' is a single collection of content. Link multiple cells together to form a \'hive\'. Add Your Content Add video, text, downloads, Zoom links and more using our tools. Then share your Cell. Simple!    Who\'s Behind Hivechat? This is democratic software, built by the people, for the people! Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable. Securely hosted in the UK Built to be fast and accessible Available to everyone /about Find Out More      Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat! Jack Barber Jack Barber Ltd    FAQ one Are Hivechat events accessible to anyone? By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&A functionality is limited to user signed into their Hivechat account. two Can I use Hivechat commercially? Yes! We would encourage you to make full use of the platform. three Have you got a demo event I can look at? We\'re working on that!     If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch. Lucy Kaya Hivechat    ', '2021-01-27 22:19:34', '1'),
(100, 1, 2, 2, 5, 1000, '{\"_id\":\"1\",\"_blocks\":[{\"heading\":\"Welcome to Hivechat\",\"text\":{\"_flang\":\"html\",\"raw\":\"<p>Thanks for using Hivechat. From here you can manage your account settings, create your own Hivechat Cells and interact with others.<\\/p>\\r\\n<ul><li><a href=\\\"\\/admin\\/account\\\">Your Account<\\/a><\\/li><li><a href=\\\"\\/admin\\/your-hives\\\">Create a Hive<\\/a><br><\\/li><\\/ul>\",\"processed\":\"<p>Thanks for using Hivechat. From here you can manage your account settings, create your own Hivechat Cells and interact with others.<\\/p>\\r\\n<ul><li><a href=\\\"\\/admin\\/account\\\">Your Account<\\/a><\\/li><li><a href=\\\"\\/admin\\/your-hives\\\">Create a Hive<\\/a><br><\\/li><\\/ul>\"},\"_block_type\":\"text\",\"_block_id\":\"qmz29x\",\"_block_index\":\"0\"}]}', ' Welcome to Hivechat Thanks for using Hivechat. From here you can manage your account settings, create your own Hivechat Cells and interact with others.\r\nYour AccountCreate a Hive    ', '2021-01-28 14:03:15', '1');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_content_locks`
--

CREATE TABLE `perch3_content_locks` (
  `lockID` int(10) UNSIGNED NOT NULL,
  `contentKey` char(64) NOT NULL DEFAULT '',
  `userID` char(128) DEFAULT NULL,
  `lockTime` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_content_regions`
--

CREATE TABLE `perch3_content_regions` (
  `regionID` int(10) NOT NULL,
  `pageID` int(10) UNSIGNED NOT NULL,
  `regionKey` varchar(255) NOT NULL DEFAULT '',
  `regionPage` varchar(255) NOT NULL DEFAULT '',
  `regionHTML` longtext NOT NULL,
  `regionNew` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `regionOrder` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `regionTemplate` varchar(255) NOT NULL DEFAULT '',
  `regionMultiple` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `regionOptions` text NOT NULL,
  `regionSearchable` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `regionRev` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `regionLatestRev` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `regionEditRoles` varchar(255) NOT NULL DEFAULT '*',
  `regionPublishRoles` varchar(255) NOT NULL DEFAULT '*',
  `regionUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_content_regions`
--

INSERT INTO `perch3_content_regions` (`regionID`, `pageID`, `regionKey`, `regionPage`, `regionHTML`, `regionNew`, `regionOrder`, `regionTemplate`, `regionMultiple`, `regionOptions`, `regionSearchable`, `regionRev`, `regionLatestRev`, `regionEditRoles`, `regionPublishRoles`, `regionUpdated`) VALUES
(1, 1, 'Error description', '/errors/404', '<!-- Undefined content: Error description -->', 1, 0, '', 0, '', 1, 0, 0, '*', '*', '2021-01-15 09:13:07'),
(2, 2, 'Page Content', '/admin', ' \n	\n	<div class=\"row\">\n        <div class=\"col-lg-12\">\n            <div class=\"main-card mb-3 card\">\n                <div class=\"card-body\"><h5 class=\"card-title\">Welcome to Hivechat</h5>\n	            	<p>Thanks for using Hivechat. From here you can manage your account settings, create your own Hivechat Cells and interact with others.</p>\r\n<ul><li><a href=\"/admin/account\">Your Account</a></li><li><a href=\"/admin/your-hives\">Create a Hive</a><br></li></ul>\n                </div>\n            </div>\n        </div>\n	</div>\n	\n', 0, 0, 'admin/page_content.html', 0, '{\"edit_mode\":\"singlepage\"}', 1, 5, 5, '*', '*', '2021-01-28 14:03:15'),
(9, 17, 'Page Content', '/explore', '<!-- Undefined content: Page Content -->', 1, 0, '', 0, '', 1, 0, 0, '*', '*', '2021-01-27 21:07:05'),
(10, 18, 'Page Content', '/explore/browse', '<!-- Undefined content: Page Content -->', 1, 0, '', 0, '', 1, 0, 0, '*', '*', '2021-01-27 21:07:20'),
(3, 8, 'Page Content', '/', ' \n	\n	<div class=\"hero\">\n      <div class=\"container\">\n        <div class=\"row justify-content-between align-items-center\">\n          <div class=\"col-lg-5 mb-5 mb-lg-0\">\n            <div class=\"mb-5\">\n            <h1 class=\"mb-4\" data-aos=\"fade-up\">Build Community Through Communication.</h1>\n            <p class=\"mb-4\" data-aos=\"fade-up\" data-aos-delay=\"100\">Create anything from a simple \'how-to\' guide to a comprehensive online conference tailored to your audience\'s needs.</p>\n            <p data-aos=\"fade-up\" data-aos-delay=\"200\"><a href=\"/admin\" class=\"btn btn-primary\">Get Started</a></p>\n            </div>\n\n            <div class=\"row gutter-v1\">\n              <div class=\"col-6 col-sm-6 col-md-6 col-lg-6\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n                <div class=\"feature\">\n                  <div class=\"mb-4 icon-wrap\">\n                    <span class=\"flaticon-square\"></span>\n                  </div>\n                  <h3>Easy to Build</h3>\n                  <p>Our tools make it simple - include video, images, text, downloadable files and interactive elements.</p>\n                </div>\n              </div>\n              <div class=\"col-6 col-sm-6 col-md-6 col-lg-6\" data-aos=\"fade-up\" data-aos-delay=\"100\">\n                <div class=\"feature\">\n                  <div class=\"mb-4 icon-wrap\">\n                    <span class=\"flaticon-blueprint\"></span>\n                  </div>\n                  <h3>Easy to Share</h3>\n                  <p>Share your content via your favourite social networks. Get discovered by search engines like Google.</p>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-lg-6\">\n            <div class=\"bg\"></div>\n            <figure>\n              <img src=\"/perch/resources/chuttersnap-ay7kdns6uui-unsplash-w700.jpg\" alt=\"Image\" class=\"img-fluid\" data-aos=\"fade-up\">\n              <div class=\"quote\" data-aos=\"fade-left\" data-aos-delay=\"100\">\n                <blockquote>\n                  &ldquo;Hivechat has revolutionised how we create and distribute our online content.&rdquo;\n                </blockquote>\n                <div class=\"author\">\n                  <strong class=\"d-block\">James Fearnley</strong>\n                  <span>IPRG</span>\n                </div> \n              </div>\n            </figure>\n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"achievements\">\n      <div class=\"container\">\n        <div class=\"row\">\n	      \n          <div class=\"col-md-6 mb-4 mb-lg-0 col-lg-3\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n            <div class=\"numbers\">\n              <strong class=\"number\">1+</strong>\n              <h4>A Growing Community</h4>\n              <p>We\'re just getting started - sign up!</p>\n            </div>\n          </div>\n	      \n          <div class=\"col-md-6 mb-4 mb-lg-0 col-lg-3\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n            <div class=\"numbers\">\n              <strong class=\"number\">10+</strong>\n              <h4>Pages of Interactive Content</h4>\n              <p>Our users are creating a wide range of content</p>\n            </div>\n          </div>\n	      \n          <div class=\"col-md-6 mb-4 mb-lg-0 col-lg-3\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n            <div class=\"numbers\">\n              <strong class=\"number\">100+</strong>\n              <h4>Visitors</h4>\n              <p>A growing number of visitors learning together</p>\n            </div>\n          </div>\n	      \n          <div class=\"col-md-6 mb-4 mb-lg-0 col-lg-3\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n            <div class=\"numbers\">\n              <strong class=\"number\">1000+</strong>\n              <h4>Ways to Use Hivechat</h4>\n              <p>We\'re building a flexible and powerful platform</p>\n            </div>\n          </div>\n	      \n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"how-it-works\">\n      <div class=\"container\">\n\n        <div class=\"row justify-content-center\">\n          <div class=\"col-lg-7 section-title text-center mb-5\">\n            <strong class=\"subtitle\" data-aos=\"fade-up\" data-aos-delay=\"0\">How It Works</strong>\n            <h2 class=\"heading\" data-aos=\"fade-up\" data-aos-delay=\"100\">Hivechat is designed to be simple to use. Follow the steps below to get started.</h2>\n          </div>\n        </div>\n\n        <div class=\"row gutter-v1 align-items-center\">\n          <div class=\"col-md-4\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n            <div class=\"step\">\n              <div class=\"mb-4 icon-wrap\">\n                <span class=\"flaticon-technology\"></span>\n              </div>\n              <h3>Register an Account</h3>\n              <p>It\'s free, you can sign up for an account in a matter of seconds. No credit or debit card required!</p>\n              <div class=\"line\">\n				<svg width=\"121px\" height=\"59px\" viewBox=\"0 0 121 59\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n				    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-dasharray=\"3\">\n				        <g id=\"Group\" transform=\"translate(1.000000, 0.000000)\" stroke=\"#979797\" stroke-width=\"2\">\n				            <path d=\"M0.2109375,12.8632812 C20.0091146,26.8632812 39.8072917,33.8632812 59.6054687,33.8632812 C79.4036458,33.8632812 99.2018229,26.8632812 119,12.8632812\" id=\"Path-2\"></path>\n				            <polyline id=\"Path-3\" points=\"75.1103516 0.977539062 119.116211 13.3417969 105.357422 60.8583984\"></polyline>\n				        </g>\n				    </g>\n				</svg>\n            </div>\n            </div>\n          </div>\n          <div class=\"col-md-4\" data-aos=\"fade-up\" data-aos-delay=\"100\">\n            <div class=\"step\">\n              <div class=\"mb-4 icon-wrap\">\n                <span class=\"flaticon-illumination\"></span>\n              </div>\n              <h3>Create a Cell</h3>\n              <p>A \'cell\' is a single collection of content. Link multiple cells together to form a \'hive\'.</p>\n              <div class=\"line\">\n				<svg width=\"121px\" height=\"64px\" viewBox=\"0 0 121 64\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n				    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-dasharray=\"3\">\n				        <g id=\"Group-2\" transform=\"translate(1.000000, 0.000000)\" stroke=\"#979797\" stroke-width=\"2\">\n				            <path d=\"M0.2109375,21.8632812 C20.0091146,35.8632812 39.8072917,42.8632812 59.6054687,42.8632812 C79.4036458,42.8632812 99.2018229,35.8632812 119,21.8632812\" id=\"Path-2-Copy\" transform=\"translate(59.605469, 32.363281) rotate(-180.000000) translate(-59.605469, -32.363281) \"></path>\n				            <polyline id=\"Path-3\" transform=\"translate(91.581055, 37.226562) rotate(48.000000) translate(-91.581055, -37.226562) \" points=\"69.578125 7.28613281 113.583984 19.6503906 99.8251953 67.1669922\"></polyline>\n				        </g>\n				    </g>\n				</svg>\n            </div>\n            </div>\n          </div>\n          <div class=\"col-md-4\" data-aos=\"fade-up\" data-aos-delay=\"200\">\n            <div class=\"step\">\n              <div class=\"mb-4 icon-wrap\">\n                <span class=\"flaticon-worker\"></span>\n              </div>\n              <h3>Add Your Content</h3>\n              <p>Add video, text, downloads, Zoom links and more using our tools. Then share your Cell. Simple!</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"services-section\">\n      <div class=\"container\">\n        <div class=\"row justify-content-between\">\n          <div class=\"col-lg-4 mb-5 mb-lg-0\">\n          \n            <div class=\"section-title mb-3\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n              <strong class=\"subtitle\">Who\'s Behind Hivechat?</strong>\n              <h2 class=\"heading\">This is democratic software, built by the people, for the people!</h2>\n            </div>\n\n            <p data-aos=\"fade-up\" data-aos-delay=\"100\">Hivechat is being built from the ground up. Based in North Yorkshire, UK, we\'re building something sustainable and scalable.</p>\n            \n            <ul class=\"list-check list-unstyled mb-5\" data-aos=\"fade-up\" data-aos-delay=\"200\">\n              \n              <li>Securely hosted in the UK</li>\n              \n              <li>Built to be fast and accessible</li>\n              \n              <li>Available to everyone</li>\n              \n            </ul>\n\n            <p data-aos=\"fade-up\" data-aos-delay=\"300\"><a href=\"/about\" class=\"btn btn-primary\">Find Out More</a></p>\n\n          </div>\n          <div class=\"col-lg-6\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n            <figure class=\"img-wrap-2\">\n              <img src=\"/perch/resources/chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg\" alt=\"Image\" class=\"img-fluid\">\n              <div class=\"dotted\"></div>\n            </figure>\n            \n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"testimonial-section\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n      <div class=\"container\">\n        <div class=\"owl-single owl-carousel\">\n	      \n          <div class=\"testimonial mx-auto\">\n            <figure class=\"img-wrap\">\n              <img src=\"/perch/resources/joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\" alt=\"Image\" class=\"img-fluid\">\n            </figure>\n            <blockquote>\n              <p>&ldquo;Hivechat is revolutionising how we create our \'how-to\' documentation. We\'re actually using Hivechat to help build Hivechat!&rdquo;</p>\n            </blockquote>\n            <div class=\"author\">\n              <h3 class=\"name\">Jack Barber</h3>\n              <p>Jack Barber Ltd</p>\n            </div>\n          </div>\n	      \n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"container mb-5\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n        	<div class=\"custom-block\" data-aos=\"fade-up\">\n              <h2 class=\"section-title\">FAQ</h2>\n                <div class=\"custom-accordion\" id=\"accordion_1\">\n	            \n                  <div class=\"accordion-item\">\n                    <h2 class=\"mb-0\">\n                    	<button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#one\" aria-expanded=\"true\" aria-controls=\"one\">Are Hivechat events accessible to anyone?</button>\n					</h2>\n                    <div id=\"one\" class=\"collpase show\" aria-labelledby=\"headingOne\" data-parent=\"#accordion_1\">\n                      <div class=\"accordion-body\">\n                        By default, yes. We want to make the platform as open and easy to access as we can. However, you can choose to make your events accessible only to those with a password. Chat and Q&amp;A functionality is limited to user signed into their Hivechat account.\n                      </div>\n                    </div>\n                  </div> <!-- .accordion-item -->\n				\n                  <div class=\"accordion-item\">\n                    <h2 class=\"mb-0\">\n                    	<button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#two\" aria-expanded=\"false\" aria-controls=\"two\">Can I use Hivechat commercially?</button>\n					</h2>\n                    <div id=\"two\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion_1\">\n                      <div class=\"accordion-body\">\n                        Yes! We would encourage you to make full use of the platform.\n                      </div>\n                    </div>\n                  </div> <!-- .accordion-item -->\n				\n                  <div class=\"accordion-item\">\n                    <h2 class=\"mb-0\">\n                    	<button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#three\" aria-expanded=\"false\" aria-controls=\"three\">Have you got a demo event I can look at?</button>\n					</h2>\n                    <div id=\"three\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion_1\">\n                      <div class=\"accordion-body\">\n                        We\'re working on that!\n                      </div>\n                    </div>\n                  </div> <!-- .accordion-item -->\n				\n                </div>\n            </div>\n        </div>\n      </div>\n	</div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"py-5\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n        <div class=\"container\">\n          <div class=\"row align-items-stretch\">\n            \n            <div class=\"col-lg-6 order-lg-2 mb-5 mb-lg-0\">\n              <div class=\"section-title mb-5\">\n                <strong class=\"subtitle\" data-aos=\"fade-up\" data-aos-delay=\"0\">Contact Us</strong>\n                <h2 class=\"heading\" data-aos=\"fade-up\" data-aos-delay=\"100\">Send Us a Message</h2>\n              </div>\n              <perch:form template=\"/templates/content/page_content.html\" template=\"/templates/content/page_content.html\" id=\"contact\" method=\"post\" app=\"perch_forms\" class=\"contact-form\">\n                <div class=\"row\">\n                  <div class=\"col-6\">\n                    <div class=\"form-group\">\n                      <label class=\"text-black\" for=\"fname\">First name</label>\n                      <perch:input type=\"text\" class=\"form-control\" id=\"fname\" label=\"Name\">\n                    </div>\n                  </div>\n                  <div class=\"col-6\">\n                    <div class=\"form-group\">\n                      <label class=\"text-black\" for=\"lname\">Last name</label>\n                      <perch:input type=\"text\" class=\"form-control\" id=\"lname\" label=\"Last Name\">\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"text-black\" for=\"email\">Email address</label>\n                  <perch:input type=\"email\" class=\"form-control\" id=\"email\" label=\"Email\">\n                </div>\n                \n                <div class=\"form-group\">\n                  <label class=\"text-black\" for=\"message\">Message</label>\n                  <perch:input type=\"textarea\" name=\"\" class=\"form-control\" id=\"message\" cols=\"30\" rows=\"5\" label=\"Message\" />\n                </div>\n                \n                <perch:input type=\"submit\" class=\"btn btn-primary\" value=\"Send Message\" />\n              </perch:form>\n            </div>\n\n            <div class=\"col-lg-5 mr-auto\">\n              <div class=\"testimonial-wrap h-100\">\n                <div class=\"testimonial align-self-center\">\n                  <img src=\"/perch/resources/chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg\" alt=\"Image\" class=\"img-fluid\">\n                  <blockquote class=\"mb-5\">\n                    <p>&ldquo;If you\'ve got questions or comments about Hivechat, or suggestions for new features, we\'d love to hear them! Use the form to get in touch.&rdquo;</p>\n                  </blockquote>\n                  <div class=\"author text-left\">\n                    <strong class=\"d-block\">Lucy Kaya</strong>\n                    <span>Hivechat</span>\n                  </div> \n                </div>\n              </div>\n            </div>\n\n          </div>\n          \n\n        </div>\n      </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n', 0, 0, 'page_content.html', 0, '{\"edit_mode\":\"singlepage\"}', 1, 58, 58, '*', '*', '2021-01-27 22:19:34'),
(4, 8, 'Footer', '*', '<h3>Hivechat</h3>\n<p>We’re making it easier to create and host online conferences and meetings. Share information easily and quickly. Build your online community using Hivechat.</p>', 0, 1, 'text_block.html', 0, '{\"edit_mode\":\"listdetail\",\"searchURL\":\"\",\"title_delimit\":\"\",\"adminOnly\":0,\"addToTop\":0,\"limit\":false,\"column_ids\":[]}', 1, 2, 2, '*', '*', '2021-01-27 13:27:08'),
(5, 9, 'Page Content', '/about', ' \n	\n	<div class=\"hero\">\n      <div class=\"container\">\n        <div class=\"row justify-content-between align-items-center\">\n          <div class=\"col-lg-5\">\n            <div class=\"mb-5\">\n            <h1 class=\"mb-4\" data-aos=\"fade-up\">About Hivechat</h1>\n            <p class=\"mb-4\" data-aos=\"fade-up\" data-aos-delay=\"100\">Hivechat is simple tool for online communication around a specific topic. It\'s not a search engine, social network, forum or wiki - but it does share its DNA with all of these.</p>\n            \n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"owl-single dots-absolute owl-carousel\">\n		\n			<img src=\"/perch/resources/chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg\" alt=\"Hivechat\" class=\"img-fluid\">\n		\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"py-5\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-lg-5 mr-auto\">\n            <h2>A Communication&nbsp;Tool</h2>\r\n<p>Hivechat is a communication tool. It combines the best bits from various kinds of online platforms in a structured and user-friendly manner.</p>\r\n<p>When you create an event in Hivechat you can choose what to include. We\'ve designed Hivechat to be a hub - a conduit through which effective online communication can occur.</p>\n          </div>\n          <div class=\"col-lg-6 ml-auto\">\n            <h2>Built to be Simple</h2>\r\n<p>Whilst easy to use, Hivechat\'s simplicity is key to its success. <a href=\"/admin\">Register an account</a> in a few seconds, then start creating your events.</p>\r\n<p>Behind the scenes we\'re working hard to ensure every aspect of Hivechat works seamlessly with the rest. You get to focus on sharing information quickly, efficiently and effectively - leaving the technical know-how to the Hivechat team.</p>\n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"services-section\">\n      <div class=\"container\">\n        <div class=\"row justify-content-between\">\n          <div class=\"col-lg-4 mb-5 mb-lg-0\">\n          \n            <div class=\"section-title mb-3\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n              <strong class=\"subtitle\">Discover More</strong>\n              <h2 class=\"heading\">We\'re using Hivechat to help built Hivechat</h2>\n            </div>\n\n            <p data-aos=\"fade-up\" data-aos-delay=\"100\">Our \'how-to\' information is all created within Hivechat itself. There\'s no point building a tool if you\'re not going to use it, right?</p>\n            \n            <ul class=\"list-check list-unstyled mb-5\" data-aos=\"fade-up\" data-aos-delay=\"200\">\n              \n              <li>We test every feature we build</li>\n              \n              <li>We listen to our users and respond to requests</li>\n              \n              <li>We\'re building Hivechat into the net\'s #1 communication tool</li>\n              \n            </ul>\n\n            <p data-aos=\"fade-up\" data-aos-delay=\"300\"><a href=\"/how-to\" class=\"btn btn-primary\">Explore our How-To Guides</a></p>\n\n          </div>\n          <div class=\"col-lg-6\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n            <figure class=\"img-wrap-2\">\n              <img src=\"/perch/resources/joshua-hibbert-pn6iimgm-wo-unsplash-w700.jpg\" alt=\"Image\" class=\"img-fluid\">\n              <div class=\"dotted\"></div>\n            </figure>\n            \n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n', 0, 0, 'page_content.html', 0, '{\"edit_mode\":\"singlepage\"}', 1, 19, 19, '*', '*', '2021-01-27 20:23:13'),
(6, 10, 'Page Content', '/contact', ' \n	\n	<div class=\"hero\">\n      <div class=\"container\">\n        <div class=\"row justify-content-between align-items-center\">\n          <div class=\"col-lg-5\">\n            <div class=\"mb-5\">\n            <h1 class=\"mb-4\" data-aos=\"fade-up\">Contact Us</h1>\n            <p class=\"mb-4\" data-aos=\"fade-up\" data-aos-delay=\"100\">Use the contact form below to get in touch with the Hivechat team. We\'d love to hear your feebdack on the project, or discuss feature requests you might have.</p>\n            \n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"py-5\" data-aos=\"fade-up\" data-aos-delay=\"0\">\n        <div class=\"container\">\n          <div class=\"row align-items-stretch\">\n            \n            <div class=\"col-lg-6 order-lg-2 mb-5 mb-lg-0\">\n              <div class=\"section-title mb-5\">\n                <strong class=\"subtitle\" data-aos=\"fade-up\" data-aos-delay=\"0\">Contact Us</strong>\n                <h2 class=\"heading\" data-aos=\"fade-up\" data-aos-delay=\"100\">Send Us a Message</h2>\n              </div>\n              <perch:form template=\"/templates/content/page_content.html\" template=\"/templates/content/page_content.html\" id=\"contact\" method=\"post\" app=\"perch_forms\" class=\"contact-form\">\n                <div class=\"row\">\n                  <div class=\"col-6\">\n                    <div class=\"form-group\">\n                      <label class=\"text-black\" for=\"fname\">First name</label>\n                      <perch:input type=\"text\" class=\"form-control\" id=\"fname\" label=\"Name\">\n                    </div>\n                  </div>\n                  <div class=\"col-6\">\n                    <div class=\"form-group\">\n                      <label class=\"text-black\" for=\"lname\">Last name</label>\n                      <perch:input type=\"text\" class=\"form-control\" id=\"lname\" label=\"Last Name\">\n                    </div>\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <label class=\"text-black\" for=\"email\">Email address</label>\n                  <perch:input type=\"email\" class=\"form-control\" id=\"email\" label=\"Email\">\n                </div>\n                \n                <div class=\"form-group\">\n                  <label class=\"text-black\" for=\"message\">Message</label>\n                  <perch:input type=\"textarea\" name=\"\" class=\"form-control\" id=\"message\" cols=\"30\" rows=\"5\" label=\"Message\" />\n                </div>\n                \n                <perch:input type=\"submit\" class=\"btn btn-primary\" value=\"Send Message\" />\n              </perch:form>\n            </div>\n\n            <div class=\"col-lg-5 mr-auto\">\n              <div class=\"testimonial-wrap h-100\">\n                <div class=\"testimonial align-self-center\">\n                  <img src=\"/perch/resources/joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg\" alt=\"Image\" class=\"img-fluid\">\n                  <blockquote class=\"mb-5\">\n                    <p>&ldquo;We want to make sure Hivechat is as useful as it can be. We\'re not building the platform in a silo - this is software for the real world.&rdquo;</p>\n                  </blockquote>\n                  <div class=\"author text-left\">\n                    <strong class=\"d-block\">Jack Barber</strong>\n                    <span>Hivechat</span>\n                  </div> \n                </div>\n              </div>\n            </div>\n\n          </div>\n          \n\n        </div>\n      </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n', 0, 0, 'page_content.html', 0, '{\"edit_mode\":\"singlepage\"}', 1, 3, 3, '*', '*', '2021-01-27 17:24:17'),
(7, 11, 'Page Content', '/thanks', ' \n	\n	<div class=\"hero\">\n      <div class=\"container\">\n        <div class=\"row justify-content-between align-items-center\">\n          <div class=\"col-lg-5\">\n            <div class=\"mb-5\">\n            <h1 class=\"mb-4\" data-aos=\"fade-up\">Thank You</h1>\n            <p class=\"mb-4\" data-aos=\"fade-up\" data-aos-delay=\"100\">We\'ll be in touch soon to discuss your query. We appreciate you taking the time to send us a message.</p>\n            <p data-aos=\"fade-up\" data-aos-delay=\"200\"><a href=\"/\" class=\"btn btn-primary\">Home</a></p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n', 0, 0, 'page_content.html', 0, '{\"edit_mode\":\"singlepage\"}', 1, 1, 1, '*', '*', '2021-01-27 17:14:53'),
(8, 12, 'Page Content', '/how-to', ' \n	\n	<div class=\"hero\">\n      <div class=\"container\">\n        <div class=\"row justify-content-between align-items-center\">\n          <div class=\"col-lg-5\">\n            <div class=\"mb-5\">\n            <h1 class=\"mb-4\" data-aos=\"fade-up\">How To</h1>\n            <p class=\"mb-4\" data-aos=\"fade-up\" data-aos-delay=\"100\">Want to know how Hivechat works? Need an explanation of a particular feature? Browse our help documentation below.</p>\n            \n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n\n	\n	<div class=\"py-5\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-lg-5 mr-auto\">\n            <p><strong>Sorry, no quite readt yet, but won\'t be long...</strong> <br>\'How To\' guides are coming soon!</p>\n          </div>\n          <div class=\"col-lg-6 ml-auto\">\n            \n          </div>\n        </div>\n      </div>\n    </div>\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n	\n', 0, 0, 'page_content.html', 0, '{\"edit_mode\":\"singlepage\"}', 1, 5, 5, '*', '*', '2021-01-27 17:36:28');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_forms`
--

CREATE TABLE `perch3_forms` (
  `formID` int(10) UNSIGNED NOT NULL,
  `formKey` varchar(64) NOT NULL DEFAULT '',
  `formTitle` varchar(255) NOT NULL DEFAULT '',
  `formTemplate` varchar(255) NOT NULL DEFAULT '',
  `formOptions` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_forms`
--

INSERT INTO `perch3_forms` (`formID`, `formKey`, `formTitle`, `formTemplate`, `formOptions`) VALUES
(1, 'contact', 'Contact', '/templates/content/page_content.html', '{\"fileLocation\":\"\",\"email\":\"1\",\"emailAddress\":\"jack@jackbarber.co.uk\",\"adminEmailMessage\":\"\",\"adminEmailTemplate\":\"\",\"adminEmailSubject\":\"Hivechat Message\",\"adminEmailFromName\":\"{name}\",\"adminEmailFromAddress\":\"{email}\",\"akismetAPIKey\":\"\",\"successURL\":\"\\/thanks\",\"responseEmailSubject\":\"\",\"responseEmailMessage\":\"\",\"formEmailFieldID\":\"email\",\"autoresponseTemplate\":\"\"}');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_forms_responses`
--

CREATE TABLE `perch3_forms_responses` (
  `responseID` int(10) UNSIGNED NOT NULL,
  `formID` int(10) UNSIGNED NOT NULL,
  `responseCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `responseJSON` mediumtext,
  `responseIP` varchar(16) NOT NULL DEFAULT '',
  `responseSpam` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `responseSpamData` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_forms_responses`
--

INSERT INTO `perch3_forms_responses` (`responseID`, `formID`, `responseCreated`, `responseJSON`, `responseIP`, `responseSpam`, `responseSpamData`) VALUES
(1, 1, '2021-01-27 17:13:22', '{\"fields\":{\"fname\":{\"attributes\":{\"type\":\"text\",\"class\":\"form-control\",\"id\":\"fname\",\"label\":\"Name\"},\"value\":\"Jack\"},\"lname\":{\"attributes\":{\"type\":\"text\",\"class\":\"form-control\",\"id\":\"lname\",\"label\":\"Last Name\"},\"value\":\"Barber\"},\"email\":{\"attributes\":{\"type\":\"email\",\"class\":\"form-control\",\"id\":\"email\",\"label\":\"Email\"},\"value\":\"jack@jackbarber.co.uk\"},\"message\":{\"attributes\":{\"type\":\"textarea\",\"name\":\"\",\"class\":\"form-control\",\"id\":\"message\",\"cols\":\"30\",\"rows\":\"5\",\"label\":\"Message\",\"\":true},\"value\":\"Test\"}},\"files\":[],\"page\":{\"id\":\"8\",\"title\":\"Hivechat - Build Community Through Communication\",\"path\":\"\\/\",\"navtext\":\"Home\"}}', '212.159.23.98', 0, '{\"fields\":[],\"environment\":{\"PATH\":\"\\/usr\\/local\\/bin:\\/bin:\\/usr\\/bin\",\"HTTP_ACCEPT\":\"text\\/html,application\\/xhtml+xml,application\\/xml;q=0.9,image\\/webp,*\\/*;q=0.8\",\"HTTP_ACCEPT_ENCODING\":\"gzip, deflate, br\",\"HTTP_ACCEPT_LANGUAGE\":\"en-GB,en;q=0.5\",\"CONTENT_TYPE\":\"application\\/x-www-form-urlencoded\",\"CONTENT_LENGTH\":\"172\",\"HTTP_COOKIE\":\"PHPSESSID=4f006a026f4bf14be4809b7cb1f896d7; cmsa=1; p_m=e267144f3d3b3d01e3c0543955ad2a55c90489ea\",\"HTTP_HOST\":\"hivechat.co.uk\",\"HTTP_REFERER\":\"https:\\/\\/hivechat.co.uk\\/\",\"HTTP_USER_AGENT\":\"Mozilla\\/5.0 (Macintosh; Intel Mac OS X 10.16; rv:84.0) Gecko\\/20100101 Firefox\\/84.0\",\"HTTP_ORIGIN\":\"https:\\/\\/hivechat.co.uk\",\"HTTP_UPGRADE_INSECURE_REQUESTS\":\"1\",\"HTTP_TE\":\"trailers\",\"DOCUMENT_ROOT\":\"\\/home\\/hivechat\\/public_html\",\"REMOTE_ADDR\":\"212.159.23.98\",\"REMOTE_PORT\":\"51336\",\"SERVER_ADDR\":\"85.92.73.99\",\"SERVER_NAME\":\"hivechat.co.uk\",\"SERVER_ADMIN\":\"webmaster@hivechat.co.uk\",\"SERVER_PORT\":\"443\",\"REQUEST_SCHEME\":\"https\",\"REQUEST_URI\":\"\\/\",\"REDIRECT_URL\":\"\\/\",\"HTTPS\":\"on\",\"REDIRECT_STATUS\":\"200\",\"X_SPDY\":\"HTTP2\",\"SSL_PROTOCOL\":\"TLSv1.3\",\"SSL_CIPHER\":\"TLS_AES_128_GCM_SHA256\",\"SSL_CIPHER_USEKEYSIZE\":\"128\",\"SSL_CIPHER_ALGKEYSIZE\":\"128\",\"SCRIPT_FILENAME\":\"\\/home\\/hivechat\\/public_html\\/perch\\/core\\/runway\\/start.php\",\"QUERY_STRING\":\"\",\"SCRIPT_URI\":\"https:\\/\\/hivechat.co.uk\\/\",\"SCRIPT_URL\":\"\\/\",\"SCRIPT_NAME\":\"\\/perch\\/core\\/runway\\/start.php\",\"SERVER_PROTOCOL\":\"HTTP\\/1.1\",\"SERVER_SOFTWARE\":\"LiteSpeed\",\"REQUEST_METHOD\":\"POST\",\"X-LSCACHE\":\"on,crawler\",\"PHP_SELF\":\"\\/perch\\/core\\/runway\\/start.php\",\"REQUEST_TIME_FLOAT\":1611767602.798333,\"REQUEST_TIME\":1611767602}}');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_hives`
--

CREATE TABLE `perch3_hives` (
  `hiveID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `hiveTitle` varchar(255) NOT NULL,
  `hiveCategory` varchar(255) NOT NULL,
  `hiveLive` varchar(255) DEFAULT NULL,
  `hiveDynamicFields` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `perch3_hives`
--

INSERT INTO `perch3_hives` (`hiveID`, `memberID`, `hiveTitle`, `hiveCategory`, `hiveLive`, `hiveDynamicFields`) VALUES
(4, 1, 'How to Use Hivechat', 'How To', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"This is a simple Hive which will contain a number of Cells. They will each demonstrate a particular feature of Hivechat, so you can find out how it works.\",\"processed\":\"This is a simple Hive which will contain a number of Cells. They will each demonstrate a particular feature of Hivechat, so you can find out how it works.\"}}'),
(5, 1, 'How to Build Apps Using Perch', 'How To', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"Test\",\"processed\":\"Test\"}}'),
(23, 1, 'Jack\'s Development Notes', 'Business', 'Yes', '{\"introduction\":{\"_flang\":\"html\",\"raw\":\"A place for my thoughts and ideas as Hivechat grows.\",\"processed\":\"A place for my thoughts and ideas as Hivechat grows.\"}}'),
(24, 1, 'Test On Local', 'Business', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_members`
--

CREATE TABLE `perch3_members` (
  `memberID` int(10) UNSIGNED NOT NULL,
  `memberAuthType` char(32) NOT NULL DEFAULT 'native',
  `memberAuthID` char(64) NOT NULL DEFAULT '',
  `memberEmail` char(255) NOT NULL DEFAULT '',
  `memberPassword` char(255) DEFAULT NULL,
  `memberStatus` enum('pending','active','inactive') NOT NULL DEFAULT 'pending',
  `memberCreated` datetime NOT NULL DEFAULT '2013-01-01 00:00:00',
  `memberExpires` datetime DEFAULT NULL,
  `memberProperties` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_members`
--

INSERT INTO `perch3_members` (`memberID`, `memberAuthType`, `memberAuthID`, `memberEmail`, `memberPassword`, `memberStatus`, `memberCreated`, `memberExpires`, `memberProperties`) VALUES
(1, 'native', '1', 'jack@jackbarber.co.uk', '$P$BD7OdRejdUafW6Llts968TW7wRgpuM/', 'active', '2021-01-15 00:00:00', NULL, '{\"first_name\":\"Jack\",\"last_name\":\"Barber\"}'),
(2, 'native', '2', 'jack@jackbarber.co.uk', '$P$B3K1OVHA6d5rpRnlinfi.No0FISYy//', 'active', '2021-01-15 00:00:00', NULL, '{\"first_name\":\"Jack\",\"last_name\":\"Barber\"}'),
(3, 'native', '3', 'info@lucykaya.co.uk', '$P$BsYp.9fFR9VHtDedsj84pLE7iD8k1m.', 'active', '2021-02-01 11:14:47', NULL, '{\"first_name\":\"Lucy\",\"last_name\":\"Kaya\",\"organisation\":\"IPRG\"}');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_members_forms`
--

CREATE TABLE `perch3_members_forms` (
  `formID` int(10) NOT NULL,
  `formKey` char(64) NOT NULL DEFAULT '',
  `formTitle` varchar(255) NOT NULL,
  `formSettings` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_members_forms`
--

INSERT INTO `perch3_members_forms` (`formID`, `formKey`, `formTitle`, `formSettings`) VALUES
(1, 'register.default', 'Registration form', '');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_members_member_tags`
--

CREATE TABLE `perch3_members_member_tags` (
  `memberID` int(10) NOT NULL,
  `tagID` int(10) NOT NULL,
  `tagExpires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_members_member_tags`
--

INSERT INTO `perch3_members_member_tags` (`memberID`, `tagID`, `tagExpires`) VALUES
(1, 1, NULL),
(2, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_members_sessions`
--

CREATE TABLE `perch3_members_sessions` (
  `sessionID` char(40) NOT NULL DEFAULT '',
  `sessionExpires` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `sessionHttpFootprint` char(40) NOT NULL DEFAULT '',
  `memberID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `sessionData` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_members_sessions`
--

INSERT INTO `perch3_members_sessions` (`sessionID`, `sessionExpires`, `sessionHttpFootprint`, `memberID`, `sessionData`) VALUES
('9ae3c568e2323af3b1f2891099ad7eb8195d0043', '2021-04-21 10:51:34', 'd1c5df28bf5752fad54f3aeab27f08f68eaf4f2a', 1, '{\"first_name\":\"Jack\",\"last_name\":\"Barber\",\"memberID\":\"1\",\"memberAuthType\":\"native\",\"memberAuthID\":\"1\",\"memberEmail\":\"jack@jackbarber.co.uk\",\"memberStatus\":\"active\",\"memberCreated\":\"2021-01-15 00:00:00\",\"memberExpires\":null,\"tags\":[\"member\"],\"token\":\"f8a760eaf09a38690965927955be335a48d0824d\"}');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_members_tags`
--

CREATE TABLE `perch3_members_tags` (
  `tagID` int(10) UNSIGNED NOT NULL,
  `tag` char(64) NOT NULL DEFAULT '',
  `tagDisplay` char(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `perch3_members_tags`
--

INSERT INTO `perch3_members_tags` (`tagID`, `tag`, `tagDisplay`) VALUES
(1, 'member', 'member');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_menu_items`
--

CREATE TABLE `perch3_menu_items` (
  `itemID` int(10) UNSIGNED NOT NULL,
  `parentID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `itemType` enum('menu','app','link') NOT NULL DEFAULT 'app',
  `itemOrder` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `itemTitle` char(64) NOT NULL DEFAULT 'Unnamed item',
  `itemValue` char(255) DEFAULT NULL,
  `itemPersists` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `itemActive` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `privID` int(10) DEFAULT NULL,
  `userID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `itemInternal` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_menu_items`
--

INSERT INTO `perch3_menu_items` (`itemID`, `parentID`, `itemType`, `itemOrder`, `itemTitle`, `itemValue`, `itemPersists`, `itemActive`, `privID`, `userID`, `itemInternal`) VALUES
(1, 0, 'menu', 1, 'My Site', NULL, 1, 1, NULL, 0, 0),
(2, 0, 'menu', 2, 'Organise', NULL, 1, 1, NULL, 0, 0),
(3, 1, 'app', 1, 'Pages', 'content', 0, 1, NULL, 0, 0),
(4, 2, 'app', 1, 'Categories', 'categories', 0, 1, 22, 0, 0),
(5, 2, 'app', 2, 'Assets', 'assets', 0, 1, NULL, 0, 0),
(7, 0, 'app', 1, 'Settings', 'settings', 1, 0, NULL, 0, 1),
(8, 0, 'app', 1, 'Users', 'users', 1, 0, NULL, 0, 1),
(9, 0, 'app', 1, 'Help', 'help', 1, 0, NULL, 0, 1),
(10, 1, 'app', 99, 'Members', 'perch_members', 0, 1, NULL, 0, 0),
(11, 1, 'app', 99, 'Forms', 'perch_forms', 0, 1, NULL, 0, 0),
(12, 1, 'app', 99, 'Blog', 'perch_blog', 0, 1, NULL, 0, 0),
(13, 1, 'app', 99, 'Hivechat', 'Hivechat', 0, 1, NULL, 0, 0),
(14, 1, 'app', 99, 'Hivechat', 'hivechat', 0, 1, NULL, 0, 0),
(15, 1, 'app', 99, 'Hivechat', 'hive_hivechat', 0, 1, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_navigation`
--

CREATE TABLE `perch3_navigation` (
  `groupID` int(10) NOT NULL,
  `groupTitle` varchar(255) NOT NULL DEFAULT '',
  `groupSlug` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_navigation`
--

INSERT INTO `perch3_navigation` (`groupID`, `groupTitle`, `groupSlug`) VALUES
(1, 'Footer One', 'footer-one'),
(2, 'Footer Two', 'footer-two'),
(3, 'Footer Three', 'footer-three'),
(4, 'Main', 'main');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_navigation_pages`
--

CREATE TABLE `perch3_navigation_pages` (
  `navpageID` int(10) UNSIGNED NOT NULL,
  `pageID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `groupID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `pageParentID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `pageOrder` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `pageDepth` tinyint(10) UNSIGNED NOT NULL,
  `pageTreePosition` varchar(64) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_navigation_pages`
--

INSERT INTO `perch3_navigation_pages` (`navpageID`, `pageID`, `groupID`, `pageParentID`, `pageOrder`, `pageDepth`, `pageTreePosition`) VALUES
(1, 8, 1, 0, 1, 1, '000-000'),
(2, 8, 4, 0, 1, 1, '000-001'),
(3, 10, 1, 0, 1, 1, '000-000'),
(4, 10, 4, 0, 5, 1, '000-005'),
(5, 9, 1, 0, 1, 1, '000-000'),
(6, 9, 4, 0, 2, 1, '000-002'),
(7, 4, 3, 0, 1, 2, '000-000'),
(8, 13, 2, 0, 1, 1, '000-000'),
(9, 14, 2, 0, 1, 1, '000-000'),
(10, 15, 2, 0, 1, 1, '000-000'),
(11, 16, 3, 0, 1, 1, '000-000'),
(12, 16, 4, 0, 4, 1, '000-004'),
(13, 25, 3, 0, 1, 1, '000-000'),
(14, 25, 4, 0, 3, 1, '000-003');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_pages`
--

CREATE TABLE `perch3_pages` (
  `pageID` int(10) UNSIGNED NOT NULL,
  `pageParentID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `pagePath` varchar(255) NOT NULL DEFAULT '',
  `pageTitle` varchar(255) NOT NULL DEFAULT '',
  `pageNavText` varchar(255) NOT NULL DEFAULT '',
  `pageNew` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `pageOrder` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `pageDepth` tinyint(10) UNSIGNED NOT NULL DEFAULT '0',
  `pageSortPath` varchar(255) NOT NULL DEFAULT '',
  `pageTreePosition` varchar(64) NOT NULL DEFAULT '',
  `pageSubpageRoles` varchar(255) NOT NULL DEFAULT '',
  `pageSubpagePath` varchar(255) NOT NULL DEFAULT '',
  `pageHidden` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `pageNavOnly` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `pageAccessTags` varchar(255) NOT NULL DEFAULT '',
  `pageCreatorID` char(255) NOT NULL DEFAULT '0',
  `pageModified` datetime NOT NULL DEFAULT '2014-01-01 00:00:00',
  `pageAttributes` text NOT NULL,
  `pageAttributeTemplate` varchar(255) NOT NULL DEFAULT 'default.html',
  `pageTemplate` char(255) NOT NULL DEFAULT '',
  `templateID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `pageSubpageTemplates` varchar(255) NOT NULL DEFAULT '',
  `pageCollections` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_pages`
--

INSERT INTO `perch3_pages` (`pageID`, `pageParentID`, `pagePath`, `pageTitle`, `pageNavText`, `pageNew`, `pageOrder`, `pageDepth`, `pageSortPath`, `pageTreePosition`, `pageSubpageRoles`, `pageSubpagePath`, `pageHidden`, `pageNavOnly`, `pageAccessTags`, `pageCreatorID`, `pageModified`, `pageAttributes`, `pageAttributeTemplate`, `pageTemplate`, `templateID`, `pageSubpageTemplates`, `pageCollections`) VALUES
(1, 0, '/errors/404', '404', '404', 0, 1, 1, '/errors/404', '000-001', '', '', 0, 0, '', '0', '2021-01-15 09:13:07', '', 'default.html', '', 0, '', ''),
(2, 0, '/admin', 'Admin', 'Admin', 0, 2, 1, '/admin', '000-002', '', '', 0, 0, '', '1', '2021-01-28 14:03:15', '', 'default.html', 'admin/home.php', 3, '', ''),
(3, 2, '/admin/reset', 'Reset', 'Reset', 0, 2, 2, '/admin/reset', '000-002-002', '', '', 1, 0, '', '1', '2021-01-15 10:43:28', '', 'default.html', 'admin/reset.php', 9, '', ''),
(4, 2, '/admin/logout', 'Logout', 'Logout', 0, 8, 2, '/admin/logout', '000-002-008', '', '', 0, 0, 'member', '1', '2021-01-27 17:38:31', '', 'default.html', 'admin/logout.php', 10, '', ''),
(5, 2, '/admin/account', 'Account', 'Account', 0, 3, 2, '/admin/account', '000-002-003', '', '', 0, 0, '', '1', '2021-01-15 10:31:56', '', 'default.html', 'admin/account.php', 11, '', ''),
(6, 2, '/admin/search', 'Search', 'Search', 0, 4, 2, '/admin/search', '000-002-004', '', '', 1, 0, '', '1', '2021-01-15 10:49:04', '', 'default.html', 'admin/search.php', 12, '', ''),
(7, 2, '/admin/demo-cell', 'Demo Cell', 'Demo Cell', 0, 5, 2, '/admin/demo-cell', '000-002-005', '', '', 1, 0, '', '1', '2021-01-27 21:10:06', '{\"description\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"keywords\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"noindex\":null,\"nofollow\":null,\"nosnippet\":null}', 'default.html', 'admin/demo_conference.php', 13, '', ''),
(8, 0, '/', 'Hivechat - Build Community Through Communication', 'Home', 0, 3, 1, '/', '000-003', '', '', 0, 0, '', '1', '2021-01-27 22:19:34', '{\"description\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"keywords\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"noindex\":null,\"nofollow\":null,\"nosnippet\":null}', 'default.html', 'website/default.php', 14, '', ''),
(9, 0, '/about', 'About', 'About', 0, 4, 1, '/about', '000-004', '', '', 0, 0, '', '1', '2021-01-27 20:23:13', '', 'default.html', 'website/default.php', 14, '', ''),
(10, 0, '/contact', 'Contact', 'Contact', 0, 5, 1, '/contact', '000-005', '', '', 0, 0, '', '1', '2021-01-27 17:24:17', '', 'default.html', 'website/default.php', 14, '', ''),
(11, 0, '/thanks', 'Thanks', 'Thanks', 0, 6, 1, '/thanks', '000-006', '', '', 0, 0, '', '1', '2021-01-27 17:14:53', '', 'default.html', 'website/default.php', 14, '', ''),
(12, 0, '/how-to', 'How To', 'How To', 0, 7, 1, '/how-to', '000-007', '', '', 0, 0, '', '1', '2021-01-27 17:36:28', '', 'default.html', 'website/default.php', 14, '', ''),
(13, 0, 'https://fb.me/hivechatuk', 'Facebook', 'Facebook', 0, 8, 1, 'https://fb', '000-008', '', '', 0, 1, '', '1', '2021-01-27 20:20:53', '', 'default.html', '', 0, '', ''),
(14, 0, 'https://twitter.com/hivechatuk', 'Twitter', 'Twitter', 0, 9, 1, 'https://twitter', '000-009', '', '', 0, 1, '', '1', '2021-01-27 20:21:11', '', 'default.html', '', 0, '', ''),
(15, 0, 'https://instagram.com/hivechatuk', 'Instagram', 'Instagram', 0, 10, 1, 'https://instagram', '000-010', '', '', 0, 1, '', '1', '2021-01-27 20:21:34', '', 'default.html', '', 0, '', ''),
(16, 0, '/blog', 'Blog', 'Blog', 0, 11, 1, '/blog', '000-011', '', '', 0, 0, '', '1', '2021-01-27 20:30:11', '', 'default.html', 'website/blog.php', 15, '', ''),
(17, 0, '/explore', 'Explore', 'Explore', 0, 12, 1, '/explore', '000-012', '', '', 0, 0, '', '1', '2021-01-27 21:07:05', '', 'default.html', 'website/default.php', 14, '', ''),
(18, 17, '/explore/browse', 'Browse', 'Browse', 0, 1, 2, '/explore/browse', '000-012-001', '', '', 0, 0, '', '1', '2021-01-28 09:50:05', '', 'default.html', 'admin/browse.php', 16, '', ''),
(24, 0, '/hive', 'Hive', 'Hive', 0, 13, 1, '/hive', '000-014', '', '', 0, 0, '', '1', '2021-01-28 17:41:58', '', 'default.html', 'admin/hive.php', 20, '', ''),
(20, 2, '/admin/your-hives', 'Your Hives', 'Your Hives', 0, 6, 2, '/admin/your-hives', '000-002-006', '', '', 0, 0, '', '1', '2021-01-28 14:54:39', '{\"description\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"keywords\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"noindex\":null,\"nofollow\":null,\"nosnippet\":null}', 'default.html', 'admin/your_cells.php', 18, '', ''),
(22, 17, 'https://hivechat.co.uk/hive/4', 'Demo Hive', 'Demo Hive', 0, 3, 2, 'https://hivechat.co', '000-012-003', '', '', 0, 0, '', '1', '2021-01-28 17:49:02', '{\"description\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"keywords\":{\"_flang\":\"plain\",\"raw\":\"\",\"processed\":\"\"},\"noindex\":null,\"nofollow\":null,\"nosnippet\":null}', 'default.html', 'admin/demo_conference.php', 13, '', ''),
(23, 2, 'https://hivechat.co.uk/admin', 'Home', 'Home', 0, 1, 2, 'https://hivechat.co', '000-002-001', '', '', 0, 1, '', '1', '2021-01-28 09:28:17', '', 'default.html', 'default.php', 0, '', ''),
(25, 0, 'https://hivechat.co.uk/explore/browse', 'Browse', 'Browse', 0, 14, 1, 'https://hivechat.co', '000-015', '', '', 0, 1, '', '1', '2021-01-28 20:52:09', '', 'default.html', '', 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_page_routes`
--

CREATE TABLE `perch3_page_routes` (
  `routeID` int(10) UNSIGNED NOT NULL,
  `pageID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `templateID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `routePattern` char(255) NOT NULL DEFAULT '',
  `routeRegExp` char(255) NOT NULL DEFAULT '',
  `routeOrder` int(10) UNSIGNED NOT NULL,
  `templatePath` char(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_page_routes`
--

INSERT INTO `perch3_page_routes` (`routeID`, `pageID`, `templateID`, `routePattern`, `routeRegExp`, `routeOrder`, `templatePath`) VALUES
(1, 16, 0, 'blog/[slug:s]', '^/blog/(?<s>[a-z0-9\\-%\\+]+)/?$', 1, ''),
(2, 20, 0, 'admin/your-hives/[i:hiveID]', '^/admin/your-hives/(?<hiveID>[0-9]+)/?$', 1, ''),
(3, 20, 0, 'admin/your-hives/[i:hiveID]/[i:cellID]', '^/admin/your-hives/(?<hiveID>[0-9]+)/(?<cellID>[0-9]+)/?$', 1, ''),
(4, 24, 0, 'hive/[i:hiveID]', '^/hive/(?<hiveID>[0-9]+)/?$', 1, ''),
(5, 24, 0, 'hive/[i:hiveID]/[i:cellID]', '^/hive/(?<hiveID>[0-9]+)/(?<cellID>[0-9]+)/?$', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_page_templates`
--

CREATE TABLE `perch3_page_templates` (
  `templateID` int(10) UNSIGNED NOT NULL,
  `templateTitle` varchar(255) NOT NULL DEFAULT '',
  `templatePath` varchar(255) NOT NULL DEFAULT '',
  `optionsPageID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `templateReference` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `templateNavGroups` varchar(255) DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_page_templates`
--

INSERT INTO `perch3_page_templates` (`templateID`, `templateTitle`, `templatePath`, `optionsPageID`, `templateReference`, `templateNavGroups`) VALUES
(1, 'Default', 'default.php', 0, 1, ''),
(2, 'Home', 'home.php', 0, 1, ''),
(3, 'Home', 'admin/home.php', 0, 1, ''),
(4, '403', 'errors/403.php', 0, 1, ''),
(5, '404', 'errors/404.php', 0, 1, ''),
(6, '503', 'errors/503.php', 0, 1, ''),
(7, 'Login - Required', 'errors/login-required.php', 0, 1, ''),
(8, 'Site - Offline', 'errors/site-offline.php', 0, 1, ''),
(9, 'Reset', 'admin/reset.php', 0, 1, ''),
(10, 'Logout', 'admin/logout.php', 0, 1, ''),
(11, 'Account', 'admin/account.php', 0, 1, ''),
(12, 'Search', 'admin/search.php', 0, 1, ''),
(13, 'Demo Conference', 'admin/demo_conference.php', 0, 1, ''),
(14, 'Default', 'website/default.php', 0, 1, ''),
(15, 'Blog', 'website/blog.php', 0, 1, ''),
(16, 'Browse', 'admin/browse.php', 0, 1, ''),
(17, 'Topics', 'admin/topics.php', 0, 1, ''),
(18, 'Your Cells', 'admin/your_cells.php', 0, 1, ''),
(19, 'Create Cell', 'admin/create_cell.php', 0, 1, ''),
(20, 'Hive', 'admin/hive.php', 0, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_resources`
--

CREATE TABLE `perch3_resources` (
  `resourceID` int(10) UNSIGNED NOT NULL,
  `resourceApp` char(32) NOT NULL DEFAULT 'content',
  `resourceBucket` char(16) NOT NULL DEFAULT 'default',
  `resourceFile` char(255) NOT NULL DEFAULT '',
  `resourceKey` enum('orig','thumb') DEFAULT NULL,
  `resourceParentID` int(10) NOT NULL DEFAULT '0',
  `resourceType` char(4) NOT NULL DEFAULT '',
  `resourceCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `resourceUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `resourceAWOL` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `resourceTitle` char(255) DEFAULT NULL,
  `resourceFileSize` int(10) UNSIGNED DEFAULT NULL,
  `resourceWidth` int(10) UNSIGNED DEFAULT NULL,
  `resourceHeight` int(10) UNSIGNED DEFAULT NULL,
  `resourceCrop` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `resourceDensity` float NOT NULL DEFAULT '1',
  `resourceTargetWidth` int(10) UNSIGNED DEFAULT NULL,
  `resourceTargetHeight` int(10) UNSIGNED DEFAULT NULL,
  `resourceMimeType` char(64) DEFAULT NULL,
  `resourceInLibrary` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_resources`
--

INSERT INTO `perch3_resources` (`resourceID`, `resourceApp`, `resourceBucket`, `resourceFile`, `resourceKey`, `resourceParentID`, `resourceType`, `resourceCreated`, `resourceUpdated`, `resourceAWOL`, `resourceTitle`, `resourceFileSize`, `resourceWidth`, `resourceHeight`, `resourceCrop`, `resourceDensity`, `resourceTargetWidth`, `resourceTargetHeight`, `resourceMimeType`, `resourceInLibrary`) VALUES
(1, 'assets', 'default', 'chuttersnap-ay7kdns6uui-unsplash.jpg', 'orig', 0, 'jpg', '2021-01-27 14:53:47', '2021-01-27 14:53:47', 0, 'Chuttersnap ay7kdns6UuI unsplash', 2157919, 4016, 6016, 0, 1, NULL, NULL, 'image/jpeg', 0),
(2, 'assets', 'default', 'chuttersnap-ay7kdns6uui-unsplash-thumb@2x.jpg', 'thumb', 1, 'jpg', '2021-01-27 14:53:47', '2021-01-27 14:53:47', 0, 'Chuttersnap ay7kdns6UuI unsplash', 38794, 100, 150, 0, 2, 150, 150, 'image/jpeg', 0),
(3, 'content', 'default', 'chuttersnap-ay7kdns6uui-unsplash-w700.jpg', '', 1, 'jpg', '2021-01-27 14:53:49', '2021-01-27 14:53:49', 0, 'Chuttersnap ay7kdns6uui unsplash w700', 302553, 700, 1048, 0, 1, 700, 0, 'image/jpeg', 0),
(4, 'assets', 'default', 'chuttersnap-buzonzxkw8m-unsplash-2.jpg', 'orig', 0, 'jpg', '2021-01-27 16:39:10', '2021-01-27 16:39:10', 0, 'Chuttersnap bUZONzxkW8M unsplash', 383323, 1920, 2880, 0, 1, NULL, NULL, 'image/jpeg', 0),
(5, 'assets', 'default', 'chuttersnap-buzonzxkw8m-unsplash-2-thumb@2x.jpg', 'thumb', 4, 'jpg', '2021-01-27 16:39:10', '2021-01-27 16:39:10', 0, 'Chuttersnap bUZONzxkW8M unsplash', 9685, 100, 150, 0, 2, 150, 150, 'image/jpeg', 0),
(6, 'content', 'default', 'chuttersnap-buzonzxkw8m-unsplash-2-w700.jpg', '', 4, 'jpg', '2021-01-27 16:39:15', '2021-01-27 16:39:15', 0, 'Chuttersnap buzonzxkw8m unsplash 2 w700', 76795, 700, 1050, 0, 1, 700, 0, 'image/jpeg', 0),
(7, 'assets', 'default', 'joshua-hibbert-pn6iimgm-wo-unsplash.jpg', 'orig', 0, 'jpg', '2021-01-27 16:42:59', '2021-01-27 16:42:59', 0, 'Joshua hibbert Pn6iimgM wo unsplash', 2016574, 2900, 4334, 0, 1, NULL, NULL, 'image/jpeg', 0),
(8, 'assets', 'default', 'joshua-hibbert-pn6iimgm-wo-unsplash-thumb@2x.jpg', 'thumb', 7, 'jpg', '2021-01-27 16:42:59', '2021-01-27 16:42:59', 0, 'Joshua hibbert Pn6iimgM wo unsplash', 13102, 100, 150, 0, 2, 150, 150, 'image/jpeg', 0),
(9, 'content', 'default', 'joshua-hibbert-pn6iimgm-wo-unsplash-w300h300.jpg', '', 7, 'jpg', '2021-01-27 16:43:47', '2021-01-27 16:43:47', 0, 'Joshua hibbert pn6iimgm wo unsplash w300h300', 20540, 300, 300, 1, 1, 300, 300, 'image/jpeg', 0),
(10, 'content', 'default', 'chuttersnap-ay7kdns6uui-unsplash-w300h300.jpg', '', 1, 'jpg', '2021-01-27 17:06:03', '2021-01-27 17:06:03', 0, 'Chuttersnap ay7kdns6uui unsplash w300h300', 59888, 300, 300, 1, 1, 300, 300, 'image/jpeg', 0),
(11, 'content', 'default', 'chuttersnap-buzonzxkw8m-unsplash-2-w1440h768.jpg', '', 4, 'jpg', '2021-01-27 17:21:39', '2021-01-27 17:21:39', 0, 'Chuttersnap buzonzxkw8m unsplash 2 w1440h768', 127175, 1440, 768, 1, 1, 1440, 768, 'image/jpeg', 0),
(12, 'content', 'default', 'joshua-hibbert-pn6iimgm-wo-unsplash-w700.jpg', '', 7, 'jpg', '2021-01-27 17:33:47', '2021-01-27 17:33:47', 0, 'Joshua hibbert pn6iimgm wo unsplash w700', 160476, 700, 1046, 0, 1, 700, 0, 'image/jpeg', 0),
(13, 'perch_blog', 'default', 'chuttersnap-buzonzxkw8m-unsplash-2-w320h240.jpg', '', 4, 'jpg', '2021-01-27 20:28:35', '2021-01-27 20:28:35', 0, 'Chuttersnap buzonzxkw8m unsplash 2 w320h240', 12983, 320, 240, 1, 1, 320, 240, 'image/jpeg', 0),
(14, 'perch_blog', 'default', 'chuttersnap-buzonzxkw8m-unsplash-2-w50h50.jpg', '', 4, 'jpg', '2021-01-27 20:28:35', '2021-01-27 20:28:35', 0, 'Chuttersnap buzonzxkw8m unsplash 2 w50h50', 1853, 50, 50, 1, 1, 50, 50, 'image/jpeg', 0),
(15, 'perch_blog', 'default', 'chuttersnap-buzonzxkw8m-unsplash-2-w1024.jpg', '', 4, 'jpg', '2021-01-27 20:31:57', '2021-01-27 20:31:57', 0, 'Chuttersnap buzonzxkw8m unsplash 2 w1024', 156417, 1024, 1536, 0, 1, 1024, 0, 'image/jpeg', 0),
(16, 'assets', 'default', 'lucas-carl-pqfuaviwngm-unsplash.jpg', 'orig', 0, 'jpg', '2021-01-27 20:33:11', '2021-01-27 20:33:11', 0, 'Lucas carl PQfuavIwNGM unsplash', 2617308, 5472, 3648, 0, 1, NULL, NULL, 'image/jpeg', 0),
(17, 'assets', 'default', 'lucas-carl-pqfuaviwngm-unsplash-thumb@2x.jpg', 'thumb', 16, 'jpg', '2021-01-27 20:33:11', '2021-01-27 20:33:11', 0, 'Lucas carl PQfuavIwNGM unsplash', 18714, 150, 100, 0, 2, 150, 150, 'image/jpeg', 0),
(18, 'perch_blog', 'default', 'lucas-carl-pqfuaviwngm-unsplash-w1024.jpg', '', 16, 'jpg', '2021-01-27 20:33:15', '2021-01-27 20:33:15', 0, 'Lucas carl pqfuaviwngm unsplash w1024', 123699, 1024, 682, 0, 1, 1024, 0, 'image/jpeg', 0),
(19, 'perch_blog', 'default', 'lucas-carl-pqfuaviwngm-unsplash-w50h50.jpg', '', 16, 'jpg', '2021-01-27 20:33:15', '2021-01-27 20:33:15', 0, 'Lucas carl pqfuaviwngm unsplash w50h50', 2385, 50, 50, 1, 1, 50, 50, 'image/jpeg', 0),
(20, 'perch_blog', 'default', 'lucas-carl-pqfuaviwngm-unsplash-w200h200.jpg', '', 16, 'jpg', '2021-01-27 20:34:36', '2021-01-27 20:34:36', 0, 'Lucas carl pqfuaviwngm unsplash w200h200', 14275, 200, 200, 1, 1, 200, 200, 'image/jpeg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_resources_to_tags`
--

CREATE TABLE `perch3_resources_to_tags` (
  `resourceID` int(10) NOT NULL DEFAULT '0',
  `tagID` int(10) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_resource_log`
--

CREATE TABLE `perch3_resource_log` (
  `logID` int(10) UNSIGNED NOT NULL,
  `appID` char(32) NOT NULL DEFAULT 'content',
  `itemFK` char(32) NOT NULL DEFAULT 'itemRowID',
  `itemRowID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `resourceID` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_resource_log`
--

INSERT INTO `perch3_resource_log` (`logID`, `appID`, `itemFK`, `itemRowID`, `resourceID`) VALUES
(667, 'content', 'itemRowID', 99, 2),
(668, 'content', 'itemRowID', 99, 3),
(669, 'content', 'itemRowID', 99, 4),
(384, 'content', 'itemRowID', 59, 10),
(383, 'content', 'itemRowID', 59, 9),
(382, 'content', 'itemRowID', 59, 8),
(381, 'content', 'itemRowID', 59, 7),
(380, 'content', 'itemRowID', 59, 6),
(379, 'content', 'itemRowID', 59, 5),
(416, 'content', 'itemRowID', 61, 2),
(417, 'content', 'itemRowID', 61, 3),
(418, 'content', 'itemRowID', 61, 4),
(499, 'content', 'itemRowID', 85, 12),
(498, 'content', 'itemRowID', 85, 8),
(497, 'content', 'itemRowID', 85, 7),
(494, 'content', 'itemRowID', 85, 4),
(495, 'content', 'itemRowID', 85, 5),
(496, 'content', 'itemRowID', 85, 11),
(627, 'content', 'itemRowID', 97, 2),
(628, 'content', 'itemRowID', 97, 3),
(629, 'content', 'itemRowID', 97, 4),
(647, 'content', 'itemRowID', 98, 2),
(648, 'content', 'itemRowID', 98, 3),
(649, 'content', 'itemRowID', 98, 4),
(404, 'content', 'itemRowID', 60, 10),
(403, 'content', 'itemRowID', 60, 9),
(402, 'content', 'itemRowID', 60, 8),
(401, 'content', 'itemRowID', 60, 7),
(400, 'content', 'itemRowID', 60, 6),
(399, 'content', 'itemRowID', 60, 5),
(419, 'content', 'itemRowID', 61, 5),
(420, 'content', 'itemRowID', 61, 6),
(421, 'content', 'itemRowID', 61, 7),
(482, 'content', 'itemRowID', 83, 4),
(483, 'content', 'itemRowID', 83, 5),
(484, 'content', 'itemRowID', 83, 11),
(607, 'content', 'itemRowID', 96, 2),
(608, 'content', 'itemRowID', 96, 3),
(609, 'content', 'itemRowID', 96, 4),
(610, 'content', 'itemRowID', 96, 5),
(611, 'content', 'itemRowID', 96, 6),
(612, 'content', 'itemRowID', 96, 7),
(613, 'content', 'itemRowID', 96, 8),
(614, 'content', 'itemRowID', 96, 9),
(615, 'content', 'itemRowID', 96, 10),
(630, 'content', 'itemRowID', 97, 5),
(631, 'content', 'itemRowID', 97, 6),
(632, 'content', 'itemRowID', 97, 7),
(633, 'content', 'itemRowID', 97, 8),
(634, 'content', 'itemRowID', 97, 9),
(635, 'content', 'itemRowID', 97, 10),
(650, 'content', 'itemRowID', 98, 5),
(651, 'content', 'itemRowID', 98, 6),
(652, 'content', 'itemRowID', 98, 7),
(653, 'content', 'itemRowID', 98, 8),
(654, 'content', 'itemRowID', 98, 9),
(655, 'content', 'itemRowID', 98, 10),
(670, 'content', 'itemRowID', 99, 5),
(671, 'content', 'itemRowID', 99, 6),
(672, 'content', 'itemRowID', 99, 7),
(673, 'content', 'itemRowID', 99, 8),
(674, 'content', 'itemRowID', 99, 9),
(675, 'content', 'itemRowID', 99, 10),
(378, 'content', 'itemRowID', 59, 4),
(377, 'content', 'itemRowID', 59, 3),
(398, 'content', 'itemRowID', 60, 4),
(397, 'content', 'itemRowID', 60, 3),
(396, 'content', 'itemRowID', 60, 2),
(422, 'content', 'itemRowID', 61, 8),
(423, 'content', 'itemRowID', 61, 9),
(424, 'content', 'itemRowID', 61, 10),
(376, 'content', 'itemRowID', 59, 2),
(375, 'content', 'itemRowID', 59, 1),
(395, 'content', 'itemRowID', 60, 1),
(415, 'content', 'itemRowID', 61, 1),
(440, 'content', 'itemRowID', 76, 7),
(441, 'content', 'itemRowID', 76, 8),
(442, 'content', 'itemRowID', 76, 9),
(448, 'content', 'itemRowID', 77, 9),
(447, 'content', 'itemRowID', 77, 8),
(446, 'content', 'itemRowID', 77, 7),
(523, 'content', 'itemRowID', 93, 12),
(522, 'content', 'itemRowID', 93, 8),
(521, 'content', 'itemRowID', 93, 7),
(557, 'perch_blog', 'postID', 1, 17),
(556, 'perch_blog', 'postID', 1, 16),
(558, 'perch_blog', 'postID', 1, 18),
(466, 'content', 'itemRowID', 80, 11),
(465, 'content', 'itemRowID', 80, 5),
(464, 'content', 'itemRowID', 80, 4),
(472, 'content', 'itemRowID', 81, 11),
(471, 'content', 'itemRowID', 81, 5),
(470, 'content', 'itemRowID', 81, 4),
(478, 'content', 'itemRowID', 82, 11),
(477, 'content', 'itemRowID', 82, 5),
(476, 'content', 'itemRowID', 82, 4),
(490, 'content', 'itemRowID', 84, 11),
(489, 'content', 'itemRowID', 84, 5),
(488, 'content', 'itemRowID', 84, 4),
(511, 'content', 'itemRowID', 92, 12),
(510, 'content', 'itemRowID', 92, 8),
(509, 'content', 'itemRowID', 92, 7),
(508, 'content', 'itemRowID', 92, 11),
(507, 'content', 'itemRowID', 92, 5),
(506, 'content', 'itemRowID', 92, 4),
(520, 'content', 'itemRowID', 93, 11),
(519, 'content', 'itemRowID', 93, 5),
(518, 'content', 'itemRowID', 93, 4),
(559, 'perch_blog', 'postID', 1, 20),
(575, 'perch_blog', 'postID', 2, 20),
(574, 'perch_blog', 'postID', 2, 18),
(573, 'perch_blog', 'postID', 2, 17),
(572, 'perch_blog', 'postID', 2, 16),
(595, 'content', 'itemRowID', 95, 10),
(594, 'content', 'itemRowID', 95, 9),
(593, 'content', 'itemRowID', 95, 8),
(592, 'content', 'itemRowID', 95, 7),
(591, 'content', 'itemRowID', 95, 6),
(590, 'content', 'itemRowID', 95, 5),
(589, 'content', 'itemRowID', 95, 4),
(588, 'content', 'itemRowID', 95, 3),
(587, 'content', 'itemRowID', 95, 2),
(586, 'content', 'itemRowID', 95, 1),
(606, 'content', 'itemRowID', 96, 1),
(626, 'content', 'itemRowID', 97, 1),
(646, 'content', 'itemRowID', 98, 1),
(666, 'content', 'itemRowID', 99, 1);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_resource_tags`
--

CREATE TABLE `perch3_resource_tags` (
  `tagID` int(10) NOT NULL,
  `tagTitle` varchar(255) NOT NULL DEFAULT '',
  `tagSlug` varchar(255) NOT NULL DEFAULT '',
  `tagCount` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_settings`
--

CREATE TABLE `perch3_settings` (
  `settingID` varchar(60) NOT NULL DEFAULT '',
  `userID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `settingValue` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_settings`
--

INSERT INTO `perch3_settings` (`settingID`, `userID`, `settingValue`) VALUES
('headerColour', 0, '#000000'),
('content_singlePageEdit', 0, '1'),
('helpURL', 0, ''),
('siteURL', 0, '/'),
('hideBranding', 0, '0'),
('content_collapseList', 0, '1'),
('lang', 0, 'en-gb'),
('installedAt', 0, '3.1.7'),
('update_3.1.7', 0, 'done'),
('headerScheme', 0, 'dark'),
('update_runway_3.1.7', 0, 'done'),
('latest_version', 0, ''),
('on_sale_version', 0, '3.1.7'),
('perch_members_update', 0, '1.4'),
('perch_blog_update', 0, '5.6'),
('perch_blog_post_url', 0, '/blog/{postSlug}'),
('perch_members_login_page', 0, '/members/login.php?r={returnURL}'),
('perch_blog_site_name', 0, ''),
('perch_blog_slug_format', 0, '%Y-%m-%d-{postTitle}'),
('perch_blog_akismet_key', 0, ''),
('perch_blog_max_spam_days', 0, '0'),
('dashboard', 0, '0'),
('sidebar_back_link', 0, '0'),
('hide_pwd_reset', 0, '0'),
('keyboardShortcuts', 0, '0'),
('siteOffline', 0, '0'),
('content_hideNonEditableRegions', 0, '0'),
('content_frontend_edit', 0, '0'),
('content_skip_region_list', 0, '0'),
('assets_restrict_buckets', 0, '0'),
('perch_blog_comment_notify', 0, '0'),
('perch_blog_webmention_tx', 0, '0'),
('perch_blog_webmention_rx', 0, '0');

-- --------------------------------------------------------

--
-- Table structure for table `perch3_users`
--

CREATE TABLE `perch3_users` (
  `userID` int(10) UNSIGNED NOT NULL,
  `userUsername` varchar(255) NOT NULL DEFAULT '',
  `userPassword` varchar(255) NOT NULL DEFAULT '',
  `userCreated` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `userUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userLastLogin` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `userGivenName` varchar(255) NOT NULL DEFAULT '',
  `userFamilyName` varchar(255) NOT NULL DEFAULT '',
  `userEmail` varchar(255) NOT NULL DEFAULT '',
  `userEnabled` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `userHash` char(32) NOT NULL DEFAULT '',
  `roleID` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `userMasterAdmin` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `userPasswordToken` char(255) NOT NULL DEFAULT 'expired',
  `userPasswordTokenExpires` datetime NOT NULL DEFAULT '2015-01-01 00:00:00',
  `userLastFailedLogin` datetime DEFAULT NULL,
  `userFailedLoginAttempts` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_users`
--

INSERT INTO `perch3_users` (`userID`, `userUsername`, `userPassword`, `userCreated`, `userUpdated`, `userLastLogin`, `userGivenName`, `userFamilyName`, `userEmail`, `userEnabled`, `userHash`, `roleID`, `userMasterAdmin`, `userPasswordToken`, `userPasswordTokenExpires`, `userLastFailedLogin`, `userFailedLoginAttempts`) VALUES
(1, 'acalebwilson24', '$P$B8o3dGuOZck.MhtniytMmcDH1gPPww.', '2021-01-15 09:12:49', '2021-01-30 23:24:01', '2021-01-30 23:23:56', 'Caleb', 'Wilson', 'caleb@natureslaboratory.co.uk', 1, 'f36e70d2af12ce61f6b2a728f669868e', 2, 1, 'expired', '2015-01-01 00:00:00', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_user_passwords`
--

CREATE TABLE `perch3_user_passwords` (
  `passwordID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `userPassword` varchar(255) NOT NULL DEFAULT '',
  `passwordLastUsed` datetime NOT NULL DEFAULT '2000-01-01 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_user_privileges`
--

CREATE TABLE `perch3_user_privileges` (
  `privID` int(10) UNSIGNED NOT NULL,
  `privKey` varchar(255) NOT NULL DEFAULT '',
  `privTitle` varchar(255) NOT NULL DEFAULT '',
  `privOrder` int(10) UNSIGNED NOT NULL DEFAULT '99'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_user_privileges`
--

INSERT INTO `perch3_user_privileges` (`privID`, `privKey`, `privTitle`, `privOrder`) VALUES
(1, 'perch.login', 'Log in', 1),
(2, 'perch.settings', 'Change settings', 2),
(3, 'perch.users.manage', 'Manage users', 3),
(4, 'perch.updatenotices', 'View update notices', 4),
(5, 'content.regions.delete', 'Delete regions', 1),
(6, 'content.regions.options', 'Edit region options', 2),
(7, 'content.pages.edit', 'Edit page details', 1),
(8, 'content.pages.reorder', 'Reorder pages', 2),
(9, 'content.pages.create', 'Add new pages', 3),
(10, 'content.pages.configure', 'Configure page settings', 5),
(11, 'content.pages.delete', 'Delete pages', 4),
(12, 'content.templates.delete', 'Delete master pages', 6),
(13, 'content.navgroups.configure', 'Configure navigation groups', 7),
(14, 'content.navgroups.create', 'Create navigation groups', 8),
(15, 'content.navgroups.delete', 'Delete navigation groups', 9),
(16, 'content.pages.create.toplevel', 'Add new top-level pages', 3),
(17, 'content.pages.delete.own', 'Delete pages they created themselves', 4),
(18, 'content.templates.configure', 'Configure master pages', 6),
(19, 'content.pages.attributes', 'Edit page titles and attributes', 6),
(20, 'categories.create', 'Create new categories', 1),
(21, 'categories.delete', 'Delete categories', 2),
(22, 'categories.manage', 'Manage categories', 3),
(23, 'categories.sets.create', 'Create category sets', 4),
(24, 'categories.sets.delete', 'Delete category sets', 5),
(25, 'assets.create', 'Upload assets', 1),
(26, 'assets.manage', 'Manage assets', 2),
(27, 'assets.delete', 'Delete assets', 3),
(28, 'content.pages.manage_urls', 'Edit page locations', 10),
(29, 'perch_members', 'Manage members', 1),
(30, 'perch_forms', 'Access forms', 1),
(31, 'perch_forms.configure', 'Configure forms', 1),
(32, 'perch_forms.delete', 'Delete forms', 1),
(33, 'perch_forms.delete_responses', 'Delete responses', 1),
(34, 'perch_forms.export', 'Export responses', 1),
(35, 'perch_blog', 'Access the blog', 1),
(36, 'perch_blog.post.create', 'Create posts', 1),
(37, 'perch_blog.post.delete', 'Delete posts', 1),
(38, 'perch_blog.post.publish', 'Publish posts', 1),
(39, 'perch_blog.comments.moderate', 'Moderate comments', 1),
(40, 'perch_blog.comments.enable', 'Enable comments on a post', 1),
(41, 'perch_blog.import', 'Import data', 1),
(42, 'perch_blog.authors.manage', 'Manage authors', 1);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_user_roles`
--

CREATE TABLE `perch3_user_roles` (
  `roleID` int(10) UNSIGNED NOT NULL,
  `roleTitle` varchar(255) NOT NULL DEFAULT '',
  `roleSlug` varchar(255) NOT NULL DEFAULT '',
  `roleMasterAdmin` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_user_roles`
--

INSERT INTO `perch3_user_roles` (`roleID`, `roleTitle`, `roleSlug`, `roleMasterAdmin`) VALUES
(1, 'Editor', 'editor', 0),
(2, 'Admin', 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `perch3_user_role_buckets`
--

CREATE TABLE `perch3_user_role_buckets` (
  `urbID` int(10) UNSIGNED NOT NULL,
  `roleID` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `bucket` char(64) NOT NULL DEFAULT '',
  `roleSelect` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `roleInsert` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `roleUpdate` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `roleDelete` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `roleDefault` tinyint(1) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `perch3_user_role_privileges`
--

CREATE TABLE `perch3_user_role_privileges` (
  `roleID` int(10) UNSIGNED NOT NULL,
  `privID` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `perch3_user_role_privileges`
--

INSERT INTO `perch3_user_role_privileges` (`roleID`, `privID`) VALUES
(1, 1),
(2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `perch3_backup_plans`
--
ALTER TABLE `perch3_backup_plans`
  ADD PRIMARY KEY (`planID`);

--
-- Indexes for table `perch3_backup_resources`
--
ALTER TABLE `perch3_backup_resources`
  ADD PRIMARY KEY (`planID`,`resourceID`);

--
-- Indexes for table `perch3_backup_runs`
--
ALTER TABLE `perch3_backup_runs`
  ADD PRIMARY KEY (`runID`),
  ADD KEY `idx_plan` (`planID`);

--
-- Indexes for table `perch3_blogs`
--
ALTER TABLE `perch3_blogs`
  ADD PRIMARY KEY (`blogID`);

--
-- Indexes for table `perch3_blog_authors`
--
ALTER TABLE `perch3_blog_authors`
  ADD PRIMARY KEY (`authorID`);

--
-- Indexes for table `perch3_blog_comments`
--
ALTER TABLE `perch3_blog_comments`
  ADD PRIMARY KEY (`commentID`);

--
-- Indexes for table `perch3_blog_index`
--
ALTER TABLE `perch3_blog_index`
  ADD PRIMARY KEY (`indexID`),
  ADD KEY `idx_fk` (`itemKey`,`itemID`),
  ADD KEY `idx_key` (`indexKey`),
  ADD KEY `idx_key_val` (`indexKey`,`indexValue`),
  ADD KEY `idx_keys` (`itemKey`,`indexKey`);

--
-- Indexes for table `perch3_blog_posts`
--
ALTER TABLE `perch3_blog_posts`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `idx_date` (`postDateTime`),
  ADD KEY `idx_status` (`postStatus`),
  ADD KEY `idx_blog` (`blogID`);
ALTER TABLE `perch3_blog_posts` ADD FULLTEXT KEY `idx_search` (`postTitle`,`postDescRaw`,`postTags`);

--
-- Indexes for table `perch3_blog_posts_to_tags`
--
ALTER TABLE `perch3_blog_posts_to_tags`
  ADD PRIMARY KEY (`postID`,`tagID`);

--
-- Indexes for table `perch3_blog_sections`
--
ALTER TABLE `perch3_blog_sections`
  ADD PRIMARY KEY (`sectionID`),
  ADD KEY `idx_slug` (`sectionSlug`);

--
-- Indexes for table `perch3_blog_tags`
--
ALTER TABLE `perch3_blog_tags`
  ADD PRIMARY KEY (`tagID`);

--
-- Indexes for table `perch3_blog_webmention_queue`
--
ALTER TABLE `perch3_blog_webmention_queue`
  ADD PRIMARY KEY (`entryID`);

--
-- Indexes for table `perch3_categories`
--
ALTER TABLE `perch3_categories`
  ADD PRIMARY KEY (`catID`),
  ADD KEY `idx_set` (`setID`);

--
-- Indexes for table `perch3_category_counts`
--
ALTER TABLE `perch3_category_counts`
  ADD PRIMARY KEY (`countID`),
  ADD KEY `idx_cat` (`catID`),
  ADD KEY `idx_cat_type` (`countType`,`catID`);

--
-- Indexes for table `perch3_category_sets`
--
ALTER TABLE `perch3_category_sets`
  ADD PRIMARY KEY (`setID`);

--
-- Indexes for table `perch3_cells`
--
ALTER TABLE `perch3_cells`
  ADD PRIMARY KEY (`cellID`);

--
-- Indexes for table `perch3_collections`
--
ALTER TABLE `perch3_collections`
  ADD PRIMARY KEY (`collectionID`),
  ADD KEY `idx_key` (`collectionKey`),
  ADD KEY `idx_appmenu` (`collectionInAppMenu`);

--
-- Indexes for table `perch3_collection_index`
--
ALTER TABLE `perch3_collection_index`
  ADD PRIMARY KEY (`indexID`),
  ADD KEY `idx_key` (`indexKey`),
  ADD KEY `idx_val` (`indexValue`),
  ADD KEY `idx_rev` (`itemRev`),
  ADD KEY `idx_item` (`itemID`),
  ADD KEY `idx_keyval` (`indexKey`,`indexValue`),
  ADD KEY `idx_colrev` (`collectionID`,`itemRev`);

--
-- Indexes for table `perch3_collection_items`
--
ALTER TABLE `perch3_collection_items`
  ADD PRIMARY KEY (`itemRowID`),
  ADD KEY `idx_item` (`itemID`),
  ADD KEY `idx_rev` (`itemRev`),
  ADD KEY `idx_collection` (`collectionID`),
  ADD KEY `idx_regrev` (`itemID`,`collectionID`,`itemRev`);
ALTER TABLE `perch3_collection_items` ADD FULLTEXT KEY `idx_search` (`itemSearch`);

--
-- Indexes for table `perch3_collection_revisions`
--
ALTER TABLE `perch3_collection_revisions`
  ADD PRIMARY KEY (`itemID`),
  ADD KEY `idx_order` (`itemOrder`);

--
-- Indexes for table `perch3_content_index`
--
ALTER TABLE `perch3_content_index`
  ADD PRIMARY KEY (`indexID`),
  ADD KEY `idx_key` (`indexKey`),
  ADD KEY `idx_val` (`indexValue`),
  ADD KEY `idx_rev` (`itemRev`),
  ADD KEY `idx_item` (`itemID`),
  ADD KEY `idx_keyval` (`indexKey`,`indexValue`),
  ADD KEY `idx_regrev` (`regionID`,`itemRev`);

--
-- Indexes for table `perch3_content_items`
--
ALTER TABLE `perch3_content_items`
  ADD PRIMARY KEY (`itemRowID`),
  ADD KEY `idx_item` (`itemID`),
  ADD KEY `idx_rev` (`itemRev`),
  ADD KEY `idx_region` (`regionID`),
  ADD KEY `idx_regrev` (`itemID`,`regionID`,`itemRev`),
  ADD KEY `idx_order` (`itemOrder`);
ALTER TABLE `perch3_content_items` ADD FULLTEXT KEY `idx_search` (`itemSearch`);

--
-- Indexes for table `perch3_content_locks`
--
ALTER TABLE `perch3_content_locks`
  ADD PRIMARY KEY (`lockID`),
  ADD KEY `idx_key` (`contentKey`),
  ADD KEY `idx_ku` (`contentKey`,`userID`);

--
-- Indexes for table `perch3_content_regions`
--
ALTER TABLE `perch3_content_regions`
  ADD PRIMARY KEY (`regionID`),
  ADD KEY `idx_key` (`regionKey`),
  ADD KEY `idx_path` (`regionPage`);

--
-- Indexes for table `perch3_forms`
--
ALTER TABLE `perch3_forms`
  ADD PRIMARY KEY (`formID`),
  ADD KEY `idx_formKey` (`formKey`);

--
-- Indexes for table `perch3_forms_responses`
--
ALTER TABLE `perch3_forms_responses`
  ADD PRIMARY KEY (`responseID`),
  ADD KEY `idx_formID` (`formID`),
  ADD KEY `idx_spam` (`responseSpam`);

--
-- Indexes for table `perch3_hives`
--
ALTER TABLE `perch3_hives`
  ADD PRIMARY KEY (`hiveID`);

--
-- Indexes for table `perch3_members`
--
ALTER TABLE `perch3_members`
  ADD PRIMARY KEY (`memberID`),
  ADD KEY `idx_email` (`memberEmail`),
  ADD KEY `idx_type` (`memberAuthType`),
  ADD KEY `idx_active` (`memberStatus`);

--
-- Indexes for table `perch3_members_forms`
--
ALTER TABLE `perch3_members_forms`
  ADD PRIMARY KEY (`formID`);

--
-- Indexes for table `perch3_members_member_tags`
--
ALTER TABLE `perch3_members_member_tags`
  ADD PRIMARY KEY (`memberID`,`tagID`);

--
-- Indexes for table `perch3_members_sessions`
--
ALTER TABLE `perch3_members_sessions`
  ADD PRIMARY KEY (`sessionID`);

--
-- Indexes for table `perch3_members_tags`
--
ALTER TABLE `perch3_members_tags`
  ADD PRIMARY KEY (`tagID`),
  ADD KEY `idx_tag` (`tag`);

--
-- Indexes for table `perch3_menu_items`
--
ALTER TABLE `perch3_menu_items`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `perch3_navigation`
--
ALTER TABLE `perch3_navigation`
  ADD PRIMARY KEY (`groupID`);

--
-- Indexes for table `perch3_navigation_pages`
--
ALTER TABLE `perch3_navigation_pages`
  ADD PRIMARY KEY (`navpageID`),
  ADD KEY `idx_group` (`groupID`),
  ADD KEY `idx_page_group` (`pageID`,`groupID`);

--
-- Indexes for table `perch3_pages`
--
ALTER TABLE `perch3_pages`
  ADD PRIMARY KEY (`pageID`),
  ADD KEY `idx_parent` (`pageParentID`);

--
-- Indexes for table `perch3_page_routes`
--
ALTER TABLE `perch3_page_routes`
  ADD PRIMARY KEY (`routeID`),
  ADD KEY `idx_page` (`pageID`),
  ADD KEY `idx_template` (`templateID`);

--
-- Indexes for table `perch3_page_templates`
--
ALTER TABLE `perch3_page_templates`
  ADD PRIMARY KEY (`templateID`);

--
-- Indexes for table `perch3_resources`
--
ALTER TABLE `perch3_resources`
  ADD PRIMARY KEY (`resourceID`),
  ADD UNIQUE KEY `idx_file` (`resourceBucket`,`resourceFile`),
  ADD KEY `idx_app` (`resourceApp`),
  ADD KEY `idx_key` (`resourceKey`),
  ADD KEY `idx_type` (`resourceType`),
  ADD KEY `idx_awol` (`resourceAWOL`),
  ADD KEY `idx_library` (`resourceInLibrary`);
ALTER TABLE `perch3_resources` ADD FULLTEXT KEY `idx_search` (`resourceTitle`);

--
-- Indexes for table `perch3_resources_to_tags`
--
ALTER TABLE `perch3_resources_to_tags`
  ADD PRIMARY KEY (`resourceID`,`tagID`);

--
-- Indexes for table `perch3_resource_log`
--
ALTER TABLE `perch3_resource_log`
  ADD PRIMARY KEY (`logID`),
  ADD UNIQUE KEY `idx_uni` (`appID`,`itemFK`,`itemRowID`,`resourceID`),
  ADD KEY `idx_resource` (`resourceID`),
  ADD KEY `idx_fk` (`itemFK`,`itemRowID`);

--
-- Indexes for table `perch3_resource_tags`
--
ALTER TABLE `perch3_resource_tags`
  ADD PRIMARY KEY (`tagID`);

--
-- Indexes for table `perch3_settings`
--
ALTER TABLE `perch3_settings`
  ADD PRIMARY KEY (`settingID`,`userID`);

--
-- Indexes for table `perch3_users`
--
ALTER TABLE `perch3_users`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `idx_enabled` (`userEnabled`);

--
-- Indexes for table `perch3_user_passwords`
--
ALTER TABLE `perch3_user_passwords`
  ADD PRIMARY KEY (`passwordID`),
  ADD KEY `idx_user` (`userID`);

--
-- Indexes for table `perch3_user_privileges`
--
ALTER TABLE `perch3_user_privileges`
  ADD PRIMARY KEY (`privID`),
  ADD UNIQUE KEY `idx_key` (`privKey`);

--
-- Indexes for table `perch3_user_roles`
--
ALTER TABLE `perch3_user_roles`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `perch3_user_role_buckets`
--
ALTER TABLE `perch3_user_role_buckets`
  ADD PRIMARY KEY (`urbID`),
  ADD KEY `idx_rolebucket` (`roleID`,`bucket`);

--
-- Indexes for table `perch3_user_role_privileges`
--
ALTER TABLE `perch3_user_role_privileges`
  ADD PRIMARY KEY (`roleID`,`privID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `perch3_backup_plans`
--
ALTER TABLE `perch3_backup_plans`
  MODIFY `planID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_backup_runs`
--
ALTER TABLE `perch3_backup_runs`
  MODIFY `runID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_blogs`
--
ALTER TABLE `perch3_blogs`
  MODIFY `blogID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_blog_authors`
--
ALTER TABLE `perch3_blog_authors`
  MODIFY `authorID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_blog_comments`
--
ALTER TABLE `perch3_blog_comments`
  MODIFY `commentID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_blog_index`
--
ALTER TABLE `perch3_blog_index`
  MODIFY `indexID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=400;

--
-- AUTO_INCREMENT for table `perch3_blog_posts`
--
ALTER TABLE `perch3_blog_posts`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `perch3_blog_sections`
--
ALTER TABLE `perch3_blog_sections`
  MODIFY `sectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_blog_tags`
--
ALTER TABLE `perch3_blog_tags`
  MODIFY `tagID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_blog_webmention_queue`
--
ALTER TABLE `perch3_blog_webmention_queue`
  MODIFY `entryID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_categories`
--
ALTER TABLE `perch3_categories`
  MODIFY `catID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_category_counts`
--
ALTER TABLE `perch3_category_counts`
  MODIFY `countID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_category_sets`
--
ALTER TABLE `perch3_category_sets`
  MODIFY `setID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_cells`
--
ALTER TABLE `perch3_cells`
  MODIFY `cellID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `perch3_collections`
--
ALTER TABLE `perch3_collections`
  MODIFY `collectionID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_collection_index`
--
ALTER TABLE `perch3_collection_index`
  MODIFY `indexID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_collection_items`
--
ALTER TABLE `perch3_collection_items`
  MODIFY `itemRowID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_content_index`
--
ALTER TABLE `perch3_content_index`
  MODIFY `indexID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `perch3_content_items`
--
ALTER TABLE `perch3_content_items`
  MODIFY `itemRowID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `perch3_content_locks`
--
ALTER TABLE `perch3_content_locks`
  MODIFY `lockID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `perch3_content_regions`
--
ALTER TABLE `perch3_content_regions`
  MODIFY `regionID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `perch3_forms`
--
ALTER TABLE `perch3_forms`
  MODIFY `formID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_forms_responses`
--
ALTER TABLE `perch3_forms_responses`
  MODIFY `responseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_hives`
--
ALTER TABLE `perch3_hives`
  MODIFY `hiveID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `perch3_members`
--
ALTER TABLE `perch3_members`
  MODIFY `memberID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `perch3_members_forms`
--
ALTER TABLE `perch3_members_forms`
  MODIFY `formID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_members_tags`
--
ALTER TABLE `perch3_members_tags`
  MODIFY `tagID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_menu_items`
--
ALTER TABLE `perch3_menu_items`
  MODIFY `itemID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `perch3_navigation`
--
ALTER TABLE `perch3_navigation`
  MODIFY `groupID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `perch3_navigation_pages`
--
ALTER TABLE `perch3_navigation_pages`
  MODIFY `navpageID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `perch3_pages`
--
ALTER TABLE `perch3_pages`
  MODIFY `pageID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `perch3_page_routes`
--
ALTER TABLE `perch3_page_routes`
  MODIFY `routeID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `perch3_page_templates`
--
ALTER TABLE `perch3_page_templates`
  MODIFY `templateID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `perch3_resources`
--
ALTER TABLE `perch3_resources`
  MODIFY `resourceID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `perch3_resource_log`
--
ALTER TABLE `perch3_resource_log`
  MODIFY `logID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=676;

--
-- AUTO_INCREMENT for table `perch3_resource_tags`
--
ALTER TABLE `perch3_resource_tags`
  MODIFY `tagID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_users`
--
ALTER TABLE `perch3_users`
  MODIFY `userID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `perch3_user_passwords`
--
ALTER TABLE `perch3_user_passwords`
  MODIFY `passwordID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perch3_user_privileges`
--
ALTER TABLE `perch3_user_privileges`
  MODIFY `privID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `perch3_user_roles`
--
ALTER TABLE `perch3_user_roles`
  MODIFY `roleID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `perch3_user_role_buckets`
--
ALTER TABLE `perch3_user_role_buckets`
  MODIFY `urbID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
