<?php
require_once('xls.php');
require('../Database.php');

$db = new DB;

if ($_POST['type'] == 'new_data') {

    $params = [
        'uid' => md5($_POST['fio']),
        'fio' => $_POST['fio'],
        'doc_type' => $_POST['docType'],
        'doc_num' => $_POST['docNum'],
        'doc_date' => $_POST['docDate'],
        'reg_type' => $_POST['regType'],
        'reg_num' => $_POST['regNum'],
        'reg_address' => $_POST['regAddress'],
        'reg_date_from' => $_POST['regDateFrom'],
        'reg_date_to' => $_POST['regDateTo'],
        'status' => $_POST['status'],
    ];


    $db->query('INSERT INTO `qr_testplace` ( uid, fio, doc_type, doc_num, doc_date, reg_type, reg_num, reg_address, reg_date_from, reg_date_to, status ) VALUES ( :uid, :fio, :doc_type, :doc_num, :doc_date, :reg_type, :reg_num, :reg_address, :reg_date_from, :reg_date_to, :status )', $params);
    die(json_encode($params, JSON_UNESCAPED_UNICODE));
}


if ($_POST['type'] == 'getOneData') {
    $id = $_POST['uid'];
    $data = $db->query("SELECT * FROM qr_testplace WHERE uid LIKE '$id'");


    if (count($data) > 0) {
        $result = [
            'status' => 'success',
            'data' => $data
        ];
    } else {
        $result = [
            'status' => 'bad'
        ];
    }


    die(json_encode($data, JSON_UNESCAPED_UNICODE));
}

if ($_POST['type'] == 'editItem') {

    $data = $_POST['data'];
    $uid = $data["uid"];

    $params = [
        'fio' => $data['fio'],
        'doc_type' => $data['doc_type'],
        'doc_num' => $data['doc_num'],
        'doc_date' => $data['doc_date'],
        'reg_type' => $data['reg_tye'],
        'reg_num' => $data['reg_num'],
        'reg_address' => $data['reg_address'],
        'reg_date_from' => $data['reg_date_from'],
        'reg_date_to' => $data['reg_date_to'],
        'status' => $data['status'],
    ];

    $db->query("UPDATE `qr_testplace` SET `fio`=:fio,`doc_type`=:doc_type,`doc_num`=:doc_num,`doc_date`=:doc_date,`reg_type`=:reg_type,`reg_num`=:reg_num,`reg_address`=:reg_address,`reg_date_from`=:reg_date_from,`reg_date_to`=:reg_date_to,`status`=:status WHERE uid = '$uid'", $params);

    die(json_encode($data, JSON_UNESCAPED_UNICODE));
}
if ($_POST['type'] == 'delete_item') {
    $id = $_POST['uid'];
    $data = $db->query("DELETE FROM `qr_testplace` WHERE uid = '$id'");
    $result = [
        'status' => 'success'
    ];
    die(json_encode($result, JSON_UNESCAPED_UNICODE));
}



if ($_POST['type'] == 'getFile') {

    $result = $db->getAll('qr_testplace');

    $items = [
        'title' => [
            'id' => '',
            'uid' => 'uid (ссылка)',
            'fio' => 'ФИО',
            'doc_type' => 'Тип документа:',
            'doc_num' => 'Серия и номер документа:',
            'doc_date' => 'Дата выдачи документа:',
            'reg_type' => 'Тип регистрации:',
            'reg_num' => 'Номер регистрации:',
            'reg_address' => 'Адрес регистрации:',
            'reg_date_from' => 'Срок пребывания (от):',
            'reg_date_to' => 'Срок пребывания (до):',
            'status' => 'Статус:',
        ]
    ];

    foreach ($result as $key => $item) {
        $items[$key] = $item;
    }


    $xlsx = Shuchkin\SimpleXLSXGen::fromArray($items);
    $xlsx->saveAs('database.xlsx');

    $info = [
        'status' => 'wrong'
    ];

    if ($xlsx) {
        $info = [
            'status' => 'success'
        ];
        die(json_encode($info, JSON_UNESCAPED_UNICODE));
    }

    die(json_encode($info, JSON_UNESCAPED_UNICODE));
}
