export default function Game() {
  this.cards = {};
  this.cardIndex = 0;
  this.counter = 0;
}

Game.prototype.addCard = function(card) {
  card.index = this.cardIndex;
  this.cards[card.index] = card;
  this.cardIndex++;
};

Game.prototype.generateCards = function(array) {
  for (let i = 0; i < array.length; i++) {
    let answers = array[i].incorrect_answers;
    answers.push(array[i].correct_answer);
    answers.sort();
    const card = new Card(array[i].question, array[i].correct_answer, answers);
    this.addCard(card);
  }
};

function Card(question, correct, answers) {
  this.question = question;
  this.correct = correct;
  this.answers = answers;
}