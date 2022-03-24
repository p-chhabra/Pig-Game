'use strict';
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');

const dice = document.querySelector('.dice');
///Player Turn
let turn = 0;

///Game State
let gamePlaying = true;

///Starting Conditions
score1.textContent = 0;
score2.textContent = 0;
current1.textContent = 0;
current2.textContent = 0;
dice.classList.add('hidden');

///New Game
btnNew.addEventListener('click', function () {
  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  gamePlaying = true;
});

const winningCondition = () => {
  ///Winning Condition
  if (score1.textContent > 50) {
    console.log('🎉 Player 1 won!');
    document.querySelector('.player--0').classList.add('player--winner');
    document.querySelector('.player--1').classList.add('player--winner');
    gamePlaying = false;
  } else if (score2.textContent > 50) {
    console.log('🎉 Player 2 won!');
    document.querySelector('.player--1').classList.add('player--winner');
    document.querySelector('.player--0').classList.add('player--winner');
    gamePlaying = false;
  }
};

///Dice Roll Event
btnRoll.addEventListener('click', function () {
  if (gamePlaying) {
    let randomNum = Math.floor(Math.random() * 6 + 1);
    dice.src = `dice-${randomNum}.png`;
    dice.classList.remove('hidden');

    if (randomNum !== 1) {
      ///Player 1 Turn
      if (turn == 0) {
        current1.textContent = Number(current1.textContent) + randomNum;
      }
      ///Player 2 Turn
      else if (turn == 1) {
        current2.textContent = Number(current2.textContent) + randomNum;
      }
    }

    ///If Dice rolls to 1
    else {
      ///Player 1 Case
      if (turn == 0) {
        score1.textContent =
          Number(current1.textContent) + Number(score1.textContent);
        current1.textContent = 0;
        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');
        turn = 1;
      }
      ///Player 2 Case
      else if (turn == 1) {
        score2.textContent =
          Number(current2.textContent) + Number(score2.textContent);
        current2.textContent = 0;
        document.querySelector('.player--1').classList.toggle('player--active');
        document.querySelector('.player--0').classList.toggle('player--active');
        turn = 0;
      }
    }

    winningCondition();
  }
});

btnHold.addEventListener('click', function () {
  if (gamePlaying) {
    if (turn == 0) {
      score1.textContent =
        Number(score1.textContent) + Number(current1.textContent);
      turn = 1;
    } else if (turn == 1) {
      score2.textContent =
        Number(score2.textContent) + Number(current2.textContent);
      turn = 0;
    }

    winningCondition();
  }
});
