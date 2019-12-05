var origBoard;
const player1 = 'O';
const player2 = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

var moves = 0;

const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
	// function that sets up a new game
	document.querySelector('.endgame').style.display = "none"
	origBoard = Array.from(Array(9).keys())
	for (var i = 0; i < cells.length; i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
	moves = 0;
}

function turnClick(square){
	// player1 always goes first
	if (moves % 2 === 0){
		turn(square.target.id, player1)
	}
	else {
		turn(square.target.id, player2)
	}
	moves++
	checkTie();
}

function turn(squareId, player){
	// function that completes a turn
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player){
	// function that checks if the player has a matching winning combo
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i): a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > - 1)){
			gameWon = {index: index, player: player}
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon){
	// function that is called when a game is over
	for (let index of winCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor = 
		gameWon.player == player1 ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++){
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == player1 ? "Player 1 wins!" : "Player 2 wins!")
}

function declareWinner(who){
	// function that declares the winner
	document.querySelector('.endgame').style.display = "block";
	document.querySelector('.text').innerText = who;
}

function emptySquares(){
	// function that returns a new board of empty squares
	return origBoard.filter(s => typeof s == "number")
}

function checkTie(){
	// function that checks if the players have tied
	if (emptySquares().length == 0){
		for (var i = 0; i < cells.length; i++){
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!");
		return true;
	}
	return false;
}






