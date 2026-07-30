/* ==========================================
   ARDZ STORE
   PUBG MOBILE
   pubg.js V5
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

const ADMIN_WA = "6283185954674";

/* ==========================================
   DATA PRODUK PUBG
========================================== */

const products = [

    {id:1,nama:"30 UC",harga:7000},
    {id:2,nama:"60 UC",harga:14000},
    {id:3,nama:"120 UC",harga:28000},
    {id:4,nama:"180 UC",harga:41000},
    {id:5,nama:"325 UC",harga:70000},
    {id:6,nama:"385 UC",harga:82000},
    {id:7,nama:"445 UC",harga:95000},
    {id:8,nama:"660 UC",harga:140000},
    {id:9,nama:"720 UC",harga:152000},
    {id:10,nama:"985 UC",harga:205000},
    {id:11,nama:"1320 UC",harga:274000},
    {id:12,nama:"1800 UC",harga:370000},
    {id:13,nama:"2460 UC",harga:505000},
    {id:14,nama:"3850 UC",harga:785000},
    {id:15,nama:"5650 UC",harga:1145000},
    {id:16,nama:"8100 UC",harga:1630000},

    {id:17,nama:"Royale Pass",harga:170000},
    {id:18,nama:"Elite Royale Pass",harga:340000},
    {id:19,nama:"Prime Membership",harga:35000},
    {id:20,nama:"Prime Plus",harga:90000}

];

/* ==========================================
   DATA PESANAN
========================================== */

let selectedProduct = null;

let selectedPayment = "QRIS";

let discount = 0;

let voucherUsed = "";
/* ==========================================
   BAGIAN 2
   HELPER FUNCTIONS
========================================== */

/* Format Rupiah */

function rupiah(angka){

    return "Rp " + Number(angka).toLocaleString("id-ID");

}

/* Ambil gambar produk */

function getProductImage(nama){

    nama = nama.toLowerCase();

    if(nama.includes("royale")){

        return "assets/products/royalepass.png";

    }

    if(nama.includes("prime plus")){

        return "assets/products/primeplus.png";

    }

    if(nama.includes("prime")){

        return "assets/products/prime.png";

    }

    return "assets/products/uc.png";

}

/* Hitung Total */

function getTotalHarga(){

    if(selectedProduct === null){

        return 0;

    }

    return selectedProduct.harga - discount;

}

/* Ambil Element */

function $(id){

    return document.getElementById(id);

}
/* ==========================================
   BAGIAN 3
   RENDER PRODUK
========================================== */

function renderProducts(){
console.log("RENDER PUBG JALAN");
console.log(products);

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

    if($("summaryPayment")){

        $("summaryPayment").textContent =
        selectedPayment;

    }

    if($("summaryPayment2")){

        $("summaryPayment2").textContent =
        selectedPayment;

    }

}
/* ==========================================
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

// Daftar Voucher
const vouchers = {

    "ARDZ10": 10,
    "PUBG5": 5,
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

        // Update Total
        if($("total")){

            $("total").textContent =
            rupiah(getTotalHarga());

        }

        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(getTotalHarga());

        }

        // Informasi Voucher
        if(info){

            info.textContent =
            "✅ Voucher berhasil digunakan (" +
            persen + "% OFF)";

            info.style.color = "#22c55e";

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

// Tombol Voucher
document.addEventListener("DOMContentLoaded",()=>{

    const btn = $("applyVoucher");

    if(btn){

        btn.addEventListener("click",applyVoucher);

    }

});

        
           /* ==========================================
   BAGIAN 6
   METODE PEMBAYARAN
========================================== */

function initPayment(){

    const cards = document.querySelectorAll(".payment-card");

    cards.forEach(card=>{

        card.addEventListener("click",function(){

            // Hapus pilihan sebelumnya
            cards.forEach(item=>{

                item.classList.remove("active");

            });

            // Aktifkan payment yang dipilih
            this.classList.add("active");

            // Simpan metode pembayaran
            selectedPayment = this.dataset.payment;

            // Update Detail Pesanan
            if($("summaryPayment")){

                $("summaryPayment").textContent =
                selectedPayment;

            }

            // Update Ringkasan Checkout
            if($("summaryPayment2")){

                $("summaryPayment2").textContent =
                selectedPayment;

            }

            // Simpan otomatis
            saveOrder();

        });

    });

}
/* ==========================================
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */

function checkoutWhatsApp(){

    // Validasi Character ID
    const userId = $("userId")?.value.trim() || "";

    if(userId === ""){

        alert("Masukkan Character ID terlebih dahulu.");

        $("userId").focus();

        return;

    }

    // Validasi Produk
    if(selectedProduct === null){

        alert("Silakan pilih produk terlebih dahulu.");

        return;

    }

    // Data Tambahan
    const nickname = $("nickname")?.value.trim() || "-";

    const region = $("region")?.value || "Indonesia";

    const total = getTotalHarga();

    // Pesan WhatsApp
    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up PUBG Mobile.

━━━━━━━━━━━━━━━━━━

🎮 Game : PUBG Mobile

🆔 Character ID : ${userId}

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
   TOMBOL CHECKOUT
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const btn = $("checkoutBtn");

    if(btn){

        btn.addEventListener("click",checkoutWhatsApp);

    }

});
/* ==========================================
   BAGIAN 8
   SIMPAN & MUAT DATA PESANAN
========================================== */

