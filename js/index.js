// JavaScript Document
const defaultScale = 3;
$(document).ready(function () {
    const x = "x";
    const o = "o";
    let count = 0;
    var o_win = 0;
    var x_win = 0;
    let scaleTileOrigin = parseInt($("#size_scale").val());
    let numberOfTilesOrigin = scaleTileOrigin * scaleTileOrigin;
    let hasWinner = false;
    let leftDiagonal = [];
    let rightDiagonal = [];

    //todo: generate tile
    var generateSizeTile = (scaleTile, numberOfTiles) => {
        scaleTile = parseInt($("#size_scale").val());
        numberOfTiles = scaleTile * scaleTile;
        return {scaleTile, numberOfTiles};
    }

    var attachOnClickListener = () => {
        $('#game_board li').click((event) => clickEvent(event));
    }

    let generateDiagonalList = (scaleTile) => {
        //todo: check left diagonal start from 0 + (1 + scaleTile + (n + 1))
        let positionLeft = 0;
        for (let i = 0; i < scaleTile; i++) {
            leftDiagonal.push(positionLeft + i);
            positionLeft += scaleTile;
        }
        //todo: check right diagonal start from scaleTile, scaleTile + (n - 1)
        let positionRight = 0;
        for (let i = scaleTile - 1; i >= 0; i--) {
            rightDiagonal.push(positionRight + i);
            positionRight += scaleTile;
        }
    }

    var generateTile = (numberOfTiles, scaleTile) => {
        let gameBoard = document.getElementById('game_board');
        let playerTurn = document.getElementById('player_turn');
        gameBoard.innerHTML = '';
        playerTurn.innerHTML = o + '\' player turns';
        leftDiagonal = [];
        rightDiagonal = [];
        let isEven = scaleTile % 2 === 1;
        for (let i = 0; i < numberOfTiles; i++) {
            $(gameBoard).append('<li ' + 'id="' + i.toString() + '" class="btn span_tic">+</li>')
        }
        if (isEven) {
            generateDiagonalList(scaleTile);
        }
        console.log('leftDiagonal', leftDiagonal);
        console.log('rightDiagonal', rightDiagonal);
        $(gameBoard).css({
            "color": "red",
            "width": 110 * scaleTile,
            "border": "1px solid black"
        });
        attachOnClickListener()
    }

    generateTile(numberOfTilesOrigin, scaleTileOrigin);
    var resetGame = (numberOfTiles, scaleTile) => {
        $("#game li").text("+");
        $("#game li").removeClass('disable')
        $("#game li").removeClass('o')
        $("#game li").removeClass('x')
        $("#game li").removeClass('btn-primary')
        $("#game li").removeClass('btn-info')
        count = 0
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
            console.log(idCell, ' include in ', diagonalList)
            for (const position of diagonalList) {
                let cellValue = listOfCell[position].innerText.toUpperCase();
                let sign = playerSign.toUpperCase();
                console.log(position, cellValue, ' sign ', sign)
                isSame = cellValue === sign;
                if (!isSame) {
                    break;
                }
            }
            return isSame;
        }
        return false;
    }

    let checkWinner = (currentTarget, playerSign) => {
        let idCell = parseInt(currentTarget.attr("id"));
        let listOfCell = document.getElementById('game_board').getElementsByTagName('li');
        let isCheck = checkHorizontal(idCell, playerSign, listOfCell);
        if (isCheck) {
            alert(`Player ${playerSign} win!`)
            return isCheck
        }
        isCheck = checkVertical(idCell, playerSign, listOfCell)
        if (isCheck) {
            alert(`Player ${playerSign} win!`)
            return isCheck
        }
        isCheck = checkDiagonal(idCell, listOfCell, playerSign, leftDiagonal);
        if (isCheck) {
            alert(`Player ${playerSign} win!`)
            return isCheck
        }
        isCheck = checkDiagonal(idCell, listOfCell, playerSign, rightDiagonal);
        if (isCheck) {
            alert(`Player ${playerSign} win!`)
            return isCheck
        }
    }

    let clickEvent = (event) => {
        //todo: change text according to player
        let currentTarget = $(event.currentTarget);
        let playerTurn = document.getElementById('player_turn');
        if (count >= numberOfTilesOrigin) {
            //todo: check winner or tie
            alert('It is a tie, the game will restart ');
            resetGame(numberOfTilesOrigin, scaleTileOrigin);
            return;
        }
        if (currentTarget.hasClass("disable")) {
            alert('Already selected')
            return;
        }
        if (count % 2 === 0) {
            //todo: it is o turn
            console.log('it is o turn' + count + " " + numberOfTilesOrigin);
            currentTarget.text(o);
            currentTarget.addClass('disable o btn-primary');
            count++;
            hasWinner = checkWinner(currentTarget, o);
            playerTurn.innerHTML = x + '\' player turns';
        } else {
            //todo: it is x turn
            console.log('it is x turn' + count + " " + numberOfTilesOrigin);
            currentTarget.text(x);
            currentTarget.addClass('disable x btn-primary')
            count++;
            hasWinner = checkWinner(currentTarget, x);
            playerTurn.innerHTML = o + '\' player turns';
        }
    }

});
