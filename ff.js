// ==========================================
// ARDZ STORE
// FREE FIRE
// ff.js
// ==========================================

// ==============================
// DATA DARI PANEL ADMIN
// ==============================

let dataNominal =
JSON.parse(localStorage.getItem("nominal")) || [];

// ==============================
// PRODUK BAWAAN
// ==============================

const defaultProduk=[

{
game:"Free Fire",
produk:"5 Diamond",
harga:1000,
badge:"HOT"
},

{
game:"Free Fire",
produk:"12 Diamond",
harga:3000,
badge:""
},

{
game:"Free Fire",
produk:"50 Diamond",
harga:8000,
badge:"BEST"
},

{
game:"Free Fire",
produk:"70 Diamond",
harga:10000,
badge:""
},

{
game:"Free Fire",
produk:"100 Diamond",
harga:15000,
badge:""
},

{
game:"Free Fire",
produk:"140 Diamond",
harga:20000,
badge:"TERLARIS"
},

{
game:"Free Fire",
produk:"210 Diamond",
harga:29000,
badge:""
},

{
game:"Free Fire",
produk:"355 Diamond",
harga:47000,
badge:""
},

{
game:"Free Fire",
produk:"500 Diamond",
harga:66000,
badge:""
},

{
game:"Free Fire",
produk:"720 Diamond",
harga:94000,
badge:"BEST"
},

{
game:"Free Fire",
produk:"1000 Diamond",
harga:132000,
badge:""
},

{
game:"Free Fire",
produk:"1450 Diamond",
harga:191000,
badge:""
},

{
game:"Free Fire",
produk:"2180 Diamond",
harga:286000,
badge:""
},

{
game:"Free Fire",
produk:"3640 Diamond",
harga:475000,
badge:""
},

{
game:"Free Fire",
produk:"7290 Diamond",
harga:945000,
badge:"HOT"
},

{
game:"Free Fire",
produk:"Weekly Membership",
harga:28000,
badge:"POPULER"
},

{
game:"Free Fire",
produk:"Monthly Membership",
harga:85000,
badge:""
}

];

// ==============================
// GABUNGKAN DATA
// ==============================

let produkFF=[];

if(dataNominal.length>0){

dataNominal.forEach(item=>{

let game=item.game.toLowerCase().trim();

if(

game=="free fire" ||

game=="ff"

){

produkFF.push({

produk:item.produk,

harga:Number(item.supplier)+
Number(item.profit),

badge:"ADMIN"

});

}

});

}

// kalau panel admin kosong

if(produkFF.length==0){

produkFF=defaultProduk;

}

// ==============================

const list=

document.getElementById("ff-products");
// ==============================
// TAMPILKAN PRODUK
// ==============================

function loadFF(){

if(!list) return;

list.innerHTML="";

produkFF.forEach((item,index)=>{

let badge="";

if(item.badge=="HOT"){

badge='<div class="badge">🔥 HOT</div>';

}

else if(item.badge=="BEST"){

badge='<div class="badge">⭐ BEST</div>';

}

else if(item.badge=="TERLARIS"){

badge='<div class="badge">🏆 TERLARIS</div>';

}

else if(item.badge=="POPULER"){

badge='<div class="badge">💎 POPULER</div>';

}

else if(item.badge=="ADMIN"){

badge='<div class="badge">⚙ ADMIN</div>';

}

list.innerHTML+=`

<div class="produk-card">

${badge}

<img
src="assets/products/diamond.png"
class="icon-diamond">

<h3>

${item.produk}

</h3>

<p>

Diamond Free Fire

</p>

<h2>

Rp ${Number(item.harga).toLocaleString("id-ID")}

</h2>

<button

onclick="pilihProduk(${index})">

PILIH

</button>

</div>

`;

});

}
// ==============================
// DATA PRODUK YANG DIPILIH
// ==============================

let produkDipilih = null;

// ==============================
// PILIH PRODUK
// ==============================

function pilihProduk(index){

produkDipilih = produkFF[index];

document.getElementById("produk").innerHTML =
produkDipilih.produk;

document.getElementById("total").innerHTML =
"Rp " +
Number(produkDipilih.harga).toLocaleString("id-ID");

// Efek tombol aktif
let semuaCard =
document.querySelectorAll(".produk-card");

semuaCard.forEach(card=>{

card.style.border =
"1px solid transparent";

card.style.boxShadow =
"none";

});

let cardDipilih =
semuaCard[index];

if(cardDipilih){

cardDipilih.style.border =
"2px solid #00d9ff";

cardDipilih.style.boxShadow =
"0 0 20px rgba(0,217,255,.6)";

}

// Scroll ke detail pesanan jika di HP
let invoice =
document.querySelector(".invoice");

if(invoice){

invoice.scrollIntoView({

behavior:"smooth",

block:"center"

});

}

}

// ==============================
// RESET PILIHAN
// ==============================

function resetPilihan(){

produkDipilih = null;

document.getElementById("produk").innerHTML =
"Belum Dipilih";

document.getElementById("total").innerHTML =
"Rp 0";

let semuaCard =
document.querySelectorAll(".produk-card");

semuaCard.forEach(card=>{

card.style.border =
"1px solid transparent";

card.style.boxShadow =
"none";

});

}
// ==============================
// CHECKOUT WHATSAPP
// ==============================

function checkoutFF(){

let userid =
document.getElementById("userid").value.trim();

let zoneid =
document.getElementById("zoneid").value.trim();

let payment =
document.getElementById("payment").value;

// Validasi ID
if(userid==""){

alert("Masukkan Player ID terlebih dahulu!");

return;

}

// Validasi Produk
if(produkDipilih==null){

alert("Silakan pilih nominal terlebih dahulu!");

return;

}

// Ambil data
let produk = produkDipilih.produk;

let harga = Number(produkDipilih.harga)
.toLocaleString("id-ID");

// Susun pesan
let pesan =
`🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Free Fire.

━━━━━━━━━━━━━━━

🎮 Game : Free Fire

🆔 Player ID : ${userid}

🌐 Zone ID : ${zoneid=="" ? "-" : zoneid}

💎 Produk : ${produk}

💰 Total : Rp ${harga}

💳 Pembayaran : ${payment}

━━━━━━━━━━━━━━━

Mohon diproses ya, terima kasih.`;

// Buka WhatsApp
window.open(

"https://wa.me/6282295071107?text="+
encodeURIComponent(pesan),

"_blank"

);

}

// ==============================
// LOAD HALAMAN
// ==============================

document.addEventListener("DOMContentLoaded",function(){

loadFF();

});
