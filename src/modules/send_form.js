'use strict';
import clickPopupHandler from './click_popup_handler';

const sendForm = (form, popup = false, popupNew = null, elForClear = null) => {
    let temp;
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Данные отправлены!';

    const statusMessage = document.createElement('div');
    statusMessage.className = 'send-status';
    const statusAnim = document.createElement('div');
    statusAnim.className = 'send-status';
    statusAnim.innerHTML = `<div class="sk-wave sk-center">
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                </div>`;

    if (popupNew) {
        popupNew.addEventListener('click', (e) => clickPopupHandler(e, popupNew));

    }

    const postData = data =>
        fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

    const clearInputs = form => {
        form.querySelectorAll('input[name="name"]').forEach(item => item.value = '');
        form.querySelectorAll('input[name="phone"]').forEach(item => item.value = '');
        form.querySelectorAll('input[type="checkbox"]').forEach(item => {
            if (item.closest('.personal-data')) {
                item.checked = false;
            }
        });
        if (elForClear) {
            elForClear();
        }
    };


    const formDataValidation = formData => {

        const userPhone = formData.querySelector('input[name = "phone"]');
        const userName = formData.querySelector('input[name = "name"]');
        const userPersonalData = formData.querySelector('input[type = "checkbox"]');
        const phoneLength = userPhone.value.replace(/\D/g, '').length;

        if (formData.id === "footer_form") {
            let i = 0;
            formData.querySelectorAll('input[type="radio"]').
                forEach(item => item.checked ? i++ : '');
            if (i === 0) {
                return "Вы не выбрали клуб!";
            }
        }


        if (userName) {
            if (userName.value.split(' ')[0].length < 2) {
                userName.focus();
                return 'В имени не может быть менее одного символа! ';
            }
        }

        if (userPersonalData) {
            if (!userPersonalData.checked) {
                return 'Не получено согласие на обработку персональных данных!';
            }
        }

        if (phoneLength < 11) {
            userPhone.focus();
            return 'Телефонный номер не может быть короче 11 цифр!';
        }

        return 'OK';
    };



    form.querySelectorAll('input[type = "checkbox"]').forEach(item => {
        if (item.closest('.personal-data')) {
            item.removeAttribute('required');
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const canSend = formDataValidation(form);

        if (canSend !== 'OK') {
            statusMessage.textContent = canSend;
            form.appendChild(statusMessage);
            setTimeout(() => {
                statusMessage.textContent = '';
                //если быстро жать на кнопку отправки, то этого элемента может и не быть
                // и в консоли полезут ошибки
                if (document.querySelector('.send-status')) {
                    form.removeChild(statusMessage);
                }
            }, 2000);
            return;
        }

        const formData = new FormData(form);
        if (popup) {
            temp = form.innerHTML;
        }
        form.appendChild(statusAnim);

        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });


        postData(JSON.stringify(body))
            .then(response => {

                form.removeChild(statusAnim);
                if (response.status !== 200) {
                    throw new Error('response status not 200');
                }

                statusMessage.textContent = successMessage;
                if (popup) {
                    form.innerHTML = '';
                    form.appendChild(statusMessage);
                } else {
                    popupNew.style.display = 'block';
                }

            })
            .catch(error => {
                console.error(error);
                if (popup) {
                    // statusAnim.replaceWith(statusMessage);
                    statusMessage.textContent = errorMessage;
                    form.innerHTML = '';
                    form.appendChild(statusMessage);
                } else {
                    popupNew.querySelector('.form-content').innerHTML = `
                    <h4>Ошибка !</h4>
                <p>Ваша заявка не была отправлена.</p>
                       `;
                    popupNew.style.display = 'block';
                }

            })
            .finally(() => {

                setTimeout(() => {
                    if (popup) {
                        statusMessage.textContent = '';
                        form.innerHTML = temp;
                    }
                    clearInputs(form);

                }, 3000);
                //clearInputs(form);

                if (popup) {
                    setTimeout(() => {
                        form.closest('.popup').style.display = 'none';
                    }, 2500);
                }
            });
    });
};

export default sendForm;