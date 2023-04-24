
var current_right = "left-button";

var stats_wrong = 0;
var stats_right = 0;
var clicked_once = false;



const buttons = document.querySelectorAll('.btn');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', addClass, false);
}

function addClass(event) {

    if (clicked_once) {
        return;
    }

    let rightwrong = "wrong"

    if (event.currentTarget.id == current_right) {
        rightwrong = "right"
    }
    event.currentTarget.classList.add(rightwrong);

    if (event.currentTarget.id == current_right) {
        event.currentTarget.querySelector('span').textContent = "CORRECT"
        if (!clicked_once) {
            stats_right++;
            d3.select("#stats").text("You were able to distinguish human from AI! Just like " + stats_right / (stats_right + stats_wrong) * 100 + "% of participants.");

        }

    } else {
        event.currentTarget.querySelector('span').textContent = "WRONG"
        if (!clicked_once) {
            stats_wrong++;
            d3.select("#stats").text("You were unable to distinguish AI from human. Just like " + stats_wrong / (stats_right + stats_wrong) * 100 + "% of participants.");
        }
    }

    d3.select("#ethical-question").style("visibility", "visible");

    clicked_once = true;

}

export function set_correct(value) {
    //clear previous
    clear_rightwrong()

    if (value == "left-button" || value == "right-button") {
        current_right = value;
    }
}

function clear_rightwrong() {
    clicked_once = false;
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("wrong");
        buttons[i].classList.remove("right");
        buttons[i].querySelector('span').textContent = "";
    }

    d3.select("#stats").text("");
}