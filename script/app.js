class Carousel {
    constructor(el) {
        this.el = el;
        this.currentIndex = 0;
        this.initElements();
        this.initSlides();
    }

    initElements() {
        this.elements = {
            prev: this.el.querySelector('[data-prev]'),
            next: this.el.querySelector('[data-next]'),
            slides: this.el.querySelector('.slides'),
        };
    }

    initCarousel() {
        this.initSlides();
    }

    initSlides() {
        this.slides = this.el.querySelectorAll('.slide');
        for (let indexSlide = 3; indexSlide < this.slides.length; indexSlide++) {
            this.setSlideSizeLow(indexSlide);
        }
        if (this.slides.length > 3) {
            this.listenEvents();
        }
    }

    listenEvents() {
        this.elements.prev.addEventListener('click', () => {
            this.slidePrev(this.currentIndex);
            this.currentIndex++;
            if (this.currentIndex >= this.slides.length) {
                this.currentIndex = 0;
            }
        });

        this.elements.next.addEventListener('click', () => {
            if (this.currentIndex <= 0) {
                this.currentIndex = this.slides.length - 1;
                this.slideNext(this.currentIndex, 0);
            } else {
                this.slideNext(this.currentIndex - 1, this.currentIndex);
                this.currentIndex--;
            }
        });
    }

    slidePrev(index) {
        this.setSlideSizeLow(index);
        setTimeout(() => {
            this.elements.slides.appendChild(this.slides[index]);
        }, 300);
        let number = this.slides.length - index;
        if (number > 3) {
            this.setSlideSizeUp(index + 3);
        }
        if (number === 3) {
            this.setSlideSizeUp(0);
        }
        if (number === 2) {
            this.setSlideSizeUp(1);
        }
        if (number === 1) {
            this.setSlideSizeUp(2);
        }
    }

    slideNext(indexNew, index) {
        this.elements.slides.insertBefore(this.slides[indexNew], this.slides[index]);
        setTimeout(() => {
            this.setSlideSizeUp(indexNew);
        }, 30);
        let number = this.slides.length - index;
        if (number >= 3) {
            this.setSlideSizeLow(index + 2);
        }
        if (index === this.slides.length - 1) {
            this.setSlideSizeLow(1);
        }
        if (index === this.slides.length - 2) {
            this.setSlideSizeLow(0);
        }
    }

    setSlideSizeUp(index) {
        this.slides[index].style.width = '282px';
        this.slides[index].style.height = '200px';
        this.slides[index].style.border = '1px solid';
    }

    setSlideSizeLow(index) {
        this.slides[index].style.width = 0; 
        this.slides[index].style.height = 0; 
        this.slides[index].style.border = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel(document.querySelector('.carousel'));
    console.dir(carousel);
});
