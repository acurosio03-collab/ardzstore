// ==========================================
// ARDZ STORE
// ROBLOX
// roblox.js
// ==========================================

// ==============================
// DATA DARI PANEL ADMIN
// ==============================

let dataNominal =
JSON.parse(localStorage.getItem("nominal")) || [];

// ==============================
// PRODUK BAWAAN ROBLOX
// ==============================

const defaultProduk=[

{game:"Roblox",produk:"80 Robux",harga:15000,badge:"HOT"},
{game:"Roblox",produk:"160 Robux",harga:29000,badge:""},
{game:"Roblox",produk:"240 Robux",harga:43000,badge:""},
{game:"Roblox",produk:"320 Robux",harga:57000,badge:""},
{game:"Roblox",produk:"400 Robux",harga:71000,badge:"BEST"},
{game:"Roblox",produk:"560 Robux",harga:98000,badge:""},
{game:"Roblox",produk:"800 Robux",harga:139000,badge:"TERLARIS"},
{game:"Roblox",produk:"1200 Robux",harga:208000,badge:""},
{game:"Roblox",produk:"1700 Robux",harga:292000,badge:""},
{game:"Roblox",produk:"2000 Robux",harga:343000,badge:""},
{game:"Roblox",produk:"2800 Robux",harga:478000,badge:""},
{game:"Roblox",produk:"4500 Robux",harga:760000,badge:"BEST"},
{game:"Roblox",produk:"10000 Robux",harga:1680000,badge:"HOT"},

{game:"Roblox",produk:"Roblox Premium 450",harga:85000,badge:"POPULER"},
{game:"Roblox",produk:"Roblox Premium 1000",harga:170000,badge:"BEST"},
{game:"Roblox",produk:"Gift Card Roblox",harga:50000,badge:""}

];

// ==============================
// AMBIL DATA DARI PANEL ADMIN
// ==============================

let produkRoblox=[];

if(dataNominal.length>0){

dataNominal.forEach(item=>{

let game=item.game.toLowerCase().trim();

if(

game=="roblox"

){

produkRoblox.push({

produk:item.produk,

harga:Number(item.supplier)+
Number(item.profit),

badge:"ADMIN"

});

}

});

}

// Jika panel admin kosong

if(produkRoblox.length==0){

produkRoblox=defaultProduk;

}

// ==============================

const list=
document.getElementById("roblox-products");
// ==============================
// TAMPILKAN PRODUK ROBLOX
// ==============================

function loadRoblox(){

if(!list) return;

list.innerHTML="";

produkRoblox.forEach((item,index)=>{

let badge="";

switch(item.badge){

case "HOT":
badge='<div class="badge">🔥 HOT</div>';
break;

case "BEST":
badge='<div class="badge">⭐ BEST SELLER</div>';
break;

case "TERLARIS":
badge='<div class="badge">🏆 TERLARIS</div>';
break;

case "POPULER":
badge='<div class="badge">💎 POPULER</div>';
break;

case "ADMIN":
badge='<div class="badge">⚙ ADMIN</div>';
break;

default:
badge="";

}

// ==============================
// GAMBAR PRODUK
// ==============================

let gambar="assets/products/robux.png";

let nama=item.produk.toLowerCase();

if(nama.includes("premium")){

gambar="assets/products/premium.png";

}

else if(nama.includes("gift")){

gambar="assets/products/giftcard.png";

}

// ==============================
// TAMPILKAN CARD
// ==============================

list.innerHTML += `

<div class="produk-card">

${badge}

<img
src="${gambar}"
class="icon-diamond">

<h3>

${item.produk}

</h3>

<p>

Roblox Robux

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
// PRODUK TERPILIH
// ==============================

let produkDipilih = null;

// ==============================
// PILIH PRODUK
// ==============================

function pilihProduk(index){

produkDipilih = produkRoblox[index];

// Isi Detail Pesanan
document.getElementById("produk").innerHTML =
produkDipilih.produk;

document.getElementById("total").innerHTML =
"Rp " +
Number(produkDipilih.harga)
.toLocaleString("id-ID");

// Hapus efek pilihan sebelumnya
let semuaCard =
document.querySelectorAll(".produk-card");

semuaCard.forEach(card=>{

card.style.border =
"2px solid transparent";

card.style.boxShadow =
"none";

card.style.transform =
"scale(1)";

});

// Efek card yang dipilih
let cardDipilih =
semuaCard[index];

if(cardDipilih){

cardDipilih.style.border =
"2px solid #ff3b3b";

cardDipilih.style.boxShadow =
"0 0 20px rgba(255,59,59,.8)";

cardDipilih.style.transform =
"scale(1.03)";

}

// Scroll ke Detail Pesanan
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
"2px solid transparent";

card.style.boxShadow =
"none";

card.style.transform =
"scale(1)";

});

}

// ==============================
// FORMAT RUPIAH
// ==============================

function formatRupiah(angka){

return "Rp " +
Number(angka).toLocaleString("id-ID");

}
// ==============================
// CHECKOUT WHATSAPP
// ==============================

function checkoutRoblox(){

let userid =
document.getElementById("userid").value.trim();

let payment =
document.getElementById("payment").value;

let catatan =
document.getElementById("catatan").value.trim();

// Validasi Username
if(userid==""){

alert("Masukkan Username Roblox terlebih dahulu!");

return;

}

// Validasi Produk
if(produkDipilih==null){

alert("Silakan pilih produk terlebih dahulu!");

return;

}

// Ambil data produk
let produk = produkDipilih.produk;

let harga = Number(produkDipilih.harga)
.toLocaleString("id-ID");

// Susun pesan WhatsApp
let pesan =
`🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Roblox.

━━━━━━━━━━━━━━━

🎮 Game : Roblox

👤 Username : ${userid}

💎 Produk : ${produk}

💰 Total : Rp ${harga}

💳 Pembayaran : ${payment}

📝 Catatan : ${catatan=="" ? "-" : catatan}

━━━━━━━━━━━━━━━

Mohon diproses ya.
Terima kasih 🙏`;

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

loadRoblox();

});
