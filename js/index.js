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

    //todo: generate tile
    var generateSizeTile = (scaleTile, numberOfTiles) => {
        scaleTile = parseInt($("#size_scale").val());
        numberOfTiles = scaleTile * scaleTile;
        return {scaleTile, numberOfTiles};
    }

    var attachOnClickListener = () => {
        $('#game_board li').click((event) => clickEvent(event));
    }

    var generateTile = (numberOfTiles, scaleTile) => {
        var gameBoard = document.getElementById('game_board');
        var playerTurn = document.getElementById('player_turn');
        gameBoard.innerHTML = '';
        playerTurn.innerHTML = o + '\' player turns';
        for (let i = 0; i < numberOfTiles; i++) {
            $(gameBoard).append('<li ' + 'id="' + i.toString() + '" class="btn span_tic">+</li>')
        }
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

    let checkWinner = () => {

    }

    let clickEvent = (event) => {
        //todo: change text according to player
        let currentTarget = $(event.currentTarget);
        let playerTurn = document.getElementById('player_turn');
        if (currentTarget.hasClass("disable")) {
            alert('Already selected')
            return;
        }

        if (count >= numberOfTilesOrigin) {
            //todo: check winner or tie
            alert('It is a tie, the game will restart ');
            resetGame(numberOfTilesOrigin, scaleTileOrigin);
            return;
        }
        if (count % 2 === 0) {
            //todo: it is o turn
            console.log('it is o turn' + count + " " + numberOfTilesOrigin);
            currentTarget.text(o);
            currentTarget.addClass('disable o btn-primary');
            count++;
            playerTurn.innerHTML = x + '\' player turns';
        } else {
            //todo: it is x turn
            console.log('it is x turn' + count + " " + numberOfTilesOrigin);
            currentTarget.text(x);
            currentTarget.addClass('disable x btn-primary')
            count++;
            playerTurn.innerHTML = o + '\' player turns';
        }
    }

});
