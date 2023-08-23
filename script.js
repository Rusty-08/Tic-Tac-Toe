// onload display

const startGame = (btn, container) => {
    document.getElementById(btn).addEventListener('click', () => {
        let startContainer = document.querySelector(container)
        startContainer.style.height = '0'
        setTimeout(() => {
            startContainer.classList.add('d-none')
        }, 600)
    })
}

// print x first
// toggle the sign switching between [x and o]
// disable box item in the board if it is already occupied
// check if one of the player has get the winning combination evertime the board in clicked
// display the winner

// const Gameboard = (() => {

//     let _winningPattern = [
//         [1, 2, 3],
//         [1, 4, 7],
//         [1, 5, 9],
//         [2, 5, 8],
//         [3, 5, 7],
//         [3, 6, 9],
//         [4, 5, 6],
//         [7, 8, 9]
//     ]

//     const checkPattern = (player1, player2) => {

//     }

//     const declareWinner = () => {

//     }

// })()

const Player = () => {

    let boardItem = document.querySelectorAll('.board-item')
    let board = []

    let _players = {
        'player1': 'x',
        'player2': 'o'
    }

    const getSign = () => {
        if (board.length === 0 || board[board.length - 1] === 'o') {
            board.push(_players.player1)
        } else {
            board.push(_players.player2)
        }
        return board[board.length - 1]
    }

    const printSign = () => {
        boardItem.forEach(item => {
            item.addEventListener('click', () => {
                item.textContent = getSign()
            })
        })
    }

    return { printSign }
}

let player = Player()

player.printSign()

window.onload = () => {
    startGame('start-btn', '.start-container')
}