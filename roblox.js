/* ==========================================
   ARDZ STORE
   ROBLOX
   roblox.js V1
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

const ADMIN_WA = "6283185954674";

/* ==========================================
   DATA PRODUK ROBLOX
========================================== */

const products = [

    {id:1, nama:"80 Robux", harga:15000},
    {id:2, nama:"160 Robux", harga:29000},
    {id:3, nama:"240 Robux", harga:43000},
    {id:4, nama:"400 Robux", harga:70000},
    {id:5, nama:"800 Robux", harga:140000},
    {id:6, nama:"1700 Robux", harga:280000},
    {id:7, nama:"4500 Robux", harga:700000},
    {id:8, nama:"10000 Robux", harga:1400000},

    {id:9, nama:"Premium 450", harga:85000},
    {id:10, nama:"Premium 1000", harga:170000},
    {id:11, nama:"Premium 2200", harga:340000}

];

/* ==========================================
   DATA PESANAN
========================================== */

let selectedProduct = null;

let selectedPayment = "QRIS";

let discount = 0;

let voucherUsed = "";
/* ==========================================
   ROBLOX.JS V1
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

    // Premium
    if(nama.includes("premium")){

        return "assets/products/roblox-premium.png";

    }

    // Robux
    return "assets/products/robux.png";

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
   ROBLOX.JS V1
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
   ROBLOX.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Simpan produk yang dipilih
    selectedProduct = products[index];

    // Reset semua card
    document.querySelectorAll(".product-card").forEach(card=>{

        card.classList.remove("active");

    });

    // Aktifkan card yang dipilih
    const cards = document.querySelectorAll(".product-card");

    if(cards[index]){

        cards[index].classList.add("active");

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

    // Simpan otomatis jika fungsi sudah ada
    if(typeof saveOrder === "function"){

        saveOrder();

    }

}
/* ==========================================
   ROBLOX.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

/* ==========================================
   DAFTAR VOUCHER
========================================== */

const vouchers = {

    "ARDZ10": 10,

    "ROBLOX5": 5,

    "HEMAT20": 20

};


/* ==========================================
   TERAPKAN VOUCHER
========================================== */

function applyVoucher(){

    if(selectedProduct === null){

        alert("Silakan pilih produk terlebih dahulu.");

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

            $("total").textContent =
            rupiah(getTotalHarga());

        }

        // Update Ringkasan
        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(getTotalHarga());

        }

        // Informasi Voucher
        if(info){

            info.textContent =
            "✅ Voucher berhasil digunakan (" +
            persen +
            "% OFF)";

            info.style.color = "#22c55e";

        }

        // Simpan
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
   TOMBOL VOUCHER
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
   ROBLOX.JS V1
   BAGIAN 6
   SISTEM PEMBAYARAN
========================================== */

function initPayment(){

    const cards =
    document.querySelectorAll(".payment-card");

    if(cards.length === 0){

        console.warn(
            "Payment card tidak ditemukan."
        );

        return;

    }

    cards.forEach(card=>{

        card.addEventListener(
        "click",
        function(){

            // Hapus pilihan sebelumnya
            cards.forEach(item=>{

                item.classList.remove(
                    "active"
                );

            });

            // Aktifkan pembayaran
            this.classList.add(
                "active"
            );

            // Simpan metode pembayaran
            selectedPayment =
            this.dataset.payment;

            // Update ringkasan
            if($("summaryPayment")){

                $("summaryPayment")
                .textContent =
                selectedPayment;

            }

            // Simpan otomatis
            if(typeof saveOrder === "function"){

                saveOrder();

            }

        });

    });

}


/* ==========================================
   PEMBAYARAN DEFAULT
========================================== */

function setDefaultPayment(){

    const first =
    document.querySelector(
        ".payment-card"
    );

    if(first){

        first.classList.add(
            "active"
        );

        selectedPayment =
        first.dataset.payment ||
        "QRIS";

        if($("summaryPayment")){

            $("summaryPayment")
            .textContent =
            selectedPayment;

        }

    }

}
/* ==========================================
   ROBLOX.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */

