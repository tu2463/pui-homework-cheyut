// This js file is for all focus pages during a session. Including: focus-in-progress.html

// citation: the timer is modified from the "Javascript Countdown" on https://medium.com/geekculture/23-javascript-countdown-timer-for-website-273efc2f5618
TweenLite.defaultEase = Expo.easeOut;

function initTimer(t) {
    var self = this; //??
    var timerEl = document.querySelector('.timer');
    var minutesGroupEl = timerEl.querySelector('.minutes-group');
    var secondsGroupEl = timerEl.querySelector('.seconds-group');

    // these groups will be updated in updateTimerDisplay(arr)
    var minutesGroup = {
        firstNum: minutesGroupEl.querySelector('.first'),
        secondNum: minutesGroupEl.querySelector('.second')
    }
    var secondsGroup = {
        firstNum: secondsGroupEl.querySelector('.first'),
        secondNum: secondsGroupEl.querySelector('.second')
    }

    var time = {
        min: t.split(':')[0],
        sec: t.split(':')[1]
    };

    var timeNumbers; // an array of four numbers representing mintes & seconds; will be updated in updateTimer

    function animateNum (groupNum, timeNumber) {
        TweenMax.killTweenOf(groupNum.querySelector('.number-grp-wrp')); //??
        TweenMax.to(groupNum.querySelector('.number-grp-wrp'), 1, { // select the num, duration = 1s
            y: - groupNum.querySelector('.num-' + timeNumber).offsetTop // move it down; ??what's "num-"?
        });
    }

    function updateTimerDisplay(timeNumbers) {
        animateNum(minutesGroup.firstNum, timeNumbers[0]);
        animateNum(minutesGroup.secondNum, timeNumbers[1]);
        animateNum(secondsGroup.firstNum, timeNumbers[2]);
        animateNum(secondsGroup.secondNum, timeNumbers[3]);
    }

    function updateTimer() {
        var date = new Date(); // cur timestamp; used for calculating the timestamp 1s earlier

        // set the hours in the cur timestamp to be 0
        date.setHours(0); 
        // set var time = t (input of initTimer) i.e. set the mins & secs to be the time of t
        date.setMinutes(time.min);
        date.setSeconds(time.sec);

        var newDate = new Date(date.valueOf() - 1000); // 1000ms = 1s //?? what's the use of minus this second?
        var temp = newDate.toTimeString().split(" "); // an array of 00:01:03 GMT-0500 (Eastern Standard Time), split by " "
        var tempsplit = temp[0].split(':'); // an array of 00:01:03, split by ":"

        // update var time to 1s earlier
        time.min = tempsplit[1]; //  a string
        time.sec = tempsplit[2];

        var timestr = time.min + time.sec; // a combination of two strings
        timeNumbers = timestr.split(''); //?? seems like this will separate each number and become an array of four numbers
        updateTimerDisplay(timeNumbers);

        if (timestr === '0000') countdownFinished(); // todo
        if (timestr != '0000') setTimeout(updateTimer, 1000) // todo // calls updateTimer after 1s 
        //(my understanding: ) the reason we don't write updateTimer()  here is because it updateTimer() will be called as soon as it's compiled, which we don't want
    }
}

function animateFinish() {
    // TweenMax.set(reloadBtn, { scale: 0.8, display: 'block'}); // I don't need a reload btn
    // this function should be personified for my own app
}

function countdownFinished() {
    setTimeout(animateFinish, 1000); // execute animateFinish after 1s
}

//need one more: pause btn.addEventListener

initTimer("00:11");