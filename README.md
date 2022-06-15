# mac-page-w-parallax


### Idea

#### How to implement scrolling animating text
- Place the first text in the middle and hide everything else
- Set trigger points 2 scrolls apart between each text (use *wheelScrollDistance* for calculating that)
- Create an animation function where it takes 3 params, the 2 elements in question and the direction to animate
- Idea here is start with 2 elements (the first two) and try animating after 2 scrolls
- Also need to add opacity scroll animation to first text - make it appear more gradual as you get closer to the parallax section vh


## Parallax

#### Working remaining
- Add logic to check if we've crossed any boundaries
- If we have then add the opacity animation to the particular elements
- If not then move the current element in the scroll direction


#### How the OG Mac page works
- Text are put inside *<ul>* container element as <li>s
- Container is set in center of screen by making the top padding 50vh
- Last text is positioned further down from the center (like most of the elements) as the padding bottom is set to 25vh (so 1/4 of viewport)
- Text is spaced out by using padding
- Text is faded in and out using transition opacity
- They have some kinda algorithm that tells them when one text is in view or in the center
- When the right text is detected, the index is added to the <ul> container
- E.g. if it's the first text, the container will have a class of show-0, if it's the 2nd, show-1 etc
- They use this to determine what class to add to the text elements
- Each text element has a different class depending on what text is currently showing (or the scroll position)
- E.g. when the parent container has a class of show-0, each text element will have CSS based on that, when it's show-1, each element will have CSS based on that etc
- This is done by targeting the text elements through the parent class 
- e.g. if the ul container has a class of ul-parent, targetting the 2nd element when the first is showing would look something like e.g. document.querySelector('.ul-parent.show-0:nth-child(2))
- So each text element will have 4 different CSS states (technically only 3 since it's either not showing and positioned up, showing or not showing positioned down)

#### Learnings
- Pretty smart how they centered the container in the screen using top/bottom padding
- Also sorts out starting/ending position compared to using *position:absolute* where you have to constantly keep track of everything
- There's this cool thing in JS called *IntersectionObserver* which seems to do most of what we want
- Prob try learn what it is/does at a high level. Won't get too into it since we are mostly done with this as we know how it works now
- 

[comment]: <> (- Also need to add conditons to make sure scrolling starts at a certain height &#40;and doesn't go beyond that&#41;)