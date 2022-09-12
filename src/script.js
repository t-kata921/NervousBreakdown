import {sleep, $, fade, num2str, rand} from "./functions";

// 変数定義
let isTwice = false;
let isAnimating = false;
let prevCard;
const numPairs = 18;
const areas = "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J".split(" ");
const icons = `<i class="far fa-heart"></i>
<i class="far fa-gem"></i>
<i class="fas fa-apple-alt"></i>
<i class="far fa-bell"></i>
<i class="fas fa-cat"></i>
<i class="fas fa-dog"></i>
<i class="fab fa-ello"></i>
<i class="fab fa-envira"></i>
<i class="far fa-eye"></i>
<i class="fas fa-fish"></i>
<i class="fas fa-frog"></i>
<i class="far fa-hand-paper"></i>
<i class="fas fa-ice-cream"></i>
<i class="fas fa-horse"></i>
<i class="fas fa-mobile-alt"></i>
<i class="fas fa-pizza-slice"></i>
<i class="fas fa-square-root-alt"></i>
<i class="far fa-star"></i>`.split(`\n`);

const allCards = icons.concat(icons);
let cardRemaining = icons.length;

const check = async function(){
    if(!isAnimating){
        if(this.classList.contains("clicked")) return false;
        isAnimating = true;
        this.classList.add("clicked");
        if(isTwice){  // another
            isTwice = false;
            await sleep(1000);
            if(prevCard === this.innerHTML){  // Same card
                document.querySelectorAll('.card.clicked').forEach(_=>{
                    _.classList.add('aligned');
                    _.removeEventListener("click",check);
                });
                cardRemaining--;
                $('span#remaining').innerText = cardRemaining;
            }
            document.querySelectorAll('.card.clicked').forEach(_=>_.classList.remove('clicked'));
        }
        else{
            isTwice = true;
            prevCard = this.innerHTML;
        }
        isAnimating = false;
    }
}

const plan_phase = async () => {
    const limitSec = 120;

    let sec = 0;
    while (sec < limitSec) {
        await sleep(1000);
        sec++;
        $('span#plan-time').innerText = `残り${num2str(limitSec - sec)}秒`;
    }
    return;
}

const game_phase = async () => {
    const limitSec = 120;

    $('span#remaining').innerText = cardRemaining;

    for(let i=1; i<37; i++){
        const randIndex = rand(allCards.length);
        const card = document.createElement('div');
        card.innerHTML = allCards[randIndex];
        card.classList.add("card",'clicked');
        card.style.gridArea = areas[i-1];
        $('.boardContainer').appendChild(card);
        allCards.splice(randIndex, 1);
    }
    await sleep(1600);
    
    $('span#game-time').innerText = `10秒間で配置を覚えてください（ドライバーは目を閉じてください）。`;
    await sleep(7000);
    $('span#game-time').innerText = `3`;
    await sleep(1000);
    $('span#game-time').innerText = `2`;
    await sleep(1000);
    $('span#game-time').innerText = `1`;
    await sleep(1000);
    $('span#game-time').innerText = `スタート！`;

    document.querySelectorAll('.card').forEach(_=>{
        _.classList.remove('clicked');
        _.addEventListener('click',check);
    });

    let sec = 0;
    while (sec < limitSec && cardRemaining > 0) {
        await sleep(1000);
        sec++;
        $('span#game-time').innerText = `残り${num2str(limitSec-sec)}秒`;
    }
    $('span#finTime').innerText = `${num2str(sec)}秒`;
    $('span#finPair').innerText = `${numPairs - cardRemaining}ペア`;
    return;
}

const review_phase = async () => {
    const limitSec = 60;

    let sec = 0;
    while (sec < limitSec) {
        await sleep(1000);
        sec++;
        $('span#review-time').innerText = `残り${num2str(limitSec - sec)}秒`;
    }
    return;
}

// Main
window.addEventListener('load',()=>{
    $("#start").addEventListener('click', async ()=>{
        fade($('.start'),$('.plan-phase'));
        await plan_phase();
        fade($('.plan-phase'),$('.game-phase'));
        await game_phase();
        fade($('.game-phase'),$('.review-phase'));
        await review_phase();
        fade($('.review-phase'),$('.end'));
    });
    $('#again').addEventListener('click',()=>{
        location.reload();
    })
});
