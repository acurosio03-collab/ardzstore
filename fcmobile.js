/* ==========================================
   ARDZ STORE
   FC MOBILE
   FCMOBILE.JS V1
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

// Nomor WhatsApp Admin
const ADMIN_WA = "6283185954674";

/* ==========================================
   DATA PRODUK FC MOBILE
========================================== */

const products = [

    // FC Points
    {id:1, nama:"40 FC Points", harga:7000},
    {id:2, nama:"100 FC Points", harga:15000},
    {id:3, nama:"520 FC Points", harga:69000},
    {id:4, nama:"1070 FC Points", harga:135000},
    {id:5, nama:"2200 FC Points", harga:269000},
    {id:6, nama:"5750 FC Points", harga:679000},
    {id:7, nama:"12000 FC Points", harga:1359000},

    // Star Pass
    {id:8, nama:"Star Pass Premium", harga:129000},

    // Bundle
    {id:9, nama:"Welcome Pack", harga:49000},
    {id:10, nama:"Special Bundle", harga:99000}

];

/* ==========================================
   DATA PESANAN
========================================== */

// Produk yang dipilih
let selectedProduct = null;

// Metode pembayaran
let selectedPayment = "QRIS";

// Nominal diskon
let discount = 0;

// Voucher yang digunakan
let voucherUsed = "";

/* ==========================================
   KONSTANTA
========================================== */

const GAME_NAME = "FC Mobile";
const DEFAULT_REGION = "Asia";
/* ==========================================
   FCMOBILE.JS V1
   BAGIAN 2
   HELPER FUNCTION
========================================== */

/* ==========================================
   FORMAT RUPIAH
========================================== */

function rupiah(angka){

    return "Rp " +
    Number(angka).toLocaleString("id-ID");

}

/* ==========================================
   GAMBAR PRODUK
========================================== */

function getProductImage(nama){

    nama = nama.toLowerCase();

    // Star Pass
    if(nama.includes("star")){

        return "bintang.jpeg";

    }

    // Welcome Pack
    if(nama.includes("welcome")){

        return "bandle.jpeg";

    }

    // Bundle
    if(nama.includes("bundle")){

        return "bandle.jpeg";

    }

    // Default FC Points
    return "bola.jpeg";

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
   HELPER GET ELEMENT
========================================== */

function $(id){

    return document.getElementById(id);

}
/* ==========================================
   FCMOBILE.JS V1
   BAGIAN 3
   RENDER PRODUK
========================================== */

function renderProducts(){

    const productList = $("productList");

    if(!productList){

        console.error(
            "Element #productList tidak ditemukan."
        );

        return;

    }

    productList.innerHTML = "";

    products.forEach((item,index)=>{

        productList.innerHTML += `

        <div class="product-card"
             onclick="selectProduct(${index})">

            <img
                src="${getProductImage(item.nama)}"
                alt="${item.nama}">

            <h3>

                ${item.nama}

            </h3>

            <div class="product-price">

                ${rupiah(item.harga)}

            </div>

            <button
                type="button"
                class="btn-primary">

                Pilih

            </button>

        </div>

        `;

    });

}
/* ==========================================
   FCMOBILE.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Simpan produk yang dipilih
    selectedProduct = products[index];

    // Hapus status aktif semua card
    document
    .querySelectorAll(".product-card")
    .forEach(card=>{

        card.classList.remove("active");

    });

    // Aktifkan card yang dipilih
    const cards =
    document.querySelectorAll(".product-card");

    if(cards[index]){

        cards[index]
        .classList.add("active");

    }

    // Detail Pesanan
    if($("produk")){

        $("produk").textContent =
        selectedProduct.nama;

    }

    if($("total")){

        $("total").textContent =
        rupiah(getTotalHarga());

    }

    // Ringkasan Checkout
    if($("summaryProduk")){

        $("summaryProduk").textContent =
        selectedProduct.nama;

    }

    if($("summaryTotal")){

        $("summaryTotal").textContent =
        rupiah(getTotalHarga());

    }

    if($("summaryPayment")){

        $("summaryPayment").textContent =
        selectedPayment;

    }

    if($("summaryRegion") && $("region")){

        $("summaryRegion").textContent =
        $("region").value;

    }

    // Simpan otomatis jika LocalStorage aktif
    if(typeof saveOrder === "function"){

        saveOrder();

    }

}
/* ==========================================
   FCMOBILE.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

/* ==========================================
   DAFTAR VOUCHER
========================================== */

const vouchers = {

    "ARDZ10": 10,

    "FC5": 5,

    "HEMAT20": 20

};

/* ==========================================
   TERAPKAN VOUCHER
========================================== */

function applyVoucher(){

    if(selectedProduct === null){

        alert(
            "Silakan pilih produk terlebih dahulu."
        );

        return;

    }

    const input = $("voucher");
    const info = $("voucherInfo");

    if(!input) return;

    const code = input.value
        .trim()
        .toUpperCase();

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
            "✅ Voucher berhasil digunakan (" +
            persen +
            "% OFF)";

            info.style.color = "#22c55e";

        }

        // Simpan otomatis
        if(typeof saveOrder === "function"){

            saveOrder();

        }

    }else{

        voucherUsed = "";

        discount = 0;

        if(info){

            info.textContent =
            "❌ Voucher tidak valid.";

            info.style.color = "#ef4444";

        }

        if($("total")){

            $("total").textContent =
            rupiah(selectedProduct.harga);

        }

        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(selectedProduct.harga);

        }

    }

}

