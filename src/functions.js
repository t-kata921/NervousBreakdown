// Functions Only

/**
 * @description Parse. Use async&await
 * @param {Number} ms Time to Parse
 * @returns {Promise}
 */
const sleep = ms => new Promise(r=>setTimeout(r,ms));

/**
 * @description Return the Element which has the input selector
 * @param {String} e Selector
 * @returns {HTMLElement}
 */
const $ = e=>document.querySelector(e);

/**
 * @description Fade Animation
 * @param {HTMLElement} b Element shown before the animation
 * @param {HTMLElement} a Element shown after the animation
 * @returns {null}
 */
const fade = async (b,a)=>{
    b.classList.add('fadeout');
    await sleep(690);
    b.classList.remove('fadeout', 'showing');
    await sleep(200);
    a.classList.add('fadein','showing');
    await sleep(690);
    a.classList.remove('fadein');
}

/**
 * @description Converts int to str (length >= `digits`)
 * @param {Number} n Number to convert
 * @param {Number} degit Digit
 * @returns {String} Converted String
 */
const num2str = (n, degit=2)=>{
    const str = String(n);
    if(str.length >= degit){ return str; }
    const zeros = "0".repeat(degit - str.length);
    if(n<0){ return "-" + zeros + str.replace("-",""); }
    return zeros + str;
};

/**
 * @description Get Random Value between `max` and `min`
 * @param {Number} max
 * @param {Number} min Default:0
 */
const rand = (max, min=0)=>Math.floor(Math.random() * (max-min)) + min;

export {sleep, $, fade, num2str, rand};