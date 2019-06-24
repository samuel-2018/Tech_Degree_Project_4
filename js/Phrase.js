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
}
