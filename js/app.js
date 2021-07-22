// shuffle cards
// click card reveals icon -> 
//   cardOne is clicked = true
// click card #2 to reveal icon ->
//   cardTwo is clicked = true
// disable other clicks
// check for match. Does card#1 icon === card#2 icon?
// yes => cards stay revealed -> 
// add match class 
// no => cards flip back
// check for win. Are all cards matched? 
// no => keep going until yes
// yes => 'you won' animation/modal
// restart game button

let $cards = $('.card'),
    cards = document.querySelectorAll('.card'),
    cardsArray = [...cards],
    $icon = $('icon'),
    clicks = 0,
    pairs = 0,
    isClicked = false,
    clickedOn = [],
    matchArray = [],
    firstCard,
    secondCard,
    cardFlipped = false,
    disableDeck = false,
    counter = document.getElementById('counter');


$(document).ready(function(){

    $('.card').addClass('flipped');
    
    // define shuffle -- from James Padolsey
    (function($){
        $.fn.shuffle = function() {
            var allElems = this.get(),
                getRandom = function(max) {
                    return Math.floor(Math.random() * max);
                },
                shuffled = $.map(allElems, function(){
                    var random = getRandom(allElems.length),
                        randEl = $(allElems[random]).clone(true)[0];
                    allElems.splice(random, 1);
                    return randEl;
               });
            this.each(function(i){
                $(this).replaceWith($(shuffled[i]));
            });
            return $(shuffled);
        };
    })(jQuery);

    // Shuffle the cards
    $cards.shuffle();

    
    // flip card and flip it back
    function flipCard() {
        if(disableDeck) return;
        if(this===firstCard) return;
        this.classList.remove('flipped');
    
        if (!cardFlipped) {
          cardFlipped = true;
          firstCard = this;
          clickedOn.push(this);
          
          return;
        }
    
        secondCard = this;
        cardFlipped = false;
        disableCard();
        // clickedOn.push(this);
        
        checkForMatch();
        
        }

        function checkForMatch() {
            let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
            isMatch ? matched() : unmatched();
            checkForWin();
        // }
        }
    
    $('.card').on('click', flipCard);


    const matched = () => {
       firstCard.classList.add('match');
       secondCard.classList.add('match');
       matchArray.push(firstCard);
       matchArray.push(secondCard);
       pairs++;
       disableCard();
       counterAdd() 
       return;
    }


    const unmatched = () => {
        disableDeck = true;
        firstCard.classList.add('unmatched');
        secondCard.classList.add('unmatched');
        $('.card').each(function() {
            $('card').off('click');
        });
         setTimeout(function() {
            firstCard.classList.remove('unmatched');
            secondCard.classList.remove('unmatched');
            firstCard.classList.toggle('flipped');
            secondCard.classList.toggle('flipped');
            disableDeck = false;
        }, 800);
        
    }

    
    const disableCard = () => {
        // firstCard.removeEventListener('click', flipCard);
        // secondCard.removeEventListener('click', flipCard);
        $('.match').off('click');
        return
    }

    const checkForWin = () => {
        if(matchArray.length==16) {
            $('div.overlay').removeClass('hidden');
        }
    }
    $('.close').on('click', function() {
        $('div.overlay').addClass('hidden');
    });
    
    const restart = () => {

        $('.card').shuffle();
        $('.card').addClass('flipped');
        $('.card').removeClass('match');
        // // counter.style.visibility = "hidden";
        // // $('div.overlay').addClass('hidden');
        // // [firstCard, secondCard] = [null, null];
        // // enableCards();
       
        pairs = 0;
        matchArray = [];
        clearCounter();
        // cardFlipped = false;
        disableDeck = false; 
        // isMatch = false;
        $('.card').on('click', flipCard);
        return
    }

    $('.btn').on('click', restart);

    const counterAdd = () => {
        counter.innerHTML = `${pairs} <p> matches</p>`;
        counter.style.visibility = "visible";
    }

    const clearCounter = () => {
        let counter = document.getElementById('counter');
        counter.innerHTML = "";
        pairs = 0;
    }

    

});