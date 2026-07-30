/* ==========================================
   ARDZ STORE
   PUBG MOBILE
   PUBG.JS PREMIUM V4
========================================== */

"use strict";

/* ==========================================
   BAGIAN 1
   KONFIGURASI & DATA PRODUK
========================================== */

// Nomor WhatsApp Admin
const ADMIN_WA = "6282295071107";

// Produk PUBG
const products = [
    {id:1, nama:"30 UC", harga:7000},
    {id:2, nama:"60 UC", harga:14000},
    {id:3, nama:"120 UC", harga:28000},
    {id:4, nama:"180 UC", harga:41000},
    {id:5, nama:"325 UC", harga:70000},
    {id:6, nama:"385 UC", harga:82000},
    {id:7, nama:"445 UC", harga:95000},
    {id:8, nama:"660 UC", harga:140000},
    {id:9, nama:"720 UC", harga:152000},
    {id:10, nama:"985 UC", harga:205000},
    {id:11, nama:"1320 UC", harga:274000},
    {id:12, nama:"1800 UC", harga:370000},
    {id:13, nama:"2460 UC", harga:505000},
    {id:14, nama:"3850 UC", harga:785000},
    {id:15, nama:"5650 UC", harga:1145000},
    {id:16, nama:"8100 UC", harga:1630000},
    {id:17, nama:"Royale Pass", harga:170000},
    {id:18, nama:"Elite Royale Pass", harga:340000},
    {id:19, nama:"Prime Membership", harga:35000},
    {id:20, nama:"Prime Plus", harga:90000}
];

// Voucher
const vouchers = {
    "ARDZ10":10,
    "PUBG5":5,
    "HEMAT20":20
};

// Variabel Global
let selectedProduct = null;
let selectedPayment = "QRIS";
let discount = 0;

/* ==========================================
   FUNGSI BANTU
========================================== */

// Format Rupiah
function rupiah(nominal){
    return "Rp " + Number(nominal).toLocaleString("id-ID");
}

// Gambar Produk
function getProductImage(nama){

    const text = nama.toLowerCase();

    if(text.includes("royale")){
        return "assets/products/royalepass.png";
    }

    if(text.includes("prime plus")){
        return "assets/products/primeplus.png";
    }

    if(text.includes("prime")){
        return "assets/products/prime.png";
    }

    return "uc.jpeg";
     }
/* ==========================================
   BAGIAN 2
   TAMPILKAN DAFTAR PRODUK
========================================== */

function renderProducts(){

    const productList = document.getElementById("productList");

    if(!productList){

        console.error("Element #productList tidak ditemukan!");

        return;

    }

    productList.innerHTML = "";

    products.forEach((item,index)=>{

        productList.innerHTML += `

        <div class="product-card" onclick="selectProduct(${index})">

            <img
                src="${getProductImage(item.nama)}"
                alt="${item.nama}"
                class="product-image">

            <h3>${item.nama}</h3>

            <p class="product-price">
                ${rupiah(item.harga)}
            </p>

            <button class="btn-primary">
                Pilih
            </button>

        </div>

        `;

    });

}
