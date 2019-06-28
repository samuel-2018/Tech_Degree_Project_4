/* eslint-disable class-methods-use-this */
/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;

    // Set to false to lockout keyboard presses until 'start' is clicked.
    this.gameReady = false;

    /**
     * 'Universal Sound FX' licensed from Imphenzia.
     * https://www.imphenzia.com/terms-and-conditions
     */
    // Sound effects
    this.soundClickRight = new Audio('sounds/8BIT_RETRO_Coin_Collect_mono.wav');
    this.soundClickWrong = new Audio('sounds/DROP_Designed_mono.wav');
    this.soundWin = new Audio('sounds/VOICE_Girl_4yo_You_Are_The_Winner_01.wav');
    this.soundLose = new Audio('sounds/VOICE_Girl_4yo_Too_Bad_01.wav');
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  // eslint-disable-next-line class-methods-use-this
  createPhrases() {
    const phrasesData = [
      'The apple of my eye',
      'Busy as a bee',
      'Saved by the bell',
      'Back to Square One',
      'Cut To The Chase',
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
    this.gameReady = true;
    const overlayDiv = document.querySelector('#overlay');
    // Hides the overlay, showing the game screen.
    overlayDiv.style.display = 'none';

    /**
     * The following two statements can't be chained together.
     * No value would be returned to set the value of 'this.activePhrase'.
     */
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
    if (document.querySelectorAll('.letter.hide').length) {
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
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    if (this.gameReady) {
      try {
        const letter = button.innerText;
        if (this.activePhrase.checkLetter(letter)) {
          this.soundClickRight.play();
          button.classList.remove('key');
          button.classList.add('chosen');
          this.activePhrase.showMatchedLetter(letter);
          if (this.checkForWin()) {
            this.gameOver(true);
          }
        } else {
          this.soundClickWrong.play();
          button.classList.remove('key');
          button.classList.add('wrong');
          this.removeLife();
        }
      } catch (err) {
        console.log('TypeError: ', err instanceof TypeError);
      }
    }
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    const outerThis = this;

    // Locks out keypresses when overlay is shown.
    this.gameReady = false;

    setTimeout(showOverlay, 1000);

    function showOverlay() {
      // Clears animation from title (so animation only shows first time)
      document.querySelector('.title').classList.remove('rubberBand');

      // Shows the overlay.
      const overlayDiv = document.querySelector('#overlay');
      overlayDiv.style.display = '';

      if (gameWon) {
        outerThis.soundWin.play();
        document.querySelector('h1').className = 'animated tada';
        document.querySelector('h1').innerText = "You're the winner!";
        document.querySelector('#overlay').className = 'win';
      } else {
        outerThis.soundLose.play();
        document.querySelector('h1').className = 'animated flash';
        document.querySelector('h1').innerText = 'Too bad!';
        document.querySelector('#overlay').className = 'lose';
      }
      // Clears old phrase from game.
      document.querySelector('#phrase > ul').innerHTML = '';

      // Creates an array of key elements. ('querySelectorAll' returns a NodList, which has to be converted to an array.)
      const keyElements = Array.from(document.querySelectorAll('#qwerty button'));

      // Clears classes from buttons and replaces them with 'key'.
      keyElements.forEach(key => (key.className = 'key'));

      // RESETS HEARTS
      // Gets array of all heart elements.
      const heartElements = Array.from(document.querySelectorAll('.tries img'));
      // Sets all hearts as live.
      heartElements.forEach(heart => (heart.src = 'images/liveHeart.png'));
    }
  }
}
