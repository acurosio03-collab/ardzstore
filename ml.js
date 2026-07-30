// ==========================================
// ARDZ STORE
// MOBILE LEGENDS
// ml.js
// ==========================================

// ==============================
// DATA DARI PANEL ADMIN
// ==============================

let dataNominal =
JSON.parse(localStorage.getItem("nominal")) || [];

// ==============================
// PRODUK BAWAAN MOBILE LEGENDS
// ==============================

const defaultProduk=[

{game:"Mobile Legends",produk:"5 Diamond",harga:1500,badge:"HOT"},
{game:"Mobile Legends",produk:"11 Diamond",harga:3500,badge:""},
{game:"Mobile Legends",produk:"17 Diamond",harga:5000,badge:""},
{game:"Mobile Legends",produk:"28 Diamond",harga:8000,badge:""},
{game:"Mobile Legends",produk:"36 Diamond",harga:10000,badge:""},
{game:"Mobile Legends",produk:"44 Diamond",harga:12000,badge:""},
{game:"Mobile Legends",produk:"59 Diamond",harga:16000,badge:"BEST"},
{game:"Mobile Legends",produk:"74 Diamond",harga:20000,badge:""},
{game:"Mobile Legends",produk:"85 Diamond",harga:23000,badge:""},
{game:"Mobile Legends",produk:"110 Diamond",harga:29000,badge:"TERLARIS"},
{game:"Mobile Legends",produk:"170 Diamond",harga:44000,badge:""},
{game:"Mobile Legends",produk:"222 Diamond",harga:57000,badge:""},
{game:"Mobile Legends",produk:"257 Diamond",harga:66000,badge:""},
{game:"Mobile Legends",produk:"296 Diamond",harga:76000,badge:""},
{game:"Mobile Legends",produk:"370 Diamond",harga:94000,badge:"BEST"},
{game:"Mobile Legends",produk:"408 Diamond",harga:104000,badge:""},
{game:"Mobile Legends",produk:"514 Diamond",harga:130000,badge:""},
{game:"Mobile Legends",produk:"568 Diamond",harga:143000,badge:""},
{game:"Mobile Legends",produk:"716 Diamond",harga:179000,badge:""},
{game:"Mobile Legends",produk:"875 Diamond",harga:218000,badge:""},
{game:"Mobile Legends",produk:"966 Diamond",harga:240000,badge:""},
{game:"Mobile Legends",produk:"1045 Diamond",harga:260000,badge:""},
{game:"Mobile Legends",produk:"1412 Diamond",harga:349000,badge:""},
{game:"Mobile Legends",produk:"2010 Diamond",harga:495000,badge:""},
{game:"Mobile Legends",produk:"4830 Diamond",harga:1180000,badge:"HOT"},
{game:"Mobile Legends",produk:"Weekly Diamond Pass",harga:28000,badge:"POPULER"},
{game:"Mobile Legends",produk:"Twilight Pass",harga:145000,badge:""},
{game:"Mobile Legends",produk:"Starlight Member",harga:149000,badge:"BEST"},
{game:"Mobile Legends",produk:"Starlight Plus",harga:299000,badge:"HOT"}

];

// ==============================
// AMBIL DATA DARI PANEL ADMIN
// ==============================

let produkML=[];

if(dataNominal.length>0){

dataNominal.forEach(item=>{

let game=item.game.toLowerCase().trim();

if(

game=="mobile legends" ||

game=="mobile legend" ||

game=="ml" ||

game=="mlbb"

){

produkML.push({

produk:item.produk,

harga:Number(item.supplier)+
Number(item.profit),

badge:"ADMIN"

});

}

});

}

// Jika admin belum menambah produk

if(produkML.length==0){

produkML=defaultProduk;

}

// ==============================

const list=document.getElementById("ml-products");
// ==============================
// TAMPILKAN PRODUK
// ==============================

function loadML(){

if(!list) return;

list.innerHTML="";

produkML.forEach((item,index)=>{

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
// GANTI GAMBAR PRODUK
// ==============================

let gambar="assets/products/diamond.png";

let nama=item.produk.toLowerCase();

if(nama.includes("weekly")){

gambar="assets/products/weekpass.png";

}

else if(nama.includes("starlight plus")){

gambar="assets/products/starlightplus.png";

}

else if(nama.includes("starlight")){

gambar="assets/products/starlight.png";

}

else if(nama.includes("twilight")){

gambar="assets/products/twilight.png";

}

// ==============================

list.innerHTML+=`

<div class="produk-card">

${badge}

<img
src="${gambar}"
class="icon-diamond">

<h3>

${item.produk}

</h3>

<p>

Mobile Legends

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

produkDipilih = produkML[index];

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

// Card yang dipilih
let cardDipilih =
semuaCard[index];

if(cardDipilih){

cardDipilih.style.border =
"2px solid #00d9ff";

cardDipilih.style.boxShadow =
"0 0 20px rgba(0,217,255,.7)";

cardDipilih.style.transform =
"scale(1.03)";

}

// Scroll ke invoice (HP)
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

function checkoutML(){

let userid =
document.getElementById("userid").value.trim();

let zoneid =
document.getElementById("zoneid").value.trim();

let payment =
document.getElementById("payment").value;

let catatan =
document.getElementById("catatan").value.trim();

// Validasi User ID
if(userid==""){

alert("Masukkan User ID terlebih dahulu!");

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

Saya ingin melakukan Top Up Mobile Legends.

━━━━━━━━━━━━━━━

🎮 Game : Mobile Legends

🆔 User ID : ${userid}

🌐 Zone ID : ${zoneid=="" ? "-" : zoneid}

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

loadML();

});
