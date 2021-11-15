import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Game from './game.js';

const game = new Game();
let request = new XMLHttpRequest();
const url = "https://opentdb.com/api.php?amount=10";
let response;
request.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    response = JSON.parse(this.responseText);
    getElements(response);
  }
};

request.open("GET", url, true);
request.send();

let counter=0;
function getElements(response){
  game.generateCards(response.results);
  $('#question').html(game.cards[counter].question);
  let htmlForAnswers = "";
  game.cards[counter].answers.forEach(element => {
    htmlForAnswers += `<li>${element}</li>`;
  });
  $('#answers-list').html(htmlForAnswers);
}

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