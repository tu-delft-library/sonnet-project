/**
 * @author Koen Wösten
 * @version 0.1
 */
export {Blurb, blurb};

function Blurb() {
  this._data =
    this._parent =
    this._selection = null;
  this._length = 0;
  this._index = 0;
  this.letters =
    this.sentences = null;
  this._supplant_f = supplant_default;
  this._supplant_t = null;
}

/**
 * returns a blurb instance.
 * @returns a blurb instance
 */
function blurb() {
  var b = new Blurb;
  return b;
}

Blurb.prototype = blurb.prototype = {
  constructor: Blurb,
  datum: blurb_datum,
  update: blurb_update,
  supplant: blurb_supplant,
  create: blurb_create,
}

function supplant_default(t, old, d, i, length){
  return (t < (i-d.wi)/length ? '' : d.c)
}

/**
 * Creates a constrtructor for the blurb instance DOM element.
 * 
 * @returns the constructor
 */
function blurb_create() {
  let self = this;

  return function () {

    let element = document.createElement("g");
    element.classList.add("animated-text");

    self._parent = d3.select(this);

    return element;
  }
}

/**
 * Set the supplant function to func.
 * 
 * @param {*} func the letter replacement function
 * @param {*} duration duration of the supplant in seconds (default 2500)
 * @returns 
 */
function blurb_supplant(func, duration=2500){
    let self = this;
    if (typeof func == 'function'){
      this._supplant_f = func;  
    
      this._supplant_t = function (selection) {
        selection.transition("supplant")
        .duration(duration)
        .ease(d3.easeLinear)
        .tween("text", (d,i,n) => {
          let length = n.length;
          let letter = d3.select(n[i]);
          let old = letter.text();
          let didit = false;

          return (t) => {
            if(i == 0){
              letter.attr("y", 0);
            }

            letter.style("opacity", 0);
            letter.text(self._supplant_f(t, old, d, i, length));

            if ((t > i/length) && !didit){  
              didit = true;  
              if(i == 0){
                letter.attr('x', 0)
                      .attr('y', 0);
              } else {
                if (d.wi == 0 || d.c == '\n'){
                  letter.text(d.w);
                  let bbox = letter.node().getBBox();
                  if (bbox.x + bbox.width > parseFloat(self._parent.style("width")) ||  d.c == '\n'){
                    letter.attr('x', 0)
                          .attr('y', parseFloat(d3.select(n[i-d.wi-1]).attr('y')) + 42);
                  } else {
                    letter.attr('x', parseFloat(d3.select(n[i-1]).attr('x')) + parseFloat(n[i-1].getBBox().width))
                          letter.attr('y', d3.select(n[i-1]).attr('y'));
                        
                  }
                  letter.text(self._supplant_f(t, old, d, i, length));

                } else {
                      letter.attr('x', parseFloat(d3.select(n[i-1]).attr('x')) + parseFloat(n[i-1].getBBox().width))
                      letter.attr('y', d3.select(n[i-1]).attr('y'));
                }
              }
            }

            letter.style("opacity", 1);
            }
          }
        )
      }
    }

    return this;
}

/**
 * update the blurb instance (replace the text)
 * @returns 
 */
function blurb_update() {
  let self = this;

  return function () {
    _blurb_next.apply(self);

    if(self._supplant_t){
      self.letters.call(self._supplant_t);
    }

    self._index = (self._index + 1) % self._length;

    return self;

  }
}

/**
 * 
 * @returns 
 */
function _blurb_next() {
  this._selection = this._parent.select("g.animated-text");
  let text = this._parent.select("g.animated-text")
    .datum(this._data);

  this.sentences = text.selectAll('text.animated-text-sentence')
    .data((d) => [d[this._index]])
    .join(
      enter => enter.append("text").classed("animated-text-sentence", true)
    )

  this.letters = this.sentences.selectAll('tspan')
    .data(d => {
        console.log(d);
        let d_split = d.split('');
        return d_split.slice(1).reduce( (previous, current) => {
          previous.push({c: current, 
                         i: previous[previous.length - 1].i + 1, 
                         w: current == ' ' ? previous[previous.length - 1].w+ 1: previous[previous.length - 1].w,
                         wi: previous[previous.length - 1].c == ' ' ? 0: previous[previous.length - 1].wi + 1}); 
          return previous; },
          [{c: d_split[0], i:0,w:0,wi:0}]);
      })
    .join('tspan')
      .classed("animated-text-letter", true);


  return this;
}

/**
 * Bind data to the instance
 * @param {*} data 
 * @param {*} delim character to split different 
 * @returns 
 */
function blurb_datum(data, delim='\n') {
  this._data = data.split(delim);
  this._length = this._data.length;

  return _blurb_next.apply(this);
} 