function checkoutWhatsApp(){

    // Validasi Username
    const nickname =
    $("nickname")?.value.trim() || "";

    if(nickname === ""){

        alert("Masukkan Username Roblox terlebih dahulu.");

        $("nickname").focus();

        return;

    }

    // Validasi User ID
    const userId =
    $("userId")?.value.trim() || "";

    if(userId === ""){

        alert("Masukkan User ID Roblox terlebih dahulu.");

        $("userId").focus();

        return;

    }

    // Validasi Produk
    if(selectedProduct === null){

        alert("Silakan pilih produk Robux terlebih dahulu.");

        return;

    }

    // Total pembayaran
    const total = getTotalHarga();

    // Pesan WhatsApp
    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Roblox.

━━━━━━━━━━━━━━━━━━

🎮 Game : Roblox

👤 Username : ${nickname}

🆔 User ID : ${userId}

💎 Produk : ${selectedProduct.nama}

💰 Harga : ${rupiah(selectedProduct.harga)}

🎁 Voucher : ${voucherUsed || "-"}

💸 Diskon : ${rupiah(discount)}

💵 Total Bayar : ${rupiah(total)}

💳 Pembayaran : ${selectedPayment}

━━━━━━━━━━━━━━━━━━

Mohon diproses.

Terima kasih 🙏`;

    // Buka WhatsApp
    window.open(

        "https://wa.me/" +
        ADMIN_WA +
        "?text=" +
        encodeURIComponent(pesan),

        "_blank"

    );

}

/* ==========================================
   TOMBOL CHECKOUT
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
   ROBLOX.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */

/* ==========================================
   KEY STORAGE
========================================== */

const STORAGE_KEY = "roblox_last_order";

/* ==========================================
   SIMPAN DATA PESANAN
========================================== */

function saveOrder(){

    const data = {

        userId: $("userId") ? $("userId").value : "",

        nickname: $("nickname") ? $("nickname").value : "",

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
   LOAD DATA PESANAN
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

    // Username
    if($("nickname")){

        $("nickname").value = data.nickname || "";

    }

    // Pembayaran
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

    // Voucher
    voucherUsed = data.voucher || "";

    discount = data.discount || 0;

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

["userId","nickname"].forEach(id=>{

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
   ROBLOX.JS V1
   BAGIAN 9
   LIVE ORDER + POPUP + EFFECT
========================================== */

/* ==========================================
   LIVE ORDER
========================================== */

const liveOrders = [

    {nama:"Budi",kota:"Jakarta",produk:"80 Robux"},
    {nama:"Andi",kota:"Bandung",produk:"400 Robux"},
    {nama:"Rizky",kota:"Surabaya",produk:"Premium 450"},
    {nama:"Fajar",kota:"Medan",produk:"800 Robux"},
    {nama:"Agus",kota:"Semarang",produk:"1700 Robux"},
    {nama:"Dimas",kota:"Makassar",produk:"Premium 1000"},
    {nama:"Rian",kota:"Bekasi",produk:"240 Robux"},
    {nama:"Aldi",kota:"Depok",produk:"4500 Robux"},
    {nama:"Reza",kota:"Bogor",produk:"10000 Robux"},
    {nama:"Ilham",kota:"Yogyakarta",produk:"160 Robux"}

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
            <strong>🛒 Pesanan Baru</strong><br>
            ${item.nama} dari ${item.kota}<br>
            membeli <b>${item.produk}</b>
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

    if(localStorage.getItem("roblox_promo_seen")){

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
                "roblox_promo_seen",
                "true"
            );

        });

    }

    if(promoBtn){

        promoBtn.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "roblox_promo_seen",
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
   ROBLOX.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    console.log("🎮 Roblox.js V1 Loaded");

    // Render daftar produk
    renderProducts();

    // Inisialisasi metode pembayaran
    initPayment();

    // Set pembayaran default
    setDefaultPayment();

    // Muat data pesanan terakhir
    loadOrder();

    // Live Order
    startLiveOrder();

    // Popup Promo
    initPromoPopup();

    // Tombol Back To Top
    initBackToTop();

    // Efek Card
    initCardEffect();

    console.log("✅ Roblox siap digunakan.");

});
