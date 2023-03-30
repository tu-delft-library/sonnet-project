import { set_correct } from "/modules/right-wrong/right-wrong.js";

d3.select("#page4 #left_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

d3.select("#page4 #right_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

/**
 * Load data, basically an init function, whith a state variables such as the counts
 */
d3.dsv(";", "/data/poems.csv").then((data) => {
    data.forEach((d) => {
        d.left = d.title + "\n\n" + d.text;
        d.right = "AI";
    });

    // Setup the welcome page
    let floating_poems = d3.select("#page1").selectAll('.float-container');
    floating_poems.call(createPoemContainers, data, 10);

    floating_poems = d3.select("#page1").selectAll('.float-container');
    floating_poems.call(moveRandomly);

    //setup the interactive poem selection
    var count = 0;
    var texts_human = [];
    var texts_ai = [];

    data.forEach((d) => {
        texts_human.push(d.left);
        texts_ai.push(d.right);
    });

    d3.select("#left_poem")
        .call(add_typewriter_text, texts_human[(count) % texts_human.length]);
    d3.select("#right_poem")
        .call(add_typewriter_text, texts_ai[(count) % texts_ai.length]);

    d3.interval(() => {
        let correct_is_left = Math.floor(Math.random() * 2);
        set_correct(correct_is_left ? "left-button" : "right-button");

        count++;

        console.log(correct_is_left);

        if (correct_is_left) {
            d3.select("#left_poem").call(add_typewriter_text, texts_human[(count) % texts_human.length]);
            d3.select("#right_poem").call(add_typewriter_text, texts_ai[(count) % texts_ai.length]);
        } else {
            d3.select("#left_poem").call(add_typewriter_text, texts_ai[(count) % texts_ai.length]);
            d3.select("#right_poem").call(add_typewriter_text, texts_human[(count) % texts_human.length]);
        }
    }
        , 30000);
});

/**
 * Write the text using a typewriter effect.
 * @param {*} selection 
 * @param {*} text 
 */
function add_typewriter_text(selection, text) {

    console.log("called");

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
            update => update.text("").call(typing)
        );


    function typing(selection) {
        selection
            .transition()
            .duration(d => d.length * 50)
            .delay((d, i) => 50 * delays[i])
            .attr("cursor", true)
            .textTween(function (d) {
                const i = d3.interpolateRound(0, d.length);
                return function (t) { return d.slice(0, i(t)); };
            })
            .transition()
            .delay(0)
            .attr("cursor", false)
            ;
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

                .transition()
                .duration(1000 + delay * 3000)
                .style('top', (Math.random() - 0.2) * 125 + '%')
                .style('left', (Math.random() - 0.2) * 125 + '%')
                .style('width', (scale + 0.1) * original_width + "px")
                .style('height', (scale + 0.1) * original_height + "px")
                .style('font-size', (scale + 0.1) * original_font_size + "px")
                .tween('order', function () {
                    // create interpolator and do not show nasty floating numbers
                    var interpolator = d3.interpolateRound(1, 10000);
                    // this returned function will be called a couple
                    // of times to animate anything you want inside
                    // of your custom tween

                    return function (t) {
                        let elem = d3.select(this);
                        let currentWidth = parseFloat(elem.style("width"));
                        elem.style('filter', "brightness(" + (((currentWidth) - 0.5) / (original_width * 3.1)) + ")");
                        elem.style('z-index', interpolator((currentWidth) / (original_width * 3.1)));
                    };


                })
                .transition()
                .duration(29000 - 3000 * (delay))
                .on("end", animation)
                ;
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

    })

    let container =
        selection
            .data(data)
            .enter()
            .append("div")
            .style("width", "400px")
            .style("height", "250px")
            .style("font-size", "5em")
            .classed('float-container poem-container absolute', true)
        ;

    add_poem("left_poem", text_left);
    add_poem("right_poem", text_right);

    container
        .append('img')
        .attr("src", (d, i) => "images/" + (i + 1) + ".png");

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
