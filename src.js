const chessBoard = document.querySelector("#chess-board")
const btn = document.querySelector("#btn")
const num = document.querySelector("#num")

// N-Queen problem 
const solveProblem = (n) => {
    const result = []
    const board = Array(n).fill(0).map(() => Array(n).fill('.'))

    const columnsUsed = Array(n).fill(false)
    const diagonalUsed1 = Array(n * 2 - 1).fill(false)
    const diagonalUsed2 = Array(n * 2 - 1).fill(false)

    const queen = (i, j) => {
        const indexOfDiagno1 = i + n - j - 1
        const indexOfDiagno2 = i + j
        // if not Avialable
        if (columnsUsed[j] || diagonalUsed1[indexOfDiagno1] || diagonalUsed2[indexOfDiagno2]) {
            return
        }

        //if possible, put Queen in
        board[i][j] = 'Q'
        columnsUsed[j] = true
        diagonalUsed1[indexOfDiagno1] = true
        diagonalUsed2[indexOfDiagno2] = true

        if (i === n - 1) {
            result.push(board.map(row => row.join('')))
        } else {
            for (let counter = 0; counter < n; counter++) {
                queen(i + 1, counter)
            }
        }
        board[i][j] = '.'
        columnsUsed[j] = false
        diagonalUsed1[indexOfDiagno1] = false
        diagonalUsed2[indexOfDiagno2] = false

    }

    for (let counter = 0; counter < n; counter++) {
        queen(0, counter)
    }

    console.log(result)
    for (let i = 0; i < result.length; i++) {
        createBoard(n, result[i])
    }
}

const createBoard = (n, answerForRow) => {
    const divChess = document.createElement('div')
    divChess.className = "chess"
    for (let i = 0; i < n; i++) {
        const divRow = document.createElement('div')
        divRow.className = "row"

        for (let counter = 0; counter < n; counter++) {
            const div = document.createElement('div')

            if (i % 2 === 0) {
                if (counter % 2 === 0)
                    div.className = "black"
                else
                    div.className = "white"
            } else {
                if (counter % 2 === 0)
                    div.className = "white"
                else
                    div.className = "black"
            }

            console.log(answerForRow[counter])
            if (answerForRow[i].split("")[counter] === 'Q')
                div.innerHTML = "&#9819;"

            divRow.appendChild(div)
        }
        divChess.appendChild(divRow)
    }
    chessBoard.appendChild(divChess)
}


btn.addEventListener('click', (e) => {
    e.preventDefault()

    while (chessBoard.lastChild) {
        chessBoard.removeChild(chessBoard.lastChild);
    }

    const number = +num.value

    console.log("Hi")
    solveProblem(number)
})
