
<?php
// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);
require_once('getUserInfo.php');
require('Database.php');



$db = new DB;

$data = [];





if(!$_GET['uid']){
	header("Location: http://проверки.гувм.мвд.рф");
		die();
	// die('У вас нет доступа!');
}else{
	$uid = $_GET['uid'];

	if($db->getAll('qr_testplace WHERE uid =' . "'" . $_GET['uid'] . "'")){
		$data = $db->getAll('qr_testplace WHERE uid =' . "'" . $_GET['uid'] . "'");
	}else{
		header("Location: http://http://проверки.гувм.мвд.рф");
		die();
		// die('У вас нет доступа!');
	}
}
$data = $db->getAll('qr_testplace WHERE uid =' . "'" . $_GET['uid'] . "'");
$data = $data[0];

// print_r($data);

function writeVisit($fio){
	$db = new DB;
	$browser = new Browser();
	$userInfo = [
		'user_ip' => getUserIp(),
		'user_browser' => [
			'agent' => $browser->getUserAgent(),
			'browser' => $browser->getBrowser() . ' (Версия: ' . $browser->getVersion() . ')',
			'platform' => $browser->getPlatform(),
			'isMobile' => $browser->isMobile(),
			'isBot' => $browser->isRobot(),
		]
	];

    $params = [					
		'date' => date("d-m-Y H:i:s"),
		'page' => $fio,
        'ip' => $userInfo['user_ip'],
        'browser' => $userInfo['user_browser']['browser'],
        'platform' => $userInfo['user_browser']['platform'],
        'isMobile' => $userInfo['user_browser']['isMobile'],
        'isBot' => $userInfo['user_browser']['isBot'],
        'agent' => $userInfo['user_browser']['agent'],
        'new' => 1,
    ];								

    $db->query('INSERT INTO `qr_visit_list` ( date, page, ip, browser, platform, isMobile, isBot, agent, new) VALUES ( :date, :page, :ip, :browser, :platform, :isMobile, :isBot, :agent, :new)', $params);
}


if(!$_GET['nowrite']){
    writeVisit($data['fio']);
}



?>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!-- <meta http-equiv="Content-type" content="text/html; charset=utf-8" /> -->
	<title>Главное управление по вопросам миграции МВД России - База QR адреса лица</title>

	<link rel="shortcut icon" href="favicon-av=003.02.011.ico" type="image/ico" />

	<link type="text/css" rel="stylesheet" href="/css/general.css" />
	<link type="text/css" rel="stylesheet" href="/css/components.css" />
	<link type="text/css" rel="stylesheet" href="/css/contents.css" />
	<!--
	<link type="text/css" rel="stylesheet" href="css/blocks.css" />
	-->
	
	<link type="text/css" rel="stylesheet" href="/css/blocks2.css" />
	
	<link type="text/css" rel="stylesheet" href="/css/anim.css" />

<!--
	<script type="text/javascript" src="http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/js/fix.js?av=003.02.011"></script>
	-->
	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>

	<script type="text/javascript" src="js/utils-av=003.02.011.js"></script>
	
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
	<script type="text/javascript">
	window.onload = function(){setTimeout(loadsw, 1000);};
	function loadsw(){$('#loads').css('display', 'none');$('#bloks').css('display', 'block');}
	</script>
	
</head>
<body>
	<div id="page" class="l-page">
		<div id="wrapper" class="l-wrapper" style="padding-bottom: 100px;">
		
<header class="b-header">
    <div class="g-wrapper">

        <div class="b-head_main">
            <div class="b-head_main-center">

                <div class="b-logo">
                    <a href="http://сервисы.гувм.мвд.рф">
                        <img class="b-logo-image" src="img/logo.png" alt="" />
                        <div class="b-logo-holder">
                            <div class="b-logo-title"><h1><a href="http://сервисы.гувм.мвд.рф">Главное управление по вопросам миграции МВД России</a></h1></div>
                        </div>
                    </a>
                </div>

            </div>

        </div>

    </div>

    <form action="" method="get" class="b-head_search e-togglefocus">
        <div class="g-wrapper">
            <div class="b-head_search-holder">
                <div class="input e-togglefocus-input" style="border: 0; background: none;"></div>
                <button class="button t-clear"></button>
            </div>
        </div>
    </form>

    <nav class="b-main_menu">
        <div class="g-wrapper">
            <div class="b-main_menu-first">
                <ul class="b-main_menu-first_holder" style="height: 2px;">



                </ul>
            </div>
        </div>
    </nav>
