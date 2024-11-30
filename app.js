//wrap  code in a function.
(function() {
    // Mouse table function to avoid problems or name conflicts
    const mousetable = Array.from(document.getElementsByClassName('box'));
    
    // MouseOver & mouseOut for all spots
    mousetable.forEach(box => {
        box.addEventListener('mouseover', myfunction1);
    });
    
    function myfunction1() {
        this.classList.add('boxHuman');
    }
    
    mousetable.forEach(box => {
        box.addEventListener('mouseout', myfunction2);
    });
    
    function myfunction2() {
        this.classList.remove('boxHuman');
        console.log('mouseout', 'mouseinn');
    }

    // Get the table to play on (array)
    const table = Array.from(document.querySelectorAll('.box'));

    // Text info for human Player(or/and publickum;)
    let infoTxt = document.querySelector('h1');
    let currenP = 'o'; // Player 'o' starts
    let movesPlayed = [];//to remove used fields

    // Possible Winn combinations
    const winnCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Add Event listener to each box.One click each box.{one:true}
    table.forEach(box => {
        box.addEventListener('click', myfunction, { once: true });
    });

    // GAME START
    function myfunction(e) {
        // Need index of clicked box
        const boxArr = Array.from(document.getElementsByClassName('box'));
        const index = boxArr.indexOf(e.target);

        // Player 'o' move
        if (currenP === 'o') {
            table[index].classList.add('boxHuman');
            movesPlayed.push(index);
        } else {
            // Computer's move ('x')
            table[index].classList.add('boxComputer');
            movesPlayed.push(index);
        }

        // Check for winner
        if (checkWinner()) {
            setTimeout(() => {
                alert(currenP +" "+ " wins! Restart?");
                restart();
            }, 100);
            return;
        }

        // Switch to the next player
        currenP = currenP === 'o' ? 'x' : 'o';

        // If all moves are played, it's a draw
        if (movesPlayed.length === 9) {
            setTimeout(() => {
                alert("Draw! Restart?");
                restart();
            }, 100); // Using setTimeout so 'boxComputer' got time to add 'x' svg  to table.
            return;
        }

        // If it's the computer's turn, make the computer move
        if (currenP === 'x') {
            setTimeout(computerMove, 300);  // Delay to simulate pc is thinking
        }
    }

    // Function to check the winner
    function checkWinner() {
        for (let combo of winnCombos) {
            const boxes = combo.map(index => table[index]);
            const classes = boxes.map(box => box.classList.value);
            if (classes.every(cls => cls === 'box boxHuman') || classes.every(cls => cls === 'box boxComputer')) {
                return true;
            }
        }
        return false;
    }

    // Function to make the computer's move
    function computerMove() {
        // Find all the available spots (empty boxes)
        const availableMoves = table
            .map((box, index) => (box.classList.contains('boxHuman') || box.classList.contains('boxComputer')) ? null : index)
            .filter(index => index !== null);

        // Randomly choose one available move for the computer
        const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

        // Simulate a click for the computer
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        table[move].dispatchEvent(event);
    }

    // Restart the game
    function restart() {
       window.location.reload(); 
    }    
})();
