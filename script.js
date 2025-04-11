const gridItems = document.querySelectorAll('.grid-item')
const gridContainer = document.querySelector('.grid-container')
const resetButton = document.querySelector('.reset-button')
const winMessage = document.querySelector('.win-message')

let clickCounter = 0;

// All the win combination
let winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Input symbols 
const inputSymbol = {
  'O': `<i class="fa-regular fa-circle"></i>`,
  'X': `<i class="fa-solid fa-xmark"></i>`
}

// Reset function
const reset = () => {
  clickCounter = 0;
  gridItems.forEach(item => {
    item.innerHTML = ""
    item.classList.contains('winner') && item.classList.remove('winner')
    item.addEventListener('click', handleClick);
  })
  winMessage.textContent = ""
}

// Function to check the winner
const checkWinner = () => {
  winCombinations.forEach(combination => {
    let [cell1, cell2, cell3] = combination;
    
    let gridCell1 = gridItems[cell1].innerHTML.trim();
    let gridCell2 = gridItems[cell2].innerHTML.trim();
    let gridCell3 = gridItems[cell3].innerHTML.trim();

    if(gridCell1 && gridCell1 === gridCell2 && gridCell1 === gridCell3) {
      gridItems[cell1].classList.add('winner')
      gridItems[cell2].classList.add('winner')
      gridItems[cell3].classList.add('winner')

      if(inputSymbol['O'] === gridCell1) {
        winMessage.textContent = `O wins!`
      } else if(inputSymbol['X'] === gridCell1) {
        winMessage.textContent = `X wins!` 
      } 
      gridItems.forEach(gridItem =>  gridItem.removeEventListener('click', handleClick));
    }
  })
}

// To check if it is a tie or not
if(clickCounter === 8) {
  winMessage.textContent = `It's a tie!`
}

// Function to handle the click on the grid cell
const handleClick = function() {
  if (clickCounter % 2 === 0) {
    this.innerHTML = inputSymbol['O'];
  } else {
    this.innerHTML = inputSymbol['X'];
  }
  this.removeEventListener('click', handleClick)
  checkWinner();
  clickCounter++;
}

gridItems.forEach(item => {
  item.addEventListener('click', handleClick)
})

// Reset button
resetButton.addEventListener('click', reset)