const wheelScrollDistance = 100,
    heroSection = document.querySelector('.hero');

const heroText = {
        element: document.querySelector('.hero__text'),
        initialScale: 28,
        change: function() {
            return this.initialScale - (8 * (scrollY / innerHeight));
        },
        transform: function() {
            if (this.initialScale <= 25) return;
            this.element.style.transform = `translate(-50%, -50%) scale(${this.change()})`
        }
    },
    heroImg = {
        element: document.querySelector('.hero__img'),
        initialScale: 1.2,
        change: function() {
            return this.initialScale + (0.2 * (scrollY / innerHeight));
        },
        transform: function() {
            if (this.initialScale >= 1.25) return;
            this.element.style.transform = `translate(-50%, -50%) scale(${this.change()})`
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
        change: function() {
            return this.initialBrightness + 1 * (scrollY / this.startPoint)
        },
        transform: function() {
            this.element.style.filter = `brightness(${this.change()})`
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
        heroText.transform();
        heroImg.transform();
        parallaxSection.transform();
    }

    lastScrollY = scrollY;
})