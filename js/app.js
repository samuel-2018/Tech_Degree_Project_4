/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
document.querySelector('#btn__reset').addEventListener('click', () => {
  game = new Game();
  game.startGame();
});

// On first load, plays sound after 3 seconds: "Let's play!"
const soundLetsPlay = new Audio('sounds/VOICE_Girl_4yo_Lets_Play_03.wav');
setTimeout(() => {
  soundLetsPlay.play();
}, 3000);

/**
 * Handles onscreen keyboard button clicks
 * @param (HTMLButtonElement) button - The clicked button element
 */
function handleInteraction(button) {
  if (game !== undefined) {
    if (game.gameReady) {
      try {
        const letter = button.innerText;
        if (game.activePhrase.checkLetter(letter)) {
          game.soundClickRight.play();
          button.classList.remove('key');
          button.classList.add('chosen');
          game.activePhrase.showMatchedLetter(letter);
          if (game.checkForWin()) {
            game.gameOver(true);
          }
        } else {
          game.soundClickWrong.play();
          button.classList.remove('key');
          button.classList.add('wrong');
          game.removeLife();
        }
      } catch (err) {
        console.log('TypeError: ', err instanceof TypeError);
      }
    }
  }
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

// Listens for physical keyboard clicks.
document.addEventListener('keyup', (event) => {
  const letter = event.key;

  // Checks for LETTER key press.
  const isLetterKey = /^[a-zA-Z]$/.test(letter);

  // Creates an array of UNUSED key elements. ('querySelectorAll' returns a NodList, which has to be converted to an array)
  // Note: This array must be generated inside if state so that the list is up-to-date.
  const keyElements = Array.from(document.querySelectorAll('.key'));
  const isUnusedKey = keyElements.find(key => key.innerText === letter) !== undefined;

  if (isLetterKey && isUnusedKey) {
    // Gets matching element from full list of keys.
    const button = keyElements.filter(element => element.innerText === letter)[0];
    handleInteraction(button);
  }
});
