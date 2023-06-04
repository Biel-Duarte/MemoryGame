const grid = document.querySelector(".grid");
const Player = document.querySelector("#player");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const winnerMessage = document.getElementById("winnerMessage");
let initTimer = 0;

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard ="";
let secondCard = "";

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        Player.textContent = spanPlayer.textContent;
        startConfetti();
        //winnerMessage.removeAttribute('style');
        winnerMessage.classList.remove("hidden");
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();
            
    } else {
        setTimeout(() => {

            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard.style.cursor = "pointer";
            secondCard.style.cursor = "pointer";
            firstCard = "";
            secondCard = "";

        }, 500) 
    }
}

const revealCard = ({ target }) => {

    if (initTimer === 1) {
        startTimer();
    }
    initTimer++;


    if (target.parentNode.className.includes("reveal-card")) {
        return;
        }
        
    if (firstCard === "") {

        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
        firstCard.style.cursor = "";
    } else if (secondCard === "") {
        
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
        secondCard.style.cursor = "";
        checkCards();

    }
    console.log("First Card: ", firstCard);

}

const createCard = (character) => {

    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    card.style.cursor = "pointer";
    front.style.backgroundImage = `url("../images/${character}.png")`;

    //appendChild used to insert the div's into the mother div
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character)


    return card;
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];
    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5  );

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
    
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player'); 
    loadGame();
}



