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
const ADMIN_WA = "6283185954674";

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
/* ==========================================
   BAGIAN 3
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Simpan produk yang dipilih
    selectedProduct = products[index];

    // Hapus status aktif semua card
    document.querySelectorAll(".product-card").forEach(card=>{

        card.classList.remove("active");

    });

    // Aktifkan card yang dipilih
    const cards = document.querySelectorAll(".product-card");

    if(cards[index]){

        cards[index].classList.add("active");

    }

    // Update Detail Pesanan
    const produk = document.getElementById("produk");

    const total = document.getElementById("total");

    if(produk){

        produk.textContent = selectedProduct.nama;

    }

    if(total){

        total.textContent = rupiah(selectedProduct.harga - discount);

    }

    // Update Ringkasan Checkout
    const summaryProduk = document.getElementById("summaryProduk");

    const summaryTotal = document.getElementById("summaryTotal");

    if(summaryProduk){

        summaryProduk.textContent = selectedProduct.nama;

    }

    if(summaryTotal){

        summaryTotal.textContent = rupiah(selectedProduct.harga - discount);

    }

}
        `;

    });

}
/* ==========================================
   BAGIAN 4
   VOUCHER PROMO
========================================== */

function applyVoucher(){

    // Harus pilih produk dulu
    if(selectedProduct === null){

        alert("Silakan pilih produk terlebih dahulu.");

        return;

    }

    const voucherInput = document.getElementById("voucher");
    const voucherInfo = document.getElementById("voucherInfo");

    if(!voucherInput) return;

    const kode = voucherInput.value.trim().toUpperCase();

    // Reset diskon
    discount = 0;

    // Voucher kosong
    if(kode === ""){

        if(voucherInfo){

            voucherInfo.textContent = "";

        }

        updateTotal();

        return;

    }

    // Voucher ditemukan
    if(vouchers[kode]){

        const persen = vouchers[kode];

        discount = Math.floor(
            selectedProduct.harga * persen / 100
        );

        if(voucherInfo){

            voucherInfo.textContent =
            "✅ Voucher berhasil digunakan (" +
            persen + "% OFF)";

            voucherInfo.style.color = "#22c55e";

        }

    }else{

        if(voucherInfo){

            voucherInfo.textContent =
            "❌ Voucher tidak valid";

            voucherInfo.style.color = "#ef4444";

        }

    }

    updateTotal();

}

/* ==========================================
   UPDATE TOTAL
========================================== */

function updateTotal(){

    if(selectedProduct === null) return;

    const totalBayar =
    selectedProduct.harga - discount;

    const total =
    document.getElementById("total");

    if(total){

        total.textContent =
        rupiah(totalBayar);

    }

    const summaryTotal =
    document.getElementById("summaryTotal");

    if(summaryTotal){

        summaryTotal.textContent =
        rupiah(totalBayar);

    }
/* ==========================================
   BAGIAN 5
   METODE PEMBAYARAN
========================================== */

function initPayment(){

    const paymentCards = document.querySelectorAll(".payment-card");

    if(paymentCards.length === 0){

        console.warn("Payment card tidak ditemukan.");

        return;

    }

    paymentCards.forEach(card=>{

        card.addEventListener("click",function(){

            // Hapus status aktif
            paymentCards.forEach(item=>{

                item.classList.remove("active");

            });

            // Aktifkan card yang dipilih
            this.classList.add("active");

            // Ambil nama payment
            selectedPayment = this.dataset.payment;

            // Update Ringkasan
            const summaryPayment =
            document.getElementById("summaryPayment");

            if(summaryPayment){

                summaryPayment.textContent =
                selectedPayment;

            }

        });

    });

}
/* ==========================================
   BAGIAN 6
   CHECKOUT WHATSAPP
========================================== */

function checkoutOrder(){

    // Produk harus dipilih
    if(selectedProduct === null){

        alert("Silakan pilih produk terlebih dahulu.");
        return;

    }

    // Character ID
    const userId =
    document.getElementById("userId")?.value.trim() || "";

    // Nickname
    const nickname =
    document.getElementById("nickname")?.value.trim() || "-";

    if(userId === ""){

        alert("Masukkan Character ID PUBG terlebih dahulu.");
        return;

    }

    // Hitung total
    const totalBayar =
    selectedProduct.harga - discount;

    // Pesan WhatsApp
    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up PUBG Mobile.

━━━━━━━━━━━━━━━━━━

🎮 Game : PUBG Mobile

🆔 Character ID : ${userId}

👤 Nickname : ${nickname}

💎 Produk : ${selectedProduct.nama}

💰 Harga : ${rupiah(selectedProduct.harga)}

🎁 Diskon : ${rupiah(discount)}

💵 Total Bayar : ${rupiah(totalBayar)}

💳 Pembayaran : ${selectedPayment}

━━━━━━━━━━━━━━━━━━

Terima kasih 🙏`;

    // Buka WhatsApp
    window.open(
        `https://wa.me/${083185954674}?text=${encodeURIComponent(pesan)}`,
        "_blank"
    );

}

/* ==========================================
   PASANG EVENT CHECKOUT
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const checkoutBtn =
    document.getElementById("checkoutBtn");

    if(checkoutBtn){

        checkoutBtn.addEventListener("click",checkoutOrder);

    }

});
/* ==========================================
   BAGIAN 7
   INISIALISASI & LOCALSTORAGE
========================================== */

// Simpan data terakhir
function saveData(){

    const data = {

        userId:
        document.getElementById("userId")?.value || "",

        nickname:
        document.getElementById("nickname")?.value || "",

        payment:
        selectedPayment,

        product:
        selectedProduct ? selectedProduct.id : null,

        discount:
        discount

    };

    localStorage.setItem(
        "pubg_data",
        JSON.stringify(data)
    );

}

// Load data terakhir
function loadData(){

    const data =
    JSON.parse(localStorage.getItem("pubg_data"));

    if(!data) return;

    // Character ID
    if(document.getElementById("userId")){

        document.getElementById("userId").value =
        data.userId || "";

    }

    // Nickname
    if(document.getElementById("nickname")){

        document.getElementById("nickname").value =
        data.nickname || "";

    }

    // Payment
    if(data.payment){

        selectedPayment = data.payment;

        document
        .querySelectorAll(".payment-card")
        .forEach(card=>{

            card.classList.remove("active");

            if(card.dataset.payment===selectedPayment){

                card.classList.add("active");

            }

        });

        const summaryPayment =
        document.getElementById("summaryPayment");

        if(summaryPayment){

            summaryPayment.textContent =
            selectedPayment;

        }

    }

    // Produk
    if(data.product){

        const index =
        products.findIndex(item=>item.id===data.product);

        if(index!==-1){

            selectProduct(index);

        }

    }

}

// Simpan otomatis saat mengetik
["userId","nickname"].forEach(id=>{

    const el=document.getElementById(id);

    if(el){

        el.addEventListener("input",saveData);

    }

});

// Simpan sebelum keluar halaman
window.addEventListener("beforeunload",saveData);

// ==========================================
// JALANKAN SEMUA
// ==========================================

document.addEventListener("DOMContentLoaded",()=>{

    // Tampilkan Produk
    renderProducts();

    // Aktifkan Payment
    initPayment();

    // Load Data
    loadData();

});
