import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Game from './game.js';
import TriviaInterface from './triviaInterface';

const game = new Game();

let counter=0;
let promise = TriviaInterface.getTrivia();
  promise.then(function(response){
    const body = JSON.parse(response);
  game.generateCards(body.results);
  $('#question').html(game.cards[counter].question);
  let htmlForAnswers = "";
  game.cards[counter].answers.forEach(element => {
    htmlForAnswers += `<li>${element}</li>`;
  });
  $('#answers-list').html(htmlForAnswers);
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);
  });

$('#card').on('click',  () => {
  $('#question').html(game.cards[counter].correct);
  $('#answers-list').empty();
});
$("#next-card").on("click", () =>{
  counter++;
  if(counter >= 9){
    $('.hide').show();
  } else{
    let card = game.cards[counter];
    $('#question').html(card.question);
    let htmlForAnswers = "";
    card.answers.forEach(element => {
      htmlForAnswers += `<li>${element}</li>`;
    });
    $('#answers-list').html(htmlForAnswers);
  }
  
});