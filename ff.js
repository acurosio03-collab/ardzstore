/* ==========================================
   ARDZ STORE
   FREE FIRE
   ff.js V1
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

const ADMIN_WA = "6283185954674";

/* ==========================================
   DATA PRODUK FREE FIRE
========================================== */

const products = [

    {id:1,nama:"5 Diamond",harga:1000},
    {id:2,nama:"12 Diamond",harga:2500},
    {id:3,nama:"50 Diamond",harga:7000},
    {id:4,nama:"70 Diamond",harga:10000},
    {id:5,nama:"100 Diamond",harga:14000},
    {id:6,nama:"140 Diamond",harga:19000},
    {id:7,nama:"210 Diamond",harga:28000},
    {id:8,nama:"355 Diamond",harga:47000},
    {id:9,nama:"500 Diamond",harga:67000},
    {id:10,nama:"720 Diamond",harga:95000},
    {id:11,nama:"1000 Diamond",harga:133000},
    {id:12,nama:"1450 Diamond",harga:190000},
    {id:13,nama:"2180 Diamond",harga:285000},
    {id:14,nama:"3640 Diamond",harga:475000},
    {id:15,nama:"7290 Diamond",harga:950000},

    {id:16,nama:"Weekly Membership",harga:28000},
    {id:17,nama:"Monthly Membership",harga:110000},
    {id:18,nama:"Level Up Pass",harga:15000}

];

/* ==========================================
   DATA PESANAN
========================================== */

let selectedProduct = null;

let selectedPayment = "QRIS";

let discount = 0;

let voucherUsed = "";
/* ==========================================
   FF.JS V1
   BAGIAN 2
   HELPER FUNCTION
========================================== */

/* ==========================================
   FORMAT RUPIAH
========================================== */

function rupiah(angka){

    return "Rp " + Number(angka).toLocaleString("id-ID");

}

/* ==========================================
   GAMBAR PRODUK
========================================== */

function getProductImage(nama){

    nama = nama.toLowerCase();

    if(nama.includes("weekly")){

        return "assets/products/weekly.png";

    }

    if(nama.includes("monthly")){

        return "assets/products/monthly.png";

    }

    if(nama.includes("level")){

        return "assets/products/levelup.png";

    }

    return "diamond.jpeg";

}

/* ==========================================
   HITUNG TOTAL
========================================== */

function getTotalHarga(){

    if(selectedProduct === null){

        return 0;

    }

    return selectedProduct.harga - discount;

}

/* ==========================================
   HELPER AMBIL ELEMENT
========================================== */

function $(id){

    return document.getElementById(id);

}
/* ==========================================
   FF.JS V1
   BAGIAN 3
   RENDER PRODUK
========================================== */

