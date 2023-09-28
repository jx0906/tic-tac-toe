 // constants

 const winCombi = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
];

 // variables
let player1 = {
    name: "Player 1",
    sym: 'X'
};

let player2 = {
    name: "Player 2",
    sym: 'O'
};

// state of game board - will change, so its a variable
let stateBoard = [];

let gameState = {
    stateBoard,
    turn: '',
    playerSym: '',
    winner: ''
};

 // cached elements -This term emphasizes the idea of storing a reference to a DOM element in a variable to improve performance 
 // by avoiding repeated DOM queries. When you cache an element, you are essentially setting it as a variable.
const gameBoard = document.getElementById('game-board');
const statusBoard = document.getElementById('status-board');
const playerTurn = document.getElementById('player-turn');
const resetButton = document.getElementById('reset-button');

 //---- event listeners
 gameBoard.addEventListener('click', handleMove);
 resetButton.addEventListener('click', initialize);

 //----- functions

 //function to create 3x3 board - could have coded directly in html but wanna try this potentially more flexible mtd
 //let user define "3" if intending to create dynamic board - see tips.txt in sample_tictactoe folder
 function createBoard() {

    for (let i = 0; i < 3; i++) {
        //this will lead to the same effect as having </div><div> in the .game-board HTML elem to facilitate css styling, js functions
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';

            //These lines set a custom data attribute called "row" and "col" on each cell element. It stores the row index i and col index j.
            //chose this method over setting 9 "rows" to prevent having to deal with flexbox woes (ie, how to get 9 boxes to line up as 3x3 box?)
            cell.dataset.row = i;
            cell.dataset.col = j;

            //The cell element created in the inner loop is appended as a child to the row element, building the structure of the game board.
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
};

function initialize() {
    gameBoard.innerHTML = ''; //clear board else it will just keep appending another 3x3 grid
    gameState.stateBoard = []; // include this to reset state data aft a game ends (notice value is same as line 26 to retain the assignment)
    createBoard();
    statusBoard.textContent = "Game starts now!"
    playerTurn.textContent = "Player 1 first"
    // do not need to redefine gameState here because you have already made the assignment from row 26; recall that '=' in Javascript is not equals. its an assignment
    // so if you set a key in an obj, eg a.value = c, what happens is it immed takes the current value of c; if you reassign c (ie, c = smth new), the association between
    // a.value and c old value remains; it will not be replaced with a.value = "smth new". However, if you only update the value of c, eg, if c was an array and you update c[0],
    // because the value between a.value and c old value remains, a.value would be updated with the updated c old value. 
    // this concept would explain why it wouldn't be right to have gameState assigned in row 26 and then "redefined" here. 
    // the correct way to do it would be to simply update whatever keys within, eg, gameState.turn, gameState.playerSym   
    gameState.turn = player1.name; //note with obj, we need to refer their keys (eg, turn) to another object's key (eg, player1.name) instead of simply 
    // calling the object (eg, turn: player1) else the code wouldn't work
    gameState.playerSym = player1.sym;
    setupStateBoard();
}

function setupStateBoard() {
// function needs to be able to recog the col and rows and store it as an array in stateGame so each game box will be identified as 1.1, 1.2, 1.3. winning combo has to reflect this?
// this is because I had opted to use a row, col dynamic method, instead of recognising them as 9 rows, ie, sq1, sq2, sq3 etc.
// Iterate through the elements with "row" class-name within the game-board; store the row id data in rArray
const rows = gameBoard.getElementsByClassName('row');
// rows.length to determine the number of elements that were found using the getElementsByClassName method under the gameBoard element.
for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const rArray = [];

    // Iterate through the cells within each row; extract the values of "data-row" and "data-col" attributes, 
    // parse them into integers, and creates an object (rData) with this information.

    const cells = r.getElementsByClassName('cell');
    for (let j = 0; j < cells.length; j++) {
        const c = cells[j];
        const rData = {
            row: parseInt(c.getAttribute('data-row')),
            col: parseInt(c.getAttribute('data-col'))
        };

        // Push the rData object into rArray for the current row
        rArray.push(rData);
    }

    // Add the row's data to the main stateBoard array by pushing the rArray info into stateBoard.
    // stateBoard will now be a 2D array, where each element corresponds to data-row and data-col values of the r and c. 
    // to access a specific element in the array, i will need to call "stateBoard[i][j]", where i and j= the value of the row and col i want to call.
    // stateBoard.push(rArray) -->  not changing stateBoard, only updating the stateBoard
    gameState.stateBoard.push(rArray);
}
}
// console.log(stateBoard) gives: 
//  [[ { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 } ],
//  [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 } ],
//  [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 } ]]

