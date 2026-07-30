// ==========================================
// ARDZ STORE
// PUBG MOBILE
// pubg.js
// ==========================================

// ==============================
// DATA DARI PANEL ADMIN
// ==============================

let dataNominal =
JSON.parse(localStorage.getItem("nominal")) || [];

// ==============================
// PRODUK BAWAAN PUBG
// ==============================

const defaultProduk=[

{game:"PUBG Mobile",produk:"30 UC",harga:7000,badge:"HOT"},
{game:"PUBG Mobile",produk:"60 UC",harga:14000,badge:"BEST"},
{game:"PUBG Mobile",produk:"120 UC",harga:28000,badge:""},
{game:"PUBG Mobile",produk:"180 UC",harga:41000,badge:""},
{game:"PUBG Mobile",produk:"325 UC",harga:70000,badge:"TERLARIS"},
{game:"PUBG Mobile",produk:"385 UC",harga:82000,badge:""},
{game:"PUBG Mobile",produk:"445 UC",harga:95000,badge:""},
{game:"PUBG Mobile",produk:"660 UC",harga:140000,badge:"BEST"},
{game:"PUBG Mobile",produk:"720 UC",harga:152000,badge:""},
{game:"PUBG Mobile",produk:"985 UC",harga:205000,badge:""},
{game:"PUBG Mobile",produk:"1320 UC",harga:274000,badge:""},
{game:"PUBG Mobile",produk:"1800 UC",harga:370000,badge:""},
{game:"PUBG Mobile",produk:"2460 UC",harga:505000,badge:""},
{game:"PUBG Mobile",produk:"3850 UC",harga:785000,badge:""},
{game:"PUBG Mobile",produk:"5650 UC",harga:1145000,badge:""},
{game:"PUBG Mobile",produk:"8100 UC",harga:1630000,badge:"HOT"},

{game:"PUBG Mobile",produk:"Royale Pass",harga:170000,badge:"POPULER"},
{game:"PUBG Mobile",produk:"Elite Royale Pass",harga:340000,badge:"BEST"},
{game:"PUBG Mobile",produk:"Prime Membership",harga:35000,badge:""},
{game:"PUBG Mobile",produk:"Prime Plus",harga:90000,badge:""}

];

// ==============================
// AMBIL DATA DARI PANEL ADMIN
// ==============================

let produkPUBG=[];

if(dataNominal.length>0){

dataNominal.forEach(item=>{

let game=item.game.toLowerCase().trim();

if(

game=="pubg" ||

game=="pubg mobile"

){
  // ==============================
// TAMPILKAN PRODUK PUBG
// ==============================

function loadPUBG(){

if(!list) return;

list.innerHTML="";

produkPUBG.forEach((item,index)=>{

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

let gambar="assets/products/uc.png";

let nama=item.produk.toLowerCase();

if(nama.includes("royale")){

gambar="assets/products/royalepass.png";

}

else if(nama.includes("elite")){

gambar="assets/products/royalepass.png";

}

else if(nama.includes("prime plus")){

gambar="assets/products/primeplus.png";

}

else if(nama.includes("prime")){

gambar="assets/products/prime.png";

}

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

PUBG Mobile UC

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

produkDipilih = produkPUBG[index];

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

// Beri efek pada produk yang dipilih
let cardDipilih =
semuaCard[index];

if(cardDipilih){

cardDipilih.style.border =
"2px solid #f4c430";

cardDipilih.style.boxShadow =
"0 0 20px rgba(244,196,48,.8)";

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

function checkoutPUBG(){

let userid =
document.getElementById("userid").value.trim();

let payment =
document.getElementById("payment").value;

let catatan =
document.getElementById("catatan").value.trim();

// Validasi Character ID
if(userid==""){

alert("Masukkan Character ID terlebih dahulu!");

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

// Susun Pesan WhatsApp
let pesan =
`🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up PUBG Mobile.

━━━━━━━━━━━━━━━

🎮 Game : PUBG Mobile

🆔 Character ID : ${userid}

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

loadPUBG();

});
