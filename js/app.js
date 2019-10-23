/*
 * Play area...
 */

// Create a list that holds all of your cards
// let cardList = document.getElementsByClassName("card");

// get all class name values from a given card
// let values = cardList[2].classList.value

// separate string text values and push the list of className values (separate list for each card) onto array 
// let classValueArray = []
// if(values.length > 1){
//      classValueArray.push(values.split(' '));
// }

// cardList.length == 16
// cardList[3].getAttribute("class");

// cardList.forEach( function(card) {
//     console.log(card.classList)
// }

// utility function - may not be necessary since we only click on one card at a time;
// still, some of the methods/approaches in here may be helpful. Writing this got me
// going when coding this project
function getCardClasses () {
    let cardList = document.getElementsByClassName("card");
    let cardNum = 0;
    let cardClasses = [];
    var i = 1; 
    for (let card of cardList) {

        // get the list of classes assigned to each card
        let values = card.classList.value;
        if(values.length > 1){
            cardClasses.push(values.split(' '));
        }
        else {
            cardClasses.push(values);
        }
        console.log("Card " + cardList[i] + "has these classes: " +  values);
        i++;
    }
}

// function getMatchClasses () {
//     var matches = [];
//     i= 1; 
//     for(let match of matchList){
//         matches.push(match.classList.values);
//         console.log("Iteration " + i);
//         i++;
//     } 

//     return matches;
// }

// // For card12 this equals "card open show"; need to put these into a list 
// var values = cardList[12].classList.value
// var valClassList = values.split(' ');
// if(valClassList[0] == "card") {
//     console.log("Card is the first class listed in " + valClassList[0] + " 12");
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

// This function removes the li elements from the deck and, by calling other methods,
// recreates the same cards by recreating their html and then attaching them to their
// ul parent, but does so in a different order by sending the array of html cards to
// the shuffle array above.  
function randomizeBoard() {

    // remove the cards from the deck
    removeCards();

    // rebuild html for the cards
    cardArray = []
    cardArray.push(createCards());

    // shuffle the deck!
    let shuffledDeck = shuffle(cardArray);

    // TODO: attach items to the DOM

}

function createCards() {
    
    let listItemsArray = []
    let htmlItems = []
    let elemLI;
    let img;
    // TODO: Incomplete Code
    for(let i=0; i <= 16; i++) {
        elemLI = document.createElement('li');
        elemLI.appendChild('i');
        
    }
    
    listItemsArray.push(elemLI);

    htmlItems.push();
}


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

 // gather all cards
//  var cards = document.querySelectorAll('.card')
 var cards = Array.from(document.querySelectorAll('.card'));
 
 // global variable
 let openCardsList = []
 let iconsList = []
 let moveCounter = 0;

 // Function to flip a card when it is clicked (unless it is a matching pair)
 function flipCard() {

    cards.forEach( function(card) {
        
        // if card is face-down, flip it right side up
        if(!card.classList.contains('open') &&
           !card.classList.contains('show') &&
           !card.classList.contains('match')) {
        // if(!card.classList.value.includes('open')) {
            card.addEventListener('click', function() {
                // card.classList.add('open');
                showCard(card);
                // card.classList.toggle('show');
            });
            // add card to open cards list
            addCardToOpenCardsList(card);
            // check card's child element for icon; if there exists another card in the openCardsList with that icon,
            // lock both cards in the open position and indicate a match by changing their background color 
            // (and through some movement if desired).  NOTE: there should only be one card in the openCardsList at a time,
            // so long as there is not a match.  As soon as two cards are in the list, empty the list.
            // How to determine if the game has ended? If all cards have the same background color of the winning color. Or,
            // keep track of the number of cards with the class of 'match'.  It is easy to get a count of them:
            // document.getElementsByClass('match').length...when this value equals the number of squares, the game is over!
            // Check each time a match is made!  
        }

        // if card is right side up, flip it back over again
        else {
            card.addEventListener('click', function() {
                hideCard(card);
            });
        }

        // get <i> element classes
        var icons = card.querySelectorAll('i');
        icons.forEach( function(icon) {
            iconsList.add(icon.classList)

        });
    });

    moveCounter();
    //moveCounter++;
 }

function showCard(card) {
    card.classList.add('open');
    card.classList.add('show');
}

function hideCard(card) {
    card.classList.remove('open');
    card.classList.remove('show');
}

function addCardToOpenCardsList(card) {
    if(openCardsList.length == 0) {
        openCardsList.push(card);
    }
    else if(openCardsList.length == 1) {
        if(checkIcons(openCardsList) == true) {
            clearOpenCardsList();
        }
    }

    if(openCardsList.length == 2){
        if(checkIcons(openCardsList) == true) {
            clearOpenCardsList();
        }
    }
}

// Check to see if the symbols of the two cards match

// var childElemClasses = card.firstElementChild.classList.value
// var icon = childElemClasses[1]

function checkIcons (openCardsList) {

    // check to see if icons of <i></i> elements match for each card
    // right now, this won't work - there's no firstElementChild to the classList at all, and if there was, it has nothing to do with the icons
    if(openCardsList[0].classList.firstElementChild.classList[1] ===
       openCardsList[1].classList.firstElementChild.classList[1]) {
        // setAttribute: if they are both a match, then set class attribute to ".match" 
        // Also, set background to color to #02ccba on both cards
        for(card of openCardsList) {
            // set match class attribute
            card.setAttribute('class', 'match');
            // card.className.split(' ')[2] should get the class name of  
            card.style.backgroundColor = '#02ccba';
        }
        // secure cards from flipping back over (lock cards in place)
        lockCards(openCardsList);

        // check if all cards have been matched
        if(document.getElementsByClass('match').length == 12) {
            showGameOverMessage();
        }
        return true;
    }
    // if cards do not match, hide cards' symbols and remove cards from list
    else {
        for(card of openCardsList) {
            hideSymbol(card);
            openCardsList.pop();
        }
    }

    return false;
}

// lock cards in place when they are a match so they can't be flipped back over
function lockCards(openCardsList) {
    for(card of openCardsList){
        // Must install jquery for this to work!!!
        $(this).prop('disabled', 'true');
    }
}

// clear list whenever there are two cards in it
// (it doesn't matter if they match or not; in either case, the list must be reset) 
function clearOpenCardsList(){
    //openCardsList=[];
    //openCardsList.length = 0;
    openCardsList.forEach( function() {
        openCardsList.pop();
    });
    openCardsList.length = 0;
}

// remove cards from the board
function removeCards() {
    var elem = document.querySelectorAll('ul')[1];
    numChildren = elem.childElementCount; 
    while(numChildren > 0){
        elem.removeChild();
        numChildren--;
        // removeChildren();
    }
}

// show winning message in the middle of the board (where the cards used to be)
function showGameOverMessage() {
    
    // remove the cards from the board
    removeChildren();
    
    // remove the board (careful...you may not want to do this!)
    document.querySelector('ul').remove();
    // show new message that you have won
    
}

function moveCounter() {
    moveCounter++;
    document.querySelector('.moves').innerHTML = moveCounter;
}

function resetMoves() {
    moveCounter = 0;
    document.querySelector('.moves').innerHTML = moveCounter;
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


// var lastchild = elem.lastChild;

//  if childElemClasses[1]
//  cardList[0].classList.value.currentIndex

// flip card with toggle
//  function flipCard() {
//      var elem = document.getElementsByClassName("card")