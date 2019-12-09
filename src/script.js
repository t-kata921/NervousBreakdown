import {sleep, $, fade, num2str, rand} from "./functions";

// 変数定義
let timer;
let isTwice = false;
let isAnimating = false;
let prevCard;
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

// Main
window.addEventListener('load',()=>{
    $("#start").addEventListener('click', async ()=>{
        $('span#remaining').innerText = cardRemaining;
        fade($('.start'),$('.game'));
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
        let min = 0;
        let sec = 0;
        let milSec = 0;
        $('span#time').innerText = `Memorize these cards within 10 secs.`;
        await sleep(7000);
        $('span#time').innerText = `3`;
        await sleep(1000);
        $('span#time').innerText = `2`;
        await sleep(1000);
        $('span#time').innerText = `1`;
        await sleep(1000);
        $('span#time').innerText = `Start`;
        document.querySelectorAll('.card').forEach(_=>{
            _.classList.remove('clicked');
            _.addEventListener('click',check);
        });
        await sleep(1000);
        timer = setInterval(async ()=>{
            milSec++;
            if(milSec >= 10){
                sec++;
                milSec -= 10;
            }
            if(sec >= 60){
                min++;
                sec -= 60;
            }
            $('span#time').innerText = `${num2str(min)} : ${num2str(sec)} . ${num2str(milSec,1)}`;

            if(cardRemaining <= 0){
                clearInterval(timer);
                fade($('.game'),$('.end'));
                $('span#finTime').innerText = `${num2str(min)} : ${num2str(sec)} . ${num2str(milSec,1)}`;

            }
        },100)
    });
    $('#again').addEventListener('click',()=>{
        location.reload();
    })
});