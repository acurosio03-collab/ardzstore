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
/* ==========================================
   ARENA.JS V1
   BAGIAN 6
   SISTEM PEMBAYARAN
========================================== */

/* ==========================================
   INIT PAYMENT
========================================== */

function initPayment(){

    const payments =
    document.querySelectorAll(".payment-card");

    if(payments.length === 0){

        console.warn("Payment card tidak ditemukan.");

        return;

    }

    payments.forEach(card=>{

        card.addEventListener("click",()=>{

            // Hapus status active
            payments.forEach(item=>{

                item.classList.remove("active");

            });

            // Tambahkan active
            card.classList.add("active");

            // Simpan metode pembayaran
            selectedPayment =
            card.dataset.payment;

            // Update Ringkasan Checkout
            if($("summaryPayment")){

                $("summaryPayment").textContent =
                selectedPayment;

            }

            console.log(
                "Metode pembayaran:",
                selectedPayment
            );

            // Simpan LocalStorage
            if(typeof saveOrder === "function"){

                saveOrder();

            }

        });

    });

}

/* ==========================================
   DEFAULT PAYMENT
========================================== */

function setDefaultPayment(){

    const firstPayment =
    document.querySelector(".payment-card");

    if(!firstPayment) return;

    firstPayment.classList.add("active");

    selectedPayment =
    firstPayment.dataset.payment;

    if($("summaryPayment")){

        $("summaryPayment").textContent =
        selectedPayment;

    }

}
/* ==========================================
   ARENA.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */

