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
  button.classList.add('test');
  console.log(button);
}
// Listens for onscreen keyboard clicks.
document.querySelector('#qwerty').addEventListener('click', (event) => {
  const button = event.target;
  if (button.className === 'key') {
    handleInteraction(button);
  }
});
// Creates an array of key elements. ('querySelectorAll' returns a NodList, which has to be converted to an array)
const keyElements = Array.from(document.querySelectorAll('.key'));

// Listens for physical keyboard clicks.
document.addEventListener('keyup', (event) => {
  const letter = event.key;
  // Gets matching element from full list of keys.
  const button = keyElements.filter(element => element.innerText === letter)[0];
  handleInteraction(button);
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
