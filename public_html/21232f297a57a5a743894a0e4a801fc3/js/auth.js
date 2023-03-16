document.addEventListener('DOMContentLoaded', () => {
    let submitButton = document.querySelector('#auth_start')

    submitButton.addEventListener('click', (e) => {
        e.preventDefault;

        $.ajax({
            url: 'auth.php',
            method: 'POST',
            dataType: 'json',
            data: {
                login: document.querySelector('#login').value,
                pass: document.querySelector('#password').value
            },
            success: function (data) {
                openInsertForm()
            },
            error: function (data) {
                alert('Неверный пароль!')
            }
        });
    })

    function hideLogin() {
        let form = document.querySelector('#formLogin')
        form.classList.add('hide')
    }

    function openInsertForm() {
        hideLogin()
        let activeForm = document.querySelector('#formInsert');
        activeForm.classList.remove('hide')
    }
})