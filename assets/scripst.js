// =========================
// ARDZ STORE SCRIPT
// =========================


// Tombol mulai top up
const tombol = document.querySelector("button");

if(tombol){

tombol.addEventListener("click",function(){

document.querySelector("#game").scrollIntoView({

behavior:"smooth"

});

});

}



// Animasi kartu game saat muncul

const cards = document.querySelectorAll(".card");


const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}


});


});



cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(50px)";

card.style.transition="0.6s";


observer.observe(card);


});




// Efek tahun otomatis footer

let tahun = new Date().getFullYear();


let footer = document.querySelector("footer");


if(footer){

footer.innerHTML +=

"<p>� "+tahun+" ARDZ STORE</p>";

}
