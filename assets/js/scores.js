let highScoresList = document.querySelector('#highscores');
let clearBtn = document.querySelector('#clear');

let savedScoreArray = JSON.parse(localStorage.getItem("score"))

console.log(savedScoreArray)


if (savedScoreArray.length > 1) {  // If multiple scores stored, this if statement will sort them.
savedScoreArray.sort((a, b) => {
    return b.score - a.score
})
    savedScoreArray.forEach( (el) => {
        let newLi = document.createElement('li')
        newLi.textContent = `${el.initials} with ${el.score} points`
        highScoresList.appendChild(newLi)
    })

} else {
    let newLi = document.createElement('li')
    newLi.textContent = `${savedScoreArray.initials} with ${savedScoreArray.score} points`
    highScoresList.appendChild(newLi)
}

clearBtn.addEventListener("click", function (){
    localStorage.clear()
    highScoresList.remove()
})
