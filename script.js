let dragged = null;
let board = initializeBoard();
let currentPosition = {};
let dropzone;
let validMoves;

// document.querySelectorAll('.draggable') => this will give you all the elements with 'draggable' class in the form of an array

// Attach event listeners once
document.querySelectorAll('.draggable').forEach(image => image.addEventListener('dragstart', (event) => {
    dragged = event.target; //store reference for the dragged element 
    // console.log(dragged)
}))

// Add event listeners to all squares (dropzones) once
// document.querySelectorAll('dropzone') will give you all the elements with 'dropzone' class in the form of an array, these are our divs where our images are stored, 



document.querySelectorAll('.dropzone').forEach((square) => {
    square.addEventListener('click', (event) => {

        //event.currentTarget targets the parent element, rather than children elements <p></p> or <img>
        dropzone = event.currentTarget;

        validMoves = validWhiteRookMoves(currentPosition,board);
        console.log('available moves :', validMoves);
        console.log(validMoves.length);


        currentPosition = findCurrentPosition(dropzone);
        console.log(`currentPosition : ${JSON.stringify(currentPosition)}`)
    })


    square.addEventListener('dragover', (event) => {
        event.preventDefault();  //Necessary to allow dropping
    })

    square.addEventListener('drop', (event) => {
        event.preventDefault();

        //event.currentTarget targets the parent element, rather than children elements <p></p> or <img>
        dropzone = event.currentTarget;


        // check if dropzone is valid
        if (!dropzone) {
            console.error("Dropzone is undefined");
            return;
        }

        // find and update the current position
        // currentPosition = findCurrentPosition(dropzone);
        // console.log(`currentPosition : ${JSON.stringify(currentPosition)}`)

        // check if the move is invalid(assuming dragged is a white rook here for demonstration)
        /*         let validMoves = validWhiteRookMoves(currentPosition,board);
                console.log(validMoves);
                console.log(validMoves.length); */

        /*    for(let i = 0;i < validMoves.length;i++){
               if(currentPosition == validMoves[i]){
                   return;
               }
           } */

        const newPosition = findCurrentPosition(dropzone);

        for(let i = 0;i < validMoves.length;i++){
            if(!(newPosition === validMoves[i])){
                return;
            }
        }

        if (dragged) {
            // currentPosition = findCurrentPosition(dropzone);
            console.log(`New Position : ${JSON.stringify(newPosition)}`)
        } else {
            console.log("no element is being dragged..")
        }

        // Determine if the dragged piece is black or white
        if (dragged && dragged.classList.contains("white-piece")) {
            // Logic for white piece

            if (dropzone.classList.contains('whiteOccupied')) {
                // can't place a white piece on a square occupied by another white piece
                return;
            }

            // Remove dragged piece from current square
            dragged.parentNode.classList.remove('whiteOccupied');
            dragged.parentNode.classList.add("empty");
            dragged.parentNode.removeChild(dragged);


            // remove the piece from the dropzone (if present)
            dropzone.childNodes.forEach((node) => {
                if (node.classList && node.classList.contains("pieces")) {
                    dropzone.removeChild(node);
                }
            })


            // Add dragged piece to the new square
            dropzone.appendChild(dragged);
            if (dropzone.classList.contains('empty')) {
                dropzone.classList.replace('empty', 'whiteOccupied')
            } else if (dropzone.classList.contains('blackOccupied')) {
                dropzone.classList.replace('blackOccupied', 'whiteOccupied')
            }
        }

        if (dragged && dragged.classList.contains("black-piece")) {
            // Logic for black piece
            if (dropzone.classList.contains('blackOccupied')) {
                // can't place a black piece on a square occupied by another black piece
                return;
            }

            // Remove dragged piece from current square
            dragged.parentNode.classList.remove('blackOccupied');
            dragged.parentNode.classList.add("empty");
            dragged.parentNode.removeChild(dragged);


            // remove the piece from the dropzone (if present)
            dropzone.childNodes.forEach((node) => {
                if (node.classList && node.classList.contains("pieces")) {
                    dropzone.removeChild(node);
                }
            })


            // Add dragged piece to the new square
            dropzone.appendChild(dragged);
            if (dropzone.classList.contains('empty')) {
                dropzone.classList.replace('empty', 'blackOccupied')
            } else if (dropzone.classList.contains('whiteOccupied')) {
                dropzone.classList.replace('whiteOccupied', 'blackOccupied')
            }
        }

    })
})

// this function is just to number all the squares in the in the board
function numberAllSquares() {
    const squares = document.querySelectorAll('.square'); //select all squares
    // console.log(squares.length)
    let counter = 0;

    let i;
    let j;

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            squares[counter].querySelector('.square-number').textContent = `${i},${j}`;
            // console.log(`${i},${j}`)
            /*   squares[counter].setAttribute('square-position',JSON.stringify({row:i,col:j})) */
            squares[counter].dataset.position = JSON.stringify({ row: i, col: j })
            counter++;
        }
    }

    squares.forEach(square => {
        if (!square.querySelector('.square-number')) {
            console.log("Missing square-number element in:", square);
        }

    });

    console.log(squares)


}

numberAllSquares();

// we also need a board variable which stores all the present positions of all the pieces in the chessboard 
function initializeBoard() {
    let board = [];
    let squares = document.querySelectorAll('.dropzone'); // Assuming all squares have the class dropzone
    let index = 0;
    for (let row = 0; row <= 7; row++) {
        // this is like initializing an empty row
        board[row] = [];
        // console.log(board[row]);
        for (let col = 0; col <= 7; col++) {
            // Add reference to the DOM element or a piece occupying the square 
            // console.log(squares[index])
            // this will fill that row that we initialized previously
            board[row][col] = squares[index].querySelector('img') ? squares[index] : null;
            // console.log(board[row][col])
            index++;
        }
    }
    // console.log(board)
    return board;
}


function findCurrentPosition(dropzone) {

    if (!dropzone || !dropzone.dataset.position) {
        console.error("Invalid dropzone or missing position data")
        return;
    }

    console.log(dropzone) //log the dropzone element

    let position = JSON.parse(dropzone.dataset.position);
    currentPosition.row = position.row;
    currentPosition.col = position.col;
    console.log(currentPosition);
    console.log(typeof (currentPosition));

    return currentPosition;

}

function validWhiteRookMoves(position, board) {
    let validMoves = [];

    // Example : Moving up in the same column
    for (let i = position.row + 1; i <= 7; i++) {
        const square = board[i][position.col];
        // let piece = square.querySelector('img');
        if (square == null) {
            console.log(`square is empty at (${i},${position.col})`)
            validMoves.push([i, position.col]) //valid move if square is empty
        } else {
            const piece = square.querySelector('img');
            // if there is a piece on the square
            if(piece){
                // stop if a white piece is encountered (no move possible here)
                if(piece.classList.contains('white-piece')){
                    console.log('Encountered white piece at', [i,position.col], "can't move any further.");
                    break;  //stop further 
                }if (piece.classList.contains('black-piece')) {
                
                    validMoves.push([i, position.col]) //can capture
                    break; //stop further movement after capture 
                }
            }          
        }
    }

    // moving down in the same column
   /*  for(let i = position.row-1;i>=0;i--){
        const square = board[i][position.col]
    } */
    return validMoves;
}









