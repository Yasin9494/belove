<?php

$LOGIN = 'admin';
$PASS = '@?atlqA{wyT@';

// $LOGIN = '';
// $PASS = '';
    

if ($_POST['login'] == $LOGIN && $_POST['pass'] == $PASS) {
    
    session_start();
    $_SESSION['current_user'] = 'admin';
    $_SESSION['is_auth'] = true;

    $result = [
        'status' => 'OK',
        'error' => 'None',
    ];

    die(json_encode($result, JSON_UNESCAPED_UNICODE));
}
