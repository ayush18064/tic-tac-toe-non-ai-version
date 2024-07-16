let boxes = document.querySelectorAll(".box");
// console.log(boxes)
let resetBtn = document.getElementById("reset-btn");
// console.log(resetBtn)
resetBtn.addEventListener("click", reset);
let headerText = document.querySelector(".header-text");

// used to keep the current state of the game
const areas = [
    null, null, null, null, null, null, null, null, null

]
function reset() {
    // alert()
    winBoxIds = [];
    areas.forEach((val, index) => {
        areas[index] = null;
    })
    boxes.forEach((box) => {
        box.innerText = ""
        box.style.background = ""
        box.style.cursor = "pointer"
        // allow the user to click the buttons again
        box.classList.remove("disable")
    })
    headerText.innerText = "User Playing as O";
    headerText.style.color = "white"
    currentPLayer = O_text;



}
const O_text = "O";
const X_text = "X";
let currentPLayer = O_text;
let winBoxIds = []
function playGame() {
    boxes.forEach((val) => {
        val.addEventListener("click", (e) => {
            e.preventDefault()
            handleClick(e);
        })
    })
}
function handleClick(e) {
    if (winBoxIds.length > 0) {
        return
    }
    const id = e.target.id; // 0 , 1 , 2 , 3 , 4 , 5 , 6 ; 
    console.log(e.target.id);
    // if all the boxes are empty then play the first box
    if (!areas[id]) {
        areas[id] = currentPLayer;
        e.target.innerText = currentPLayer;
        e.target.style.cursor = "not-allowed"
        // disable the button once cliked 
        e.target.classList.add("disable")

        if (hasPlayerWon(currentPLayer)) {          // if(hasPlayerWon(X))
            headerText.innerText = `Player ${currentPLayer} Won`;
            headerText.style.color = "lightgreen"
            changeWinBoxBg();
            return;
        }
        // console.log(areas);
    }

    // change the current x to o and o to X
    currentPLayer = (currentPLayer == O_text) ? X_text : O_text;
    if (currentPLayer == X_text) {
        setTimeout(() => {

            Computerplay()
        }, 500)

    }


}
function hasPlayerWon(cPlayer) {
    if (areas[0] == cPlayer) {
        if (areas[1] == cPlayer && areas[2] == cPlayer) {
            winBoxIds = [0, 1, 2];
            return true;
        }
        if (areas[3] == cPlayer && areas[6] == cPlayer) {
            winBoxIds = [0, 3, 6];
            return true;
        }
        if (areas[4] == cPlayer && areas[8] == cPlayer) {
            winBoxIds = [0, 4, 8];
            return true;
        }
    }
    else if (areas[4] == cPlayer) {
        if (areas[1] == cPlayer && areas[7] == cPlayer) {
            winBoxIds = [4, 1, 7];
            return true;
        }
        if (areas[3] == cPlayer && areas[5] == cPlayer) {
            winBoxIds = [4, 3, 5];
            return true;
        }
        if (areas[0] == cPlayer && areas[8] == cPlayer) {
            winBoxIds = [4, 0, 8];
            return true;
        }
        if (areas[2] == cPlayer && areas[6] == cPlayer) {
            winBoxIds = [4, 2, 6];
            return true;
        }
    }
    else if (areas[8] == cPlayer) {
        if (areas[2] == cPlayer && areas[5] == cPlayer) {
            winBoxIds = [8, 2, 5];
            return true;
        }
        if (areas[7] == cPlayer && areas[6] == cPlayer) {
            winBoxIds = [8, 7, 6];
            return true;
        }
        if (areas[0] == cPlayer && areas[4] == cPlayer) {
            winBoxIds = [8, 0, 4];
            return true;
        }
    }
    else if (areas[2] == cPlayer) {
        if (areas[4] == cPlayer && areas[6] == cPlayer) {
            winBoxIds = [2, 4, 6];
            return true;
        }
    }
    else if (areas[1] == cPlayer) {
        if (areas[4] == cPlayer && areas[7] == cPlayer) {
            winBoxIds = [1, 4, 7];
            return true;
        }
    }
    else if (areas[6] == cPlayer) {
        if (areas[7] == cPlayer && areas[8] == cPlayer) {
            winBoxIds = [6, 7, 8];
            return true;
        }
        if (areas[4] == cPlayer && areas[2] == cPlayer) {
            winBoxIds = [6, 4, 2];
            return true;
        }

    }

    else {
        return false;
    }

}

function changeWinBoxBg() {
    winBoxIds.forEach((val) => {
        boxes[val].style.background = "lightgreen"
    })
    boxes.forEach((val) => {
        val.style.cursor = "not-allowed"
    })
}
function generateRandom(max) {
    let ranndomNo = Math.floor(Math.random() * max);
    // console.log(ranndomNo);
    return ranndomNo;
}
function Computerplay() {
    let availableBoxes = [];
    boxes.forEach((val, index) => {
        if (val.innerText == "") {
            availableBoxes.push(index);
        }
    });
    if (availableBoxes.length > 0) {
        let rIndx = availableBoxes[generateRandom(availableBoxes.length)];
        areas[rIndx] = X_text;
        boxes[rIndx].innerText = X_text;
        if (hasPlayerWon(X_text)) {
            headerText.innerText = `Player ${X_text} Won`;
            headerText.style.color = "lightgreen";
            changeWinBoxBg();
            return;
        }

        currentPLayer = O_text;
    }
    else {
        headerText.innerText = "Draw 👇 Reset Game"
        headerText.style.color = "red"
    }
}
playGame()