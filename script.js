// TODO -- Disable board if there is already a winner
// TODO -- Reset board after play-again button is clicked

// * Check if one player matches to winning combination

const Gameboard = (() => {

    let _winningPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const checkWinner = (board, playerSign) => {
        for (const pattern of _winningPattern) {
            const [a, b, c] = pattern;
            if (board[a] === playerSign && board[b] === playerSign && board[c] === playerSign) {
                return true;
            }
        }
        return false;
    }

    return { checkWinner }
})()

// * Display start and restart container onload || to show winner

const Round = () => {

    let board = document.querySelector('.board')
    let startBtn = document.getElementById('start-btn')
    let startContainer = document.querySelector('.start-container')
    let restartBtn = document.getElementById('restart-btn')
    let restartContainer = document.querySelector('.restart-container')

    const start = () => {
        startBtn.addEventListener('click', () => {
            startContainer.style.height = '0'
            setTimeout(() => {
                startContainer.classList.add('d-none')
            }, 600)
        })
    }

    const showWinner = () => {

        setTimeout(() => {
            restartContainer.style.height = 'calc(100% - 8rem)'
        }, 200)

        board.style.opacity = '0'
        restartContainer.classList.remove('d-none')

        restartBtn.addEventListener('click', () => {
            board.style.opacity = '1'
            restartContainer.style.height = '0'

            player.playAgain()

            setTimeout(() => {
                restartContainer.classList.add('d-none')
            }, 600)
        })
    }

    return { start, showWinner }
}

const Player = () => {

    let boardItem = document.querySelectorAll('.board-item')
    let result = document.getElementById('result')
    let winnerSign = document.getElementById('winner-mark')

    let board = new Array(9).fill(null)
    let currentSign = ''

    let _players = {
        'player1': 'x',
        'player2': 'o'
    }

    const getSign = (item) => {

        let index = item.getAttribute('data-value')

        if (currentSign !== 'x') {
            board[index - 1] = _players.player1
            currentSign = _players.player1
            return currentSign
        } else {
            board[index - 1] = _players.player2
            currentSign = _players.player2
            return currentSign
        }
    }

    const printSign = () => {
        boardItem.forEach(item => {
            item.addEventListener('click', () => {

                if (item.textContent === '') {
                    item.textContent = getSign(item)
                    if (currentSign === 'x') {
                        item.style.color = 'blue'
                    } else {
                        item.style.color = 'green'
                    }
                    gameResult()
                }
                return

            })
        })
    }

    const playAgain = () => {
        boardItem.forEach(item => {
            item.textContent = null
        })
        board = new Array(9).fill(null)
        currentSign = ''
    }

    const _getWinnerDetails = () => {
        result.textContent = `${currentSign === 'x' ? 'Player 1' : 'Player 2'} wins!`
        winnerSign.textContent = `${currentSign === 'x' ? 'x' : 'o'}`
        winnerSign.style.color = `${currentSign === 'x' ? 'blue' : 'green'}`
    }

    const gameResult = () => {
        if (Gameboard.checkWinner(board, currentSign)) {
            _getWinnerDetails()
            setTimeout(() => round.showWinner(), 300)
        } else if (board.every(cell => cell)) {
            result.textContent = "It's a draw!"
            round.showWinner();
        }
        return
    }

    return { printSign, playAgain }
}

let player = Player()
let round = Round()

player.printSign()

window.onload = () => {
    round.start()
}