/* ==========================================
   EVENT TOMBOL VOUCHER
========================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

    const btn = $("applyVoucher");

    if(btn){

        btn.addEventListener(
            "click",
            applyVoucher
        );

    }

});
/* ==========================================
   FCMOBILE.JS V1
   BAGIAN 6
   SISTEM PEMBAYARAN
========================================== */

/* ==========================================
   INIT PAYMENT
========================================== */

function initPayment(){

    const cards = document.querySelectorAll(".payment-card");

    if(cards.length === 0){

        console.warn("Payment card tidak ditemukan.");

        return;

    }

    cards.forEach(card=>{

        card.addEventListener("click",function(){

            // Hapus status aktif
            cards.forEach(item=>{

                item.classList.remove("active");

            });

            // Aktifkan pembayaran yang dipilih
            this.classList.add("active");

            // Simpan metode pembayaran
            selectedPayment = this.dataset.payment;

            // Update Ringkasan Checkout
            if($("summaryPayment")){

                $("summaryPayment").textContent =
                selectedPayment;

            }

            // Update Region
            if($("summaryRegion") && $("region")){

                $("summaryRegion").textContent =
                $("region").value;

            }

            // Simpan otomatis
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

    const first =
    document.querySelector(".payment-card");

    if(first){

        first.classList.add("active");

        selectedPayment =
        first.dataset.payment || "QRIS";

        if($("summaryPayment")){

            $("summaryPayment").textContent =
            selectedPayment;

        }

    }

}

/* ==========================================
   UPDATE REGION
========================================== */

function initRegion(){

    const region = $("region");

    if(!region) return;

    region.addEventListener("change",()=>{

        if($("summaryRegion")){

            $("summaryRegion").textContent =
            region.value;

        }

        if(typeof saveOrder === "function"){

            saveOrder();

        }

    });

}
/* ==========================================
   FCMOBILE.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */

/* ==========================================
   CHECKOUT
========================================== */

function checkoutWhatsApp(){

    // Ambil User ID
    const userId = $("userId")?.value.trim() || "";

    if(userId === ""){

        alert("Masukkan User ID FC Mobile terlebih dahulu.");

        $("userId").focus();

        return;

    }

    // Nickname (Opsional)
    const nickname =
    $("nickname")?.value.trim() || "-";

    // Region
    const region =
    $("region")?.value || DEFAULT_REGION;

    // Produk
    if(selectedProduct === null){

        alert("Silakan pilih produk FC Mobile terlebih dahulu.");

        return;

    }

    // Total pembayaran
    const total = getTotalHarga();

    // Pesan WhatsApp
    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up FC Mobile.

━━━━━━━━━━━━━━━━━━

⚽ Game : ${GAME_NAME}

🆔 User ID : ${userId}

👤 Nickname : ${nickname}

🌍 Region : ${region}

💎 Produk : ${selectedProduct.nama}

💰 Harga : ${rupiah(selectedProduct.harga)}

🎁 Voucher : ${voucherUsed || "-"}

💸 Diskon : ${rupiah(discount)}

💵 Total Bayar : ${rupiah(total)}

💳 Pembayaran : ${selectedPayment}

━━━━━━━━━━━━━━━━━━

Mohon diproses.

Terima kasih 🙏`;

    window.open(
        "https://wa.me/" +
        ADMIN_WA +
        "?text=" +
        encodeURIComponent(pesan),
        "_blank"
    );

}

/* ==========================================
   EVENT TOMBOL CHECKOUT
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
   FCMOBILE.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */

/* ==========================================
   STORAGE KEY
========================================== */

const STORAGE_KEY = "fcmobile_last_order";

/* ==========================================
   SIMPAN PESANAN
========================================== */

function saveOrder(){

    const data = {

        userId: $("userId") ? $("userId").value : "",

        nickname: $("nickname") ? $("nickname").value : "",

        region: $("region") ? $("region").value : DEFAULT_REGION,

        payment: selectedPayment,

        voucher: voucherUsed,

        discount: discount,

        productId: selectedProduct ? selectedProduct.id : null

    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

/* ==========================================
   MUAT PESANAN
========================================== */

function loadOrder(){

    const data = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );

    if(!data) return;

    // User ID
    if($("userId")){

        $("userId").value = data.userId || "";

    }

    // Nickname
    if($("nickname")){

        $("nickname").value = data.nickname || "";

    }

    // Region
    if($("region")){

        $("region").value =
        data.region || DEFAULT_REGION;

    }

    // Payment
    if(data.payment){

        selectedPayment = data.payment;

        document.querySelectorAll(".payment-card")
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

    // Region Summary
    if($("summaryRegion")){

        $("summaryRegion").textContent =
        data.region || DEFAULT_REGION;

    }

    // Voucher
    voucherUsed = data.voucher || "";

    discount = data.discount || 0;

    if($("voucher")){

        $("voucher").value = voucherUsed;

    }

    // Produk terakhir
    if(data.productId){

        const index = products.findIndex(
            item => item.id === data.productId
        );

        if(index !== -1){

            selectProduct(index);

        }

    }

}

/* ==========================================
   AUTO SAVE INPUT
========================================== */

[
    "userId",
    "nickname",
    "region"
]
.forEach(id=>{

    const el = $(id);

    if(el){

        el.addEventListener(
            "input",
            saveOrder
        );

        el.addEventListener(
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
   FCMOBILE.JS V1
   BAGIAN 9
   LIVE ORDER + POPUP + EFFECT
========================================== */

/* ==========================================
   LIVE ORDER
========================================== */

const liveOrders = [

    {
        nama:"Budi",
        kota:"Jakarta",
        produk:"520 FC Points"
    },

    {
        nama:"Andi",
        kota:"Bandung",
        produk:"1070 FC Points"
    },

    {
        nama:"Rizky",
        kota:"Surabaya",
        produk:"2200 FC Points"
    },

    {
        nama:"Fajar",
        kota:"Medan",
        produk:"Star Pass Premium"
    },

    {
        nama:"Agus",
        kota:"Semarang",
        produk:"Welcome Pack"
    },

    {
        nama:"Dimas",
        kota:"Makassar",
        produk:"5750 FC Points"
    },

    {
        nama:"Rian",
        kota:"Bekasi",
        produk:"Special Bundle"
    }

];

function startLiveOrder(){

    const box = $("liveOrder");

    if(!box) return;

    function showOrder(){

        const item =
        liveOrders[
            Math.floor(
                Math.random() *
                liveOrders.length
            )
        ];

        box.innerHTML = `

        <strong>
        🛒 Pesanan Baru
        </strong>

        <br>

        ${item.nama}
        dari
        ${item.kota}

        <br>

        membeli
        <b>
        ${item.produk}
        </b>

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

    const closeBtn = $("closePromo");

    const promoBtn = $("promoButton");

    if(!popup) return;

    if(localStorage.getItem("fcmobile_promo_seen")){

        popup.style.display = "none";

        return;

    }

    setTimeout(()=>{

        popup.classList.add("show");

    },1000);

    if(closeBtn){

        closeBtn.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "fcmobile_promo_seen",
                "true"
            );

        });

    }

    if(promoBtn){

        promoBtn.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "fcmobile_promo_seen",
                "true"
            );

            const voucher = $("voucher");

            if(voucher){

                voucher.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    }

}

/* ==========================================
   BACK TO TOP
========================================== */

function initBackToTop(){

    const button = $("backTop");

    if(!button) return;

    button.style.display = "none";

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 300){

            button.style.display = "flex";

        }else{

            button.style.display = "none";

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================
   EFEK CARD PRODUK
========================================== */

function initCardEffect(){

    document
    .querySelectorAll(".product-card")
    .forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform =
            "translateY(-8px)";

        });

        card.addEventListener("mouseleave",()=>{

            if(
                !card.classList.contains("active")
            ){

                card.style.transform =
                "translateY(0)";

            }

        });

    });

                                  }
/* ==========================================
   FCMOBILE.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    console.log("⚽ FC Mobile.js V1 Loaded");

    // Render daftar produk
    renderProducts();

    // Inisialisasi metode pembayaran
    initPayment();

    // Set pembayaran default
    setDefaultPayment();

    // Inisialisasi perubahan region
    initRegion();

    // Muat data pesanan terakhir
    loadOrder();

    // Live Order
    startLiveOrder();

    // Popup Promo
    initPromoPopup();

    // Tombol Back To Top
    initBackToTop();

    // Efek Card Produk
    initCardEffect();

    console.log("✅ FC Mobile siap digunakan.");

});
