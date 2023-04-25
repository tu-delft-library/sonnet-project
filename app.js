import { set_correct } from "/modules/right-wrong/right-wrong.js";

d3.select("#page4 #left_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

d3.select("#page4 #right_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

var timer = d3.timeout((elapsed) =>  document.getElementById('page1').scrollIntoView(), 90000);
   

d3.select("body").on("click", () => { timer.restart((elapsed) => document.getElementById('page1').scrollIntoView(), 90000); });

/**
 * Load data, basically an init function, whith a state variables such as the counts
 */
d3.dsv("\t", "/data/poems.txt").then((data) => {
    data.forEach((d) => {
        d.left = d.title + "\n\n" + d.text;
        d.right = d.title + "\n\n" + d.AIPoem;
    });

    // Setup the welcome page
    let floating_poems = d3.select("#page1").selectAll('.float-container');
    floating_poems.call(createPoemContainers, data, 10);

    floating_poems = d3.select("#page1").selectAll('.float-container');
    floating_poems.call(moveRandomly);

    //setup the interactive poem selection
    var count = 0;
    var texts_abstracts = []
    var texts_human = [];
    var texts_ai = [];

    data.forEach((d) => {
        texts_abstracts.push(d.abstract);
        texts_human.push(d.left);
        texts_ai.push(d.right);
    });

    //Welcome animation
    var state = 0;
    d3.interval(() => {

        state = (state + 1) % 4;

        d3.select("#page1").select("h1")
            .transition()
            .duration(3000)
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);

        change_state(state);
    }, 10000)

    add_poem_selector(texts_abstracts, texts_human, texts_ai);
});

function add_poem_selector(texts_abstracts, texts_human, texts_ai) {
    const index = d3.local();
    let selected = 0;
    let timeout = d3.timeout();
    let choice_selection = d3.select("#poem-selector").selectAll("div .page")
        .data(texts_abstracts)
        .enter()
        .append("div")
        .classed("page white float-container margin-3", true)
        .each(function (d, i) {
            index.set(this, i); // Store index in local variable.
        })
        .attr("id", (d, i) => `poem-select-${i}`)
        .on("click", function () {

            let i = index.get(this); // Get index from local variable.
            d3.select("#poem-selector").style("visibility", "hidden");
            d3.select("#select_text").style("visibility", "hidden");

            d3.select("#poem-comparison").style("visibility", "visible");
            

            let correct_is_left = Math.floor(Math.random() * 2);
            set_correct(correct_is_left ? "left-button" : "right-button");

            if (correct_is_left) {
                d3.select("#left_poem").call(add_typewriter_text, texts_human[(i) % texts_human.length]);
                d3.select("#right_poem").call(add_typewriter_text, texts_ai[(i) % texts_ai.length]);
            } else {
                d3.select("#left_poem").call(add_typewriter_text, texts_ai[(i) % texts_ai.length]);
                d3.select("#right_poem").call(add_typewriter_text, texts_human[(i) % texts_human.length]);
            }

            timeout.restart(function () {
                if (d3.select("#poem-comparison").style("visibility") == "visible") {

                    d3.select("#right_poem").selectAll("p").transition().delay(0).attr("cursor", false);
                    d3.select("#left_poem").selectAll("p").transition().delay(0).attr("cursor", false);
                    d3.select("#right_poem").selectAll("p").transition("typing"); //cancels the transitions
                    d3.select("#left_poem").selectAll("p").transition("typing");
                    d3.select("#poem-selector").style("visibility", "visible");          
                    d3.select("#select_text").style("visibility", "visible");
                    d3.select("#poem-comparison").style("visibility", "hidden");
                    d3.select("#ethical-question").style("visibility", "hidden");

                }
            }, 70000);
        });

        choice_selection.append("div")
        .classed("float-child", true)
        .append("img")
       // .classed("vertical-center", true)
        .attr("src", (d, i) => "/images/" + '(' + (i+1) + ')' + ".jpg")
        .style("max-height", "100%")
        .style("max-width", "100%");

    choice_selection.append("div")
        .classed("float-child", true)
        .append("p")
        .classed("margin-5", true)
        .style("max-height", "100%")
        .style("line-height", "150%")
        .style("overflow", "hidden")
        .text(d => {
            let new_string = d.substring(0, 1000).split(".");
            return new_string.slice(0, new_string.length - 1).flat() + " ...";
        }
        );

    d3.select("#poem-selector").select("#down").on("click", () => {
        selected = Math.min(++selected, 46);
        document.getElementById(`poem-select-${selected}`).scrollIntoView();
    });
    d3.select("#poem-selector").select("#up").on("click", () => {
        selected = Math.max(--selected, 0);
        document.getElementById(`poem-select-${selected}`).scrollIntoView();
    });

    d3.select("#back-button").on("click", () => {
        console.log("stopped timer");
        timeout.stop();

        if (d3.select("#poem-comparison").style("visibility") == "visible") {
            d3.select("#right_poem").selectAll("p").transition().delay(0).attr("cursor", false);
            d3.select("#left_poem").selectAll("p").transition().delay(0).attr("cursor", false);
            d3.select("#right_poem").selectAll("p").transition("typing"); //cancels the transitions
            d3.select("#left_poem").selectAll("p").transition("typing");
            d3.select("#poem-selector").style("visibility", "visible");
            d3.select("#select_text").style("visibility", "visible");
            d3.select("#poem-comparison").style("visibility", "hidden");
            d3.select("#ethical-question").style("visibility", "hidden");

        }
    });
}

function change_state(state) {
    let floating_poems = d3.select("#page1").selectAll('.float-container');
    let floating_children = floating_poems.selectAll('.float-child');
    let human_poems = floating_poems.select('.float-child');

    switch (state) {
        case 0: // engineering sonnets
            d3.select("#page1").select("#hacktxt_container")
                .transition()
                .duration(5000)
                .style("opacity", 0);

            floating_poems.transition()
                .duration(5000)
                .style("opacity", 1);

            floating_children.transition()
                .duration(5000)
                .style("opacity", 1);

            floating_poems.selectAll("img")
                .transition()
                .duration(5000)
                .style("opacity", 1);

            setTimeout(function () {
                d3.select("#page1").select("h1")
                    .text("Engineering")
                    .append('span')
                    .style('display', 'block')
                    .text("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Sonnets");
            }, 3000);

            break;

        case 1: // Based on abstracts from TUDelft theses
            floating_children.transition()
                .duration(5000)
                .style("opacity", 0);

            setTimeout(function () {
                d3.select("#page1").select("h1")
                    .text("Based on")
                    .append('span')
                    .style('display', 'block')
                    .text(" Abstracts from")
                    .append('span')
                    .style('display', 'block')
                    .text("TU Delft theses");
            }, 3000);

            break;

        case 2: // Written by bauke & jeroen
            floating_children.transition()
                .duration(5000)
                .style("opacity", 0);

            floating_poems.selectAll("img")
                .transition()
                .duration(5000)
                .style("opacity", 0);

            human_poems.transition()
                .duration(5000)
                .style("opacity", 1);

            setTimeout(function () {
                d3.select("#page1").select("h1")
                    .text("Sonnets written by")
                    .append('span')
                    .style('display', 'block')
                    .text("Jeroen & Bauke");
            }, 3000);

            break;

        case 3: // Can Ai generate scientific Sonnets
            d3.select("#page1").select("h1")
                .transition()
                .duration(5000)
                .style("opacity", 0);

            floating_poems.transition()
                .duration(5000)
                .style("opacity", 0);

            d3.select("#page1").select("#hacktxt_container")
                .transition()
                .duration(5000)
                .style("opacity", 1);

            setTimeout(function () {
                d3.select("#page1").select("h1")
                    .text("");
            }, 3000);

            break;
        default:
            break;
    }
}

/**
 * Write the text using a typewriter effect.
 * @param {*} selection 
 * @param {*} text 
 */
function add_typewriter_text(selection, text) {

    let data = text.split('\n')
    data = data.map(elem => elem == "" ? "\n" : elem);

    let delays = data.reduce(
        (partialSumArray, a) => {
            partialSumArray.push(a.length + partialSumArray[partialSumArray.length - 1]);
            return partialSumArray
        }
        , [0]);

    selection
        .selectAll("p")
        .data(data)
        .join(
            enter => enter.append("p").attr("cursor", false).call(typing),
            update => update.text("").call(typing),
            exit => exit.remove()
        );

    function typing(selection) {
        selection
            .transition("typing")
            .duration(d => d.length * 50)
            .delay((d, i) => 50 * delays[i])
            .attr("cursor", true)
            .textTween(function (d) {
                const i = d3.interpolateRound(0, d.length);
                return function (t) { return d.slice(0, i(t)); };
            })
            .transition()
            .delay(0)
            .attr("cursor", false);
    }
}

/**
 * Move elements randomly across the screen including a depth effect, 
 * @param {*} selection 
 */
function moveRandomly(selection) {
    selection.each(function animateWrap() {
        let self = this;

        let original_width = parseFloat(d3.select(this).style("width"));
        let original_height = parseFloat(d3.select(this).style("height"));
        let original_font_size = parseFloat(d3.select(this).style("font-size"));

        animation();

        function animation() {

            let scale = Math.random() * 3;
            let delay = Math.random()
            d3.select(self)
                .transition("move")
                .duration(1000 + delay * 3000)
                .style('top', (Math.random() - 0.2) * 125 + '%')
                .style('left', (Math.random() - 0.2) * 125 + '%')
                .style('width', (scale + 0.1) * original_width + "px")
                .style('height', (scale + 0.1) * original_height + "px")
                .style('font-size', (scale + 0.1) * original_font_size + "px")
                .tween('order', function () {
                    var interpolator = d3.interpolateRound(1, 10000);
                    // this returned function will be called a couple
                    // of times to animate anything you want inside
                    // of your custom tween

                    return function(t) {
                        let elem = d3.select(this);
                        let currentWidth = parseFloat(elem.style("width"));
                        elem.style('filter', "brightness(" + (((currentWidth) - 0.5) / (original_width * 3.1)) + ")");
                        elem.style('z-index', interpolator((currentWidth) / (original_width * 3.1)));
                    };

                })
                .transition()
                .duration(15000 - 3000 * (delay))
                .on("end", animation);
        }
    });
}

function createPoemContainers(selection, text, n_containers) {
    let data = text.slice(0, n_containers);

    let text_left = [];
    let text_right = [];

    data.forEach(function (d) {
        text_left.push(d.left);
        text_right.push(d.right);
    });

    let container =
        selection
            .data(data)
            .enter()
            .append("div")
            .style("left","50%")
            .style("top","100%")
            .style("width", "400px")
            .style("height", "250px")
            .style("font-size", "5em")
            .classed('float-container poem-container absolute', true);

    add_poem("left_poem", text_left);
    add_poem("right_poem", text_right);

    container
        .append('img')
        .attr("src", (d, i) => "images/" + '(' + (i+1) + ')' + ".jpg");

    function add_poem(poem_class, text) {
        let poem = container
            .append('div')
            .attr("class", "float-child")
            .append('div')
            .attr("class", "padding-5 margin-10 border-3 fill-black")
            .append('div');
        poem.classed(`animated-text-container ${poem_class}`, true);

        poem
            .data(text)
            .each(function (d) {
                d3.select(this)
                    .call(add_typewriter_text, d);
            });

        d3.interval(() => {
            poem
                .each(function (d) {
                    d3.select(this)
                        .call(add_typewriter_text, d);
                });
        }, 30000);
    }
}
