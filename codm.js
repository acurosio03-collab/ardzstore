/* ==========================================
   ARDZ STORE
   CALL OF DUTY MOBILE
   codm.js V1
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

const ADMIN_WA = "6283185954674";

/* ==========================================
   DATA PRODUK COD POINTS
========================================== */

const products = [

    {id:1, nama:"31 CP", harga:5000},
    {id:2, nama:"63 CP", harga:10000},
    {id:3, nama:"128 CP", harga:19000},
    {id:4, nama:"321 CP", harga:47000},
    {id:5, nama:"645 CP", harga:93000},
    {id:6, nama:"800 CP", harga:115000},
    {id:7, nama:"1373 CP", harga:185000},
    {id:8, nama:"2060 CP", harga:278000},
    {id:9, nama:"2750 CP", harga:370000},
    {id:10, nama:"3564 CP", harga:465000},
    {id:11, nama:"5618 CP", harga:735000},
    {id:12, nama:"7656 CP", harga:995000},

    {id:13, nama:"Ground Forces Subscription", harga:50000},
    {id:14, nama:"Battle Pass", harga:80000},
    {id:15, nama:"Battle Pass Bundle", harga:150000}

];

/* ==========================================
   DATA PESANAN
========================================== */

let selectedProduct = null;

let selectedPayment = "QRIS";

let discount = 0;

let voucherUsed = "";
/* ==========================================
   CODM.JS V1
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

    // Battle Pass Bundle
    if(nama.includes("bundle")){

        return "assets/products/battlepassbundle.png";

    }

    // Battle Pass
    if(nama.includes("battle")){

        return "assets/products/battlepass.png";

    }

    // Ground Forces
    if(nama.includes("ground")){

        return "assets/products/groundforces.png";

    }

    // COD Points
    return "assets/products/cp.png";

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
   AMBIL ELEMENT HTML
========================================== */

function $(id){

    return document.getElementById(id);

}
/* ==========================================
   CODM.JS V1
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
   CODM.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Simpan produk yang dipilih
    selectedProduct = products[index];

    // Hapus status aktif dari semua kartu
    document
    .querySelectorAll(".product-card")
    .forEach(card=>{

        card.classList.remove("active");

    });

    // Aktifkan kartu yang dipilih
    const cards =
    document.querySelectorAll(".product-card");

    if(cards[index]){

        cards[index]
        .classList.add("active");

    }

    // Update Detail Pesanan
    if($("produk")){

        $("produk").textContent =
        selectedProduct.nama;

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

    if($("summaryPayment")){

        $("summaryPayment").textContent =
        selectedPayment;

    }

    // Update Server
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
   CODM.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

/* ==========================================
   DAFTAR VOUCHER
========================================== */

const vouchers = {

    "ARDZ10": 10,

    "CODM5": 5,

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

    const code =
    input.value
    .trim()
    .toUpperCase();

    if(code === ""){

        alert(
            "Masukkan kode voucher."
        );

        return;

    }

    if(vouchers.hasOwnProperty(code)){

        voucherUsed = code;

        const persen =
        vouchers[code];

        discount = Math.floor(

            selectedProduct.harga *
            persen / 100

        );

        // Update Detail Pesanan
        if($("total")){

            $("total").textContent =
            rupiah(
                getTotalHarga()
            );

        }

        // Update Ringkasan
        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(
                getTotalHarga()
            );

        }

        if(info){

            info.textContent =
            "✅ Voucher berhasil digunakan (" +
            persen +
            "% OFF)";

            info.style.color =
            "#22c55e";

        }

        if(typeof saveOrder === "function"){

            saveOrder();

        }

    }else{

        voucherUsed = "";

        discount = 0;

        if(info){

            info.textContent =
            "❌ Voucher tidak valid.";

            info.style.color =
            "#ef4444";

        }

        if($("total")){

            $("total").textContent =
            rupiah(
                selectedProduct.harga
            );

        }

        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(
                selectedProduct.harga
            );

        }

    }

}

/* ==========================================
   EVENT TOMBOL VOUCHER
========================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

    const btn =
    $("applyVoucher");

    if(btn){

        btn.addEventListener(

            "click",

            applyVoucher

        );

    }

});
/* ==========================================
   CODM.JS V1
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

            // Hapus active
            cards.forEach(item=>{

                item.classList.remove("active");

            });

            // Aktifkan pilihan
            this.classList.add("active");

            // Simpan pembayaran
            selectedPayment = this.dataset.payment;

            // Update Ringkasan
            if($("summaryPayment")){

                $("summaryPayment").textContent =
                selectedPayment;

            }

            // Update Server
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
   UPDATE SERVER
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
   CODM.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */

/* ==========================================
   CHECKOUT
========================================== */

function checkoutWhatsApp(){

    // Ambil UID
    const userId = $("userId")?.value.trim() || "";

    if(userId === ""){

        alert("Masukkan UID COD Mobile terlebih dahulu.");

        $("userId").focus();

        return;

    }

    // Nickname (opsional)
    const nickname =
    $("nickname")?.value.trim() || "-";

    // Server
    const region =
    $("region")?.value || "Garena";

    // Produk
    if(selectedProduct === null){

        alert("Silakan pilih produk COD Points terlebih dahulu.");

        return;

    }

    // Hitung total
    const total = getTotalHarga();

    // Pesan WhatsApp
    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Call of Duty Mobile.

━━━━━━━━━━━━━━━━━━

🎮 Game : Call of Duty Mobile

🆔 UID : ${userId}

👤 Nickname : ${nickname}

🌍 Server : ${region}

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
   CODM.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */

/* ==========================================
   STORAGE KEY
========================================== */

const STORAGE_KEY = "codm_last_order";

/* ==========================================
   SIMPAN PESANAN
========================================== */

function saveOrder(){

    const data = {

        userId: $("userId") ? $("userId").value : "",

        nickname: $("nickname") ? $("nickname").value : "",

        region: $("region") ? $("region").value : "Garena",

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

    // UID
    if($("userId")){

        $("userId").value = data.userId || "";

    }

    // Nickname
    if($("nickname")){

        $("nickname").value = data.nickname || "";

    }

    // Server
    if($("region")){

        $("region").value = data.region || "Garena";

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

    // Server Summary
    if($("summaryRegion")){

        $("summaryRegion").textContent =
        data.region || "Garena";

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

        el.addEventListener("input", saveOrder);
        el.addEventListener("change", saveOrder);

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
   CODM.JS V1
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
        produk:"321 CP"
    },

    {
        nama:"Andi",
        kota:"Bandung",
        produk:"645 CP"
    },

    {
        nama:"Rizky",
        kota:"Surabaya",
        produk:"1373 CP"
    },

    {
        nama:"Fajar",
        kota:"Medan",
        produk:"Battle Pass"
    },

    {
        nama:"Agus",
        kota:"Semarang",
        produk:"Ground Forces"
    },

    {
        nama:"Dimas",
        kota:"Makassar",
        produk:"2060 CP"
    },

    {
        nama:"Rian",
        kota:"Bekasi",
        produk:"Battle Pass Bundle"
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

    if(localStorage.getItem("codm_promo_seen")){

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
                "codm_promo_seen",
                "true"
            );

        });

    }

    if(promoBtn){

        promoBtn.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "codm_promo_seen",
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
   CODM.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    console.log("🎮 CODM.js V1 Loaded");

    // Render daftar produk
    renderProducts();

    // Inisialisasi metode pembayaran
    initPayment();

    // Set pembayaran default
    setDefaultPayment();

    // Inisialisasi perubahan server
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

    console.log("✅ COD Mobile siap digunakan.");

});
