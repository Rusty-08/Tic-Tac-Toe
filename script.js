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
    let activeSign = document.querySelector('.active-sign')

    const start = () => {
        activeSign.textContent = 'x'
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

            activeSign.style.backgroundColor = 'rgba(165, 198, 234, 0.2)'
            activeSign.classList.remove('active-o')

            player.playAgain()

            setTimeout(() => {
                restartContainer.classList.add('d-none')
            }, 600)
        })
    }

    return { start, showWinner }
}

// * 

const Player = () => {

    let boardItem = document.querySelectorAll('.board-item')
    let result = document.getElementById('result')
    let winnerSign = document.getElementById('winner-mark')
    let activeSign = document.querySelector('.active-sign')

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

    const _getWinnerDetails = () => {
        result.textContent = `${currentSign === 'x' ? 'Player 1' : 'Player 2'} wins!`
        winnerSign.textContent = `${currentSign === 'x' ? 'x' : 'o'}`
        winnerSign.style.color = `${currentSign === 'x' ? 'blue' : 'green'}`
    }

    const _getActiveSign = () => {
        let active = `${currentSign === 'x' ? 'o' : 'x'}`
        activeSign.textContent = active

        if (active === 'o') {
            activeSign.classList.add('active-o')
        } else {
            activeSign.classList.remove('active-o')
        }

        if (Gameboard.checkWinner(board, currentSign) || board.every(cell => cell)) {
            activeSign.textContent = ''
            activeSign.style.backgroundColor = 'transparent'
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

                _getActiveSign()
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
        activeSign.textContent = 'x'
    }

    const gameResult = () => {
        if (Gameboard.checkWinner(board, currentSign)) {
            _getWinnerDetails()
            setTimeout(() => round.showWinner(), 300)
        } else if (board.every(cell => cell)) {
            result.textContent = "It's a draw!"
            winnerSign.textContent = ''
            round.showWinner();
        }
        return
    }

    return { printSign, getSign, playAgain }
}

let player = Player()
let round = Round()

player.printSign()

const date = new Date()
document.getElementById('date').textContent = date.getFullYear()

window.onload = () => {
    round.start()
}