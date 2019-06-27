/* eslint-disable class-methods-use-this */
/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    // Where the phrase will go.
    const targetElement = document.querySelector('#phrase');
    // Parent element for adding each 'li'
    const ul = document.createElement('ul');
    // Creates each 'li'
    [...this.phrase].forEach((char) => {
      const li = document.createElement('li');
      if (char === ' ') {
        li.className = 'space';
      } else {
        li.className = `hide letter ${char}`;
      }
      li.innerText = `${char}`;
      ul.appendChild(li);
    });
    // Removes existing 'ul' from the DOM
    targetElement.innerHTML = '';
    // Adds the new ul.
    targetElement.appendChild(ul);
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    if (this.phrase.includes(letter)) {
      return true;
    }
    return false;
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    // console.log('showMatchedLetter called: ', letter);

    document.querySelectorAll(`.${letter}`).forEach((element) => {
      element.classList.remove('hide');
      element.classList.add('show', 'animated', 'flipInY');
    });
  }
}
