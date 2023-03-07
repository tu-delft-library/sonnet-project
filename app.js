import { Blurb, blurb } from "./modules/d3-blurb/blurb.js";
import { supplant_typewriter_replace } from "./modules/d3-blurb/supplant_styles.js"


let svg1 = d3.select("#page4 #left_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

let svg2 = d3.select("#page4 #right_poem")
    .attr("preserveAspectRatio", "xMinYMin meet");

d3.text("data/quotes.txt")
    .then(function (corpus) {
        let texts = corpus.split('§');

        console.log(texts[0]);
        let b = blurb();
        svg1.append(b.create());
        b.datum(texts[0], '*')
            .supplant(supplant_typewriter_replace, 40000);

        //weird bug, where the svg is nor properly updated. So need to write "nothing" for the svg to be rendered
        svg1.node().innerHTML += "";
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

var data = [{ left: "left* 1§left *different", right: "right 1§right different" }, { left: "left 2", right: "right 2" }, { left: "left 3", right: "right 3" }, { left: "left 4", right: "right 4" },{ left: "left 5", right: "right 5" },{ left: "left 6", right: "right 6" },{ left: "left 6", right: "right 6" },{ left: "left 6", right: "right 6" },{ left: "left 6", right: "right 6" },{ left: "left 6", right: "right 6" },{ left: "left 6", right: "right 6" },{ left: "left 6", right: "right 6" }];
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
        animation();

        function animation() {

            let scale = Math.random() * 3;
            d3.select(self)
                .transition()
                .duration(4000 + Math.random() * 3000)
                //.ease(d3.easeBackInOut.overshoot(1.5))
                .style('top', (Math.random() - 0.2)* 125 + '%')
                .style('left', (Math.random() - 0.2)  * 125 + '%')
                .style('width', (scale+0.1) * original_width + "px")
                .style('height',(scale+0.1) * original_height + "px")
                .tween( 'order', function() {                    
                    // create interpolator and do not show nasty floating numbers
                    var interpolator = d3.interpolateRound( 1, 10000 );
                    var interpolator = d3.interpolateRound( 1, 10000 );

                    // this returned function will be called a couple
                    // of times to animate anything you want inside
                    // of your custom tween
                    return function( t ) {
                      let elem = d3.select(this);
                      let currentWidth =  parseFloat(elem.style("width"));
                      elem.style('opacity', (currentWidth) / (original_width*3.1*0.8) )
                      elem.style('z-index', interpolator((currentWidth) / (original_width*3.1) ));
                    };
                })
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

    svg.each(function(d) {
        let v = blurb();
        d3.select(this).append(v.create());
        v.datum(d.left, '*')
            .supplant(supplant_typewriter_replace, 3000);

        //weird bug, where the svg is nor properly updated. So need to write "nothing" for the svg to be rendered
        d3.select(this).node().innerHTML += "";
        v.update()();

        d3.interval(() => v.update()(), 5000);

    });

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