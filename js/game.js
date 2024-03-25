const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

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
];

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}, seu tempo foi ${timer.innerHTML}`)}
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reavel-card');
            secondCard.classList.remove('reavel-card');

            firstCard = '';
            secondCard = '';
        }, 700);
    }
};

const reavelCard = ({target}) => {

    if(target.parentNode.className.includes('reavel-card')) { return; };

    if (firstCard === '') {
        target.parentNode.classList.add('reavel-card');
        firstCard = target.parentNode;
    } else if ( secondCard === '') {
        target.parentNode.classList.add('reavel-card');
        secondCard = target.parentNode;

        checkCards();
    }

    target.parentNode.classList.add('reavel-card');
};

const createElement  = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../images/${character}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', reavelCard);
    card.setAttribute('data-character', character);

    return card;
    
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    
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

    startTimer();
    loadGame();
}

