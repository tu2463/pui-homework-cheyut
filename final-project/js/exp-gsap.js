// animate single obj & .to()
// gsap.to('.help', {duration: 2, x: 300, backgroundColor: "#560563", 
// borderRadius: "20%", border: "5px solid black", ease: "bounce"});

// animate multiple obj & .set()
// gsap.set('.help, .pause', {transformOrigin: "50%, 50%"}); // basically a gsap.to() with duration = 0
// gsap.to('.help, .pause', {duration: 20, rotation: 360});

// animate js obj
// var myObject = {rotation: 0};
// gsap.to(myObject, {duration: 2, rotation:360, 
//     onUpdate: function() { // onStart, onComplete
//         console.log(myObject.rotation)
// }});

// .from()
// gsap.from('.help', {duration: 1.5, opacity: 0, scale: 0.3, ease: "back"});
// // gsap.from(".pause", {duration: 1, opacity: 0, y: () => Math.random() * 400 - 200, // Math.random() generates float btw 0-1 ==> the whole formula random number btw -200, 200
// //      stagger: 0.25});
// // or...
// gsap.from(".pause", {duration: 1, opacity: 0, delay:1.5, // start counting from the very beginning
//     y: "random(-200, 200)", // random number btw -200, 200
//      stagger: 0.25});

// timeline (you can add timelines within timeline)
// var tl = gsap.timeline(); // so that the "delay" method will start coutning from the prev animation in timeline
// tl.from('.help', {duration: 1.5, opacity: 0, scale: 0.3, ease: "back"});
// tl.from(".pause", {duration: 1, opacity: 0, delay:1.5, // start counting after tl.from('help') animation stops
//     y: "random(-200, 200)", // random number btw -200, 200
//      stagger: 0.25}, "+=2"); // += means 2 sec after the prev animation

// add labels to timeline, repeat timeline
var tl = gsap.timeline({repeat: 2, yoyo: true}); // finish timeline, goes backwards, and start timeline again
tl.from('.help', {duration: 1.5, opacity: 0, scale: 0.3, ease: "back"});
tl.from(".pause", {duration: 1, opacity: 0, y: "random(-200, 200)", stagger: 0.25}, "+=2"); 
tl.addLabel("outro", "+=1"); // create a label 1 sec after the prev animation ends
tl.to(".pause", {duration: 0.5, opacity: 0, x: 300, ease:"power3.out"}, "outro");