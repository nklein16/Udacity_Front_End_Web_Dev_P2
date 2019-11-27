/* Author: Nathaniel Klein
 * Course: Udacity's Front-End Web Development Course 
 * Project: Memory Game (Project #2)
 * File Name: app - Copy.js (to be revised)
 * Date Completed: 11/26/19
 */

// Global variables

let deckElement = document.getElementsByClassName('deck')[0];
let cardList = Array.from(deckElement.children);

// Set openCardsList
let openCardsList = [];
openCardsList.length = 0;

// Handle moves
let moveCounter = 0;
var moves = document.querySelector('.moves');
moves.innerText = moveCounter;

// handle time intervals and duration
let interval;
let duration;

// Handle counter
let sec = document.getElementById('seconds');
let min = document.getElementById('minute');

// Handle fails
var fails = 0;

// Used to monitor stars and hide them per algorithm 
var stars = $('.stars');
var flag = stars.children().length;
var numStarsRemaining = 4;

// modal for end of game
let modal = document.querySelector('.modal');

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle cards and add them (back) to the deck
function addToDeck() {
    cardList = shuffle(cardList);
    // iterate through list of cards
    for(const card of cardList) {
        // Flip card face-down
        card.classList.remove('open','show','match');
        // add card to deck
        deckElement.appendChild(card);
    }    
}

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

/* This function contains the core functionality of the game */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function flipCards() {

    cardList.forEach( function(card) {
        card.addEventListener('click', function() {

            // If card is not open and not a match
            if( !(card.classList.contains('open') || card.classList.contains('match'))){

                if(openCardsList.length < 2){
                    showCard(card);
                    addCardToOpenCardsList(card);
                    
                    // If second card was just added, add to move counter, display new move count, and check for match
                    if(openCardsList.length === 2){
                        
                        trackMoveCounter();
                        moves.innerText = moveCounter;

                        if( isMatch() ) {    
                            for(card of openCardsList) {
                                // add match class to card to lock in place
                                card.classList.add('match');
                                // flip card over by removing 'open' and 'show' classes from card
                                // hideCard(card);

                            }

                            // clears the list of open cards
                            openCardsList = [];

                            // check if all cards have been matched
                            if(document.getElementsByClassName('match').length === 16) {
                                
                                // Stops the clock without clearing the time
                                clearInterval(interval);

                                // calculates duration
                                // duration = min.innerHTML + ':' + sec.innerHTML;
                                duration = getDuration();

                                // called from here when player has won the game
                                showGameOverMessage(duration);
                            }
                        }

                        // If two opened cards are not a match
                        else {
                            
                            // Flip the non-matching cards back over again and clear the openCardsList
                            setTimeout( function() {
                                openCardsList.forEach( function(card) {
                                    hideCard(card);
                                });
                                openCardsList = [];
                                
                            }, 1000);

                            // This section tracks the logic of when to remove a star - on every fourth non-match a star is removed
                            fails++;
                            if(fails%4 === 0) {
                                if(flag > 0) {
                                    removeStar();
                                    flag--;
                                }
                            }

                            // if there are no more stars remaining
                            if(flag === 0) {
                                
                                // Stops the clock without clearing the time
                                clearInterval(interval);
                                
                                // calculates duration
                                // duration = min.innerHTML + ':' + sec.innerHTML;
                                duration = getDuration();
                                
                                // Sets last star to black
                                // stars.children().eq(flag-1).css('color', 'black');
                                
                                // called from here when player has lost the game
                                showGameOverMessage(duration);
                            }
                        }
                    }
                }
            }
        });
    });    
}

// Adds the 'open' and 'show' attributes to a card
// Fundamentally, this flips the card face-up
function showCard(card) {
    card.classList.add('open');
    card.classList.add('show');
}

// Removes the 'open' and 'show' attributes from a card
// Fundamentally, this flips the card face-down
function hideCard(card) {
    card.classList.remove('open');
    card.classList.remove('show');
}

// Adds card to openCardList[] Array
function addCardToOpenCardsList(card) {
    openCardsList.push(card);
}

// Checks if the two cards in openCardsList[] Array match by symbol
function isMatch() {

    if( openCardsList[0].getElementsByTagName('i')[0].classList[1] ===
            openCardsList[1].getElementsByTagName('i')[0].classList[1]) {
    
        return true;
    }
    return false;
}

// Increments the number of moves and sets it on the board;
// starts the timer when the second card of the game is flipped over
function trackMoveCounter() {
    moveCounter++;
    document.querySelectorAll('.moves').innerHTML = moveCounter;
    if(moveCounter === 1) {
        startTimer();
    }
}

