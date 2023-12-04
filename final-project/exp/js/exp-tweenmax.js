console.log("starting...");

document.getElementById('cta').addEventListener('click', function() {
    TweenMax.to('.panel', 1.5, {scaleY: 1, height: '100vh', ease: Circ.easeOut});
    TweenMax.to('#light', 1, {opacity: 1, y: 0, delay: 0.5});
    TweenMax.to('p', 1, {opacity: 1, y: 20, delay:1});
    TweenMax.to('.box', 3, {opacity: 1, scale: 1, ease: Elastic.easeOut});
})