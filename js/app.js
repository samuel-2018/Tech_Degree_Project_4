/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
document.querySelector('#btn__reset').addEventListener('click', () => {
  game = new Game();
  game.startGame();
});
/**
 * Handles onscreen keyboard button clicks
 * @param (HTMLButtonElement) button - The clicked button element
 */
function handleInteraction(button) {
  const letter = button.innerText;
  if (game.activePhrase.checkLetter(letter)) {
  } else {
  }

  // button.classList.add('test');
  console.log('handleInteraction ran:  ', button);
}
// Listens for onscreen keyboard clicks.

document.querySelector('#qwerty').addEventListener('click', (event) => {
  const button = event.target;
  // Note: 'enter' and 'space' both trigger clicks on any in focus buttons.
  // blur() removes the focus after click.
  button.blur();
  if (button.className === 'key') {
    handleInteraction(button);
  }
});
// Creates an array of key elements. ('querySelectorAll' returns a NodList, which has to be converted to an array)
const keyElements = Array.from(document.querySelectorAll('.key'));

// Listens for physical keyboard clicks.
document.addEventListener('keyup', (event) => {
  const letter = event.key;

  // Checks for valid key press.
  const isValidKey = /^[a-zA-Z]$/.test(letter);

  if (isValidKey) {
    // Gets matching element from full list of keys.
    const button = keyElements.filter(element => element.innerText === letter)[0];
    handleInteraction(button);
  }
});

// // Listens for onscreen keyboard clicks.
// document.querySelector('#qwerty').addEventListener('click', (event) => {
//   const letter = event.target.innerText;
//   if (letter.length === 1) {
//     handleInteraction(letter);
//   }
// });

// // Listens for physical keyboard clicks.
// document.addEventListener('keyup', (event) => {
//   const letter = event.key;
//   handleInteraction(letter);
// });
