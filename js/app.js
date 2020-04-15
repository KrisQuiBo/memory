// shuffle cards
// load the board with cards
// assign all cards 'not-clicked' value
//click card reveals icon - clicked = true
// click card #2 to reveal icon
//check for match. Does card#1 icon === card#2 icon?
// yes => cards stay revealed
// no => cards flip back
// check for completion. Are all cards revealed? 
// yes => 'you won' animation
// no => keep going until yes


// (function shuffleCards() {
//     let cards = document.querySelectorAll('card');
//     cards.forEach(card => {
//         let flexNum = Math.floor(Math.random() * card.length);
//         card.style.order = flexNum;

//     });
// })();

let $cards = $('.card');
let card = [...$cards];
let cardIndex = Math.floor(Math.random() * card.length);
const shuffleDeck = (arr) => {
    
}

// generate random phrase & split into letters - option #2
const getRandomPhraseAsArray = (arr) => {
    let phraseIndex = Math.floor(Math.random() * phrases.length);
    let randomPhrase = arr[phraseIndex].toLowerCase();
    let phraseLetters = randomPhrase.split("");
    // let phraseLetters = Array.from(randomPhrase);
    return phraseLetters;
  }


$(document).ready(function(){
    
   $('.frown').hide();
   $('.eight').on('click', function(){
       $('.front').toggle();
       $('.frown').toggle();
       console.log('frown click');
   });


    // $('.one').on('click', function() {
    //     $('.two').toggle();
    //     console.log('clicked');
    // });
    
    // $('#card').on('click', function() {
    //     $('#card').each(function(i) {
    //         $('#card').toggle();
    //     });
    // });

    $('#btn').on('click', function(){
        let flexNum = Math.floor(Math.random() * 16);
        $('.card').each(function(i){
            $('.card').css({order: flexNum});
        });
        
        $('.eight').addClass('turnIt');
    });

});