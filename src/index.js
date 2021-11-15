import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'css/styles.css';
import Game from './game.js';

const game = new Game();
let request = new XMLHttpRequest();
const url = "https://opentdb.com/api.php?amount=10";
let response;
request.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    response = JSON.parse(this.responseText);
    getElements(response)
  }
};

request.open("GET", url, true);
request.send();

function getElements(response){
  console.log(response.results);
  game.generateCards(response.results);
  $('#question').html(game.cards[0].question);
  let htmlForAnswers = "";
  game.cards[0].answers.forEach(element => {
    htmlForAnswers += `<li>${element}</li>`;
  });
  $('#answers-list').html(htmlForAnswers);
}

$('#card').on('click',  () => {
  $('#question').html(card1.correct);
  $('#answers-list').empty();
});