// Get duration
function getDuration() {
    return min.innerHTML + ':' + sec.innerHTML;
}

// This is an Immediately-Invoked Function Expression (IIFE) that creates the game timer
// and turns the cards face-down to begin the game.
(function(){
    addToDeck();
    createTimer();
    flipCards();
})();

// global listen event on the reset button; when clicked, the entire game is reset
var reset = document.querySelector('.fa-repeat');
reset.addEventListener('click', function() {
    resetBoard();
});

// Resets the board for the game; called when page first loads and at the end of a game
function resetBoard() {

    openCardsList = [];
    addToDeck();
    resetMoves();
    resetTimer();
    resetStars();
}

// Resets the number of moves to zero and displays on the webpage
function resetMoves() {
    moveCounter = 0;
    document.querySelector('.moves').innerHTML = moveCounter;
}

// Resets the game timer
function resetTimer() {
    clearInterval(interval);
    document.querySelector('#seconds').innerHTML = 0;
    document.querySelector('#minute').innerHTML = 0;
}


// Resets the stars to gold to start the game
function resetStars() {
    stars.children().css('color','gold');
    fails = 0;
    flag = 4;
    numStarsRemaining = 4;
}

// Creates the timer
function createTimer() {

    // Get the timer element
    let timer = document.getElementById('timer');

    // Create the span to hold the minute counter
    let minuteSpan = document.createElement('span');
    minuteSpan.setAttribute('id','minute');
    minuteSpan.innerText = 0;
    timer.appendChild(minuteSpan);

    // Create the span for the colon
    let colonSpan = document.createElement('span');
    colonSpan.innerText = ' : ';
    timer.appendChild(colonSpan);

    // Create the span to hold the second counter
    let secondSpan = document.createElement('span');
    secondSpan.setAttribute("id", "seconds");
    secondSpan.innerText = 0;
    timer.appendChild(secondSpan);

}

// Starts the timer
function startTimer() {
    
    sec = document.getElementById('seconds');
    min = document.getElementById('minute');

    interval = setInterval( function() {
        sec.innerHTML++;
        if(sec.innerHTML%60 === 0) {
            sec.innerHTML = 0;
            min.innerHTML++;
        }
    }, 1000);
}

// Removes a star by turning it from gold to black every on every fourth non-match
function removeStar() {
    stars.children().eq(flag-1).css('color', 'black');
    numStarsRemaining--;
}

// Calls methods to build and display the message at the end of the game
function showGameOverMessage(duration) {
    buildModal(duration);
    displayModal();
}

// Creates the modal for display
function buildModal(duration) {

    // let modal = document.getElementById('gameOverModal');

    // button
    modalBtn = document.createElement('button');
    modalBtn.setAttribute('class', 'closeBtn');

    // Puts the X on the button to close the modal
    modalBtn.innerHTML = '&times;';
    modalBtn.style.cssText = 'float: right; font-size: 15px; background-color: coral; color: lightblue; margin: 5px 5px 0 0; cursor: pointer';

    // modal_body
    let modal_body = document.createElement('div');

    // modal message
    let message = document.createElement('p');
    message.setAttribute("id", "modal-message");

    // Message upon winning
    if(document.getElementsByClassName('match').length === 16) {

        starText = numStarsRemaining != 1 ? 'stars' : 'star';        
        message.innerHTML = `Congratulations!! <br><br> You completed the game in ${moveCounter} moves and in only ${duration} time!<br><br>
        You also finished the game with ${numStarsRemaining} ${starText} remaining!`;
    }

    // Message upon losing
    else {
        message.innerHTML = `You lose!<br><br> You had a few too many missed opportunities, so you have no stars remaining`;
    }

    // Change size of text message depending on size of screen
    if(window.screen.width < 500) {
        message.style.cssText = 'margin: 20% auto; padding: 5%; text-align: center; font-size: 20px';
    }
    else {
        message.style.cssText = 'margin: 20% auto; padding: 5%; text-align: center; font-size: 40px';
    }

    modal.appendChild(modalBtn);
    modal_body.appendChild(message);
    modal.appendChild(modal_body);

}

// Displays the end of game message modal and resets the board after three seconds
function displayModal() {

    // Display the modal
    modal.style.display = 'block';

    modalBtn.addEventListener('click', function() {
        
        // Tears down all parts of the modal built with javascript as part of the cleanup event
        modal.querySelectorAll('*').forEach(n => n.remove());
        
        // Hides the modal itself
        modal.style.display = 'none';
    });

    setTimeout( function() {
        resetBoard();
    }, 3000);

}