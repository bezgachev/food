function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //  Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    //   **Удаляем, потому что мы динамически будем создавать кнопку
    //   закрытия для модалки, обработчик события не сработает
    //   modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // **Описание выше
    // modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        // if (e.target === modal || e.target.getAttribute('[data-close]') == '') {
        // или
        if (e.target === modal ||e.target.hasAttribute('data-close')) {
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    
    function showModalByScroll() {

        /* После определенного элемента селектора
        const element = document.querySelector('#element'),
        bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        offset   = elemRect.top - bodyRect.top;

        if (window.scrollY + document.documentElement.clientHeight >= offset) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
        */

        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        } 
    }

    window.addEventListener('scroll', showModalByScroll);

}


export default modal;
export {closeModal};
export {openModal};
// module.exports = modal;