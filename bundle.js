(()=>{"use strict";const a=a=>new Promise((e=>setTimeout(e,a))),e=a=>document.querySelector(a),i=async(e,i)=>{e.classList.add("fadeout"),await a(690),e.classList.remove("fadeout","showing"),await a(200),i.classList.add("fadein","showing"),await a(690),i.classList.remove("fadein")},s=(a,e=2)=>{const i=String(a);if(i.length>=e)return i;const s="0".repeat(e-i.length);return a<0?"-"+s+i.replace("-",""):s+i},n=(a,e=0)=>Math.floor(Math.random()*(a-e))+e;let t,l=!1,c=!1,r=120;const f="a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z AA BB CC DD EE FF GG HH II JJ KK LL".split(" "),o='<i class="far fa-heart"></i>\n<i class="far fa-gem"></i>\n<i class="fas fa-apple-alt"></i>\n<i class="far fa-bell"></i>\n<i class="fas fa-cat"></i>\n<i class="fas fa-dog"></i>\n<i class="fab fa-ello"></i>\n<i class="fab fa-envira"></i>\n<i class="far fa-eye"></i>\n<i class="fas fa-fish"></i>\n<i class="fas fa-frog"></i>\n<i class="far fa-hand-paper"></i>\n<i class="fas fa-ice-cream"></i>\n<i class="fas fa-horse"></i>\n<i class="fas fa-mobile-alt"></i>\n<i class="fas fa-pizza-slice"></i>\n<i class="fas fa-square-root-alt"></i>\n<i class="far fa-star"></i>\n<i class="fas fa-dice-three"></i>\n<i class="fas fa-dumbbell"></i>\n<i class="fas fa-gamepad"></i>\n<i class="fas fa-hat-cowboy"></i>\n<i class="far fa-hospital"></i>\n<i class="fas fa-lemon"></i>\n<i class="fas fa-camera"></i>\n<i class="fas fa-pen"></i>\n<i class="fas fa-pray"></i>\n<i class="fas fa-ribbon"></i>\n<i class="fas fa-rocket"></i>\n<i class="fas fa-school"></i>\n<i class="fas fa-ship"></i>\n<i class="fas fa-train"></i>'.split("\n"),d=o.concat(o);let m=o.length;const p=async function(){if(!c){if(this.classList.contains("clicked"))return!1;c=!0,this.classList.add("clicked"),l?(l=!1,await a(1e3),t===this.innerHTML&&(document.querySelectorAll(".card.clicked").forEach((a=>{a.classList.add("aligned"),a.removeEventListener("click",p)})),m--,e("span#remaining").innerText=m),document.querySelectorAll(".card.clicked").forEach((a=>a.classList.remove("clicked")))):(l=!0,t=this.innerHTML),c=!1}};window.addEventListener("load",(()=>{e("#start").addEventListener("click",(async()=>{i(e(".start"),e(".plan-phase")),await(async()=>{const i=r;let n=0;for(;n<i;)await a(1e3),n++,e("span#plan-time").innerText=`残り${s(i-n)}秒`})(),i(e(".plan-phase"),e(".game-phase")),await(async()=>{e("span#remaining").innerText=m;for(let a=0;a<64;a++){const i=n(d.length),s=document.createElement("div");s.innerHTML=d[i],s.classList.add("card","clicked"),s.style.gridArea=f[a],e(".boardContainer").appendChild(s),d.splice(i,1)}await a(1600),e("span#game-time").innerText="10秒間で配置を覚えてください（ドライバーは目を閉じてください）。",await a(7e3),e("span#game-time").innerText="3",await a(1e3),e("span#game-time").innerText="2",await a(1e3),e("span#game-time").innerText="1",await a(1e3),e("span#game-time").innerText="スタート！",document.querySelectorAll(".card").forEach((a=>{a.classList.remove("clicked"),a.addEventListener("click",p)}));let i=0;for(;i<120&&m>0;)await a(1e3),i++,e("span#game-time").innerText=`残り${s(120-i)}秒`;e("span#finTime").innerText=`${s(i)}秒`,e("span#finPair").innerText=32-m+"ペア"})(),i(e(".game-phase"),e(".review-phase")),await(async()=>{let i=0;for(;i<60;)await a(1e3),i++,e("span#review-time").innerText=`残り${s(60-i)}秒`})(),i(e(".review-phase"),e(".end"))})),e("#again").addEventListener("click",(()=>{let a=location.href+"?plantime=60";location.replace(a)}));let t=new URL(window.location.href).searchParams;if(null!==t.get("plantime")){r=parseInt(t.get("plantime"));let a="計画フェーズ（"+r.toString()+"秒）";document.getElementById("title-plan").innerText=a,document.getElementById("title-plan-phase").innerText=a}document.getElementById("next-url").innerText=location.href+"?plantime=60"}))})();