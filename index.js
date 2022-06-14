const wheelScrollDistance = 100,
    heroSection = document.querySelector('.hero');

const heroText = {
        element: document.querySelector('.hero__text'),
        initialScale: 28,
        changeScaleBy: 8,
        change: function(scrollDistance) {
            return this.initialScale - (this.changeScaleBy * (scrollDistance / innerHeight));
        },
        transform: function(scrollDistance) {
            this.element.style.transform = `translate(-50%, -50%) scale(${this.change(scrollDistance)})`
        }
    },
    heroImg = {
        element: document.querySelector('.hero__img'),
        initialScale: 1.2,
        changeScaleBy: 0.2,
        change: function(scrollDistance) {
            return this.initialScale + (this.changeScaleBy * (scrollDistance / innerHeight));
        },
        transform: function(scrollDistance) {
            this.element.style.transform = `translate(-50%, -50%) scale(${this.change(scrollDistance)})`
        }
    },
    parallaxSection = {
        element: document.querySelector('.parallax'),
        height: wheelScrollDistance * 7,
        startPoint: heroSection.offsetHeight,
        initialBrightness: 0,
        endPoint: function() {
            return this.element.offsetHeight;
        },
        change: function(scrollDistance) {
            return this.initialBrightness + 1 * (scrollDistance / this.startPoint)
        },
        transform: function(scrollDistance) {
            this.element.style.filter = `brightness(${this.change(scrollDistance)})`
        }
    },
    parallaxTextList = {
        element: document.querySelector('.parallax__text-list'),
        elements: function() {
            return this.element.children;
        }
    };

let lastScrollY = 0;

window.addEventListener('scroll', e => {
    if (scrollY <= heroSection.offsetHeight) {
        heroText.transform(scrollY);
        heroImg.transform(scrollY);
        parallaxSection.transform(scrollY);
    } else {
        heroText.transform(heroSection.offsetHeight);
        heroImg.transform(heroSection.offsetHeight);
        parallaxSection.transform(heroSection.offsetHeight);
    }

    lastScrollY = scrollY;
})