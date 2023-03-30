
var current_right = "left-button";

const buttons = document.querySelectorAll('.btn');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', addClass, false);
}

function addClass(event) {
    let rightwrong = "wrong"
    if (event.currentTarget.id == current_right) {
        rightwrong = "right"
    }
    event.currentTarget.classList.add(rightwrong);

    if (event.currentTarget.id == current_right) {
        event.currentTarget.querySelector('span').textContent = "CORRECT"
    } else {
        event.currentTarget.querySelector('span').textContent = "WRONG"
    }
}

export function set_correct(value){
    if (value == "left-button" || value == "right-button"){
        current_right = value;
    }
}