function renderProducts(){

    const productList = $("productList");

    if(!productList){

        console.error("Element #productList tidak ditemukan.");

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

            <h3>${item.nama}</h3>

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
   FF.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Simpan produk yang dipilih
    selectedProduct = products[index];

    // Hapus status aktif dari semua card
    document.querySelectorAll(".product-card")
    .forEach(card=>{

        card.classList.remove("active");

    });

    // Aktifkan card yang dipilih
    const cards =
    document.querySelectorAll(".product-card");

    if(cards[index]){

        cards[index].classList.add("active");

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

    // Simpan otomatis
    if(typeof saveOrder === "function"){

        saveOrder();

    }

}
/* ==========================================
   FF.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

// Daftar Voucher
const vouchers = {

    "ARDZ10": 10,
    "FF5": 5,
    "HEMAT20": 20

};

// Terapkan Voucher
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

        // Info Voucher
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
   FF.JS V1
   BAGIAN 6
   SISTEM PEMBAYARAN
========================================== */

function initPayment(){

    const cards =
    document.querySelectorAll(".payment-card");

    if(cards.length === 0){

        console.warn("Payment Card tidak ditemukan.");

        return;

    }

    cards.forEach(card=>{

        card.addEventListener("click",function(){

            // Hapus status aktif
            cards.forEach(item=>{

                item.classList.remove("active");

            });

            // Aktifkan metode pembayaran
            this.classList.add("active");

            // Simpan metode pembayaran
            selectedPayment =
            this.dataset.payment;

            // Update Ringkasan
            if($("summaryPayment")){

                $("summaryPayment").textContent =
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
   FF.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */

function checkoutWhatsApp(){

    // Validasi Player ID
    const userId = $("userId")?.value.trim() || "";

    if(userId === ""){

        alert("Masukkan Player ID terlebih dahulu.");

        $("userId").focus();

        return;

    }

    // Validasi Produk
    if(selectedProduct === null){

        alert("Silakan pilih Diamond terlebih dahulu.");

        return;

    }

    // Ambil Nickname
    const nickname =
    $("nickname")?.value.trim() || "-";

    // Hitung Total
    const total = getTotalHarga();

    // Susun Pesan
    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Free Fire.

━━━━━━━━━━━━━━━━━━

🎮 Game : Free Fire

🆔 Player ID : ${userId}

👤 Nickname : ${nickname}

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
   FF.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */

const STORAGE_KEY = "ff_last_order";

/* ==========================================
   SIMPAN PESANAN
========================================== */

function saveOrder(){

    const data = {

        userId: $("userId") ? $("userId").value : "",

        nickname: $("nickname") ? $("nickname").value : "",

        payment: selectedPayment,

        voucher: voucherUsed,

        discount: discount,

        productId: selectedProduct
            ? selectedProduct.id
            : null

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

    if(!data){

        return;

    }

    // Player ID
    if($("userId")){

        $("userId").value =
        data.userId || "";

    }

    // Nickname
    if($("nickname")){

        $("nickname").value =
        data.nickname || "";

    }

    // Payment
    if(data.payment){

        selectedPayment =
        data.payment;

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

    // Voucher
    voucherUsed =
    data.voucher || "";

    discount =
    data.discount || 0;

    // Produk
    if(data.productId){

        const index =
        products.findIndex(

            item =>
            item.id === data.productId

        );

        if(index !== -1){

            selectProduct(index);

        }

    }

}

/* ==========================================
   AUTO SAVE
========================================== */

["userId","nickname"].forEach(id=>{

    const el = $(id);

    if(el){

        el.addEventListener(

            "input",

            saveOrder

        );

    }

});

/* ==========================================
   SIMPAN SAAT TUTUP HALAMAN
========================================== */

window.addEventListener(

    "beforeunload",

    saveOrder

);
/* ==========================================
   FF.JS V1
   BAGIAN 9
   LIVE ORDER + POPUP PROMO + EFEK
========================================== */

/* ==========================================
   LIVE ORDER
========================================== */

const liveOrders = [

    {nama:"Budi",kota:"Jakarta",produk:"70 Diamond"},
    {nama:"Andi",kota:"Bandung",produk:"140 Diamond"},
    {nama:"Rizky",kota:"Surabaya",produk:"Weekly Membership"},
    {nama:"Fajar",kota:"Medan",produk:"355 Diamond"},
    {nama:"Agus",kota:"Semarang",produk:"50 Diamond"},
    {nama:"Dimas",kota:"Makassar",produk:"Monthly Membership"},
    {nama:"Rian",kota:"Bekasi",produk:"1000 Diamond"},
    {nama:"Aldi",kota:"Depok",produk:"Level Up Pass"}

];

function startLiveOrder(){

    const box = $("liveOrder");

    if(!box) return;

    function showOrder(){

        const item =
        liveOrders[
            Math.floor(
                Math.random()*liveOrders.length
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
    const close = $("closePromo");
    const promo = $("promoButton");

    if(!popup) return;

    if(localStorage.getItem("ff_promo_seen")){

        popup.style.display="none";

        return;

    }

    setTimeout(()=>{

        popup.classList.add("show");

    },1000);

    if(close){

        close.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "ff_promo_seen",
                "true"
            );

        });

    }

    if(promo){

        promo.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "ff_promo_seen",
                "true"
            );

            if($("voucher")){

                $("voucher").scrollIntoView({

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

    button.style.display="none";

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            button.style.display="flex";

        }

        else{

            button.style.display="none";

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
   EFEK CARD
========================================== */

function initCardEffect(){

    document
    .querySelectorAll(".product-card")
    .forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-8px)";

        });

        card.addEventListener("mouseleave",()=>{

            if(!card.classList.contains("active")){

                card.style.transform="translateY(0)";

            }

        });

    });

                      }
/* ==========================================
   FF.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🎮 FF.js Loaded");

    // Render daftar produk
    renderProducts();

    // Aktifkan sistem pembayaran
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

    console.log("✅ Free Fire siap digunakan.");

});
