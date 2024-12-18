//Creating Objects Necessary for Game

//Board Object
const board = (function () {
    let arr = [["", "", ""], ["", "", ""], ["", "", ""]];

    const restart = () => { for (let i = 0; i < arr.length; i++) { 

        
        for (let j = 0; j < arr[i].length; j++) { 
            arr[i][j] = ""; }
        }

        let display = document.querySelectorAll(".square");
        for (square of display){
            square.innerHTML = "";
            square.classList.remove("occupied");
        }
        if(control.checkPlay()){control.resetMovesTwo();}
        else{control.resetMoves();}
        p1wins = player1.getWins();
        p2wins = player2.getWins();
        
        win1div = document.getElementById("player1score");
        win2div = document.getElementById("player2score");
        win1div.innerHTML = p1wins;
        win2div.innerHTML = p2wins;

        if (p1wins == p2wins){
            win1div.classList.remove("winning");
            win2div.classList.remove("winning");
        }
        else if(p1wins > p2wins){
            win1div.classList.add("winning");
        }
        else if(p2wins > p1wins){
            win2div.classList.add("winning")
        }
    }

    const hardRestart = () => {

        player1.hardRestart();
        player2.hardRestart();
        board.restart();
    }
    return {arr, restart, hardRestart}


})();



//Player IIFEs
const player1 = (function () {
    
    let name = "player1"
    let symbol = "X"
    let wins = 0;
    const getWins = () => wins;
    const win = () => wins++;
    const hardRestart = () => wins = 0;

    return {name, symbol, getWins, win, hardRestart}
})()

const player2 = (function () {
    
    let name = "player2"
    let symbol = "O"
    let wins = 0;
    const getWins = () => wins;
    const win = () => wins++;
    const hardRestart = () => wins = 0;

    return {name, symbol, getWins, win, hardRestart}
})()

//Control Object

const control = (function (board) {

    let move_count = 0
    let first = true

    const resetMoves = () => move_count = 0;

    const resetMovesTwo = () => move_count = 1;

    const checkPlay = () => {
        console.log("checkplay")
        if (first == false){
            first = true;
            return false
        }
        else {
            first = false;
            return true
        }
    }

    const makeMove = (X, Y) => {
        if (move_count % 2 == 0){
           var player = player1
        }
        else{
            var player = player2
        }

        if (board.arr[X][Y] == ""){
            board.arr[X][Y] = player.symbol;
            document.getElementById(`${X}${Y}`).innerHTML = player.symbol;
            document.getElementById(`${X}${Y}`).classList.add("occupied");
            move_count += 1

            //When you have time, replace the alerts with modals. Right now the winning square is not visible

            if (control.checkWins()){
                player.win()
                alert(`${player.name} has won!`);
                board.restart();
            }
            else if (move_count == 9 && control.checkPlay()){
                alert("The game is over and no player has won.")
                board.restart();
            }
            else if (move_count == 10 && !control.checkPlay()){
                alert("The game is over and no player has won.")
                board.restart();
            }
            
        }
        else {
            console.log("Space Occupied");
            return false
        }
    }

    const checkWins = () => { 
    if ( (board.arr[0][0] !== "" && ((board.arr[0][0] === board.arr[0][1] && board.arr[0][0] === board.arr[0][2]) || (board.arr[0][0] === board.arr[1][1] && board.arr[0][0] === board.arr[2][2]) || (board.arr[0][0] === board.arr[1][0] && board.arr[0][0] === board.arr[2][0]))) ) { return board.arr[0][0]; } 
    else if ( board.arr[0][1] !== "" && board.arr[0][1] === board.arr[1][1] && board.arr[0][1] === board.arr[2][1] ) { return board.arr[0][1]; } 
    else if ( board.arr[0][2] !== "" && ((board.arr[0][2] === board.arr[1][2] && board.arr[0][2] === board.arr[2][2]) || (board.arr[0][2] === board.arr[1][1] && board.arr[0][2] === board.arr[2][0])) ) { return board.arr[0][2]; } 
    else if ( board.arr[1][0] !== "" && board.arr[1][0] === board.arr[1][1] && board.arr[1][0] === board.arr[1][2] ) { return board.arr[1][0]; } 
    else if ( board.arr[2][0] !== "" && board.arr[2][0] === board.arr[2][1] && board.arr[2][0] === board.arr[2][2] ) { return board.arr[2][0]; } 
    else if ( board.arr[1][1] !== "" && ((board.arr[1][1] === board.arr[0][1] && board.arr[1][1] === board.arr[2][1]) || (board.arr[1][1] === board.arr[1][0] && board.arr[1][1] === board.arr[1][2]) || (board.arr[1][1] === board.arr[0][0] && board.arr[1][1] === board.arr[2][2]) || (board.arr[1][1] === board.arr[0][2] && board.arr[1][1] === board.arr[2][0])) ) { return board.arr[1][1]; } 
    else { return false; }}

    return {move_count, makeMove, checkWins, resetMoves, checkPlay, resetMovesTwo}

})(board);



//Starting Logic:

document.getElementById("begin").addEventListener('click', () => {
    p1 = document.getElementById("user1input").value;
    p2 = document.getElementById("user2input").value;

    if(player1 == "" || player2 == ""){
        alert("Please enter a username for both players")
        return false
    }

    player1.name = p1;
    player2.name = p2;

    document.getElementById("player1name").innerHTML = player1.name
    document.getElementById("player2name").innerHTML = player2.name

    document.getElementById("startingDiv").classList.toggle("not-visible");
    document.getElementById("gameDiv").classList.toggle("not-visible");
})

//Clicking the board, I Want an event listener to give me the ID of the div in order to determine which square has been clicked:

document.getElementById("gameDiv").addEventListener('click', (event) => {
    a = event.target.id[0];
    b = event.target.id[1];
    console.log(control.move_count)
    control.makeMove(a, b);
    console.log(event.target.id)
    console.log(control.move_count)
})

document.getElementById("reset").addEventListener('click', board.restart);
document.getElementById("resetAll").addEventListener('click', board.hardRestart);

//Todo: Reset and Restart Logic