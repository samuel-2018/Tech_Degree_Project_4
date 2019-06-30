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
   * (Display will break at words when possible.)
   */
  addPhraseToDisplay() {
    // Where the phrase will go.
    const targetElement = document.querySelector('#phrase > ul');

    // Starts the 'ul' for the first word.
    let html = '<ul>';
    [...this.phrase].forEach((char) => {
      if (char === ' ') {
        // Closes the 'ul' for the previous word.
        html += '</ul>';
        // Creates an 'li' for the space.
        html += '<li class="space"> </li>';
        // Opens the 'ul' for the next word.
        html += '<ul>';
      } else {
        // Creates each 'li'.
        html += `<li class="hide letter ${char}">${char}</li>`;
      }
    });
    // Closes the 'ul' for the last word.
    html += '</ul>';
    // Adds an extra 'li' to keep the display aligned evenly.
    html += '<li class="space"> </li>';
    targetElement.innerHTML = html;
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
    document.querySelectorAll(`.${letter}`).forEach((element) => {
      element.classList.remove('hide');
      element.classList.add('show', 'animated', 'flipInY');
    });
  }
}
