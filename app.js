/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, winningScore;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
winningScore = 100;
gamePlaying = true;


clearScreen();
newGame();
loadHoldButtonFeatures();
loadRollButtonFeatures();


function loadHoldButtonFeatures() {
    document.querySelector('.btn-hold').addEventListener('click', swapPlayers);
}

function newGame() {
    document.querySelector('.btn-new').addEventListener('click', clearScreen);
}

function swapPlayers() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        roundScore = 0;

        document.querySelector('#current-' + activePlayer).innerHTML = "0";
        document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
        if (!isWinner()) {

            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            activePlayer == 1 ? activePlayer = 0 : activePlayer = 1;

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
            document.querySelector('.dice').style.display = 'none';
        }
    }
}

function isWinner() {
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        gamePlaying = false;
        return true;
    }
}

function loadRollButtonFeatures() {

    document.querySelector('.btn-roll').addEventListener('click', function () {

        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice != 1) {

            roundScore += dice;
            document.querySelector('#current-' + activePlayer).innerHTML = "" + roundScore;
            isWinner();
        } else {
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).innerHTML = "0";
            swapPlayers();
        }


    })
}

function clearScreen() {
    console.log('help');
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('#score-0').innerHTML = "0";
    document.querySelector('#score-1').innerHTML = "0";
    document.querySelector('#current-0').innerHTML = "0";
    document.querySelector('#current-1').innerHTML = "0";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.dice').style.display = 'none';
}