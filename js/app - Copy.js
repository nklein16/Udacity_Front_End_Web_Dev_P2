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
let modal = document.getElementById('modal');

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
    // cardList = shuffle(cardList);
    for(const card of cardList) {
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

            if(card.classList.contains('open') || card.classList.contains('match')){
                console.log("already open");
            }

            else {

                if(openCardsList.length < 2){
                    showCard(card);
                    addCardToOpenCardsList(card);
                    // console.log("card " + openCardsList.length + " added")
                    
                    // If second card was just added, check for match
                    if(openCardsList.length === 2){
                        
                        trackMoveCounter();
                        moves.innerText = moveCounter;
                        console.log("Moves: " + moveCounter);

                        if( isMatch() ) {    
                            console.log("It's a match!");
                            for(card of openCardsList) {
                                console.log("flip card over...");
                                // debugger
                                console.log('add match class to card');
                                card.classList.add('match');
                                // debugger
                                console.log("remove 'open' and 'show' classes from card");
                                hideCard(card);
                                // debugger
                            }
                            // debugger
                            openCardsList = [];

                            // check if all cards have been matched
                            if(document.getElementsByClassName('match').length == 16) {
                                debugger
                                setTimeout( function() {
                                    debugger
                                    openCardsList.forEach( function(card) {
                                        hideCard(card);
                                    })
                                    openCardsList = [];
                                    
                                }, 1000);

                                debugger
                                // let sec = document.getElementById('seconds');
                                // let secTens = document.getElementById('secondTens');
                                // let min = document.getElementById('minute');
                                // let duration = min.innerHTML + ':' + secTens.innerHTML + sec.innerHTML;
                                duration = min.innerHTML + ':' + sec.innerHTML;
                                // duration = $("#minute").innerHTML + $("seconds").innerHTML; 
                                console.log(duration);
                                clearInterval(interval);
                                console.log("Game Over...You Won!");
                                alert('Congratulations, you won!');
                                alert(`You completed the game in ${moveCounter} moves and in only ${duration} time!`);
                                alert(`You completed the game in ${moves.innerText} moves and in only ${duration} time!`);
                                alert('You also finished the game with ' + numStarsRemaining + ' stars remaining!')
                                // TODO: Fix showGameOverMessage method
                                // setInterval( function() {
                                //     showGameOverMessage(duration, numStarsRemaining)
                                // }, 1500)
                                // showGameOverMessage(duration, numStarsRemaining);
                            }
                        }
                        // If openCardsList != 2
                        else {

                            console.log("The cards do not match");

                            // TODO: The code that removes the stars and shows the modal do not work correctly
                            fails++;
                            console.log('Number of fails: ' + fails);
                            if(fails%4 == 0) {
                                if(flag > 0) {
                                    console.log("Flags: " + flag);
                                    console.log("Remove a star");
                                    removeStar();
                                    flag--;
                                }
                                // removeStar();
                            }

                            // no more stars or too much time, so you lose
                            // let last_star_style = getComputedStyle(stars.children()[0])
                            // if(last_star_style.color === 'rgb(0, 0, 0)' || min.innerText >= 2) {
                            if(flag == 0 || min.innerText >= 2) {
                                // removeStar();
                                duration = min.innerHTML + ':' + sec.innerHTML;
                                // duration = $("#minute").innerHTML + $("seconds").innerHTML; 
                                console.log(duration);
                                clearInterval(interval);
                                stars.children().eq(flag-1).css('color', 'black');
                                // TODO: fix both modals
                                
                                // setInterval( function(){
                                //     removeStar();
                                //     displayLosingModal();
                                // }, 1000);
                                displayLosingModal();
                            }

                            //  This works, but I don't really understand its structure
                            setTimeout( function() {
                                openCardsList.forEach( function(card) {
                                    hideCard(card);
                                })
                                openCardsList = [];
                                
                            }, 1000);
                        }
                    }
                }
            }
        });
    });    
}

// Works Correctly
function showCard(card) {
    card.classList.add('open');
    card.classList.add('show');
}

// Works Correctly
function hideCard(card) {
    card.classList.remove('open');
    card.classList.remove('show');
}

// Works Correctly
function addCardToOpenCardsList(card) {
    openCardsList.push(card);
}

// Check if the cards match
// Works Correctly
function isMatch() {

    if( openCardsList[0].getElementsByTagName('i')[0].classList[1] ===
            openCardsList[1].getElementsByTagName('i')[0].classList[1]) {
    
        return true;
    }
    return false;
}

// Works Correctly
function trackMoveCounter() {
    moveCounter++;
    document.querySelectorAll('.moves').innerHTML = moveCounter;
    if(moveCounter == 1) {
        startTimer();
        // timer2();
    }
}

// This is an Immediately-Invoked Function Expression (IIFE)
// Works Correctly
(function(){
    createTimer();
    flipCards();
})();

// Works Correctly
var reset = document.querySelector('.fa-repeat');
reset.addEventListener('click', function() {
    // console.log("you made it here");
    resetBoard();
    resetMoves();
    resetTimer();
    resetStars();
});

// Works Correctly
function resetBoard() {
    openCardsList = []
    deckElement.innerHTML = '';
    modal.innerHTML = '';
    deckElement.style.background = "linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)";
    addToDeck();
}

// Works Correctly
function resetMoves() {
    moveCounter = 0;
    document.querySelector('.moves').innerHTML = moveCounter;
}

// Works Correctly
function resetTimer() {
    clearInterval(interval);
    document.querySelector('#seconds').innerHTML = 0;
    // document.querySelector('#secondTens').innerHTML = 0;
    document.querySelector('#minute').innerHTML = 0;
}

