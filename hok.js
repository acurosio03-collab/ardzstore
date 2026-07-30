// ==========================================
// ARDZ STORE
// HONOR OF KINGS
// hok.js
// ==========================================

// ==============================
// DATA DARI PANEL ADMIN
// ==============================

let dataNominal =
JSON.parse(localStorage.getItem("nominal")) || [];

// ==============================
// PRODUK BAWAAN HOK
// ==============================

const defaultProduk=[

{game:"Honor Of Kings",produk:"8 Tokens",harga:2500,badge:"HOT"},
{game:"Honor Of Kings",produk:"16 Tokens",harga:5000,badge:""},
{game:"Honor Of Kings",produk:"23 Tokens",harga:7000,badge:""},
{game:"Honor Of Kings",produk:"80 Tokens",harga:22000,badge:"BEST"},
{game:"Honor Of Kings",produk:"160 Tokens",harga:43000,badge:""},
{game:"Honor Of Kings",produk:"240 Tokens",harga:64000,badge:"TERLARIS"},
{game:"Honor Of Kings",produk:"320 Tokens",harga:85000,badge:""},
{game:"Honor Of Kings",produk:"400 Tokens",harga:106000,badge:""},
{game:"Honor Of Kings",produk:"560 Tokens",harga:147000,badge:"BEST"},
{game:"Honor Of Kings",produk:"800 Tokens",harga:209000,badge:""},
{game:"Honor Of Kings",produk:"1200 Tokens",harga:312000,badge:""},
{game:"Honor Of Kings",produk:"1600 Tokens",harga:415000,badge:""},
{game:"Honor Of Kings",produk:"2400 Tokens",harga:618000,badge:""},
{game:"Honor Of Kings",produk:"4000 Tokens",harga:1025000,badge:"HOT"},

{game:"Honor Of Kings",produk:"Weekly Card",harga:28000,badge:"POPULER"},
{game:"Honor Of Kings",produk:"Monthly Card",harga:79000,badge:"BEST"}

];

// ==============================
// AMBIL DATA DARI PANEL ADMIN
// ==============================

let produkHOK=[];

if(dataNominal.length>0){

dataNominal.forEach(item=>{

let game=item.game.toLowerCase().trim();

if(

game=="honor of kings" ||

game=="honor of king" ||

game=="hok"

){

produkHOK.push({

produk:item.produk,

harga:Number(item.supplier)+
Number(item.profit),

badge:"ADMIN"

});

}

});

}

// Jika panel admin kosong

if(produkHOK.length==0){

produkHOK=defaultProduk;

}

// ==============================

const list=
document.getElementById("hok-products");
// ==============================
// TAMPILKAN PRODUK HOK
// ==============================

function loadHOK(){

if(!list) return;

list.innerHTML="";

produkHOK.forEach((item,index)=>{

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

let gambar="assets/products/token.png";

let nama=item.produk.toLowerCase();

if(nama.includes("weekly")){

gambar="assets/products/weeklycard.png";

}

else if(nama.includes("monthly")){

gambar="assets/products/monthlycard.png";

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

Honor Of Kings

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

}// ==============================
// PRODUK TERPILIH
// ==============================

let produkDipilih = null;

// ==============================
// PILIH PRODUK
// ==============================

function pilihProduk(index){

produkDipilih = produkHOK[index];

// Isi Detail Pesanan
document.getElementById("produk").innerHTML =
produkDipilih.produk;

document.getElementById("total").innerHTML =
"Rp " +
Number(produkDipilih.harga)
.toLocaleString("id-ID");

// Hilangkan efek pilihan sebelumnya
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

// Card yang dipilih
let cardDipilih =
semuaCard[index];

if(cardDipilih){

cardDipilih.style.border =
"2px solid #ff9800";

cardDipilih.style.boxShadow =
"0 0 20px rgba(255,152,0,.8)";

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

function checkoutHOK(){

let userid =
document.getElementById("userid").value.trim();

let payment =
document.getElementById("payment").value;

let catatan =
document.getElementById("catatan").value.trim();

// Validasi Player ID
if(userid==""){

alert("Masukkan Player ID terlebih dahulu!");

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

Saya ingin melakukan Top Up Honor Of Kings.

━━━━━━━━━━━━━━━

🎮 Game : Honor Of Kings

🆔 Player ID : ${userid}

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

loadHOK();

});
