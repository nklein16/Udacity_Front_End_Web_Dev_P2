// function startGame() {

    // reset variables
    let cardNum = 0;
    let cardClasses = [];
    let openCardsList = [];
    let timer = 0
    
    // reset board (remove classes from cards)
    let cardList = getCards()
    // shuffle cards
    shuffle(cardList)
    flipCard()
    if(checkOpenCardListLength() < 2) {
        addCardToOpenCardsList(card)
    }



// }

// startGame();

function getCards(deckElement) {

    // Get all cards 
    return Array.from(deckElement.children);
    
    // returns HTMLCollection, so convert to array
    // let cardList = Array.from(document.getElementsByClassName("card"));
    // returns NodeList
    // let cards = document.querySelectorAll('.card');
}

// Get deck
// useful for:
// (1) adding event listener to the deck
// (2) resetting the deck
let deckElement = document.getElementsByClassName('deck')[0];


// var i = 1; 
// for (let card of cardList) {

//     // get the list of classes assigned to each card
//     let values = card.classList.value;
//     if(values.length > 1){
//         // separate class string text values and push the list of className values (separate list for each card) onto array 
//         cardClasses.push(values.split(' '));
//     }
//     else {
//         cardClasses.push(values);
//     }
//     console.log("Card " + i + " has these classes: " +  values);
//     i++;
// }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// for (let card of cardList) {
// cards.forEach( function(card) {

function flipCard() {
    cardList.forEach( function(card) {
        card.addEventListener('click', function() {
            showCard(card);
            openCardsList.push(card);

            if(!card.classList.contains('open') && !card.classList.contains('show')) {
            // no need to do this if cards are already a match...
            // this will also lock them in place
            // if(!card.classList.contains('match')){
                showCard(card);
                // addCardToOpenCardsList(card);     
                openCardsList.push(card);

                if(openCardsList.length == 2) {
                    if(openCardsList[0].dataset.card == openCardsList[1].dataset.card) {
                        console.log("This is a match!");
                    }
                }

                // if no match, hide
                setTimeout( function() {
                    openCardsList.forEach( function(card) {
                        // card.classList.remove('open', 'show');
                        showCard(card);
                    });

                    openCardsList = [];

                }, 2000);

            }
            // if card is face-up, hide it
            else {
                // cardList.forEach( function(card) {
                    // card.addEventListener('click', function(e) {
                showCard(card);
                    // });
                // });
            }
        });
    });
}

function match() {

}
//});

// function toggleCard(card) {
//     card.classList.toggle('open', 'show');
// }

function showCard(card) {
    card.classList.add('open');
    card.classList.add('show');
}

function hideCard(card) {
    card.classList.remove('open');
    card.classList.remove('show');
}

function checkOpenCardListLength() {
    return openCardsList.length; 
}
function addCardToOpenCardsList(card) {

    if(openCardsList.length == 0) {
        openCardsList.push(card);
        return;
    }

    else if(openCardsList.length == 1) {
        openCardsList.push(card);

        // check that icons are the same on both cards
        // make this into a separate function: checkIcons() or compareCards()
        if(openCardsList[0].firstElementChild.classList[1] ==
           openCardsList[1].firstElementChild.classList[1]) {

            console.log("This is a match!");
            // this may need to be an async function to handle both cards
            for(card of openCardsList) {
                // set match class attribute
                card.classList.add('match');
                // card.classList.remove('open','show');
                
                // change background of both open cards
                // card.style.backgroundColor = '#02ccba';

                // if they match, lock cards in place
                // lockCards(openCardsList);
            }
        }
        // if cards do not match, hide cards' symbols and remove cards from list
        else {
            openCardsList.forEach( function(card) {
                card.addEventListener('click', function() {
                    toggleCard(card);
                });
            })
            for(card of openCardsList) {
                toggleCard(card);
            }
        }

        clearOpenCardsList(openCardsList);
    }
}

function clearOpenCardsList(openCardsList){
    openCardsList=[];
    //openCardsList.length = 0;
    // for(let card of openCardsList) {
    //     openCardsList.pop();
    // }
}

// lock cards in place when they are a match so they can't be flipped back over
function lockCards(openCardsList) {
    for(card of openCardsList){
        //Must install jquery for this to work!!!
        $(this).prop('disabled', 'true');
    }
}


// function compareCards(openCardsList) {

//     if() {
//         return true;
//     }

//     return false;
// }

    // You'll need to come up with an algorithm for determining when to remove a star
    // based on the game timer and the number of moves that have been made


function moveCounter() {
    moveCounter++;
    document.querySelectorAll('.moves').innerHTML = moveCounter;
}

function resetMoves() {
    moveCounter = 0;
    document.querySelectorAll('.moves').innerHTML = moveCounter;
}

function resetGame() {
    reset = document.getElementsByClassName('fa-repeat');
    reset.addEventListener('click', function() {
        clearBoard();
        randomizeBoard();
    });
}

function clearBoard() {
    // turn cards over
    // shuffle board
    shuffle(); 
}

function removeStars() {

    let stars = document.querySelectorAll('ul.stars li');
    // let li_stars = stars.;
    // or
    let stars = document.querySelectorAll('ul.stars').removeChild()
    // if some time has passed and some number of moves have been made
    // stars.

}