// Works Correctly
function resetStars() {
    stars.children().css('color','gold');
    fails = 0;
    numStarsTurnedOff = 0;
    flag = 3;
    numStarsRemaining = 3;
}

// Creates the timer
function createTimer() {

    let timer = document.getElementById('timer');

    let minuteSpan = document.createElement('span');
    minuteSpan.setAttribute("id","minute");
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

// function timer2() {
//     var sec = 0;
//     function pad ( val ) { return val > 9 ? val : "0" + val; }
//     setInterval( function(){
//         $("#seconds").html(pad(++sec%60));
//         $("#minute").html(pad(parseInt(sec/60,10)));
//     }, 1000)
// }

// Starts the timer
// TODO: Fix - not working correctly
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

function pauseClock() {
    if(!isPaused) {
        isPaused = true;
        clearInterval(interval);
    }
}

function resumeClock() {
    if(isPaused){
        isPaused = false;
    }
    // how to start clock again here?
    startTimer();
}
// function pad2(seconds) {
//     if(seconds.toString().length == 1){
//         seconds = "0" + seconds;
//     }
    
    // return seconds < 10 ? seconds.before("0") : "" + seconds;
// }


// Working correctly
function removeStar() {
    stars.children().eq(flag-1).css('color', 'black');
    numStarsTurnedOff++;
    numStarsRemaining--;
    console.log("Number of stars turned off " + numStarsTurnedOff);
    console.log("Number of stars remaining: " + numStarsRemaining);

}

// TODO: Fix - not working correctly
function showGameOverMessage(duration, numStarsRemaining) {

    console.log("You made it to the showGameOverMessage function");
    setTimeout( function() {
        // remove the cards from the board
        clearBoard();
        // show new message that you have won or lost
    }, 600); 

    displayModal(duration, numStarsRemaining);
}

// TODO: Fix - not working correctly
function clearBoard() {
    // turn cards over by removing class match from each card
    // for(card of openCardsList) {
    //     card.classList.remove('match');
    // }
    $('.deck').children().remove();
    deckElement.style.background = 'black';
    
    // modal.removeChild();     
}

// TODO: Fix - not working correctly
function displayModal(duration, numStarsRemaining) {

    // let message = document.createElement('div');
    // message.setAttribute("id", "modalMessage");
    // message.style.color = 'white';

    deckElement.style.color = 'white';

    // var star_style_list = []    
    // for(i = 0; i < stars.children().length; i++) {
    //     if(stars[0].children[i].style.color === 'gold') {
    //         star_style_list.push(i)
    //     }
    // }
        
    // var star_style = stars.children().style.color
    alert('Congratulations, you won!');
    alert(`You completed the game in ${moveCounter} moves and in only ${duration} time!`);
    alert('You also finished the game with ' + numStarsRemaining + ' stars remaining!')

    // if(numStarsRemaining > 1) {
    //     alert('You also finished the game with ' + numStarsRemaining + ' stars remaining!')
    // }

    // else {
    //     alert('You also finished the game with ' + numStarsRemaining + ' star remaining!')
    // }

    // if(star_style_list.length > 0) {
    //     alert('You also finished the game with ' + star_style_list.length + 'number of stars remaining!')
    // }

    // If you win - this won't work, because you already cleared the match classes on the cards list!
    // if(document.getElementsByClassName('match').length == 16){
        // message.innerHTML = 
        // `<div>
        // <h1 style={"text-align": "center", "vertical-align": "middle"}>
        // 'Congratulations, You Won!!'</h1>
        // <br>
        // <h3 style={"text-align": "center", "vertical-align": "middle"}>
        // You completed the game in ${moveCounter} moves</h3>
        // <br>
        // <h3 style={"text-align": "center", "vertical-align": "middle"}>
        // You finished the game in ${duration} time!</h3></div>`;
    // }
    
    // If you lose
    // if(secondTensSpan.innerText > 3) {
    //     message.innerHTML = `<div><h1 style={"text-align": "center", "vertical-align": "middle"}>
    //     'You lose! You took too long'<h1></div>`;
    // }

    // if(numStarsTurnedOff == 3) {
    //     message.innerHTML = `<div><h1 style={"text-align": "center", "vertical-align": "middle"}>
    //     'You lose! You had a few too many missed opportunities, so you have no stars left to play with'</h1></div>`;
    // }

    // modal.appendChild(message);

    // for(card of openCardsList) {
    //     card.classList.remove('match');
    // }

    // grab section
    // var section = $('.section');
    // section.after(document.createElement('div.winner'));
    // var board = $('ul')[1];
    // var modal =

        // $('ul')[1].replaceWith("<div><h1>'Congratulations, You Won!!'</h1>
    // <p>You completed the game in ${moveCounter} moves</p></div>");

}

function displayLosingModal() {
    
    setTimeout( function() {
        clearBoard();
    }, 600); 
    
    // show losing message

    if(min >= 2) {
        alert("You lose! At " + duration + ", you took too long");
        // message.innerHTML = `<div><h1 style={"text-align": "center", "vertical-align": "middle"}>
        // 'You lose! You took too long'<h1></div>`
    }

    if(numStarsTurnedOff == 3) {
        alert("You lose! You had a few too many missed opportunities, so you have no stars remaining");
        // message.innerHTML = `<div><h1 style={"text-align": "center", "vertical-align": "middle"}>
        // 'You lose! You had a few too many missed opportunities, so you have no stars left to play with'</h1></div>`
    }

    // modal.appendChild(message);
}