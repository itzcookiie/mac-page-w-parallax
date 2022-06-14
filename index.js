const heroText = {
    element: document.querySelector('.hero__text'),
    scale: 28,
    change: function(distance) {
        return (8 * distance) / innerHeight
    },
    increase: function(distance) {
        this.scale += this.change(distance)
    },
    transform: function() {
        if (this.scale <= 25) return;
        this.element.style.transform = `translate(-50%, -50%) scale(${this.scale})`
    }
}, heroImg = {
    element: document.querySelector('.hero__img'),
    scale: 1.2,
    change: function(distance) {
        return (0.2 * distance) / innerHeight
    },
    increase: function(distance) {
        this.scale += this.change(distance)
    },
    transform: function() {
        if (this.scale >= 1.25) return;
        this.element.style.transform = `translate(-50%, -50%) scale(${this.scale})`
    }
};

let lastScrollY = 0;

window.addEventListener('scroll', e => {
    if (scrollY >= innerHeight) return;
    const distanceTravelled = scrollY - lastScrollY;
    heroText.increase(-distanceTravelled);
    heroText.transform();

    heroImg.increase(distanceTravelled);
    heroImg.transform();
    lastScrollY = scrollY;
})