const STORAGE_KEY = "pubg_last_order";

// Simpan data pesanan
function saveOrder(){

    const data = {

        userId: $("userId") ? $("userId").value : "",

        nickname: $("nickname") ? $("nickname").value : "",

        region: $("region") ? $("region").value : "Indonesia",

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

// Muat data pesanan
function loadOrder(){

    const data = JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    );

    if(!data) return;

    // Character ID
    if($("userId")){

        $("userId").value = data.userId || "";

    }

    // Nickname
    if($("nickname")){

        $("nickname").value = data.nickname || "";

    }

    // Region
    if($("region")){

        $("region").value = data.region || "Indonesia";

    }

    // Payment
    if(data.payment){

        selectedPayment = data.payment;

        document.querySelectorAll(".payment-card")
        .forEach(card=>{

            card.classList.remove("active");

            if(card.dataset.payment===selectedPayment){

                card.classList.add("active");

            }

        });

        if($("summaryPayment")){

            $("summaryPayment").textContent =
            selectedPayment;

        }

        if($("summaryPayment2")){

            $("summaryPayment2").textContent =
            selectedPayment;

        }

    }

    // Voucher
    voucherUsed = data.voucher || "";

    discount = data.discount || 0;

    // Produk
    if(data.productId){

        const index = products.findIndex(

            item => item.id === data.productId

        );

        if(index !== -1){

            selectProduct(index);

        }

    }

}

// Simpan otomatis saat input berubah
["userId","nickname","region"].forEach(id=>{

    const el = $(id);

    if(el){

        el.addEventListener("input",saveOrder);

        el.addEventListener("change",saveOrder);

    }

});

// Simpan saat halaman ditutup
window.addEventListener(

    "beforeunload",

    saveOrder

);
/* ==========================================
   BAGIAN 9
   BACK TO TOP
========================================== */

function initBackToTop(){

    const button = $("backTop");

    if(!button) return;

    // Sembunyikan saat pertama kali
    button.style.display = "none";

    // Munculkan saat scroll
    window.addEventListener("scroll",()=>{

        if(window.scrollY > 300){

            button.style.display = "flex";

        }else{

            button.style.display = "none";

        }

    });

    // Kembali ke atas
    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}
/* ==========================================
   BAGIAN 10
   LIVE ORDER
========================================== */

const liveOrders = [

    {nama:"Budi",kota:"Jakarta",produk:"60 UC"},
    {nama:"Andi",kota:"Bandung",produk:"325 UC"},
    {nama:"Rizky",kota:"Surabaya",produk:"Royale Pass"},
    {nama:"Fajar",kota:"Medan",produk:"660 UC"},
    {nama:"Agus",kota:"Semarang",produk:"Prime Membership"},
    {nama:"Dimas",kota:"Makassar",produk:"120 UC"},
    {nama:"Rian",kota:"Bekasi",produk:"180 UC"},
    {nama:"Aldi",kota:"Depok",produk:"Prime Plus"},
    {nama:"Reza",kota:"Bogor",produk:"1320 UC"},
    {nama:"Ilham",kota:"Yogyakarta",produk:"30 UC"}

];

function startLiveOrder(){

    const box = $("liveOrder");

    if(!box) return;

    function showOrder(){

        const item = liveOrders[
            Math.floor(Math.random()*liveOrders.length)
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

    // Tampilkan pertama kali
    setTimeout(showOrder,3000);

    // Ulang setiap 12 detik
    setInterval(showOrder,12000);

       }
/* ==========================================
   BAGIAN 11
   POPUP PROMO
========================================== */

function initPromoPopup(){

    const popup = $("promoPopup");
    const closeBtn = $("closePromo");
    const promoBtn = $("promoButton");

    if(!popup) return;

    // Cek apakah popup sudah pernah ditampilkan
    if(localStorage.getItem("pubg_promo_seen")){

        popup.style.display = "none";
        return;

    }

    // Tampilkan popup setelah 1 detik
    setTimeout(()=>{

        popup.classList.add("show");

    },1000);

    // Tombol Tutup
    if(closeBtn){

        closeBtn.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "pubg_promo_seen",
                "true"
            );

        });

    }

    // Tombol Lihat Promo
    if(promoBtn){

        promoBtn.addEventListener("click",()=>{

            popup.classList.remove("show");

            localStorage.setItem(
                "pubg_promo_seen",
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

   /* ==========================================
   BAGIAN 12
   INISIALISASI
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    console.log("🎮 PUBG.js V5 Loaded");

    // Render daftar produk
    renderProducts();

    // Inisialisasi metode pembayaran
    initPayment();

    // Muat data pesanan terakhir
    loadOrder();

    // Tombol Back To Top
    initBackToTop();

    // Live Order
    startLiveOrder();

    // Popup Promo
    initPromoPopup();

});
}
