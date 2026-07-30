// ==========================================
// ARDZ STORE
// VALORANT
// valorant.js
// ==========================================

// ==============================
// DATA DARI PANEL ADMIN
// ==============================

let dataNominal =
JSON.parse(localStorage.getItem("nominal")) || [];

// ==============================
// PRODUK BAWAAN VALORANT
// ==============================

const defaultProduk=[

{game:"Valorant",produk:"125 VP",harga:15000,badge:"HOT"},
{game:"Valorant",produk:"420 VP",harga:48000,badge:"BEST"},
{game:"Valorant",produk:"700 VP",harga:76000,badge:""},
{game:"Valorant",produk:"1375 VP",harga:145000,badge:"TERLARIS"},
{game:"Valorant",produk:"2400 VP",harga:245000,badge:""},
{game:"Valorant",produk:"4000 VP",harga:395000,badge:"BEST"},
{game:"Valorant",produk:"8150 VP",harga:790000,badge:"HOT"},

{game:"Valorant",produk:"Gift Card Valorant",harga:50000,badge:"POPULER"}

];

// ==============================
// AMBIL DATA DARI PANEL ADMIN
// ==============================

let produkValorant=[];

if(dataNominal.length>0){

dataNominal.forEach(item=>{

let game=item.game.toLowerCase().trim();

if(game=="valorant"){

produkValorant.push({

produk:item.produk,

harga:Number(item.supplier)+
Number(item.profit),

badge:"ADMIN"

});

}

});

}

// Jika panel admin kosong

if(produkValorant.length==0){

produkValorant=defaultProduk;

}

// ==============================

const list=
document.getElementById("valorant-products");
// ==============================
// TAMPILKAN PRODUK VALORANT
// ==============================

function loadValorant(){

if(!list) return;

list.innerHTML="";

produkValorant.forEach((item,index)=>{

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

let gambar="assets/products/vpcard.png";

let nama=item.produk.toLowerCase();

if(nama.includes("gift")){

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

Valorant Points

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

produkDipilih = produkValorant[index];

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
"2px solid #ff4655";

cardDipilih.style.boxShadow =
"0 0 20px rgba(255,70,85,.8)";

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

function checkoutValorant(){

let userid =
document.getElementById("userid").value.trim();

let tagline =
document.getElementById("tagline").value.trim();

let payment =
document.getElementById("payment").value;

let catatan =
document.getElementById("catatan").value.trim();

// ==============================
// VALIDASI RIOT ID
// ==============================

if(userid==""){

alert("Masukkan Riot ID terlebih dahulu!");

return;

}

if(tagline==""){

alert("Masukkan Tagline terlebih dahulu! (Contoh: #ID1)");

return;

}

// ==============================
// VALIDASI PRODUK
// ==============================

if(produkDipilih==null){

alert("Silakan pilih produk terlebih dahulu!");

return;

}

// ==============================
// DATA PRODUK
// ==============================

let produk = produkDipilih.produk;

let harga = Number(produkDipilih.harga)
.toLocaleString("id-ID");

// ==============================
// PESAN WHATSAPP
// ==============================

let pesan =
`🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Valorant.

━━━━━━━━━━━━━━━

🎮 Game : Valorant

👤 Riot ID : ${userid}

🏷️ Tagline : ${tagline}

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

loadValorant();

});
