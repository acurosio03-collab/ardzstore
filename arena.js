/* ==========================================
   ARDZ STORE
   ARENA BREAKOUT
   ARENA.JS V1
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

// WhatsApp Admin
const ADMIN_WA = "6283185954674";

// Nama Game
const GAME_NAME = "Arena Breakout";

// Produk Default
const DEFAULT_PRODUCT = "Bonds";

/* ==========================================
   DATA PRODUK ARENA BREAKOUT
========================================== */

const products = [

    // =========================
    // BONDS
    // =========================

    {
        id: 1,
        nama: "60 Bonds",
        harga: 15000
    },

    {
        id: 2,
        nama: "310 Bonds",
        harga: 75000
    },

    {
        id: 3,
        nama: "610 Bonds",
        harga: 145000
    },

    {
        id: 4,
        nama: "1580 Bonds",
        harga: 365000
    },

    {
        id: 5,
        nama: "3200 Bonds",
        harga: 730000
    },

    {
        id: 6,
        nama: "6500 Bonds",
        harga: 1450000
    },

    // =========================
    // SEASON PASS
    // =========================

    {
        id: 7,
        nama: "Season Pass",
        harga: 149000
    },

    {
        id: 8,
        nama: "Premium Season Pass",
        harga: 249000
    },

    // =========================
    // BUNDLE
    // =========================

    {
        id: 9,
        nama: "Elite Bundle",
        harga: 299000
    },

    {
        id: 10,
        nama: "Ultimate Bundle",
        harga: 499000
    }

];

/* ==========================================
   DATA ORDER
========================================== */

// Produk yang dipilih
let selectedProduct = null;

// Pembayaran default
let selectedPayment = "QRIS";

// Diskon voucher
let discount = 0;

// Voucher yang digunakan
let voucherUsed = "";
/* ==========================================
   ARENA.JS V1
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

    // Bonds
    if(nama.includes("bonds")){

        return "diamond.jpeg";

    }

    // Season Pass
    if(nama.includes("season pass")){

        return "bintang.jpeg";

    }

    // Bundle
    if(nama.includes("bundle")){

        return "bandle.jpeg";

    }

    // Default
    return "diamond.jpeg";

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
/* ==========================================
   ARENA.JS V1
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
                type="button"
                class="btn-primary"
                onclick="selectProduct(${index})">

                Pilih

            </button>
        `;

        productList.appendChild(card);

    });

    console.log("Render Produk Arena Breakout berhasil.");

}
/* ==========================================
   ARENA.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Simpan produk yang dipilih
    selectedProduct = products[index];

    // Hapus status aktif semua card
    document
        .querySelectorAll(".product-card")
        .forEach(card => {
            card.classList.remove("active");
        });

    // Aktifkan card yang dipilih
    const cards = document.querySelectorAll(".product-card");

    if(cards[index]){
        cards[index].classList.add("active");
    }

    // Update Detail Pesanan
    if($("produk")){
        $("produk").textContent = selectedProduct.nama;
    }

    if($("total")){
        $("total").textContent = rupiah(getTotalHarga());
    }

    // Update Ringkasan Checkout
    if($("summaryProduk")){
        $("summaryProduk").textContent = selectedProduct.nama;
    }

    if($("summaryTotal")){
        $("summaryTotal").textContent = rupiah(getTotalHarga());
    }

    // Update Server
    if($("server") && $("summaryServer")){
        $("summaryServer").textContent = $("server").value;
    }

    console.log(
        "Produk Arena Breakout dipilih:",
        selectedProduct.nama
    );

    // Simpan otomatis jika fungsi tersedia
    if(typeof saveOrder === "function"){
        saveOrder();
    }

}

/* ==========================================
   UPDATE SERVER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const server = $("server");

    if(server){

        server.addEventListener("change", () => {

            if($("summaryServer")){
                $("summaryServer").textContent = server.value;
            }

            if(typeof saveOrder === "function"){
                saveOrder();
            }

        });

    }

});
/* ==========================================
   ARENA.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

/* ==========================================
   DAFTAR VOUCHER
========================================== */

const vouchers = {

    "ARENA10": 10,

    "ARDZ10": 10,

    "HEMAT20": 20

};

/* ==========================================
   APPLY VOUCHER
========================================== */

function applyVoucher(){

    // Pastikan produk dipilih
    if(selectedProduct === null){

        alert("Pilih produk Arena Breakout terlebih dahulu.");

        return;

    }

    const input = $("voucher");
    const info = $("voucherInfo");

    if(!input) return;

    const code = input.value.trim().toUpperCase();

    if(code === ""){

        alert("Masukkan kode voucher.");

        return;

    }

    if(vouchers.hasOwnProperty(code)){

        voucherUsed = code;

        const persen = vouchers[code];

        discount = Math.floor(
            selectedProduct.harga * persen / 100
        );

        // Update Detail Pesanan
        if($("total")){
            $("total").textContent = rupiah(getTotalHarga());
        }

        // Update Ringkasan
        if($("summaryTotal")){
            $("summaryTotal").textContent = rupiah(getTotalHarga());
        }

        if(info){

            info.innerHTML =
            "✅ Voucher <b>" +
            code +
            "</b> berhasil digunakan (" +
            persen +
            "% OFF)";

            info.style.color = "#22c55e";

        }

        console.log(
            "Voucher digunakan:",
            code,
            "Diskon:",
            discount
        );

        if(typeof saveOrder === "function"){
            saveOrder();
        }

    }else{

        voucherUsed = "";

        discount = 0;

        if($("total")){
            $("total").textContent = rupiah(getTotalHarga());
        }

        if($("summaryTotal")){
            $("summaryTotal").textContent = rupiah(getTotalHarga());
        }

        if(info){

            info.innerHTML =
            "❌ Voucher tidak valid.";

            info.style.color = "#ef4444";

        }

    }

}

/* ==========================================
   BUTTON VOUCHER
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const btn = $("applyVoucher");

    if(btn){

        btn.addEventListener(
            "click",
            applyVoucher
        );

    }

});
