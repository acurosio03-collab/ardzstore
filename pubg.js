/* ==========================================
   ARDZ STORE
   PUBG MOBILE
   pubg.js
========================================== */

// ==============================
// DATA PRODUK
// ==============================

const products = [

{ id:1, nama:"30 UC", harga:7000 },

{ id:2, nama:"60 UC", harga:14000 },

{ id:3, nama:"120 UC", harga:28000 },

{ id:4, nama:"180 UC", harga:41000 },

{ id:5, nama:"325 UC", harga:70000 },

{ id:6, nama:"385 UC", harga:82000 },

{ id:7, nama:"445 UC", harga:95000 },

{ id:8, nama:"660 UC", harga:140000 },

{ id:9, nama:"720 UC", harga:152000 },

{ id:10, nama:"985 UC", harga:205000 },

{ id:11, nama:"1320 UC", harga:274000 },

{ id:12, nama:"1800 UC", harga:370000 },

{ id:13, nama:"2460 UC", harga:505000 },

{ id:14, nama:"3850 UC", harga:785000 },

{ id:15, nama:"5650 UC", harga:1145000 },

{ id:16, nama:"8100 UC", harga:1630000 },

{ id:17, nama:"Royale Pass", harga:170000 },

{ id:18, nama:"Elite Royale Pass", harga:340000 },

{ id:19, nama:"Prime Membership", harga:35000 },

{ id:20, nama:"Prime Plus", harga:90000 }

];

// ==============================
// VARIABEL
// ==============================

let selectedProduct = null;

let selectedPayment = "QRIS";

let discount = 0;

// ==============================
// FORMAT RUPIAH
// ==============================

function rupiah(angka){

    return "Rp " + Number(angka).toLocaleString("id-ID");

}// ==========================================
// TAMPILKAN PRODUK
// ==========================================

const productList = document.getElementById("productList");

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

function loadProducts(){

    if(!productList) return;

    productList.innerHTML = "";

    products.forEach((item,index)=>{

        productList.innerHTML += `

        <div class="product-card" onclick="selectProduct(${index})">

            <img src="${getProductImage(item.nama)}"
            alt="${item.nama}">

            <h3>${item.nama}</h3>

            <p>${rupiah(item.harga)}</p>

            <button class="btn-primary">

                Pilih

            </button>

        </div>

        `;

    });

}

document.addEventListener("DOMContentLoaded",loadProducts);
/* ==========================================
   BAGIAN 2
   TAMPILKAN PRODUK PUBG
========================================== */

const productList = document.getElementById("productList");

function getProductImage(productName){

    const name = productName.toLowerCase();

    if(name.includes("royale")){
        return "assets/products/royalepass.png";
    }

    if(name.includes("elite")){
        return "assets/products/royalepass.png";
    }

    if(name.includes("prime plus")){
        return "assets/products/primeplus.png";
    }

    if(name.includes("prime")){
        return "assets/products/prime.png";
    }

    return "assets/products/uc.png";

}

function loadProducts(){

    if(productList === null){

        console.error("productList tidak ditemukan!");

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

            <p class="price">

                ${rupiah(item.harga)}

            </p>

            <button
            type="button"
            class="btn-primary">

                Pilih

            </button>

        </div>

        `;

    });

}

/* Jalankan saat halaman selesai dimuat */

document.addEventListener("DOMContentLoaded",function(){

    loadProducts();

});
/* ==========================================
   BAGIAN 3
   PILIH PRODUK
========================================== */

function selectProduct(index){

    selectedProduct = products[index];

    // Reset semua card
    document.querySelectorAll(".product-card").forEach(card=>{

        card.classList.remove("active");

    });

    // Aktifkan card yang dipilih
    document.querySelectorAll(".product-card")[index]
        .classList.add("active");

    // Detail Pesanan
    const produk = document.getElementById("produk");
    const total = document.getElementById("total");

    if(produk){

        produk.textContent = selectedProduct.nama;

    }

    if(total){

        total.textContent =
        rupiah(selectedProduct.harga-discount);

    }

    // Ringkasan Checkout
    const summaryProduk =
    document.getElementById("summaryProduk");

    const summaryTotal =
    document.getElementById("summaryTotal");

    if(summaryProduk){

        summaryProduk.textContent =
        selectedProduct.nama;

    }

    if(summaryTotal){

        summaryTotal.textContent =
        rupiah(selectedProduct.harga-discount);

    }

}
/* ==========================================
   BAGIAN 4
   SISTEM VOUCHER
========================================== */

// Daftar Voucher
const vouchers = {

    "ARDZ10":10,
    "PUBG5":5,
    "HEMAT20":20

};

// Tombol Voucher
const voucherButton = document.getElementById("applyVoucher");

if(voucherButton){

    voucherButton.addEventListener("click",applyVoucher);

}

function applyVoucher(){

    if(!selectedProduct){

        alert("Pilih produk terlebih dahulu!");

        return;

    }

    const input = document.getElementById("voucher");

    const info = document.getElementById("voucherInfo");

    if(!input) return;

    const code = input.value.trim().toUpperCase();

    if(code===""){

        alert("Masukkan kode voucher.");

        return;

    }

    if(vouchers[code]){

        const persen = vouchers[code];

        discount = Math.floor(selectedProduct.harga * persen / 100);

        const total = selectedProduct.harga - discount;

        document.getElementById("total").textContent =
        rupiah(total);

        const summaryTotal =
        document.getElementById("summaryTotal");

        if(summaryTotal){

            summaryTotal.textContent =
            rupiah(total);

        }

        if(info){

            info.innerHTML =
            "✅ Voucher berhasil digunakan ("+
            persen+"% OFF)";

            info.style.color="#22c55e";

        }

    }else{

        discount = 0;

        if(info){

            info.innerHTML =
            "❌ Voucher tidak valid.";

            info.style.color="#ef4444";

        }
/* ==========================================
   BAGIAN 6
   CHECKOUT WHATSAPP
========================================== */

const checkoutButton = document.getElementById("checkoutBtn");

if(checkoutButton){

    checkoutButton.addEventListener("click",checkoutWhatsApp);

}

function checkoutWhatsApp(){

    // Validasi produk
    if(selectedProduct===null){

        alert("Silakan pilih produk terlebih dahulu.");

        return;

    }

    // Ambil Character ID
    const userIdInput=document.getElementById("userId");

    const nicknameInput=document.getElementById("nickname");

    const userId=userIdInput ?
    userIdInput.value.trim() : "";

    const nickname=nicknameInput ?
    nicknameInput.value.trim() : "-";

    if(userId===""){

        alert("Masukkan Character ID terlebih dahulu.");

        userIdInput.focus();

        return;

    }

    // Hitung total
    const totalHarga =
    selectedProduct.harga-discount;

    // Susun pesan
    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up PUBG Mobile.

━━━━━━━━━━━━━━━

🎮 Game : PUBG Mobile

🆔 Character ID : ${userId}

👤 Nickname : ${nickname}

💎 Produk : ${selectedProduct.nama}

💰 Harga : ${rupiah(selectedProduct.harga)}

🎁 Diskon : ${rupiah(discount)}

💵 Total Bayar : ${rupiah(totalHarga)}

💳 Pembayaran : ${selectedPayment}

━━━━━━━━━━━━━━━

Mohon diproses ya 🙏`;

    // Nomor WhatsApp
    const nomor="6283185954674";

    window.open(

        "https://wa.me/"+nomor+
        "?text="+encodeURIComponent(pesan),

        "_blank"

    );

}
        alert("Kode voucher tidak ditemukan.");

    }

}
