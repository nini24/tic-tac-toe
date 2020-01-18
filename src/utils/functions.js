export function getWinner(squares) {

    //declaring possible winning combinations
    const winRows = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    //iterate over array 
    for (let i =0; i< winRows.length; i++) {
        const [a,b,c] = winRows[i]

        //if the board contains winning combinations
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        } 
    }
    return null
}

export function areSquaresFilled(squares) {
    //a variable to store number of filled boxes
    let count = 0

    //iterate over squares
    squares.forEach(function (item) {

        //
        if (item !== null) {
            count +=1
        }
    })

    if (count === 9) {
        return true
    }
    else {return false}
}