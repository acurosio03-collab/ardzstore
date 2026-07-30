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
