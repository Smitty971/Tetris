document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10


    //The Tetrominoes

    const lTetrominoe = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2]
        [width, width*2, width*2+1, width*2+2]
    ]
    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetrominoe, zTetromino, tTetromino, oTetromino, iTetromino]


    let currentPosition = 4
    let currentRotation = 0

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][0]

    //draw the first rotation in the first tetrominoe
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //make the tetrominos move down every second
    timerId = setInterval(moveDown, 1000)

    //move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
          current.forEach(index => squares[currentPosition + index].classList.add('taken'))
          //start a new tetromino falling
          random = nextRandom
          nextRandom = Math.floor(Math.random() * theTetrominoes.length)
          current = theTetrominoes[random][currentRotation]
          currentPosition = 4
          draw()
        }
      }

      //move the tetromino left, unless is at the edge or there is a blockage
      function moveLeft() {
          undraw()
          const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

          if(!isAtLeftEdge) currentPosition -=1

          if(current.some(index => squares[currentPosition + index.classList.contains('taken')])){
              currentPosition +=1
          }
      }

})