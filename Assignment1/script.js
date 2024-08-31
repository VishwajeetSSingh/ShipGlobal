class ImageCarousel {
    constructor(container) {
        this.container = container;
        this.carousel = container.querySelector('.carousel');
        this.images = [];
        this.currentIndex = 0;
        this.fallbackImage = 'default.png';

        this.prevButton = container.querySelector('.prevbutton');
        this.nextButton = container.querySelector('.nextbutton');
        this.indicatorContainer = container.querySelector('.indicatorcontainer');

        
        this.prevButton.addEventListener('click', () => this.showPrevious());
        this.nextButton.addEventListener('click', () => this.showNext());

        this.loadImages([
            'img1.png',
            'img2.png',
            'img3.jpg',
            'img4.jpeg',
            'image.jpg'
        ]);
    }

    loadImages(imageUrls) {
        imageUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.images.push(img);
                this.updateCarousel();
            };
            img.onerror = () => {
                console.error(`Failed to load ${url}. Using fallback image.`);
                const fallbackImg = new Image();
                fallbackImg.src = this.fallbackImage;
                this.images.push(fallbackImg);
                this.updateCarousel();
            };
        });
    }

    updateCarousel() {
        this.carousel.innerHTML = '';
        this.images.forEach(img => {
            const wrapper = document.createElement('div');
            wrapper.appendChild(img);
            this.carousel.appendChild(wrapper);
        });

        this.createIndicators();
        this.updateIndicator();
        this.updateCarouselPosition();
    }

    createIndicators() {
        this.indicatorContainer.innerHTML = '';
        for (let i = 0; i < this.images.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => this.showSlide(i));
            this.indicatorContainer.appendChild(indicator);
        }
    }

    showSlide(index) {
        this.currentIndex = index;
        this.updateIndicator();
        this.updateCarouselPosition();
    }

    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateIndicator();
        this.updateCarouselPosition();
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateIndicator();
        this.updateCarouselPosition();
    }

    updateIndicator() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('activeindicator', index === this.currentIndex);
        });
    }

    updateCarouselPosition() {
        this.carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageCarousel(document.querySelector('.carouselcontainer'));
});
