const wheelScrollDistance = 100,
    numScrolls = 6,
    heroSection = document.querySelector('.hero');

const heroText = {
        element: document.querySelector('.hero__text'),
        initialScale: 28,
        changeScaleBy: 8,
        maxScale: 20,
        change: function(scrollDistance) {
            return this.initialScale - (this.changeScaleBy * (scrollDistance / innerHeight));
        },
        transform: function(scrollDistance) {
            const changeScrollDistance = this.change(scrollDistance);
            const scale = changeScrollDistance <= this.maxScale ? this.maxScale : changeScrollDistance;
            this.element.style.transform = `translate(-50%, -50%) scale(${scale})`
        }
    },
    heroImg = {
        element: document.querySelector('.hero__img'),
        initialScale: 1.2,
        changeScaleBy: 0.2,
        maxScale: 1.3,
        change: function(scrollDistance) {
            return this.initialScale + (this.changeScaleBy * (scrollDistance / innerHeight));
        },
        transform: function(scrollDistance) {
            const changeScrollDistance = this.change(scrollDistance);
            const scale = changeScrollDistance >= this.maxScale ? this.maxScale : changeScrollDistance;
            this.element.style.transform = `translate(-50%, -50%) scale(${scale})`
        }
    },
    parallaxSection = {
        element: document.querySelector('.parallax'),
        height: wheelScrollDistance * 6,
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
        boundaries: [0, 1, 2, 3],
        lastBoundary: null,
        elements: function() {
            return [...this.element.children];
        },
        findCurrentBoundary: function() {
            const [firstTrigger, secondTrigger, thirdTrigger] = this.triggerPoints();
            if (scrollY < firstTrigger) return this.boundaries[0]
            if (scrollY >= firstTrigger && scrollY < secondTrigger) return this.boundaries[1]
            if (scrollY >= secondTrigger && scrollY < thirdTrigger) return this.boundaries[2]
            if (scrollY >= thirdTrigger) return this.boundaries[3]
        },
        currentElement: function() {
            return this.elements()[this.lastBoundary];
        },
        currentElementIndex: function() {
            return this.elements().findIndex(element => element === this.currentElement());
        },
        prevElement: function() {
            const currentElementIndex = this.currentElementIndex();
            if (currentElementIndex === 0) return null;
            return this.elements()[currentElementIndex - 1];
        },
        nextElement: function() {
            const currentElementIndex = this.currentElementIndex();
            if (currentElementIndex === this.elements().length - 1) return null;
            return this.elements()[currentElementIndex + 1];
        },
        moveElements: function() {
          this.elements().forEach((element, i) =>
              element.style.top = `calc(50% - ${i * -200}px - ${scrollY - heroSection.offsetHeight}px)`
          )
        },
        hide: function(element) {
            element.style.opacity = '0';
        },
        show: function(element) {
            element.style.opacity = '1';
        },
        triggerPoints: function() {
            return Array(this.elements().length - 1).fill(0).map(
                (n,i) => n + heroSection.offsetHeight + (wheelScrollDistance * 2 * (i+1))
            )
        },
        haveCrossedTriggerPoint: function() {
            return this.findCurrentBoundary() !== this.getLastBoundary();

        },
        getLastBoundary: function() {
            return typeof (this.lastBoundary) === 'number' ? this.lastBoundary : this.findCurrentBoundary();
        },
        animate: function(element1, element2) {
            this.hide(element1);
            this.show(element2);
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
        const currElement = parallaxTextList.currentElement();
        const scrollDiff = scrollY - lastScrollY;
        if (parallaxTextList.haveCrossedTriggerPoint()) {
            scrollDiff > 0 // Going up
            ? parallaxTextList.animate(currElement, parallaxTextList.nextElement())
            : parallaxTextList.animate(currElement, parallaxTextList.prevElement());
        }
        parallaxTextList.moveElements();
    }

    lastScrollY = scrollY;
    parallaxTextList.lastBoundary = parallaxTextList.findCurrentBoundary();
})

