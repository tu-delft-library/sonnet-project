import { Blurb, blurb } from "./modules/d3-blurb/blurb.js";
import { supplant_typewriter_replace } from "./modules/d3-blurb/supplant_styles.js"


let svg = d3.select("#page4 #left_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

let svg2 = d3.select("#page4 #right_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

d3.text("data/quotes.txt")
    .then(function (corpus) {
        let texts = corpus.split('§');

        let b = blurb();
        svg.append(b.create());
        b.datum(texts[0], '*')
            .supplant(supplant_typewriter_replace, 40000);

        //weird bug, where the svg is nor properly updated. So need to write "nothing" for the svg to be rendered
        svg.node().innerHTML += "";
        b.update()();

        d3.interval(() => b.update()(), 50000);


        let v = blurb();
        svg2.append(v.create());
        v.datum(texts[1], '*')
            .supplant(supplant_typewriter_replace, 40000);

        //weird bug, where the svg is nor properly updated. So need to write "nothing" for the svg to be rendered
        svg2.node().innerHTML += "";
        v.update()();

        d3.interval(() => v.update()(), 50000);
    }
    );

let floating_poems = d3.select("#page1").selectAll('.float-container');

var data = [{ left: "left 1", right: "right 1" }, { left: "left 2", right: "right 2" }, { left: "left 3", right: "right 3" }, { left: "left 4", right: "right 4" },{ left: "left 5", right: "right 5" },{ left: "left 6", right: "right 6" }];
floating_poems
    .data(data)
    .enter()
    .call(createPoemContainer)

floating_poems = d3.select("#page1").selectAll('.float-container');
floating_poems
    .call(moveRandomly)
    ;

function moveRandomly(selection) {
    // selection
    //     .style('top', '0%')
    //     .style('left', '0%')
    //     ;

    selection.each(function animateWrap() {
        let self = this;

        let original_width = parseFloat(d3.select(this).style("width"));
        let original_height = parseFloat(d3.select(this).style("height"));
        console.log(original_height);
        animation();

        function animation() {

            let scale = Math.random() * 1.5
            d3.select(self)
                .transition()
                .duration(4000 + Math.random() * 1000)
                .ease(d3.easeLinear)
                .style('top', Math.random() * 100 + '%')
                .style('left', Math.random() * 100 + '%')
                .style('width', (scale+0.5) * original_width + "px")
                .style('height',(scale+0.5) * original_height + "px")
                .on("end", animation)
                ;
        }
    });
}

function createPoemContainer(selection) {

    let container = selection
        .append("div")
        .style("width", "300px")
        .classed('float-container absolute', true)
        ;
    let svg = container
        .append('div')
        .attr("class", "float-child")
        .append('div')
        .attr("class", "padding-5 margin-10 border-3 fill-black")
        .style('margin-right', '15%')
        .append('svg')
        ;
    svg.classed('animated-text-svg-container left_poem', true)
        ;
    let svg2 = container
        .append('div')
        .attr("class", "float-child")
        .append('div')
        .attr("class", "padding-5 margin-10 border-3 fill-black")
        .style('margin-right', '15%')
        .append('svg')
        ;
    svg2
        .classed('animated-text-svg-container right_poem', true)
        ;
}