const dice1 = document.getElementById('dice-1');
const dice2 = document.getElementById('dice-2');
const rollBtn = document.getElementById('roll');
const dice = document.querySelectorAll('.dice');

const getRandomNo = () => {
  return Math.floor(Math.random() * 6 + 1);
};

dice1.innerText = getRandomNo();
dice2.innerText = getRandomNo();

const hello = () => {
  dice.forEach((die) => die.classList.remove('spin'));
};

const rollDice = () => {
  rollBtn.disabled = true;
  dice.forEach((die) => die.classList.add('spin'));
  dice1.innerText = getRandomNo();
  dice2.innerText = getRandomNo();
  // setTimeout(hello, 3000);
  setTimeout(() => {
    hello();
    rollBtn.disabled = false;
  }, 3000);
};

rollBtn.addEventListener('click', rollDice);
