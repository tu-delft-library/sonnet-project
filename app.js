import {Blurb,blurb} from "./modules/d3-blurb/blurb.js";
import {supplant_typewriter_replace} from "./modules/d3-blurb/supplant_styles.js"


let svg = d3.select("#left_poem")
.attr("preserveAspectRatio", "xMinYMin meet");

let svg2 = d3.select("#right_poem")
.attr("preserveAspectRatio", "xMinYMin meet");

d3.text("data/quotes.txt")
    .then(function(corpus){
        let texts = corpus.split('§');

            let b = blurb();
            svg.append(b.create());
            b.datum(texts[0],'*')
             .supplant(supplant_typewriter_replace,40000);
        
            //weird bug, where the svg is nor properly updated. So need to write "nothing" for the svg to be rendered
            svg.node().innerHTML += "";
            b.update()();

            d3.interval(() => b.update()(), 50000);


            let v = blurb();
            svg2.append(v.create());
            v.datum(texts[1],'*')          
             .supplant(supplant_typewriter_replace, 40000);

            //weird bug, where the svg is nor properly updated. So need to write "nothing" for the svg to be rendered
            svg2.node().innerHTML += "";
            v.update()();

            d3.interval(() => v.update()(), 50000);
    }
    );