// event listener, handleMove() is to set the state; render is for UI
// if your code uses DOM elements (eg, chosenCell.textContent), you are updating UI --> such commands should appear in the render function 
// commands to update state info should be things like directly calling the variable, eg gameState.stateBoard 
// event listener updates state ("data"), then state sends the info to UI through render function
// while inefficient to have render in pure Javascript (because it will iterate (run repeatedly) to update every data point), the distinction to keep data in state and
// pulling data to reflect in UI through render ensures that there will only be one set of data (ie, in state) to update whenever there are any changes. 
// so we need render, but we need it to be executed efficiently, eg, React render!  

    function handleMove(event) {
        let symToUpdate = gameState.playerSym;
        const chosenCell = event.target;
        
        //check for empty cell - if (gameState.stateBoard[parseInt(chosenCell.dataset.row)][parseInt(chosenCell.dataset.col)] == '' || null || undefined ) -- doesn't work. why
        // update gameState object, ie, stateBoard, turn, playerSym
        // a. update stateBoard array by parsing the dataset.row and dataset.col attributes of the clicked cell to get it's index for updating stateBoard
        // impt to do this so the cache is kept separately in the datastore ("stateBoard") and not the DOM object (ie, chosenCell through .textContent)
        gameState.stateBoard[parseInt(chosenCell.dataset.row)][parseInt(chosenCell.dataset.col)] = symToUpdate;
        console.log(gameState.stateBoard);
        //check for Winner

        checkWin(symToUpdate);
        renderMessage(event);

        // b. update turn by checking current player name (ie, gameState.turn). back part starting from gameState.turn === player1.name represents the condition
        // alr. ie, check if gameState.turn = player 1  
        // "?" = if truthy, gameState.turn should = player 2 next, so set current player to player2.name; else, set to player1.name
        gameState.turn = gameState.turn === player1.name ? player2.name : player1.name;

        // c. update the playerSym as well
        gameState.playerSym = gameState.playerSym === player1.sym ? player2.sym : player1.sym;
    }
    
    function checkWin (pSym) {
        for (combi of winCombi) {
            // get value of array use 'of'; get key/index use 'in' for array
            // use 'in' for objects; 'of' will return undefined
            // so here combi will be returned as [0,1,2]
            const [a,b,c] = combi; 
            
            // cannot just check combi[0] === pSymb because winCombi stores indexes of potential winning combi. If you use combi[0] === pSym, it would check whether the index
            // of the first cell in the combination is equal to pSym. This comparison doesn't directly relate to the symbols in the cells, and it wouldn't accurately determine
            // if a player has won.

            // so we need to establish variables for the content within combi to compare with the tictactoe board content (X, O) input.
            // here, by setting [a,b,c] = combi, we are telling the code that "a" rep an index within the winCombi array, ie, it rep one of the indices within a potential winning
            // combination.
            // Now we will need to calculate the row and column indices for a cell based on the winning combi then extract the symbol (X or O) from stateBoard for that cell
            // Aft that's done, we use the symbol to check if a player has won by comparing it with the symbols in the other cells for the winning combi.

            const symbolA = gameState.stateBoard[Math.floor(a / 3)][a % 3];
            const symbolB = gameState.stateBoard[Math.floor(b / 3)][b % 3];
            const symbolC = gameState.stateBoard[Math.floor(c / 3)][c % 3];

            // Math.floor(a / 3) is used to calculate the row index for the corresponding cell in the stateBoard. Since there are 3
            // cells in each row (a 3x3 grid), dividing a by 3 and rounding down with Math.floor will give us the row index.
            // a % 3 is used to calculate the column index for the corresponding cell in the stateBoard. The % (modulo) operator gives you the remainder when 
            // a is divided by 3, effectively cycling through values 0, 1, and 2, which correspond to the three columns in each row.

            // for debugging if winner cannot be declared, to check if the definitions for the symbols were correct - console.log(symbolA, symbolB, symbolC)
            if (symbolA === pSym && symbolB === pSym && symbolC === pSym) {
                gameState.winner = gameState.turn;
                return;} //need to exit if a winner is found, else the code will just execute row 201 and 202 and you will never see the winning statement in row 198
            
            gameState.winner = ''; //'' = empty string; != null and != undefined!
            };
    }

    function renderMessage(x) {
        // no winner yet
        if (gameState.winner === '' || null || undefined) {
            statusBoard.textContent = "No winner has been declared but we should be getting closer!";

            if (x.target.textContent === '' || null || undefined ) {
                x.target.textContent = gameState.playerSym;
                playerTurn.textContent = `over to ${gameState.turn} now!`;
                return;}

            if (x.target.textContent != '') {
                statusBoard.textContent = "The cell is already taken. Pls choose another one.";
                return}; //need to exit if a winner is found, else the code will just continue executing
            }
        x.target.textContent = gameState.playerSym;
        statusBoard.textContent = `${gameState.winner} has won!`;
        playerTurn.textContent = '';
    }