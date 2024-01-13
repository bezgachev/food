function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    const slider = document.querySelector(container),
          slides = document.querySelectorAll(slide),
          next = document.querySelector(nextArrow),
          prev = document.querySelector(prevArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          width = window.getComputedStyle(slidesWrapper).width,
          slidesField = document.querySelector(field);
          
    let slideIndex = 1;
    let offset = 0;

    // 1 вариант
    /*
        function totalSlides() {
            if (slides.length < 10) {
                total.textContent = `0${slides.length}`;
            } else {
                total.textContent = slides.length;
            }
        }

        function showSlides(n) {
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach(item => item.style.display = 'none');
            slides[slideIndex - 1].style.display = 'block';

            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        prev.addEventListener('click', () => {
            plusSlides(-1);
        });

        next.addEventListener('click', () => {
            plusSlides(1);
        });

        showSlides(slideIndex);
        totalSlides();
    */

    // 2 вариант. Добавили div.offer__slider-inner обвертку для слайдов
    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.cssText = `
        width: ${100*slides.length}%;
        display: flex;
        transition: 0.5s all;
    `;

    function totalSlides() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }
    }

    totalSlides();

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    
    next.addEventListener('click', () => {
        // width.slice(0, width.length - 2) - получаем ширину блока обвертки слайдера в px. получаем длину символов ширины вместе с px, обрезаем 2 после.символа
        // есть вариант лучше

        // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
            // offset += +width.slice(0, width.length - 2);
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        changeCurrentSlides();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        changeCurrentSlides();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            changeCurrentSlides();
        });
    });

    function changeCurrentSlides() {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        dots.forEach(dot => dot.removeAttribute('style'));
        dots[slideIndex - 1].style.opacity = 1;
    }
    changeCurrentSlides();
}

export default slider;