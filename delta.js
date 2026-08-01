/* ==========================================
   ARDZ STORE
   DELTA FORCE
   DELTA.JS V1
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

// WhatsApp Admin
const ADMIN_WA = "6283185954674";

// Nama Game
const GAME_NAME = "Delta Force";

// Produk Default
const DEFAULT_PRODUCT = "Delta Coin";

/* ==========================================
   DATA PRODUK DELTA FORCE
========================================== */

const products = [

    // =========================
    // DELTA COIN
    // =========================

    {
        id: 1,
        nama: "60 Delta Coin",
        harga: 15000
    },

    {
        id: 2,
        nama: "330 Delta Coin",
        harga: 75000
    },

    {
        id: 3,
        nama: "530 Delta Coin",
        harga: 115000
    },

    {
        id: 4,
        nama: "1060 Delta Coin",
        harga: 225000
    },

    {
        id: 5,
        nama: "2180 Delta Coin",
        harga: 450000
    },

    {
        id: 6,
        nama: "5600 Delta Coin",
        harga: 1125000
    },

    // =========================
    // BATTLE PASS
    // =========================

    {
        id: 7,
        nama: "Elite Battle Pass",
        harga: 150000
    },

    {
        id: 8,
        nama: "Elite Battle Pass Plus",
        harga: 250000
    },

    // =========================
    // BUNDLE
    // =========================

    {
        id: 9,
        nama: "Special Weapon Bundle",
        harga: 299000
    },

    {
        id: 10,
        nama: "Premium Operator Bundle",
        harga: 499000
    }

];

/* ==========================================
   DATA ORDER
========================================== */

let selectedProduct = null;

let selectedPayment = "QRIS";

let discount = 0;

let voucherUsed = "";
/* ==========================================
   DELTA.JS V1
   BAGIAN 2
   HELPER FUNCTION
========================================== */

/* ==========================================
   FORMAT RUPIAH
========================================== */

function rupiah(angka){

    return "Rp " +

    Number(angka)

    .toLocaleString("id-ID");

}





/* ==========================================
   GAMBAR PRODUK
========================================== */

function getProductImage(nama){

    nama = nama.toLowerCase();

    // Delta Coin
    if(nama.includes("delta coin")){

        return "coin.jpeg";

    }

    // Battle Pass
    if(nama.includes("battle pass")){

        return "bintang.jpeg";

    }

    // Bundle
    if(nama.includes("bundle")){

        return "bandle.jpeg";

    }
  /* ==========================================
   DELTA.JS V1
   BAGIAN 3
   RENDER PRODUK
========================================== */

function renderProducts() {

    const productList = $("productList");

    if (!productList) {
        console.error("Element #productList tidak ditemukan.");
        return;
    }

    productList.innerHTML = "";

    products.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${getProductImage(item.nama)}" alt="${item.nama}">
            <h3>${item.nama}</h3>
            <p class="price">${rupiah(item.harga)}</p>

            <button
                class="btn-primary"
                type="button"
                onclick="selectProduct(${index})">
                Pilih
            </button>
        `;

        productList.appendChild(card);

    });

    console.log("Render Produk Delta Force berhasil.");
}

    // Default
    return "coin.jpeg";

}





/* ==========================================
   HITUNG TOTAL HARGA
========================================== */

function getTotalHarga(){

    if(selectedProduct === null){

        return 0;

    }

    return selectedProduct.harga - discount;

}





/* ==========================================
   ELEMENT HELPER
========================================== */

function $(id){

    return document.getElementById(id);

                    }
