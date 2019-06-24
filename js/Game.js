/* eslint-disable class-methods-use-this */
/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  // eslint-disable-next-line class-methods-use-this
  createPhrases() {
    const phrasesData = [
      'Some are born great some achieve greatness and some have greatness thrust upon them',
      'Brevity is the soul of wit',
      'Just think happy thoughts and youll fly',
      'Romeo Romeo wherefore art thou Romeo',
      'Not all those who wander are lost',
    ];

    return phrasesData.map(phrase => new Phrase(phrase));
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randNumUpper = this.phrases.length - 1;
    const randNum = Math.floor(Math.random() * (randNumUpper + 1));
    return this.phrases[randNum];
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    const overlayDiv = document.querySelector('#overlay');
    // Hides the overlay, showing the game screen.
    overlayDiv.style.display = 'none';

    // Note: These two statements can't be chained together. No value would be returned to set the value of 'this.activePhrase'
    // Gets phrase.
    this.activePhrase = this.getRandomPhrase();
    // Displays to user.
    this.activePhrase.addPhraseToDisplay();
  }

  /**
  * Checks for winning move
  * @return {boolean} True if game has been won, false if game wasn't
  won
  */
  checkForWin() {
    if (document.querySelectorAll('.letter.hide')) {
      return false;
    }
    return true;
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    // Gets array of all heart elements.
    const heartElements = document.querySelectorAll('.tries img');
    // Changes a live heart to a lost heart.
    heartElements[this.missed].src = 'images/lostHeart.png';
    this.missed++;
    if (this.missed === 5) {
      this.gameOver(false);
    }
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    const overlayDiv = document.querySelector('#overlay');
    // Shows the overlay, showing the start screen.
    overlayDiv.style.display = '';
    if (gameWon) {
      document.querySelector('h1').innerText = 'You Win!';
      document.querySelector('#overlay').className = 'win';
    } else {
      document.querySelector('h1').innerText = 'You Lose!';
      document.querySelector('#overlay').className = 'lose';
    }
  }

  handleInteraction() {}
}
