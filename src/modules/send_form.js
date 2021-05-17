'use strict';
import clickPopupHandler from './click_popup_handler';

const sendForm = (form, popup = false, popupNew = null, elForClear = null) => {

    const tempInnerHTML = popupNew.innerHTML;

    const statusMessage = document.createElement('div');
    statusMessage.className = 'send-status message';
    const statusAnim = document.createElement('div');
    statusAnim.className = 'send-status anim';
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

    const btnDisable = isDisable => {
        const btnSubmit = form.querySelector('.btn');
        if (isDisable) {
            btnSubmit.setAttribute('disabled', '');
        } else {
            btnSubmit.removeAttribute('disabled');
        }
    };

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
        btnDisable(true);
        popupNew.innerHTML = tempInnerHTML;
        const canSend = formDataValidation(form);

        if (canSend !== 'OK') {
            statusMessage.textContent = canSend;
            form.appendChild(statusMessage);
            setTimeout(() => {
                statusMessage.textContent = '';

                if (form.querySelector('.send-status.message')) {
                    form.removeChild(form.querySelector('.send-status.message'));
                }
                btnDisable(false);

            }, 2000);
            return;
        }

        const formData = new FormData(form);

        form.appendChild(statusAnim);

        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });


        postData(JSON.stringify(body))
            .then(response => {

                if (form.querySelector('.send-status.anim')) {
                    form.removeChild(form.querySelector('.send-status.anim'));
                }

                if (response.status !== 200) {
                    throw new Error('response status not 200');
                }

                if (popup) {
                    form.closest('.popup').style.display = 'none';
                }
                popupNew.style.display = 'block';

            })
            .catch(error => {
                console.error(error);
                if (popup) {
                    form.closest('.popup').style.display = 'none';
                }
                popupNew.querySelector('.form-content').innerHTML = `
                    <h4>Ошибка !</h4>
                <p>Ваша заявка не была отправлена.</p>
                       `;
                popupNew.style.display = 'block';
            })
            .finally(() => {
                if (popup) {
                    form.closest('.popup').style.display = 'none';
                }
                clearInputs(form);
                btnDisable(false);
            });
    });
};

export default sendForm;