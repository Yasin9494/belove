document.addEventListener('DOMContentLoaded', () => {

    let modal = document.querySelector('.modal');

    let formInput_uid = modal.querySelector('#edit_uid')
    let formInput_fio = modal.querySelector('#edit_fio')
    let formInput_doc_type = modal.querySelector('#edit_doc_type')
    let formInput_doc_num = modal.querySelector('#edit_doc_num')
    let formInput_doc_date = modal.querySelector('#edit_doc_date')
    let formInput_reg_type = modal.querySelector('#edit_reg_type')
    let formInput_reg_num = modal.querySelector('#edit_reg_num')
    let formInput_reg_address = modal.querySelector('#edit_reg_address')
    let formInput_reg_date_from = modal.querySelector('#edit_reg_date_from')
    let formInput_reg_date_to = modal.querySelector('#edit_reg_date_to')
    let formInput_status = modal.querySelector('#edit_status')

    document.addEventListener('click', (e) => {
        let target = e.target;

        if (target.closest('#saveExcel')) {
            $.ajax({
                url: 'ajax.php',
                method: 'POST',
                dataType: 'json',
                data: {
                    type: 'getFile',
                },
                success: function (data) {
                    if (data.status == 'success') {
                        document.location.href = "database.xlsx"
                    }
                },
                error: function (data) {
                    console.log(data.status);
                }
            });
        }


        if (target.closest('#showAll')) {
            document.querySelector('#formShow').classList.remove('hide')

            document.querySelector('#formInsert').classList.add('hide')
            document.querySelector('#formLogin').classList.add('hide')
            document.querySelector('#formViews').classList.add('hide')
        }

        if (target.closest('#back_main')) {
            document.querySelector('#formInsert').classList.remove('hide')

            document.querySelector('#formLogin').classList.add('hide')
            document.querySelector('#formViews').classList.add('hide')
            document.querySelector('#formShow').classList.add('hide')
        }

        if(target.closest('#showViews')){
            document.querySelector('#formViews').classList.remove('hide')
            
            document.querySelector('#formShow').classList.add('hide')
            document.querySelector('#formInsert').classList.add('hide')
            document.querySelector('#formLogin').classList.add('hide')
        }

        if (target.closest('#edit_item')) {
            let modal = document.querySelector('.modal.modal-edit');
            let modalBg = document.querySelector('.modal_bg');

            modal.classList.remove('hide')
            modalBg.classList.remove('hide')

            let clickedButton = target.closest('#edit_item');
            let parent = clickedButton.parentNode.parentNode

            let uid = parent.getAttribute('data-id');

            $.ajax({
                url: 'ajax.php',
                method: 'POST',
                dataType: 'json',
                data: {
                    type: 'getOneData',
                    uid: uid
                },
                success: function (data) {
                    let info = data[0]

                    formInput_uid.value = info['uid'];
                    formInput_fio.value = info['fio'];

                    formInput_doc_type.value = info['doc_type'];
                    formInput_doc_num.value = info['doc_num'];
                    formInput_doc_date.value = info['doc_date'];

                    formInput_reg_type.value = info['reg_type'];
                    formInput_reg_num.value = info['reg_num'];
                    formInput_reg_address.value = info['reg_address'];
                    formInput_reg_date_from.value = info['reg_date_from'];
                    formInput_reg_date_to.value = info['reg_date_to'];

                    formInput_status.value = info['status'];
                },
                error: function (data) {
                    console.log(data.status);
                }
            });
        }

        if (target.closest('#delete_item')) {
            let isAccepted = confirm("Вы действительно хотите удалить этот элемент?");

            if (isAccepted) {
                let clickedButton = target.closest('#delete_item');
                let parent = clickedButton.parentNode.parentNode

                let uid = parent.getAttribute('data-id');

                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        type: 'delete_item',
                        uid: uid
                    },
                    success: function (data) {
                        alert('Успешно удалено');
                        parent.remove()
                    },
                    error: function (data) {
                        console.log(data.status);
                    }
                });
            }
        }

        if (target.closest('#editItemSave')) {
            let isAccepted = confirm("Изменить элемент?");

            if (isAccepted) {
                let data = {

                    uid: formInput_uid.value,
                    fio: formInput_fio.value,

                    doc_type: formInput_doc_type.value,
                    doc_num: formInput_doc_num.value,
                    doc_date: formInput_doc_date.value,

                    reg_tye: formInput_reg_type.value,
                    reg_num: formInput_reg_num.value,
                    reg_address: formInput_reg_address.value,
                    reg_date_from: formInput_reg_date_from.value,
                    reg_date_to: formInput_reg_date_to.value,

                    status: formInput_status.value
                }
                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        type: 'editItem',
                        data: data
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (data) {
                        console.log(data.status);
                    }
                });
            }
        }

        if (target.closest('#editItemAbort')) {
            let modals = document.querySelectorAll('.modal');

            modals.forEach(item => {
                item.classList.add('hide')
            });
            document.querySelector('.modal_bg').classList.add('hide');


            formInput_uid.value = '';
            formInput_fio.value = '';

            formInput_doc_type.value = '';
            formInput_doc_num.value = '';
            formInput_doc_date.value = '';

            formInput_reg_type.value = '';
            formInput_reg_num.value = '';
            formInput_reg_address.value = '';
            formInput_reg_date_from.value = '';
            formInput_reg_date_to.value = '';

            formInput_status.value = '';
        }


        if (target.closest('.modal_bg')) {
            let modals = document.querySelectorAll('.modal');

            modals.forEach(item => {
                item.classList.add('hide')
            });
            target.closest('.modal_bg').classList.add('hide');

            formInput_uid.value = '';
            formInput_fio.value = '';

            formInput_doc_type.value = '';
            formInput_doc_num.value = '';
            formInput_doc_date.value = '';

            formInput_reg_type.value = '';
            formInput_reg_num.value = '';
            formInput_reg_address.value = '';
            formInput_reg_date_from.value = '';
            formInput_reg_date_to.value = '';

            formInput_status.value = '';
        }





    })
})