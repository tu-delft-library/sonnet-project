/**
 * Different styles for supplanting text in a blurb.
 * 
 * @author Koen Wösten
 * @version 0.1
 */

/**
 * Return the letter if the transistion progression t is past i/length
 * 
 * creates a typewriter like effect
 * @param {*} t 
 * @param {*} old old letter
 * @param {*} d data element on the letter
 * @param {*} i position in  text
 * @param {*} length total text length
 * @returns 
 */
function supplant_typewriter(t, old, d, i, length) {
    if (i == 0) {
        return d.c;
    }

    if (t < i / length) {
        return old;
    } else if ((t >= i / length) && (t < (i + 1) / length)) {
        return d.c + "|";
    } else {
        return d.c;
    }
}

/**
 * Return the letter if the transistion progression t is past i/length
 * 
 * creates a typewriter like effect
 * @param {*} t 
 * @param {*} old old letter
 * @param {*} d data element on the letter
 * @param {*} i position in  text
 * @param {*} length total text length
 * @returns 
 */
 function supplant_typewriter_replace(t, old, d, i, length) {
    if (i == 0) {
        return d.c;
    }

    if (t < i / length) {
        return "";
    } else if ((t >= i / length) && (t < (i + 1) / length)) {
        return d.c + "|";
    } else {
        return d.c;
    }
}

/**
 * Returns the new letter if the index of the first letter of the word its part of ia past teh tranistion threshold 
 * 
 * create a word at a time effect
 * 
 * @param {*} t 
 * @param {*} old old letter
 * @param {*} d data element on the letter 
 * @param {*} i position in  text
 * @param {*} length total text length
 * @returns 
 */
function supplant_default(t, old, d, i, length) {
    return (t < (i + d.wl - d.wi)/ length ? '' : d.c)
}

export { supplant_default, supplant_typewriter,supplant_typewriter_replace }