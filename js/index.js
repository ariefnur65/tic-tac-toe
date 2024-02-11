// JavaScript Document
$(document).ready(function () {
    const x = "x";
    const o = "o";
    let count = 0;
    let o_win = 0;
    let x_win = 0;
    let scaleTileOrigin = parseInt($("#size_scale").val());
    let numberOfTilesOrigin = scaleTileOrigin * scaleTileOrigin;
    let hasWinner = false;
    let playerWin = '';
    let leftDiagonal = [];
    let rightDiagonal = [];

    let generateSizeTile = (scaleTile, numberOfTiles) => {
        scaleTile = parseInt($("#size_scale").val());
        numberOfTiles = scaleTile * scaleTile;
        return {scaleTile, numberOfTiles};
    }

    let attachOnClickListener = () => {
        $('#game_board li').click((event) => clickEvent(event));
    }

    let generateDiagonalList = (scaleTile) => {
        let positionLeft = 0;
        for (let i = 0; i < scaleTile; i++) {
            leftDiagonal.push(positionLeft + i);
            positionLeft += scaleTile;
        }
        let positionRight = 0;
        for (let i = scaleTile - 1; i >= 0; i--) {
            rightDiagonal.push(positionRight + i);
            positionRight += scaleTile;
        }
    }

    let generateTile = (numberOfTiles, scaleTile) => {
        let gameBoard = document.getElementById('game_board');
        let playerTurn = document.getElementById('player_turn');
        gameBoard.innerHTML = '';
        playerTurn.innerHTML = o.toUpperCase() + '\' player turns';
        leftDiagonal = [];
        rightDiagonal = [];
        for (let i = 0; i < numberOfTiles; i++) {
            $(gameBoard).append('<li ' + 'id="' + i.toString() + '" class="btn span_tic">+</li>')
        }
        generateDiagonalList(scaleTile);
        $(gameBoard).css({
            "width": 85 * scaleTile,
        });
        attachOnClickListener()
    }

    generateTile(numberOfTilesOrigin, scaleTileOrigin);
    let resetGame = (numberOfTiles, scaleTile) => {
        let gameCellElement = $("#game li");
        gameCellElement.text("+");
        gameCellElement.removeClass('disable')
        gameCellElement.removeClass('o')
        gameCellElement.removeClass('x')
        gameCellElement.removeClass('btn-primary')
        gameCellElement.removeClass('btn-info')
        count = 0
        hasWinner = false;
        playerWin = '';
        const sizeTile = generateSizeTile(scaleTile, numberOfTiles);
        scaleTileOrigin = sizeTile.scaleTile;
        numberOfTilesOrigin = sizeTile.numberOfTiles;
        generateTile(numberOfTilesOrigin, scaleTileOrigin)
    }

    $("#reset").click(() => resetGame(numberOfTilesOrigin, scaleTileOrigin));

    let checkHorizontal = (idCell, playerSign, listOfCell) => {
        let startCoefficient = Math.floor(idCell / scaleTileOrigin);
        let startColumnPointer = startCoefficient * scaleTileOrigin;
        let endColumnPointer = ((startCoefficient + 1) * scaleTileOrigin) - 1;
        let isSameHorizontal = true;
        for (let i = startColumnPointer; i <= endColumnPointer; i++) {
            let cellValue = listOfCell[i].innerText.toUpperCase();
            isSameHorizontal = cellValue === playerSign.toUpperCase();
            if (!isSameHorizontal) {
                break;
            }
        }
        return isSameHorizontal;
    }

    let checkVertical = (idCell, playerSign, listOfCell) => {
        let columnPosition = idCell % scaleTileOrigin;
        let isSame = true;
        for (let i = columnPosition; i < numberOfTilesOrigin; i += scaleTileOrigin) {
            let cellValue = listOfCell[i].innerText.toUpperCase();
            isSame = cellValue === playerSign.toUpperCase();
            if (!isSame) {
                break;
            }
        }
        return isSame;
    }


    let checkDiagonal = (idCell, listOfCell, playerSign, diagonalList) => {
        let isSame = true;
        if (diagonalList.includes(idCell)) {
            for (const position of diagonalList) {
                let cellValue = listOfCell[position].innerText.toUpperCase();
                let sign = playerSign.toUpperCase();
                isSame = cellValue === sign;
                if (!isSame) {
                    break;
                }
            }
            return isSame;
        }
        return false;
    }

    let declarationWinner = (playerSign) => {
        playerWin = playerSign.toUpperCase();
        alert(`Player ${playerWin} win!`);
    }

    let checkWinner = (currentTarget, playerSign) => {
        let idCell = parseInt(currentTarget.attr("id"));
        let listOfCell = document.getElementById('game_board').getElementsByTagName('li');
        const isWinnerByCheckHorizontal = checkHorizontal(idCell, playerSign, listOfCell);
        if (isWinnerByCheckHorizontal) {
            declarationWinner(playerSign);
            return isWinnerByCheckHorizontal
        }
        const isWinnerByCheckVertical  = checkVertical(idCell, playerSign, listOfCell)
        if (isWinnerByCheckVertical) {
            declarationWinner(playerSign);
            return isWinnerByCheckVertical
        }
        const isWinnerByLeftDiagonalCheck = checkDiagonal(idCell, listOfCell, playerSign, leftDiagonal);
        if (isWinnerByLeftDiagonalCheck) {
            declarationWinner(playerSign);
            return isWinnerByLeftDiagonalCheck
        }
        const isWinnerByRightDiagonalCheck = checkDiagonal(idCell, listOfCell, playerSign, rightDiagonal);
        if (isWinnerByRightDiagonalCheck) {
            declarationWinner(playerSign);
            return isWinnerByRightDiagonalCheck
        }
    }

    let clickEvent = (event) => {
        //todo: change text according to player
        let currentTarget = $(event.currentTarget);
        let playerTurn = document.getElementById('player_turn');
        let xWin = document.getElementById('x_win');
        let oWin = document.getElementById('o_win');
        if (hasWinner) {
            alert(`Player ${playerWin} win!, the game will restart`)
            resetGame(numberOfTilesOrigin, scaleTileOrigin);
            return;
        }
        if (count >= numberOfTilesOrigin) {
            alert('It is a tie, the game will restart ');
            resetGame(numberOfTilesOrigin, scaleTileOrigin);
            return;
        }
        if (currentTarget.hasClass("disable")) {
            alert('Already selected')
            return;
        }
        if (count % 2 === 0) {
            currentTarget.text(o);
            currentTarget.addClass('disable o btn-primary');
            count++;
            hasWinner = checkWinner(currentTarget, o);
            if (hasWinner) {
                o_win++;
                oWin.innerText = o_win.toString();
            }
            playerTurn.innerHTML = x.toUpperCase() + '\' player turns';
        } else {
            currentTarget.text(x);
            currentTarget.addClass('disable x btn-primary')
            count++;
            hasWinner = checkWinner(currentTarget, x);
            if (hasWinner) {
                x_win++;
                xWin.innerText = x_win.toString();
            }
            playerTurn.innerHTML = o.toUpperCase() + '\' player turns';
        }
    }

});