</header>
		
		
		
		<!--
			<header class="b-header">
				<div class="g-wrapper">
					<div class="b-head_main">
						<div class="b-head_main-center">

							<div class="b-logo"><a href="https://проверки.гувм.мвд.рф/">
								<img class="b-logo-image" src="img/logo.png" alt="">
								<div class="b-logo-holder">
									<div class="b-logo-title">Главное управление по вопросам миграции МВД России</div>
									<div class="b-logo-subtitle">Официальный сайт</div>
								</div>
							</a></div>

						</div>
						<div class="b-head_main-right">

						</div>
					</div>
				</div>

			</header>-->

			<section class="b-container g-wrapper">
									<div class="m_il">


						<div class="c-block t-2a m_b2">
						
<div id="loads" style="padding-bottom: 50px;">
	<div class="cssload-thecube">
		<div class="cssload-cube cssload-c1"></div>
		<div class="cssload-cube cssload-c2"></div>
		<div class="cssload-cube cssload-c4"></div>
		<div class="cssload-cube cssload-c3"></div>
	</div>
</div>	

<div id="bloks" style="display: none;">						
						<div class="c-title t-1 m_b3">
							<h2 class="ct-h2a">Результат запроса</h2>
						</div>
						<div class="m_b35">
								<p>ФИО: <b id="fio"><?= $data['fio'] ?></b></p>
								<p>Тип документа: <b id="doc_type"><?= $data['doc_type'] ?></b></p>
								<p>Серия и номер документа: <b id="doc_num"><?= $data['doc_num'] ?></b></p>
								<p>Дата выдачи документа: <b id="doc_date"><?= $data['doc_date'] ?></b></p>								
								<br>
								<p>Тип регистрации: <b id="reg_type"><?= $data['reg_type'] ?></b></p>
								<p>Номер регистрации: <b id="reg_num"><?= $data['reg_num'] ?></b></p>

								<p>Адрес регистрации: <b id="reg_address"><?= $data['reg_address'] ?></b></p>
								<p>Срок пребывания: <b> <span id="reg_date_from"><?= $data['reg_date_from'] ?></span> - <span id="reg_date_to"><?= $data['reg_date_to'] ?></span></b></p>
								<br>
								<p>Статус адреса лица: <b id="status"><?= $data['status'] ?></b></p>
								<br>
								<div class="b-separator m_b35"></div>
								<small>Информация актуальна на момент проверки:</small> <br>
								<small>Проверка проведена <span id="current_date"></span> (MSK)</small>
						</div>
					<div class="b-separator m_b35"></div>

			<div class="control-block iservice-result">
											<div class="button_block">
							<div class="button t-green" onclick="window.location='http://сервисы.гувм.мвд.рф';">ВЕРНУТЬСЯ К СЕРВИСАМ</div>
						</div>
									</div>
</div>
			</div>
		</div>

									</div>
							</section>
		</div>

		<footer class="b-footer" style="min-height: 60px; margin-top: -100px;">
			<div class="g-wrapper">

				<div class="row clearfix">
					<div class="cell s-6">
						<div class="b-footer_copy">©2021 Главное управление по вопросам миграции МВД России</div>
					</div>
					<div class="cell s-6 a_right"></div>
				</div>
			</div>
		</footer>
	</div>

	<div id="layer"></div>


	<script type="text/javascript" src="js/general.js"></script>
	<script type="text/javascript" src="js/jquery.interface.js"></script>
	
	<!--
	<script type="text/javascript" src="http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/js/jquery.nslider.js?av=003.02.011"></script>
	<script type="text/javascript" src="http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/js/jquery.autocolumnlis.js?av=003.02.011"></script>
	<script type="text/javascript" src="http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/js/jquery.maskedinput.min.js?av=003.02.011"></script>
	-->
	
	<link type="text/css" href="css/s-screen.css" rel="stylesheet" media="none" />
	
	<script type="text/javascript" src="js/s-screen.js"></script>

	<link type="text/css" href="css/jquery-ui.css" rel="stylesheet" />

	<script type="text/javascript" src="js/jquery-ui-1.10.4.min.js"></script>


</body>
</html>