function checkoutWhatsApp(){

    // Player ID
    const playerId = $("playerId")?.value.trim() || "";

    if(playerId === ""){

        alert("Masukkan Player ID terlebih dahulu.");

        $("playerId").focus();

        return;

    }

    // Nickname
    const nickname =
    $("nickname")?.value.trim() || "-";

    // Server
    const server =
    $("server")?.value || "Asia";

    // Produk
    if(selectedProduct === null){

        alert("Silakan pilih produk terlebih dahulu.");

        return;

    }

    const total = getTotalHarga();

    const message = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up *Arena Breakout*.

━━━━━━━━━━━━━━

🎮 Game :
${GAME_NAME}

🆔 Player ID :
${playerId}

👤 Nickname :
${nickname}

🌍 Server :
${server}

💎 Produk :
${selectedProduct.nama}

💰 Harga :
${rupiah(selectedProduct.harga)}

🎁 Voucher :
${voucherUsed || "-"}

💸 Diskon :
${rupiah(discount)}

💵 Total Bayar :
${rupiah(total)}

💳 Pembayaran :
${selectedPayment}

━━━━━━━━━━━━━━

Mohon segera diproses 🙏

Terima kasih.
`;

    window.open(

        "https://wa.me/" +
        ADMIN_WA +
        "?text=" +
        encodeURIComponent(message),

        "_blank"

    );

}

/* ==========================================
   BUTTON CHECKOUT
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const btn = $("checkoutBtn");

    if(btn){

        btn.addEventListener(

            "click",

            checkoutWhatsApp

        );

    }

});
/* ==========================================
   ARENA.JS V1
   BAGIAN 9
   LIVE ORDER + POPUP + EFFECT
========================================== */

/* ==========================================
   LIVE ORDER
========================================== */

const liveOrders = [

    {
        nama:"Rizky",
        kota:"Jakarta",
        produk:"610 Bonds"
    },

    {
        nama:"Fajar",
        kota:"Bandung",
        produk:"Season Pass"
    },

    {
        nama:"Dimas",
        kota:"Surabaya",
        produk:"3200 Bonds"
    },

    {
        nama:"Andi",
        kota:"Medan",
        produk:"Elite Bundle"
    },

    {
        nama:"Budi",
        kota:"Bekasi",
        produk:"Ultimate Bundle"
    }

];

function startLiveOrder(){

    const box = $("liveOrder");

    if(!box) return;

    function showOrder(){

        const order = liveOrders[
            Math.floor(
                Math.random() *
                liveOrders.length
            )
        ];

        box.innerHTML = `
            🎮 <b>Pesanan Baru</b><br>
            ${order.nama} dari ${order.kota}<br>
            membeli<br>
            <b>${order.produk}</b>
        `;

        box.classList.add("show");

        setTimeout(()=>{

            box.classList.remove("show");

        },5000);

    }

    setTimeout(showOrder,3000);

    setInterval(showOrder,12000);

}

/* ==========================================
   POPUP PROMO
========================================== */

function initPromoPopup(){

    const popup = $("promoPopup");
    const close = $("closePromo");
    const button = $("promoButton");

    if(!popup) return;

    setTimeout(()=>{

        popup.classList.add("show");

    },2500);

    if(close){

        close.onclick = ()=>{

            popup.classList.remove("show");

        };

    }

    if(button){

        button.onclick = ()=>{

            popup.classList.remove("show");

            if($("voucher")){

                $("voucher").scrollIntoView({

                    behavior:"smooth"

                });

            }

        };

    }

}

/* ==========================================
   BACK TO TOP
========================================== */

function initBackToTop(){

    const btn = $("backTop");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 400){

            btn.style.display = "flex";

        }else{

            btn.style.display = "none";

        }

    });

    btn.onclick = ()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

}

/* ==========================================
   EFEK CARD PRODUK
========================================== */

function initCardEffect(){

    const cards =
    document.querySelectorAll(".product-card");

    cards.forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform =
            "translateY(-10px)";

        });

        card.addEventListener("mouseleave",()=>{

            if(!card.classList.contains("active")){

                card.style.transform =
                "translateY(0)";

            }

        });

    });

}

/* ==========================================
   EFEK CARD PEMBAYARAN
========================================== */

function initPaymentEffect(){

    const cards =
    document.querySelectorAll(".payment-card");

    cards.forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform =
            "scale(1.05)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform =
            "scale(1)";

        });

    });

           }
/* ==========================================
   ARENA.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🎮 ARDZ STORE Arena Breakout Loaded");

    // Render semua produk
    renderProducts();

    // Muat data LocalStorage
    loadOrder();

    // Inisialisasi pembayaran
    initPayment();

    // Set pembayaran default
    setDefaultPayment();

    // Live Order
    startLiveOrder();

    // Popup Promo
    initPromoPopup();

    // Tombol Back To Top
    initBackToTop();

    // Efek Card Produk
    initCardEffect();

    // Efek Card Pembayaran
    initPaymentEffect();

    /* ======================================
       UPDATE PLAYER ID
    ====================================== */

    const playerId = $("playerId");

    if(playerId){

        const updatePlayer = () => {

            if($("summaryPlayerId")){

                $("summaryPlayerId").textContent =
                playerId.value || "-";

            }

            saveOrder();

        };

        playerId.addEventListener("input", updatePlayer);

        updatePlayer();

    }

    /* ======================================
       UPDATE NICKNAME
    ====================================== */

    const nickname = $("nickname");

    if(nickname){

        const updateNickname = () => {

            if($("summaryNickname")){

                $("summaryNickname").textContent =
                nickname.value || "-";

            }

            saveOrder();

        };

        nickname.addEventListener("input", updateNickname);

        updateNickname();

    }

    /* ======================================
       UPDATE SERVER
    ====================================== */

    const server = $("server");

    if(server){

        const updateServer = () => {

            if($("summaryServer")){

                $("summaryServer").textContent =
                server.value;

            }

            saveOrder();

        };

        server.addEventListener("change", updateServer);

        updateServer();

    }

    // Sinkronkan total jika produk sudah dipilih
    if(selectedProduct){

        if($("summaryProduk")){
            $("summaryProduk").textContent =
            selectedProduct.nama;
        }

        if($("summaryTotal")){
            $("summaryTotal").textContent =
            rupiah(getTotalHarga());
        }

        if($("produk")){
            $("produk").textContent =
            selectedProduct.nama;
        }

        if($("total")){
            $("total").textContent =
            rupiah(getTotalHarga());
        }

    }

    console.log("✅ Semua fitur Arena Breakout berhasil diaktifkan.");

});
