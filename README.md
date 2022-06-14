# mac-page-w-parallax


### Idea

#### How to implement scrolling animating text
- Place the first text in the middle and hide everything else
- Set trigger points 2 scrolls apart between each text (use *wheelScrollDistance* for calculating that)
- Create an animation function where it takes 3 params, the 2 elements in question and the direction to animate
- Idea here is start with 2 elements (the first two) and try animating after 2 scrolls
- Also need to add opacity scroll animation to first text - make it appear more gradual as you get closer to the parallax section vh