<?php 
################################################# 
# ���������� ����� ����� ��� TrinityCore/Mangos    # 
# ������������ ��� ��������� "���������"        # 
################################################# 

################################################################################################### 
# ���������� 
# 
#    �����, �������� 
#     �������� ������ ������� 
#     ���������� �� ������������� 
#    ��������� ����������� � ���� 
#    ��������� ������� 
# 
################################################################################################### 

################################################################################################### 
# �����, �������� 
# 
#         �����    : BeLove 
#         ICQ    : 3320443 
#         email    : sergeybelove@gmail.com 
# 
################################################################################################### 

################################################################################################### 
# �������� ������ ������� 
# 
# 
################################################################################################### 

################################################################################################### 
# ���������� �� ������������� 
# 
/* 
DROP TABLE IF EXISTS `arena_leavers_temp`; 
CREATE TABLE `arena_leavers_temp` ( 
  `game_time_start` varchar(10) DEFAULT 'NULL', 
  `game_time_end` varchar(10) DEFAULT 'NULL', 
  `game_type` tinyint(3), 
  `team1_id` int(10), 
  `team1_damage` int(10) DEFAULT '0', 
  `team1_heal` int(10) DEFAULT '0', 
  `team1_kb` tinyint(3) DEFAULT '0', 
  `team2_id` int(10), 
  `team2_damage` int(10) DEFAULT '0', 
  `team2_heal` int(10) DEFAULT '0', 
 `team2_kb` tinyint(3)  DEFAULT '0'); 
  
 DROP TABLE IF EXISTS `arena_leavers_stat`; 
CREATE TABLE `arena_leavers_stat` ( 
  `teamid` int(10), 
  `count` int(10) DEFAULT '0'); 
*/ 
# 
################################################################################################### 

################################################################################################### 
# ��������� ����������� � ���� 
# 
#    ������� ���� ��������� ��� �����������: ����, ��� ������������, ������, ��� ���� ������ 

$mysql_host = "localhost"; 
$mysql_user = "root"; 
$mysql_pass = ""; 
$mysql_db = "characters"; 

# 
################################################################################################### 

################################################################################################### 
# ��������� ������� 
# 
#    ��� �����, ����������� ���� ����� 

$arena_log_file = "arena.log"; 

#    ����������� ������� � �������� ����� ������� � ������ ���� 

$max_delta = 40; 

#    ������������� ����������� ���� (������� 0, ���� � �������  
#    ���������� ArenaLog.ExtendedInfo = 0 � ��������) 

$extended_logs = 0; 

#    ������ �� �������� ����, ���� ����� ArenaLog.ExtendedInfo ����� ���� 
#    ����������� �������� ����/������ ��� ����� ������ �� ���� ���� (����� ����� � ��� ����) 

$min_heal = 1; 
$min_dmg = 1; 

#    ����������� �������� ������� ��� ����� �� ������ �� ���� ���� 
#    (� ����������� �� ���� ���� (2�2, 3�3, 5�5) 
#    ������� "0", ���� �� ������ ��������� ���� �������� 

$min_kb_2 = 2; 
$min_kb_3 = 3; 
$min_kb_5 = 5; 

# 
################################################################################################### 

set_time_limit(0); 
error_reporting(0); 
mysql_connect ($mysql_host, $mysql_user, $mysql_pass) or die (mysql_error()); 
mysql_select_db ($mysql_db) or die (mysql_error()); 

################################################################################################### 
# 
#    ������ ������ ������� �����. 
#    �������� � ���� ������� �������� ������������ ������� �� ����� � MySQL 
# 
################################################################################################### 

