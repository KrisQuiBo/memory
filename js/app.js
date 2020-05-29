// shuffle cards
// click card reveals icon -> 
//   cardOne is clicked = true
// click card #2 to reveal icon ->
//   cardTwo is clicked = true
// diable other clicks
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
    
    // define shuffle
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
    $('.card').shuffle();

    // flip card and flip it back
    function flipCard() {
        // this.classList.toggle('flipped');
        if(disableDeck) return;

        if (this === firstCard) return;

        this.classList.toggle('flipped');
    
        if (!cardFlipped) {
          cardFlipped = true;
          firstCard = this;
          clickedOn.push(this);

          return;
        }
    
        secondCard = this;
        cardFlipped = false;
        clickedOn.push(this);
        
        checkForMatch();
        
        }

        // let self = this; 

        function checkForMatch() {
            let length = clickedOn.length;
            
        if(length == 2) {
    
            console.log(firstCard.dataset.icon);
            console.log(secondCard.dataset.icon);
            let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
            if(isMatch) {
                matched();
                disableCard();
            } else {
                unmatched();
            }
            // isMatch ? matched() : unmatched();
            checkForWin();
          }
    }


    const matched = () => {
       clickedOn[0].classList.add('match');
       clickedOn[1].classList.add('match');
       matchArray.push(clickedOn[0]);
       matchArray.push(clickedOn[1]);
       pairs++;
       counterAdd() 
       clickedOn = [];
       return;
    }

    const unmatched = () => {
        clickedOn[0].classList.add('unmatched');
        clickedOn[1].classList.add('unmatched');
        disableDeck = true;
        setTimeout(function() {
            clickedOn[0].classList.remove('unmatched');
        clickedOn[1].classList.remove('unmatched');
            clickedOn[0].classList.toggle('flipped');
            clickedOn[1].classList.toggle('flipped');
            clickedOn = [];
            disableDeck = false;
        }, 1000);
        
    }

    const enableCards = () => {
        $('.match').on('click');
    }
    const disableCard = () => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        // $('.match').off('click');
        return
    }

    const checkForWin = () => {
        if(matchArray.length==16) {
            $('div.overlay').removeClass('hidden');
        }
        $('.close').on('click', function() {
            $('div.overlay').addClass('hidden');
        });
    }
    
    const restart = () => {
        $('.card').shuffle();
        $('.card').addClass('flipped');
        $('.card').removeClass('match');
        counter.style.visibility = "hidden";
        [firstCard, secondCard] = [null, null];
        enableCards();
        pairs = 0;
        matchArray = [];
        // clickedOn = [];
        clearCounter();
        cardFlipped = false;
        disableDeck = false;
        isMatch = false;
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

    $('.card').on('click', flipCard);

});




//
    // shuffle prototype or function options
    //

        // Array.prototype.shuffle = function() {
        //     var i = this.length, j, temp;
        //     while(--i >0) {
        //         j = Math.floor(Math.random() * (i+1));
        //         temp = this[j];
        //         this[j] = this[i];
        //         this[i] = temp;
        //     }
        //     return this;
        // }



        //
        //
        // trying to assign firstcard and secondcard
        //
        //
                // clicks++;

                // if (!isClicked) {
                //     isClicked = true;
                //     firstCard = this;
                //     console.log(firstCard);
                //     return;
                //   }
                
                // if(clicks==2) {
                //     // isClicked = true;
                //     $('.card').off('click');
                //     // for(let i = 0; i < clicks.length; i++) {
                //     // setTimeout(function() {
                //     //     $(e.target).closest('.card').toggleClass('flipped');
                //     //     }, 1700);
                //     // }
                
                //       secondCard = this;
                //       isClicked = false;
                //     return clicks;  
                // }

                // function checkForMatch(card) {
        //     console.log(self);
        //      clickedOn.push(self);
        //      let length = clickedOn.length;
            
        //      if(length == 2) {
        //          if(clickedOn[0].dataset.icon === clickedOn[1].dataset.icon) {
        //              // if(firstCard.type === secondCard.type) {
        //              matched();
        //              disableCard();
        //          } else {
        //              unmatched();
        //          }
        //      }
        //      checkForWin();   
        //  }
        //  return checkForMatch(this);

            // const flip = (e) => {
    //     $(e.target).closest('.card').removeClass('flipped');
    // }

        
    //   checking for a match
    // function checkForMatch(card) {
    //    console.log(this);
    //     clickedOn.push(this);
    //     let length = clickedOn.length;
    //     // if(clickedOn[0]=clickedOn[1]) {
            
    //     // }
    //     if(length == 2) {
    
    //         if(clickedOn[0].dataset.icon === clickedOn[1].dataset.icon) {
    //             // if(firstCard.type === secondCard.type) {
    //             matched();
    //             disableCard();
               
    //         } else {
    //             unmatched();
    //         }
    //     }
    //     checkForWin();   
    // }
