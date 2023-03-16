<?php
require('../Database.php');

$db = new DB;

session_start();

$isAuth = false;


if($_SESSION['current_user'] == 'admin' && $_SESSION['is_auth'] == 1){
    $isAuth = true;
}

?>


<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">

</head>

<body>


    <main>
        <section>

            <div class="container d-flex justify-content-center">
                <!--  -->
                <?php
                if($isAuth){
                ?>
                <div class="col-6 hide" id="formLogin">
                <?php
                }else{
                ?>
                <div class="col-6" id="formLogin">
                <?php
                }
                ?>            
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Логин:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="login">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Пароль:</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="password">
                        </div>
                    </div>

                    <div class="col-auto">
                        <button type="submit" id="auth_start" class="btn btn-primary mb-3">Войти</button>
                    </div>
                </div>
                <!--  -->

                <!--  -->
                <?php
                if($isAuth){
                ?>
                <div class="col-6" id="formInsert">
                <?php
                }else{
                ?>
                <div class="col-6 hide" id="formInsert">
                <?php
                }
                ?>   
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-4 col-form-label">ФИО:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="fio">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="doc_type" class="col-sm-4 col-form-label">Тип документа:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="doc_type">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="doc_num" class="col-sm-4 col-form-label">Серия и номер документа:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="doc_num">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="doc_date" class="col-sm-4 col-form-label">Дата выдачи документа:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="doc_date">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="reg_type" class="col-sm-4 col-form-label">Тип регистрации:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="reg_type" value="Регистрация по месту пребывания">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="reg_num" class="col-sm-4 col-form-label">Номер регистрации:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="reg_num">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="reg_address" class="col-sm-4 col-form-label">Адрес регистрации:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="reg_address">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="reg_date_from" class="col-sm-4 col-form-label">Срок пребывания:</label>
                        <div class="col-sm-8">
                            <input style="margin-bottom: 10px" type="text" class="form-control" id="reg_date_from" placeholder="от">
                            <input type="text" class="form-control" id="reg_date_to" placeholder="до">
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="status" class="col-sm-4 col-form-label">Статус адреса лица:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="status" value="Действителен">
                        </div>
                    </div>

                    <div class="error-msg"></div>

                    <div class="success-msg"></div>
                    <div class="row ">
                        <div class="col-3 d-flex justify-content-center">
                            <button type="submit" id="add_items" class="btn btn-primary mb-3">Добавить</button>
                        </div>

                        <div class="col-3 d-flex justify-content-center">
                            <button type="submit" id="saveExcel" class="btn btn-success mb-3">Скачать xlsx</button>
                        </div>

                        <div class="col-3 d-flex justify-content-center">
                            <button type="submit" id="showAll" class="btn btn-secondary mb-3">Показать всех</button>
                        </div>

                        <div class="col-3 d-flex justify-content-center">
                            <button type="submit" id="showViews" class="btn btn-danger mb-3">Просмотры</button>
                        </div>
                        
                    </div>
                </div>
                <!--  -->

                <div class="col-10 hide" id="formShow">
                    <p id="back_main">
                        Назад
                    </p>
                    <h3>Список страниц:</h3>
                    <div class="data-list">
                        <table class="table">
                            <thead>
                                <?php
                                $data = $db->getAll('qr_testplace');
                                ?>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">#</th>
                                    <th scope="col">uid</th>
                                    <th scope="col">ФИО</th>
                                    <th scope="col">Тип документа:</th>
                                    <th scope="col">Серия и номер документа:</th>
                                    <th scope="col">Дата выдачи документа:</th>
                                    <th scope="col">Тип регистрации:</th>
                                    <th scope="col">Номер регистрации:</th>
                                    <th scope="col">Адрес регистрации:</th>
                                    <th scope="col">Срок пребывания (от):</th>
                                    <th scope="col">Срок пребывания (до):</th>
                                    <th scope="col">Статус:</th>
                                </tr>
                            </thead>

                            <tbody>
                                <?php
                                foreach ($data as $key => $item) {
                                ?>
                                    <tr data-id="<?= $item['uid'] ?>">
                                        <td>
                                            <button type="submit" id="edit_item" class="btn btn-primary mb-3">Изменить</button>
                                        </td>
                                        <td>
                                            <button type="submit" id="delete_item" class="btn btn-danger mb-3">Удалить</button>
                                        </td>
                                        

                                        <th scope="row"><?= $item['id'] ?></th>
                                        <td><a target='_blank' href="<?= '/?uid=' . $item['uid'] ?>&nowrite=true"><?= $item['uid'] ?></a></td>
                                        <td><?= $item['fio'] ?></td>
                                        <td><?= $item['doc_type'] ?></td>
                                        <td><?= $item['doc_num'] ?></td>
                                        <td><?= $item['doc_date'] ?></td>
                                        <td><?= $item['reg_type'] ?></td>
                                        <td><?= $item['reg_num'] ?></td>
                                        <td><?= $item['reg_address'] ?></td>
                                        <td><?= $item['reg_date_from'] ?></td>
                                        <td><?= $item['reg_date_to'] ?></td>
                                        <td><?= $item['status'] ?></td>
                                    </tr>
                                <?php
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>


                </div>

                <div class="col-10 hide" id="formViews">
                    <p id="back_main">
                        Назад
                    </p>
                    <h3>Список посетителей:</h3>
                    <div class="data-list">
                        <table class="table">
                            <thead>
                                <?php
                                $p = [
                                    ''
                                ];
                                $data = $db->getAll('qr_visit_list', ' ORDER BY id DESC');
                                ?>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">#</th>
                                    <th scope="col">Дата и время:</th>
                                    <th scope="col">IP:</th>
                                    <th scope="col">Страница:</th>
                                    <th scope="col">Браузер:</th>
                                    <th scope="col">Платформа:</th>
                                    <th scope="col">Mobile:</th>
                                    <th scope="col">Бот:</th>
                                    <th scope="col">User-Agent:</th>
                                </tr>
                            </thead>

                            <tbody>
                                <?php
                                foreach ($data as $key => $item) {
                                ?>
                                    <tr data-id="">
                                        <td>
                                            <!-- <div class="visit-new"></div> -->
                                        </td>

                                        <th scope="row"><?= $item['id'] ?></th>
                                        <td><?= $item['date'] ?></td>
                                        <td><?= $item['ip'] ?></td>
                                        <td><?= $item['page'] ?></td>
                                        <td><?= $item['browser'] ?></td>
                                        <td><?= $item['platform'] ?></td>
                                        <td><?= $item['isMobile'] ? '<b>Да</b>' : 'Нет'  ?></td>
                                        <td><?= $item['isBot'] ? '<b>Да</b>' : 'Нет' ?></td>
                                        <td><?= $item['agent'] ?></td>
                                    </tr>
                                <?php
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
        </section>
    </main>

    <div class="modal_bg hide"></div>
    <div class="modal modal-edit hide">

        <div class="modal-inner">
            <div class="mb-3 row">
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_uid" disabled>
                </div>
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_fio">
                </div>
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_doc_type">
                </div>
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_doc_num">
                </div>
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_doc_date">
                </div>
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_reg_type">
                </div>
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_reg_num">
                </div>
                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_reg_address">
                </div>

                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_reg_date_from" placeholder="от">
                    <input type="text" class="form-control" id="edit_reg_date_to" placeholder="до">
                </div>

                <div class="modal-inner-input">
                    <input type="text" class="form-control" id="edit_status">
                </div>
            </div>

            <div class="row ">
                <div class="col-4 d-flex justify-content-center">
                    <button type="submit" id="editItemSave" class="btn btn-primary mb-3">Сохранить</button>
                </div>

                <div class="col-4 d-flex justify-content-center">
                    <button type="submit" id="editItemAbort" class="btn btn-secondary mb-3">Отмена</button>
                </div>
            </div>
        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

        <script src="js/main.js"></script>

        <script src="js/auth.js"></script>
        <script src="js/addItems.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
</body>

</html>