if (!isset($_GET[step])) 
{ 

//��� ���, �� ����� ������� 
$team1_damage = 0; $team2_damage = 0; 
$team1_heal = 0; $team2_heal = 0; 
$team1_kb = 0; $team2_kb = 0; 

echo "<h3>������ ����.</h3> ������� ������ ���������� �� ����� � MySQL<br /> 
    <i>������� �����...</i><br/><br/>"; 
mysql_query ("TRUNCATE `arena_leavers_temp`") or die(mysql_error());  
$fp = fopen($arena_log_file, "r"); 
if ($fp)  
{ 
while (!feof($fp)) 
{ 
    $arena = explode(" ", fgets($fp, 999)); 
    // $arena[12] - "started" or "ended" 
    if (trim($arena[12]) == "started.") 
    { 
        $ymd = explode ("-", $arena[0]); 
        $hms = explode (":", $arena[1]); 
        $time = mktime($hms[0], $hms[1], $hms[2], $ymd[1], $ymd[2], $ymd[0]); 
        mysql_query ("INSERT INTO `arena_leavers_temp` VALUES ('{$time}', '', {$arena[5]}, {$arena[8]}, '','','', {$arena[11]}, '', '', '')")  or die(mysql_error()); 
    } 
     
    if ($arena[12] == "ended.") 
    { 
        // ��������, ���� �� ������ � ������ ��� ������ ����. game_time_end ��� ��� � ������. 
        $query = mysql_query ("SELECT game_time_start FROM `arena_leavers_temp` where team1_id = {$arena[8]} and team2_id = {$arena[11]} 
                                and game_time_end = ''") or die(mysql_error()); 
        $sql = mysql_fetch_array($query); 
        if ($sql['game_time_start'] > 0) 
        { 
            //�������� ����� ���� 
            $ymd = explode ("-", $arena[0]); 
            $hms = explode (":", $arena[1]); 
            $time = mktime($hms[0], $hms[1], $hms[2], $ymd[1], $ymd[2], $ymd[0]); 
            //�������� ����������� ����������, ���� ���� 
            if ($extended_logs) 
            { 
                //���������� �������� ������ �� �������� (�����, ���, ���������� �������) 
                $team1_damage = 0; $team2_damage = 0; 
                $team1_heal = 0; $team2_heal = 0; 
                $team1_kb = 0; $team2_kb = 0; 
                $extended_info = explode(" ", fgets($fp, 999)); 
                while ($extended_info[2] == "Statistics") 
                { 
                    //������� � ����� - ����� �� �������� �� �� ������ ����������, ������� � ����� :) 
                    //��� ������ ������� 
                    if ($extended_info[8] == $arena[8].",") 
                        { 
                             
                            $team1_damage = $team1_damage + $extended_info[11]; 
                            $team1_heal = $team1_heal + $extended_info[13]; 
                            $team1_kb = $team1_kb + $extended_info[15]; 
                        } 
                    //��� ������ 
                    else if ($extended_info[8] == $arena[11].",") 
                        { 
                            $team2_damage = $team2_damage + $extended_info[11]; 
                            $team2_heal = $team2_heal + $extended_info[13]; 
                            $team2_kb = $team2_kb + $extended_info[15]; 
                        } 
                    $extended_info = explode(" ", fgets($fp, 999)); 
                } 
            } 
            //� ���������� ��� � ���� 
            mysql_query ("update `arena_leavers_temp` set  
                        game_time_end = '{$time}', 
                        team1_damage = '{$team1_damage}', team1_heal = {$team1_heal}, team1_kb = {$team1_kb},  
                        team2_damage = {$team2_damage}, team2_heal = {$team2_heal}, team2_kb = {$team2_kb} 
                        where 
                        game_time_start = '{$sql['game_time_start']}' and 
                        team1_id = {$arena[8]} and 
                        team2_id =  {$arena[11]};") or die (mysql_error()); 
        } else echo "<B>[notice]</b> ���� ������� ������ �� ��������� ����, ��� ������� ��� ���������� � �� ������! 
             ���� {$arena[8]} vs {$arena[11]}. ��� ���� - {$arena[5]} x {$arena[5]}<br />"; 
    } 
} 
} else echo "������ ��� �������� ����� $arena_log_file. ��������, ���� �� ����������."; 
fclose($fp); 

echo "<br />������� ������ ������� ��������!<br /> 
    <a href = ?step=2>������� �� ������� �����...</a>"; 
} 

################################################################################################### 
# 
#    ������ ���� 
#    ������ ��� �� �������� 
# 
################################################################################################### 

if (isset($_GET[step]) && $_GET[step] == 2) 
{ 
    echo "<h3>������ ����.</h3> ������ ���������� ������."; 
    $sql = mysql_query("SELECT count(1) as count FROM `arena_leavers_temp`;") or die (mysql_error()); 
    $result = mysql_fetch_array($sql); 
    echo "<br /><br /><li>����� ���: <b>$result[count]</b></li>"; 
    $sql = mysql_query("SELECT 1 FROM `arena_leavers_temp` where game_time_end = '';") or die (mysql_error()); 
    $result = mysql_num_rows($sql); 
    if ($result) echo "<li>���������� ���, ��� ������� �� �� ������ ����� �������� ������: <b>$result</b></li> 
    <small>*��������� ������� -  �������� ���/����� ������� �� ����� ���</small><br />"; 
    $sql = mysql_query("SELECT team1_id FROM `arena_leavers_temp` where game_time_end <> '' 
                        UNION SELECT `team2_id` FROM `arena_leavers_temp` where game_time_end <> '';") or die (mysql_error()); 
    $result = mysql_num_rows($sql); 
    echo "<li>���������� ������ ��� ���������: <b>$result</b><br />"; 
    //��������� "�������" ���������� ��� ������ ������� 
    mysql_query ("TRUNCATE `arena_leavers_stat`") or die(mysql_error());  
    while ($row=mysql_fetch_assoc($sql)) 
    { 
        mysql_query ("INSERT INTO `arena_leavers_stat` VALUES ({$row[team1_id]}, '0')") or die (mysql_error()); 
    } 
    //�������� ������. ��� ����������� �����: 
    if ($extended_logs) 
    { 
        $sql = mysql_query("SELECT * FROM `arena_leavers_temp` where  
                            game_time_end <> '' and  
                            team1_heal + team2_heal < {$min_heal} and 
                            team1_damage + team2_damage < {$min_dmg} and 
                            game_time_end - game_time_start < {$max_delta};") or die (mysql_error()); 
        while ($row=mysql_fetch_array($sql)) 
        { 
            switch ($row[game_type]) 
            { 
                case "2": 
                if ($row[team1_kb] < $min_kb_2 && $row[team2_kb] < $min_kb_2) 
                    mysql_query ("UPDATE arena_leavers_stat set count = count + 1 where teamid in ({$row[team1_id]}, {$row[team2_id]})"); 
                break; 
                 
                case "3": 
                if ($row[team1_kb] < $min_kb_3 && $row[team2_kb] < $min_kb_3) 
                    mysql_query ("UPDATE arena_leavers_stat set count = count + 1 where teamid in ({$row[team1_id]}, {$row[team2_id]})"); 
                break; 
                 
                case "5": 
                if ($row[team1_kb] < $min_kb_5 && $row[team2_kb] < $min_kb_5) 
                    mysql_query ("UPDATE arena_leavers_stat set count = count + 1 where teamid in ({$row[team1_id]}, {$row[team2_id]})"); 
                break; 
            } 
        } 
    } 
    //��� ������� �����, ������� ������ ����� 
    else 
    { 
        $sql = mysql_query("SELECT * FROM `arena_leavers_temp` where  
                            game_time_end - game_time_start < {$max_delta}") or die (mysql_error()); 
        while ($row=mysql_fetch_array($sql)) 
            mysql_query ("UPDATE arena_leavers_stat  
                        set count = count + 1 where teamid in ({$row[team1_id]}, {$row[team2_id]})"); 
    } 
    // ��! 
    $sql = mysql_query("SELECT SUM(COUNT) as sum FROM `arena_leavers_stat`") or die (mysql_error()); 
    $total = mysql_fetch_array($sql); 
    echo "<br />������ ������� ���������. <br /> 
        ��������� ��������: {$total[sum]}<br /> 
        ������ ������������ ������ �� ������ ������� � ������� `arena_leavers_stat` � ����� �����"; 
} 
?>