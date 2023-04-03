var svg = d3.select("#coolsvg");
var textwidth = 800;

 var sentences = [
//    "The use of AI in art raises interesting questions", "about the role of serendipity in the creative process.",
//     "While AI can create art that is aesthetically pleasing,",  "it lacks the element of human emotion that is often present in human-made art.",
//     "Distinguishing between AI art and human-made art can be difficult", "as both can be visually stunning and thought-provoking.",
//     "AI-generated art can sometimes be surprising and unexpected,", "leading to moments of serendipity that are similar to those in human-made art.",
//     "The use of AI in art blurs the line between man and machine,", "and raises questions about what it means to be creative.",
//     "While AI can create art that is technically perfect,","it may lack the idiosyncrasies that make human-made art unique and memorable.",
//     "The question of whether AI-generated art can be considered 'art' in the traditional sense is a hotly debated topic in the art world.",
//     "While AI-generated art may lack the imperfections of human-made art,", "it can also lack the human touch that makes art resonate with viewers.",
    "The serendipitous moments that can occur during the creation of human-made art are often what give it its power and emotional resonance.",
    "While AI-generated art can be impressive in its technical mastery, it is ultimately up to viewers to decide whether it has the same emotional impact as human-made art",
    "With the rise of AI-generated art, it's becoming increasingly difficult to distinguish between human-made art and AI-generated art.",
    "While AI can create art that mimics human-made art, it can also generate art that is completely original and unexpected.",
    "One of the challenges of distinguishing AI art from human-made art is the role of serendipity in the creative process.",
    "Serendipity refers to the element of chance or luck that can play a role in the creation of art, and AI can also incorporate this element into its creations.",
    "Some argue that the presence of serendipity in AI-generated art makes it more difficult to distinguish from human-made art.",
    "However, others argue that there are still certain qualities and characteristics that are unique to human-made art and can't be replicated by AI.",
    "For example, human-made art often reflects the artist's personal experiences, emotions, and worldview, while AI-generated art is based solely on algorithms and data.",
    "Another factor to consider when distinguishing AI art from human-made art is the level of intentionality behind the creation of the work.",
    "Human-made art is typically created with a specific intention or purpose in mind, while AI-generated art may not have a clear intention behind it.",
    "Ultimately, whether we can distinguish AI art from human-made art may depend on our individual perspectives and definitions of what constitutes art and creativity.",
    "While AI can create art that mimics human-made art, it can also generate art that is completely original and unexpected.",
    "One of the challenges of distinguishing AI art from human-made art is the role of serendipity in the creative process.",
    "Serendipity refers to the element of chance or luck that can play a role in the creation of art, and AI can also incorporate this element into its creations.",
    "Some argue that the presence of serendipity in AI-generated art makes it more difficult to distinguish from human-made art.",
    "While AI can create art that mimics human-made art, it can also generate art that is completely original and unexpected.",
    "One of the challenges of distinguishing AI art from human-made art is the role of serendipity in the creative process.",
    "Serendipity refers to the element of chance or luck that can play a role in the creation of art, and AI can also incorporate this element into its creations.",
    "Some argue that the presence of serendipity in AI-generated art makes it more difficult to distinguish from human-made art.",
    "However, others argue that there are still certain qualities and characteristics that are unique to human-made art and can't be replicated by AI.",
    "For example, human-made art often reflects the artist's personal experiences, emotions, and worldview, while AI-generated art is based solely on algorithms and data.",
    "Another factor to consider when distinguishing AI art from human-made art is the level of intentionality behind the creation of the work.",
    "Human-made art is typically created with a specific intention or purpose in mind, while AI-generated art may not have a clear intention behind it.",
    "Ultimately, whether we can distinguish AI art from human-made art may depend on our individual perspectives and definitions of what constitutes art and creativity.",
    "While AI can create art that mimics human-made art, it can also generate art that is completely original and unexpected.",
    "One of the challenges of distinguishing AI art from human-made art is the role of serendipity in the creative process.",
    "Serendipity refers to the element of chance or luck that can play a role in the creation of art, and AI can also incorporate this element into its creations.",
    "Some argue that the presence of serendipity in AI-generated art makes it more difficult to distinguish from human-made art.",
    "The serendipitous moments that can occur during the creation of human-made art are often what give it its power and emotional resonance.",
    "While AI-generated art can be impressive in its technical mastery, it is ultimately up to viewers to decide whether it has the same emotional impact as human-made art",
    "With the rise of AI-generated art, it's becoming increasingly difficult to distinguish between human-made art and AI-generated art.",
    "While AI can create art that mimics human-made art, it can also generate art that is completely original and unexpected.",
    "One of the challenges of distinguishing AI art from human-made art is the role of serendipity in the creative process.",
    "Serendipity refers to the element of chance or luck that can play a role in the creation of art, and AI can also incorporate this element into its creations.",
    "Some argue that the presence of serendipity in AI-generated art makes it more difficult to distinguish from human-made art.",
    "However, others argue that there are still certain qualities and characteristics that are unique to human-made art and can't be replicated by AI.",
    "For example, human-made art often reflects the artist's personal experiences, emotions, and worldview, while AI-generated art is based solely on algorithms and data.",
    "Another factor to consider when distinguishing AI art from human-made art is the level of intentionality behind the creation of the work.",
    "Human-made art is typically created with a specific intention or purpose in mind, while AI-generated art may not have a clear intention behind it.",
    "Ultimately, whether we can distinguish AI art from human-made art may depend on our individual perspectives and definitions of what constitutes art and creativity.",
    "While AI can create art that mimics human-made art, it can also generate art that is completely original and unexpected.",
    "One of the challenges of distinguishing AI art from human-made art is the role of serendipity in the creative process."];

svg.select("#appearing_text")
    .selectAll('tspan')
    .data(sentences)
    .enter()
    .append('tspan')
    .text(d => d);

movelines();

function movelines(){
    let selection = svg.selectAll("#appearing_text tspan");

    //setup
    selection
        .attr("scale", "1")
        .attr("font-size", "0.5em")
        .attr("y", "60%")
        .attr("x", "0")
        .attr("fill", "white")
        .attr("width", "100%")
        
    //animate    
    selection
        .each(function(d) {
        
        let self = this;
        move();
        
        function move(){

            let scale = d3.select(self).attr("scale");
            let y = parseFloat(d3.select(self).attr("y"));
            let x = parseFloat(d3.select(self).attr("x"));

            let newscale = bounded(0.25,(scale * Math.random()+0.5),4);

            d3.select(self)
            .transition()
            .ease(d3.easeLinear)
            .duration(1500)
            //.attr("scale", bounded(0.25,newscale, 4))
            //.attr("font-size",newscale * 20 )
            .attr("y", bounded(25, y + (Math.random()-0.5)*20, 85) + "%")
            .attr("x", bounded(20, x + (Math.random()-0.5)*20, 20) + "%")
            .on("end", move);
        }
    });
}

function bounded(lower_bound, value, upper_bound){
    return Math.min(Math.max(value, lower_bound), upper_bound);
}
