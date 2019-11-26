/* Author: Nathaniel Klein
 * Course: Udacity's Front-End Web Development Course 
 * Project: Memory Game (Project #2)
 * File Name: app - Copy.js (to be revised)
 * Date Completed: 09/29/19
 */

// Global variables

let deckElement = document.getElementsByClassName('deck')[0];
// let cardList = deckElement.children;
let cardList = Array.from(deckElement.children);

// shuffle cards
// let shuffled = shuffle(cardList)
//cardList = shuffle(cardList);

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
// let sec = 0
// sec = sec.toString().padStart(2, '0');
let sec = document.getElementById('seconds');
// let sec = document.getElementById('seconds').innerHTML = `${sec}`;
// let secTens = document.getElementById('secondTens');
let min = document.getElementById('minute');


// Handle fails
var fails = 0

// Used to monitor stars and hide them per algorithm 
var stars = $('.stars');
var flag = stars.children().length;
var numStarsRemaining = 3;
var numStarsTurnedOff = 0;

// modal for end of game
let modal = document.querySelector('.modal');

/* When the page loads or reloads, this is the first thing that will happen */
window.addEventListener('DOMContentLoaded', function() {
    addToDeck();
});

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle cards and add them (back) to the deck
// Works Correctly
function addToDeck() {
    cardList = shuffle(cardList);
    for(const card of cardList) {
        // Flips cards face-down
        card.classList.remove('open','show','match');
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

 // Base Functionality Works Correctly, BUT...
//  TODOs:  Fix as notes indicate...Also, implement losing logic by time and flags
function flipCards() {

    cardList.forEach( function(card) {
        card.addEventListener('click', function() {

            // What is the point of this if statement?  There's nothing of value in it...
            if(card.classList.contains('open') || card.classList.contains('match')){
                // console.log('already open');
            }

            else {

                if(openCardsList.length < 2){
                    showCard(card);
                    addCardToOpenCardsList(card);
                    
                    // If second card was just added, check for match
                    if(openCardsList.length === 2){
                        
                        trackMoveCounter();
                        moves.innerText = moveCounter;
                        // console.log('Moves: ' + moveCounter);

                        if( isMatch() ) {    
                            // console.log("It's a match!");
                            for(card of openCardsList) {
                                // flip card over
                                // add match class to card
                                card.classList.add('match');
                                // remove 'open' and 'show' classes from card
                                hideCard(card);

                            }

                            openCardsList = [];

                            // check if all cards have been matched
                            if(document.getElementsByClassName('match').length === 16) {

                                // Handling duration/timer
                                // let sec = document.getElementById('seconds');
                                // let secTens = document.getElementById('secondTens');
                                // let min = document.getElementById('minute');
                                // let duration = min.innerHTML + ':' + secTens.innerHTML + sec.innerHTML;
                                duration = min.innerHTML + ':' + sec.innerHTML;
                                // duration = $("#minute").innerHTML + $("seconds").innerHTML; 
                                
                                // console.log(duration);

                                // Stops the clock without clearing the time
                                clearInterval(interval);
                                showGameOverMessage(duration, numStarsRemaining);
                            }
                        }
                        // If openCardsList != 2
                        else {

                            // console.log('The cards do not match');
                            
                            // Flip the non-matching cards back over again and clear the openCardsList
                            setTimeout( function() {
                                openCardsList.forEach( function(card) {
                                    hideCard(card);
                                })
                                openCardsList = [];
                                
                            }, 1000);

                            // This section tracks the logic of when to remove a star
                            fails++;
                            // console.log('Number of fails: ' + fails);
                            if(fails%4 === 0) {
                                if(flag > 0) {
                                    // console.log('Flags: ' + flag);
                                    // console.log('remove a star');
                                    removeStar();
                                    flag--;
                                }
                            }

                            // TODO: Fix timing part of logic

                            // No more stars or too much time taken, so you lose
                            // let last_star_style = getComputedStyle(stars.children()[0])
                            // if(last_star_style.color === 'rgb(0, 0, 0)' || min.innerText >= 2) {
                            // if(flag === 0 || (min.innerText === 1 && secondSpan.innerText === 30) ) {
                            if(flag === 0 || (sec.innerText === 3) ) {
                                duration = min.innerHTML + ':' + sec.innerHTML;
                                // duration = $("#minute").innerHTML + $("seconds").innerHTML; 
                                // console.log(duration);

                                // Stops the clock without clearing the time
                                clearInterval(interval);

                                // Sets last flag to black
                                stars.children().eq(flag-1).css('color', 'black');
                                
                                showGameOverMessage(duration, numStarsRemaining);
                            }
                        }
                    }
                }
            }
        });
    });    
}

// Works Correctly
// Adds the 'open' and 'show' attributes to a card
// Fundamentally, this flips the card face-up
function showCard(card) {
    card.classList.add('open');
    card.classList.add('show');
}

// Works Correctly
// Removes the 'open' and 'show' attributes from a card
// Fundamentally, this flips the card face-down
function hideCard(card) {
    // console.log("hiding card");
    card.classList.remove('open');
    card.classList.remove('show');
}

// Works Correctly
// Adds card to openCardList[] Array
function addCardToOpenCardsList(card) {
    openCardsList.push(card);
}

// Works Correctly
// Checks if the two cards in openCardsList[] Array match by symbol
function isMatch() {

    if( openCardsList[0].getElementsByTagName('i')[0].classList[1] ===
            openCardsList[1].getElementsByTagName('i')[0].classList[1]) {
    
        return true;
    }
    return false;
}

// Works Correctly
// Increments the number of moves and sets it on the board;
// starts the timer when the second card of the game is flipped over
function trackMoveCounter() {
    moveCounter++;
    document.querySelectorAll('.moves').innerHTML = moveCounter;
    if(moveCounter === 1) {
        startTimer();
    }
}

// This is an Immediately-Invoked Function Expression (IIFE) that creates the game timer
// and turns the cards face-down to begin the game.
// Works Correctly
(function(){
    createTimer();
    flipCards();
})();

// Works Correctly
// global listen event on the reset button; when clicked, the entire game is reset
var reset = document.querySelector('.fa-repeat');
reset.addEventListener('click', function() {
    resetBoard();
});

// Works Correctly
// Resets the board for the game; called when page first loads and at the end of a game
function resetBoard() {

    openCardsList = []
    addToDeck();
    resetMoves();
    resetTimer();
    resetStars();
    // console.clear();
}

// Works Correctly
// Resets the number of moves to zero and displays on the webpage
function resetMoves() {
    moveCounter = 0;
    document.querySelector('.moves').innerHTML = moveCounter;
}

// Works Correctly
// Resets the game timer
function resetTimer() {
    clearInterval(interval);
    document.querySelector('#seconds').innerHTML = 0;
    // document.querySelector('#secondTens').innerHTML = 0;
    document.querySelector('#minute').innerHTML = 0;
}

// Works Correctly
// Resets the stars to gold to start the game
function resetStars() {
    stars.children().css('color','gold');
    fails = 0;
    numStarsTurnedOff = 0;
    flag = 3;
    numStarsRemaining = 3;
}

// Creates the timer
// TODO: Fix and clean up; works correctly, but add another digit for tens' second place if possible 
function createTimer() {

    let timer = document.getElementById('timer');

    let minuteSpan = document.createElement('span');
    minuteSpan.setAttribute('id','minute');
    minuteSpan.innerText = 0;
    timer.appendChild(minuteSpan);

    let colonSpan = document.createElement('span');
    colonSpan.innerText = ' : ';
    timer.appendChild(colonSpan);

    // let secondTensSpan = document.createElement('span');
    // secondTensSpan.setAttribute("id", "secondTens");
    // secondTensSpan.innerText = 0;
    // timer.appendChild(secondTensSpan);

    let secondSpan = document.createElement('span');
    secondSpan.setAttribute("id", "seconds");
    // let sspan = secondSpan.innerText.toString().padStart(2, '0');
    // secondSpan.innerHTML = `{sspan}`;
    secondSpan.innerText = 0;
    timer.appendChild(secondSpan);

    // let sec = 0
    // sec = sec.toString().padStart(2, '0');
    // sec = document.getElementById('seconds').innerHTML = `${sec}`;


}

// TODO: REMOVE
// function timer2() {
//     var sec = 0;
//     function pad ( val ) { return val > 9 ? val : "0" + val; }
//     setInterval( function(){
//         $("#seconds").html(pad(++sec%60));
//         $("#minute").html(pad(parseInt(sec/60,10)));
//     }, 1000)
// }

// Starts the timer
// TODO: Fix and clean up - want to add Pause button if possible 
function startTimer() {
    
    sec = document.getElementById('seconds');
    // secTens = document.getElementById('secondTens');
    min = document.getElementById('minute');
    
    let pauseButton = $('#pause');
    // pauseButton.innerText = 'Pause';
    let isPaused = false;

    interval = setInterval( function() {

        if(!isPaused) {
            // pauseButton.innerHTML = 'Pause';
            // sec.innerHTML = pad2(sec.innerHTML);
            sec.innerHTML++;
            if(sec.innerHTML%60 === 0) {
                sec.innerHTML = 0;
                min.innerHTML++;
                // secTens.innerHTML++;
            }
            // if(secTens.innerHTML%60 === 0){
            // if(sec.innerHTML%60 === 0){
                // sec.innerHTML = 0;
                // secTens.innerHTML = 0;
                // min.innerHTML++;s
            // }
            // if(secTens === 6) {
            //     sec.innerHTML = 0;
            //     secTens.innerHTML = 0;
            //     min.innerHTML++;
            // }
            // if(sec.innerHTML%6 === 0 && secTens.innerHTML === 0) {
            //     secTens.innerHTML = 0;
            //     min.innerHTML++;
            // }

            // pauseButton.on('click', function(e) {
            //     console.log('trying to pause the game...');
            //     e.preventDefault();
            //     isPaused = true;
            //     pauseButton.val('Continue');
            //     // pauseButton.innerText = 'Continue';
            // });

            // $('#pause').on('click', function(e) {
            //     console.log('trying to pause game...')
            //     e.preventDefault();
            //     isPaused = true;
            //     $('#pause').val('Continue');
            //     pauseButton.innerHTML = 'Continue';
            // });

            // $('#continue').on('click', function(e) {
            //     // console.log('trying to pause game...')
            //     e.preventDefault();
            //     isPaused = false;
            //     // $('#pause').val('Pause');
            //     // pauseButton.html('Continue');
            //     pauseButton.innerHTML = 'Pause';
            // });

        }

    }, 1000);

    pauseButton.on('click', function(e) {
        console.log('trying to pause the game...');
        e.preventDefault();
        isPaused = true;
        pauseButton.val('Continue');
        // pauseButton.innerText = 'Continue';
    });

    // $('#pause').on('click', function(e) {
    //     e.preventDefault();
    //     isPaused = true;
    //     $('#pause').val('Continue');
    //     pauseButton.innerText = 'Continue';
    // });

    // $('#continue').on('click', function(e) {
    //     e.preventDefault();
    //     isPaused = false;
    //     // pauseButton.html('Pause');
    // });
}
// TODO: REMOVE
function pauseClock() {
    if(!isPaused) {
        isPaused = true;
        clearInterval(interval);
    }
}
// TODO: REMOVE
function resumeClock() {
    if(isPaused){
        isPaused = false;
    }
    // how to start clock again here?
    startTimer();
}

// TODO: REMOVE
// function pad2(seconds) {
//     if(seconds.toString().length == 1){
//         seconds = "0" + seconds;
//     }
    
    // return seconds < 10 ? seconds.before("0") : "" + seconds;
// }

// Working correctly
// Removes a star by turning it from gold to black every four misses
function removeStar() {
    stars.children().eq(flag-1).css('color', 'black');
    numStarsTurnedOff++;
    numStarsRemaining--;
    // console.log('Number of stars turned off ' + numStarsTurnedOff);
    // console.log('Number of stars remaining: ' + numStarsRemaining);

}

// Calls methods to build and display the message at the end of the game
function showGameOverMessage(duration, numStarsRemaining) {
    buildModal(duration, numStarsRemaining);
    displayModal();
}

// Creates the modal for display
function buildModal(duration, numStarsRemaining) {

    let modal = document.getElementById('gameOverModal');

    // button
    modalBtn = document.createElement('button');
    modalBtn.setAttribute('class', 'closeBtn');

    modalBtn.innerHTML = '&times;';
    modalBtn.style.cssText = 'float: right; font-size: 15px; background-color: coral; color: lightblue; margin: 5px 5px 0 0; cursor: pointer';

    // modal_body
    let modal_body = document.createElement('div');

    // modal message
    let message = document.createElement('p');
    message.setAttribute("id", "modal-message");

    // Get minutes and seconds - this is ticky because it is constantly changing!!!
    sec = document.getElementById('seconds');
    min = document.getElementById('minute');

    if(document.getElementsByClassName('match').length === 16) {

        numStarsRemaining != 1 ? starText = 'stars' : starText = 'star';        
        message.innerHTML = `Congratulations!! <br><br> You completed the game in ${moveCounter} moves and in only ${duration} time!<br><br>
        You also finished the game with ${numStarsRemaining} ${starText} remaining!`;
    }
    else {
        // TODO: Fix this logic; game is not picking up on the time
        // You are setting the value; what you need to do is GET the value from the DOM!!!
        // Should you use innerText or innerHTML? Or something else?

        // if((min.innerText === 1 && sec.innerText === 30)) {
        if(min.innerText === 1) {
            message.innerHTML = `You lose!<br><br> At ${duration} you took too long!`;

        }
        else if(numStarsTurnedOff === 3) {
            message.innerHTML = `You lose!<br><br> You had a few too many missed opportunities, so you have no stars remaining`;
        }
    }

    message.style.cssText = 'margin: 20% auto; padding: 5%; text-align: center; font-size: 40px';

    modal.appendChild(modalBtn);
    modal_body.appendChild(message);
    modal.appendChild(modal_body);

}

// Displays the end of game message modal and resets the board after three seconds
function displayModal() {

    modal.style.display = 'block';

    modalBtn.addEventListener('click', function() {
        modal.querySelectorAll('*').forEach(n => n.remove());
        modal.style.display = 'none';
    });

    setTimeout( function() {
        resetBoard();
    }, 3000);

}