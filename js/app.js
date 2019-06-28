/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

// Starts game upon click.
document.querySelector('#btn__reset').addEventListener('click', () => {
  game = new Game();
  game.startGame();
});

// Listens for onscreen keyboard clicks.
document.querySelector('#qwerty').addEventListener('click', (event) => {
  const button = event.target;

  /**
   * 'Enter' and 'space' both trigger clicks on any in-focus buttons.
   * Blur() removes the focus after click.
   */
  button.blur();
  if (button.className === 'key') {
    game.handleInteraction(button);
  }
});

// Listens for physical keyboard clicks.
document.addEventListener('keyup', (event) => {
  const letter = event.key;

  // Checks for LETTER key press.
  const isLetterKey = /^[a-zA-Z]$/.test(letter);

  /**
   * 'querySelectorAll' returns a NodList, which has to be converted to an array.
   * This array must be generated here so that the list is up-to-date.
   */
  // Creates an array of UNUSED key elements.
  const keyElements = Array.from(document.querySelectorAll('.key'));
  const isUnusedKey = keyElements.find(key => key.innerText === letter) !== undefined;

  if (isLetterKey && isUnusedKey) {
    // Gets matching element from the list of unused keys.
    const button = keyElements.filter(element => element.innerText === letter)[0];
    game.handleInteraction(button);
  }
});
