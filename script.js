document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const restartButton = document.getElementById("restart");
    
    const icons = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🍓", "🥝"];
    let cards = [...icons, ...icons]; // Duplicate icons for pairs
    let flippedCards = [];
    let matchedCards = [];

    // Shuffle cards using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        gameBoard.innerHTML = "";
        shuffle(cards);
        cards.forEach((icon, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.icon = icon;
            card.dataset.index = index;
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
            this.classList.add("flipped");
            this.innerText = this.dataset.icon;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.icon === card2.dataset.icon) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards.push(card1, card2);
        } else {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerText = "";
            card2.innerText = "";
        }
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert("You won!"), 300);
        }
    }

    restartButton.addEventListener("click", () => {
        matchedCards = [];
        flippedCards = [];
        createBoard();
    });

    createBoard();
});
