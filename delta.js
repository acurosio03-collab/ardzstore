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

                    }/* ==========================================
   DELTA.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Simpan produk yang dipilih
    selectedProduct = products[index];

    // Hapus status aktif dari semua card
    document
    .querySelectorAll(".product-card")
    .forEach(card=>{
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
        $("total").textContent =
        rupiah(getTotalHarga());
    }

    // Update Ringkasan Checkout
    if($("summaryProduk")){
        $("summaryProduk").textContent =
        selectedProduct.nama;
    }

    if($("summaryTotal")){
        $("summaryTotal").textContent =
        rupiah(getTotalHarga());
    }

    // Update Server ke Ringkasan
    if($("server") && $("summaryServer")){
        $("summaryServer").textContent =
        $("server").value;
    }

    console.log(
        "Delta Force dipilih:",
        selectedProduct.nama
    );

    // Simpan otomatis jika LocalStorage sudah dibuat
    if(typeof saveOrder === "function"){
        saveOrder();
    }

}

/* ==========================================
   UPDATE SERVER
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const server = $("server");

    if(server){

        server.addEventListener("change",()=>{

            if($("summaryServer")){

                $("summaryServer").textContent =
                server.value;

            }

            if(typeof saveOrder === "function"){

                saveOrder();

            }

        });

    }

});
/* ==========================================
   DELTA.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

/* ==========================================
   DAFTAR VOUCHER
========================================== */

const vouchers = {

    "DELTA10": 10,

    "ARDZ10": 10,

    "HEMAT20": 20

};

/* ==========================================
   APPLY VOUCHER
========================================== */

function applyVoucher(){

    // Pastikan produk dipilih
    if(selectedProduct === null){

        alert("Pilih produk Delta Force terlebih dahulu.");

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

            selectedProduct.harga *

            persen / 100

        );

        // Update Detail Pesanan
        if($("total")){

            $("total").textContent =
            rupiah(getTotalHarga());

        }

        // Update Ringkasan
        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(getTotalHarga());

        }

        if(info){

            info.textContent =
            "✅ Voucher " +
            code +
            " berhasil digunakan (" +
            persen +
            "% OFF)";

            info.style.color = "#22c55e";

        }

        if(typeof saveOrder === "function"){

            saveOrder();

        }

    }else{

        voucherUsed = "";

        discount = 0;

        if($("total")){

            $("total").textContent =
            rupiah(getTotalHarga());

        }

        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(getTotalHarga());

        }

        if(info){

            info.textContent =
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
   DELTA.JS V1
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

            // Update Ringkasan
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
   DELTA.JS V1
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

Saya ingin melakukan Top Up *Delta Force*.

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
   DELTA.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */

const DELTA_STORAGE_KEY = "ardz_delta_order";

/* ==========================================
   SIMPAN ORDER
========================================== */

function saveOrder(){

    const data = {

        playerId: $("playerId")?.value || "",

        nickname: $("nickname")?.value || "",

        server: $("server")?.value || "Asia",

        productId: selectedProduct ? selectedProduct.id : null,

        payment: selectedPayment,

        voucher: voucherUsed,

        discount: discount

    };

    localStorage.setItem(

        DELTA_STORAGE_KEY,

        JSON.stringify(data)

    );

}

/* ==========================================
   LOAD ORDER
========================================== */

function loadOrder(){

    const data = JSON.parse(

        localStorage.getItem(

            DELTA_STORAGE_KEY

        )

    );

    if(!data) return;

    // Player ID
    if($("playerId")){

        $("playerId").value =

        data.playerId || "";

    }

    // Nickname
    if($("nickname")){

        $("nickname").value =

        data.nickname || "";

    }

    // Server
    if($("server")){

        $("server").value =

        data.server || "Asia";

    }

    if($("summaryServer")){

        $("summaryServer").textContent =

        data.server || "Asia";

    }

    // Voucher
    voucherUsed = data.voucher || "";

    discount = data.discount || 0;

    if($("voucher")){

        $("voucher").value = voucherUsed;

    }

    // Produk
    if(data.productId){

        const index = products.findIndex(

            p => p.id === data.productId

        );

        if(index !== -1){

            selectProduct(index);

        }

    }

    // Pembayaran
    if(data.payment){

        selectedPayment = data.payment;

        document
        .querySelectorAll(".payment-card")
        .forEach(card=>{

            card.classList.remove("active");

            if(card.dataset.payment === selectedPayment){

                card.classList.add("active");

            }

        });

        if($("summaryPayment")){

            $("summaryPayment").textContent =
            selectedPayment;

        }

    }

}

/* ==========================================
   AUTO SAVE INPUT
========================================== */

[
    "playerId",
    "nickname",
    "server"
].forEach(id=>{

    const input = $(id);

    if(input){

        input.addEventListener(

            "input",

            saveOrder

        );

        input.addEventListener(

            "change",

            saveOrder

        );

    }

});

/* ==========================================
   SIMPAN SAAT MENUTUP HALAMAN
========================================== */

window.addEventListener(

    "beforeunload",

    saveOrder

);
/* ==========================================
   DELTA.JS V1
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
        produk:"530 Delta Coin"
    },

    {
        nama:"Fajar",
        kota:"Bandung",
        produk:"Elite Battle Pass"
    },

    {
        nama:"Dimas",
        kota:"Surabaya",
        produk:"1060 Delta Coin"
    },

    {
        nama:"Andi",
        kota:"Medan",
        produk:"Special Weapon Bundle"
    },

    {
        nama:"Budi",
        kota:"Bekasi",
        produk:"2180 Delta Coin"
    }

];

function startLiveOrder(){

    const box = $("liveOrder");

    if(!box) return;

    function showOrder(){

        const order =
        liveOrders[
            Math.floor(
                Math.random() *
                liveOrders.length
            )
        ];

        box.innerHTML = `
        ⚔️ <b>Pesanan Baru</b><br>
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
   DELTA.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("⚔️ ARDZ STORE Delta Force Loaded");

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

    console.log("✅ Semua fitur Delta Force berhasil diaktifkan.");

});
