// 関数たちOnlyなファイル

/**
 * @description 一時停止する。async&awaitを使用すること
 * @param {Number} ms 一時停止する秒数
 * @returns {Promise}
 */
const sleep = ms => new Promise(r=>setTimeout(r,ms));

/**
 * @description 入力されたセレクタを持つ要素を返す
 * @param {String} e セレクタ
 * @returns {HTMLElement}
 */
const $ = e=>document.querySelector(e);

/**
 * @description フェードアニメーションをやる。
 * @param {HTMLElement} b フェード前に表示されている要素
 * @param {HTMLElement} a フェード後に表示される要素
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
 * @description 渡された数をdegit桁以上の文字列に変換
 * @param {Number} n 変換したい数
 * @param {Number} degit 桁
 * @returns {String} degit桁
 */
const num2str = (n, degit=2)=>{
    const str = String(n);
    if(str.length >= degit){ return str; }
    const zeros = "0".repeat(degit - str.length);
    if(n<0){ return "-" + zeros + str.replace("-",""); }
    return zeros + str;
};

/**
 * @description 与えられたmaxとminの間のランダムな値を取得
 * @param {Number} max 最大値
 * @param {Number} min 最小値（デフォルト：0）
 */
const rand = (max, min=0)=>Math.floor(Math.random() * (max-min)) + min;

export {sleep, $, fade, num2str, rand};