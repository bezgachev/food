import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    // Forms
    
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => {
        bindPostData(form);
    });


    // AJAX метод с исп. XMLHttpRequest, уже не современно
    /*
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // Необходимо, когда хотим отправить заголовки в каком формате отправляем данные
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            const formData = new FormData(form);

            // Отправка объекта formData в классическом виде
            // request.send(formData);

            // Либо отправка в формате json, необходимо декодировать данные в php файле при получении 
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            request.send(json);


            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                    
                } else {
                    console.log('Error');
                    showThanksModal(message.failure);
                }
            });
        });
    }

    */

    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await res.json();
    // };

    // Fetch, современный метод

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // В формате json, старый класс.метод
            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });
            // const json = JSON.stringify(object);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // оптимизировали через async await
            // fetch('server.php', {
            //     method: 'POST',

            //     // при JSON, иначе класс.стиль FormData
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: json
            //     // body: formData
            // })

            postData('http://localhost:3000/requests', json)

            // трансформация данных не нужна, т.к. исп. async await
            // .then(data => data.text())


            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                console.log('Error');
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });


        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}


export default forms;
// module.exports = forms;