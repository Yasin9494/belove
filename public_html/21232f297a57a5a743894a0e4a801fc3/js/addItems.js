document.addEventListener('DOMContentLoaded', () => {
    function validate() {
        let inputList = document.querySelectorAll('#formInsert input')

        let counter = 0;
        let result = false;

        inputList.forEach(item => {
            if (item.value.length < 1) {
                item.classList.add('error')

                item.addEventListener('input', (e) => {
                    if (item.value.length > 0) {
                        item.classList.remove('error')
                    }
                })
            } else {
                counter++;
            }

        });

        if (counter == inputList.length) {
            result = true
        }
        return result
    }

    function clearInputs() {
        let inputList = document.querySelectorAll('#formInsert input')

        inputList.forEach(item => {
            item.value = ''
        });

        document.querySelector('#reg_type').value = 'Регистрация по месту пребывания';
        document.querySelector('#status').value = 'Действителен';
    }
    document.addEventListener('click', (e) => {
        let target = e.target;

        if (target.closest('button#add_items')) {

            let isValid = validate()

            if (isValid) {
                document.querySelector('.error-msg').classList.add('hide')

                let fio = document.querySelector('#formInsert #fio'),
                    docType = document.querySelector('#formInsert #doc_type'),
                    docNum = document.querySelector('#formInsert #doc_num'),
                    docDate = document.querySelector('#formInsert #doc_date'),
                    regType = document.querySelector('#formInsert #reg_type'),
                    regNum = document.querySelector('#formInsert #reg_num'),
                    regAddress = document.querySelector('#formInsert #reg_address'),
                    regDateFrom = document.querySelector('#formInsert #reg_date_from'),
                    regDateTo = document.querySelector('#formInsert #reg_date_to'),
                    status = document.querySelector('#formInsert #status');

                $.ajax({
                    url: 'ajax.php',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        type: 'new_data',
                        fio: fio.value,
                        docType: docType.value,
                        docNum: docNum.value,
                        docDate: docDate.value,
                        regType: regType.value,
                        regNum: regNum.value,
                        regAddress: regAddress.value,
                        regDateFrom: regDateFrom.value,
                        regDateTo: regDateTo.value,
                        status: status.value
                    },
                    success: function (data) {
                        clearInputs()

                        document.querySelector('.success-msg').classList.remove('hide')
                        document.querySelector('.success-msg').textContent = 'Успешно вписано в БД!'

                        setTimeout(() => {
                            document.querySelector('.success-msg').classList.add('hide')

                        }, 4000)
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });

                alert('ушло в базу')
            } else {
                document.querySelector('.error-msg').classList.remove('hide')
                document.querySelector('.error-msg').textContent = 'Заполните все поля!'
            }
        }
    })
})