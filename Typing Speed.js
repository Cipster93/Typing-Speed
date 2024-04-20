let phrase1 = "As the morning mist dissipates, revealing the lush greenery of the countryside, accompanied a sense of tranquility washes over the landscape, accompanied by the chirping of birds welcoming the dawn.";
let phrase2 = "In the bustling city streets, amidst the hustle and bustle of daily life, there exists a quiet alleyway adorned with ivy-covered walls and cobblestone paths, where time seems to slow down, offering a moment of respite from the chaos.";
let phrase3 = "Under the canopy of stars, with the moon casting its silvery glow upon the earth, two lovers stroll hand in hand along the deserted beach, their laughter mingling with the sound of waves crashing against the shore, creating an enchanting melody.";
let phrase4 = "In the heart of the forest, where ancient trees stand tall and proud, a gentle stream meanders through the moss-covered rocks, its crystal-clear waters teeming with life, while shafts of sunlight filter through the dense foliage, \n painting the forest floor with dappled light.";
let phrase5 = "In the serene twilight, as the day bids farewell and the stars begin to twinkle, a gentle breeze rustles through the trees, carrying with it the sweet scent of blooming flowers.";
let app = document.getElementById('app');
let arrayText = [phrase1, phrase2, phrase3, phrase4, phrase5];
let randomText = Math.floor(Math.random() * arrayText.length);
let text = arrayText[randomText];
let button = document.getElementById('getReady');
let letTheGameBegin = false;
let miliseconds = document.getElementById('miliseconds');
let seconds = document.getElementById('seconds');
let miliseconds1 = 0;
let seconds1 = 0;
let startIndex = 0;
let incorectLetters = 0;
let hundred = 100;
let sixteen = 60;
let nine = 9;

button.addEventListener('click', function () {
    if (letTheGameBegin === false) {
        letTheGameBegin = true;
        document.getElementById('intro').remove();
        button.remove();
        for (let i = 0; i < text.length; ++i) {
            let letter = document.createElement('letter');
            letter.textContent = text[i];
            app.appendChild(letter);
        }
        chronoStarted();
        mslIncrement();
    }
});

function chronoStarted() {
    setInterval(mslIncrement, hundred);
}

function mslIncrement() {
    if (letTheGameBegin === true) {
        if (miliseconds1 < nine) {
            ++miliseconds1;
        } else {
            miliseconds1 = 0;
            ++seconds1;
        }
        miliseconds.textContent = miliseconds1;
        seconds.textContent = seconds1;
        if (seconds1 === sixteen) {
            endOfTime();
        }
    }
}

document.addEventListener('keydown', function(e) {
    let currentKeyDown = e.key;
    if (startIndex >= 0 && startIndex < text.length && currentKeyDown !== "Shift") {
        let currentText = text.split('');
        if (currentKeyDown === currentText[startIndex]) {
            app.children[startIndex].classList.add('correct');
        } else {
            app.children[startIndex].classList.add('incorrect');
            ++incorectLetters;
        }
        ++startIndex;
        if (startIndex === currentText.length) {
            endGame();
        } 
    }
});

function endOfTime() {
    letTheGameBegin = false;
    app.innerHTML = "Game over! Try again this time faster!";
    let tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = "Try here";
    tryAgainButton.id = "tryAgainButton";
    tryAgainButton.classList.add("tryAgainButton");
    tryAgainButton.onclick = function() {
        location.reload();
    };
    app.appendChild(tryAgainButton);
}

function endGame() {
    letTheGameBegin = false;
    if (incorectLetters === 0) {
        app.innerText = "Congratulation you did it! Your time is" + " " + seconds1 + "," + miliseconds1 + " " + "seconds.";
    } else {
        app.innerText = "Congratulation you did it! But you miss " + " " + incorectLetters + " " + "letters.";
    }
    let goAgain = document.createElement('button');
    goAgain.textContent = "Go again, this time faster!";
    goAgain.id = "goAgain";
    goAgain.classList.add("goAgain");
    goAgain.onclick = function() {
        location.reload();
    };
    app.appendChild(goAgain);
}
