document.addEventListener('DOMContentLoaded', function () {

	var buildBoard = document.getElementById('build_board');

	function Even(value) {
		if (value % 2 == 0) {
			return true;
		} else {
			return false;
		};
	};

	function Odd(value) {
		if (value % 1 == 0) {
			return true;
		} else {
			return false;
		};
	};

	function Same(array) {

		var first = array[0];

		if (array[0] == "") {
			return false;
		} else {
			return array.every(function (element) {
				return element == first;
			});
		};
	};

	buildBoard.addEventListener('click', function () {
		buildBoard.innerHTML = "Reset";
		var gameBoard = [];
		var sizeBoard = parseInt(document.getElementById('size_board').value);
		var numBoard = (sizeBoard * sizeBoard);

		for (var i = 0; i < numBoard; i++) {
			gameBoard.push(i);
		};

		document.getElementById('gameplay').innerHTML = '<div id="board_play"></div>';

		var board = document.getElementById('board_play');

		board.style.margin = '0 auto';
		board.style.height = (100 * sizeBoard) + 'px';
		board.style.width = (100 * sizeBoard) + 'px';
		board.style.border = 'solid 1px black';

		for (var i = 0; i < numBoard; i++) {
			board.innerHTML += '<div class="square"></div>';
		};

		var squares = document.getElementsByClassName('square');
		for (var i = 0; i < numBoard; i++) {
			squares[i].style.height = '100px';
			squares[i].style.width = '100px';
			squares[i].style.float = "left";
			squares[i].style.lineHeight = "100px";
			squares[i].setAttribute('id', i.toString());
		};

		if (numBoard % 2 !== 0) {
			for (var i = 0; i < numBoard; i += 2) {
				squares[i].style.backgroundColor = "#fff";
			};
		} else {
			for (i = 0; i < numBoard; i += 1) {
				if (Even(i / sizeBoard)) {
					for (var boardNum = i; boardNum < (i + sizeBoard); boardNum += 2) {
						squares[boardNum].style.backgroundColor = "#fff";
					};
				} else if (Odd(i / sizeBoard)) {
					for (var boardNum = i + 1; boardNum < (i + sizeBoard); boardNum += 2) {
						squares[boardNum].style.backgroundColor = "#fff";
					};
				} else {};
			};
		};

		var playerIndicator = document.getElementById('player_indicator')

		playerIndicator.innerHTML = "Player One (X)";

		var boardClicks = 0;
		board.addEventListener('click', function () {
			if (chooseWinner()) {
				alert('Congratulation '+ winningPlayer[0] + 'Win !');
			} else if (Even(boardClicks)) {
				playerIndicator.innerHTML = "Player Two (O)";
			} else {
				playerIndicator.innerHTML = "Player One (X)";
			};
			boardClicks++;
		});

		var squareClicks = [];
		for (var i = 0; i < numBoard; i++) {
			squareClicks[i] = 0;
		};

		var winningPlayer;
		var chooseWinner = function () {
			// WIn By Row
			for (i = 0; i < numBoard; i += 1) {
				if ((i % sizeBoard) == 0) {
					var rowCheck = [];
					for (var boardNum = i; boardNum < (i + sizeBoard); boardNum += 1) {
						rowCheck.push(squares[boardNum].innerHTML);
					};

					if (Same(rowCheck)) {
						winningPlayer = rowCheck;
						return true;
					};
				};
			};

			// Win By Column
			for (i = 0; i < numBoard; i += 1) {
				if (i < sizeBoard) { // 
					var colCheck = [];
					for (var boardNum = i; boardNum < numBoard; boardNum += sizeBoard) {
						colCheck.push(squares[boardNum].innerHTML);
					};

					if (Same(colCheck)) {
						winningPlayer = colCheck;
						return true;
					};
				};
			};

			// Win By Left Diagonal
			var diagLeftCheck = [];
			for (i = 0; i < numBoard; i += 1) {
				if ((i % (sizeBoard + 1)) == 0) {
					diagLeftCheck.push(squares[i].innerHTML);
				};
			};
			if (Same(diagLeftCheck)) {
				winningPlayer = diagLeftCheck;
				return true;
			};

			// Win By Right Diagonal
			var diagRightCheck = [];
			for (i = (sizeBoard - 1); i < (numBoard - 1); i += 1) {
				if ((i % (sizeBoard - 1)) == 0) {
					diagRightCheck.push(squares[i].innerHTML);
				};
			};

			if (Same(diagRightCheck)) {
				winningPlayer = diagRightCheck;
				return true;
			};
		};

		var countClicks = function () {
			var divID = this.getAttribute('id');
			squareClicks[divID] += 1;

			if (Even(boardClicks) && squareClicks[divID] == 1) {
				this.innerHTML = 'X';
				this.style.color = "red"

			} else if (Odd(boardClicks) && squareClicks[divID] == 1) {
				this.innerHTML = 'O';
				this.style.color = "black";

			} else if (!chooseWinner()) {
				alert('You cannot move there. That space is taken.');
				boardClicks -= 1;
			} else {
				alert('Tie');
			};

			if (chooseWinner()) {

				for (var i = 0; i < numBoard; i++) {
					squareClicks[i] = 2;
				};
				document.getElementById('build_board').innerHTML = "Play again?"
			};
		};

		for (var i = 0; i < numBoard; i++) {
			squares[i].addEventListener('click', countClicks);
		};
	});
});