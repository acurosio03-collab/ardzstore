/* ==========================================
   ARDZ STORE
   PULSA & PAKET DATA
   PULSA.JS V1
========================================== */

"use strict";

/* ==========================================
   KONFIGURASI
========================================== */

// Nomor WhatsApp Admin
const ADMIN_WA = "6283185954674";

// Nama Halaman
const PAGE_NAME = "Pulsa & Paket Data";

// Layanan default
let selectedService = "Pulsa";

// Operator default
let selectedOperator = "Telkomsel";

/* ==========================================
   DATA PRODUK
========================================== */

const products = {

    /* ==========================
       TELKOMSEL
    ========================== */

    Telkomsel:{

        Pulsa:[

            {id:1,nama:"Pulsa 5.000",harga:7000},
            {id:2,nama:"Pulsa 10.000",harga:12000},
            {id:3,nama:"Pulsa 20.000",harga:22000},
            {id:4,nama:"Pulsa 25.000",harga:27000},
            {id:5,nama:"Pulsa 50.000",harga:52000},
            {id:6,nama:"Pulsa 100.000",harga:102000}

        ],

        Data:[

            {id:101,nama:"1 GB",harga:12000},
            {id:102,nama:"2 GB",harga:18000},
            {id:103,nama:"5 GB",harga:35000},
            {id:104,nama:"10 GB",harga:55000},
            {id:105,nama:"20 GB",harga:95000}

        ]

    },

    /* ==========================
       INDOSAT
    ========================== */

    Indosat:{

        Pulsa:[

            {id:201,nama:"Pulsa 5.000",harga:7000},
            {id:202,nama:"Pulsa 10.000",harga:12000},
            {id:203,nama:"Pulsa 25.000",harga:27000},
            {id:204,nama:"Pulsa 50.000",harga:52000},
            {id:205,nama:"Pulsa 100.000",harga:102000}

        ],

        Data:[

            {id:301,nama:"2 GB",harga:17000},
            {id:302,nama:"5 GB",harga:32000},
            {id:303,nama:"10 GB",harga:50000},
            {id:304,nama:"20 GB",harga:90000}

        ]

    },

    /* ==========================
       XL
    ========================== */

    XL:{

        Pulsa:[

            {id:401,nama:"Pulsa 5.000",harga:7000},
            {id:402,nama:"Pulsa 10.000",harga:12000},
            {id:403,nama:"Pulsa 25.000",harga:27000},
            {id:404,nama:"Pulsa 50.000",harga:52000},
            {id:405,nama:"Pulsa 100.000",harga:102000}

        ],

        Data:[

            {id:501,nama:"2 GB",harga:16000},
            {id:502,nama:"5 GB",harga:30000},
            {id:503,nama:"10 GB",harga:48000},
            {id:504,nama:"25 GB",harga:98000}

        ]

    },

    /* ==========================
       AXIS
    ========================== */

    Axis:{

        Pulsa:[

            {id:601,nama:"Pulsa 5.000",harga:7000},
            {id:602,nama:"Pulsa 10.000",harga:12000},
            {id:603,nama:"Pulsa 25.000",harga:27000},
            {id:604,nama:"Pulsa 50.000",harga:52000}

        ],

        Data:[

            {id:701,nama:"2 GB",harga:15000},
            {id:702,nama:"5 GB",harga:28000},
            {id:703,nama:"10 GB",harga:45000}

        ]

    },

    /* ==========================
       TRI
    ========================== */

    Tri:{

        Pulsa:[

            {id:801,nama:"Pulsa 5.000",harga:7000},
            {id:802,nama:"Pulsa 10.000",harga:12000},
            {id:803,nama:"Pulsa 25.000",harga:27000},
            {id:804,nama:"Pulsa 50.000",harga:52000}

        ],

        Data:[

            {id:901,nama:"2 GB",harga:15000},
            {id:902,nama:"6 GB",harga:30000},
            {id:903,nama:"12 GB",harga:50000}

        ]

    },

    /* ==========================
       SMARTFREN
    ========================== */

    Smartfren:{

        Pulsa:[

            {id:1001,nama:"Pulsa 5.000",harga:7000},
            {id:1002,nama:"Pulsa 10.000",harga:12000},
            {id:1003,nama:"Pulsa 25.000",harga:27000},
            {id:1004,nama:"Pulsa 50.000",harga:52000}

        ],

        Data:[

            {id:1101,nama:"2 GB",harga:16000},
            {id:1102,nama:"5 GB",harga:32000},
            {id:1103,nama:"10 GB",harga:52000}

        ]

    },

    /* ==========================
       by.U
    ========================== */

    byU:{

        Pulsa:[

            {id:1201,nama:"Pulsa 10.000",harga:12000},
            {id:1202,nama:"Pulsa 25.000",harga:27000},
            {id:1203,nama:"Pulsa 50.000",harga:52000},
            {id:1204,nama:"Pulsa 100.000",harga:102000}

        ],

        Data:[

            {id:1301,nama:"3 GB",harga:20000},
            {id:1302,nama:"10 GB",harga:50000},
            {id:1303,nama:"25 GB",harga:95000}

        ]

    }

};

/* ==========================================
   DATA ORDER
========================================== */

// Produk yang dipilih
let selectedProduct = null;

// Metode pembayaran
let selectedPayment = "QRIS";

// Voucher
let voucherUsed = "";

// Diskon
let discount = 0;
/* ==========================================
   PULSA.JS V1
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
   HELPER ELEMENT
========================================== */

function $(id){

    return document.getElementById(id);

}

/* ==========================================
   AMBIL PRODUK
========================================== */

function getCurrentProducts(){

    if(
        !products[selectedOperator] ||
        !products[selectedOperator][selectedService]
    ){

        return [];

    }

    return products[selectedOperator][selectedService];

}

/* ==========================================
   HITUNG TOTAL
========================================== */

function getTotalHarga(){

    if(selectedProduct === null){

        return 0;

    }

    return Math.max(
        selectedProduct.harga - discount,
        0
    );

}

/* ==========================================
   LOGO OPERATOR
========================================== */

function getOperatorImage(operator){

    switch(operator){

        case "Telkomsel":
            return "telkom.jpeg";

        case "Indosat":
            return "indosat.jpeg";

        case "XL":
            return "xl.jpeg";

        case "Axis":
            return "axis.jpeg";

        case "Tri":
            return "tri.jpeg";

        case "Smartfren":
            return "smart.jpeg";

        case "byU":
            return "byu.jpeg";

        default:
            return "pulsa.jpeg";

    }

}

/* ==========================================
   RESET DETAIL PESANAN
========================================== */

function resetOrder(){

    selectedProduct = null;

    discount = 0;

    voucherUsed = "";

    if($("voucher")){

        $("voucher").value = "";

    }

    if($("voucherInfo")){

        $("voucherInfo").textContent = "";

    }

    if($("produk")){

        $("produk").textContent = "Belum Dipilih";

    }

    if($("nominal")){

        $("nominal").textContent = "-";

    }

    if($("total")){

        $("total").textContent = rupiah(0);

    }

    if($("summaryProduk")){

        $("summaryProduk").textContent =
        "Belum Dipilih";

    }

    if($("summaryTotal")){

        $("summaryTotal").textContent =
        rupiah(0);

    }

}
/* ==========================================
   PULSA.JS V1
   BAGIAN 3
   RENDER PRODUK
========================================== */

function renderProducts(){

    const productList = $("productList");

    if(!productList){

        console.error("Element #productList tidak ditemukan.");

        return;

    }

    // Reset detail pesanan
    resetOrder();

    // Kosongkan daftar produk
    productList.innerHTML = "";

    // Ambil daftar produk
    const list = getCurrentProducts();

    if(list.length === 0){

        productList.innerHTML = `
            <div class="empty-product">
                Produk tidak tersedia.
            </div>
        `;

        return;

    }

    list.forEach((item,index)=>{

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${getOperatorImage(selectedOperator)}"
                alt="${selectedOperator}">

            <h3>${item.nama}</h3>

            <p class="price">

                ${rupiah(item.harga)}

            </p>

            <button
                class="btn-primary"
                onclick="selectProduct(${index})">

                Pilih

            </button>

        `;

        productList.appendChild(card);

    });

    console.log(
        "Render:",
        selectedOperator,
        selectedService,
        list.length,
        "produk"
    );

}

/* ==========================================
   GANTI OPERATOR
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const operator = $("operator");

    if(operator){

        operator.addEventListener("change",()=>{

            selectedOperator = operator.value;

            if($("operatorName")){

                $("operatorName").textContent =
                selectedOperator;

            }

            if($("summaryOperator")){

                $("summaryOperator").textContent =
                selectedOperator;

            }

            renderProducts();

        });

    }

});

/* ==========================================
   GANTI LAYANAN
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const service = $("serviceType");

    if(service){

        service.addEventListener("change",()=>{

            selectedService = service.value;

            if($("service")){

                $("service").textContent =
                service.options[
                    service.selectedIndex
                ].text;

            }

            if($("summaryService")){

                $("summaryService").textContent =
                service.options[
                    service.selectedIndex
                ].text;

            }

            renderProducts();

        });

    }

});
/* ==========================================
   PULSA.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */

function selectProduct(index){

    // Ambil daftar produk saat ini
    const list = getCurrentProducts();

    // Simpan produk terpilih
    selectedProduct = list[index];

    if(!selectedProduct){

        return;

    }

    // Hapus active dari semua card
    document.querySelectorAll(".product-card")
    .forEach(card=>{

        card.classList.remove("active");

    });

    // Tambahkan active ke card terpilih
    const cards =
    document.querySelectorAll(".product-card");

    if(cards[index]){

        cards[index].classList.add("active");

    }

    // Update Detail Pesanan
    if($("produk")){

        $("produk").textContent =
        selectedProduct.nama;

    }

    if($("nominal")){

        $("nominal").textContent =
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

    // Update Nomor Tujuan
    if($("summaryNumber")){

        $("summaryNumber").textContent =
        $("customerNumber")?.value || "-";

    }

    // Update Nama
    if($("summaryName")){

        $("summaryName").textContent =
        $("customerName")?.value || "-";

    }

    console.log(
        "Produk dipilih:",
        selectedProduct.nama
    );

    // Simpan otomatis
    if(typeof saveOrder === "function"){

        saveOrder();

    }

}

/* ==========================================
   UPDATE DATA PELANGGAN
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const number =
    $("customerNumber");

    const name =
    $("customerName");

    if(number){

        number.addEventListener("input",()=>{

            if($("summaryNumber")){

                $("summaryNumber").textContent =
                number.value || "-";

            }

            if(typeof saveOrder==="function"){

                saveOrder();

            }

        });

    }

    if(name){

        name.addEventListener("input",()=>{

            if($("summaryName")){

                $("summaryName").textContent =
                name.value || "-";

            }

            if(typeof saveOrder==="function"){

                saveOrder();

            }

        });

    }

});
/* ==========================================
   PULSA.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */

/* ==========================================
   DAFTAR VOUCHER
========================================== */

const vouchers = {

    "PULSA10": 10,

    "DATA10": 10,

    "ARDZ10": 10,

    "HEMAT20": 20

};

/* ==========================================
   APPLY VOUCHER
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

    // Validasi voucher berdasarkan layanan
    if(code === "PULSA10" && selectedService !== "Pulsa"){

        info.textContent =
        "Voucher hanya berlaku untuk Pulsa.";

        info.style.color = "#ef4444";

        return;

    }

    if(code === "DATA10" && selectedService !== "Data"){

        info.textContent =
        "Voucher hanya berlaku untuk Paket Data.";

        info.style.color = "#ef4444";

        return;

    }

    if(vouchers.hasOwnProperty(code)){

        voucherUsed = code;

        const persen = vouchers[code];

        discount = Math.floor(
            selectedProduct.harga *
            persen / 100
        );

        if($("total")){

            $("total").textContent =
            rupiah(getTotalHarga());

        }

        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(getTotalHarga());

        }

        info.innerHTML =
        `✅ Voucher <b>${code}</b> berhasil digunakan (${persen}% OFF)`;

        info.style.color = "#22c55e";

        console.log(
            "Voucher:",
            code,
            "Diskon:",
            discount
        );

        if(typeof saveOrder==="function"){

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

        info.textContent =
        "❌ Voucher tidak valid.";

        info.style.color = "#ef4444";

    }

}

/* ==========================================
   RESET VOUCHER
========================================== */

function resetVoucher(){

    voucherUsed = "";

    discount = 0;

    if($("voucher")){

        $("voucher").value = "";

    }

    if($("voucherInfo")){

        $("voucherInfo").textContent = "";

    }

    if(selectedProduct){

        if($("total")){

            $("total").textContent =
            rupiah(getTotalHarga());

        }

        if($("summaryTotal")){

            $("summaryTotal").textContent =
            rupiah(getTotalHarga());

        }

    }

}

/* ==========================================
   BUTTON APPLY
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
   PULSA.JS V1
   BAGIAN 6
   SISTEM PEMBAYARAN
========================================== */

/* ==========================================
   INISIALISASI PEMBAYARAN
========================================== */

function initPayment(){

    const payments =
    document.querySelectorAll(".payment-card");

    if(payments.length === 0){

        console.warn("Payment Card tidak ditemukan.");

        return;

    }

    payments.forEach(card=>{

        card.addEventListener("click",()=>{

            // Hapus status aktif
            payments.forEach(item=>{

                item.classList.remove("active");

            });

            // Aktifkan card dipilih
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
                "Metode Pembayaran:",
                selectedPayment
            );

            // Simpan otomatis
            if(typeof saveOrder === "function"){

                saveOrder();

            }

        });

    });

}

/* ==========================================
   SET PEMBAYARAN DEFAULT
========================================== */

function setDefaultPayment(){

    const firstPayment =
    document.querySelector(".payment-card");

    if(!firstPayment) return;

    firstPayment.classList.add("active");

    selectedPayment =
    firstPayment.dataset.payment || "QRIS";

    if($("summaryPayment")){

        $("summaryPayment").textContent =
        selectedPayment;

    }

}

/* ==========================================
   AMBIL PEMBAYARAN AKTIF
========================================== */

function getSelectedPayment(){

    return selectedPayment || "QRIS";

}

/* ==========================================
   UPDATE RINGKASAN
========================================== */

function updatePaymentSummary(){

    if($("summaryPayment")){

        $("summaryPayment").textContent =
        selectedPayment;

    }

}

/* ==========================================
   RESET PEMBAYARAN
========================================== */

function resetPayment(){

    document
    .querySelectorAll(".payment-card")
    .forEach(card=>{

        card.classList.remove("active");

    });

    selectedPayment = "QRIS";

    const first =
    document.querySelector(".payment-card");

    if(first){

        first.classList.add("active");

    }

    updatePaymentSummary();

    if(typeof saveOrder === "function"){

        saveOrder();

    }

}
/* ==========================================
   PULSA.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */

function checkoutWhatsApp(){

    // Validasi Nomor Tujuan
    const customerNumber =
    $("customerNumber")?.value.trim() || "";

    if(customerNumber === ""){

        alert("Masukkan Nomor Tujuan terlebih dahulu.");

        $("customerNumber").focus();

        return;

    }

    // Validasi Produk
    if(selectedProduct === null){

        alert("Silakan pilih produk terlebih dahulu.");

        return;

    }

    const customerName =
    $("customerName")?.value.trim() || "-";

    const total = getTotalHarga();

    let message = "";

    /* ======================================
       PULSA REGULER
    ====================================== */

    if(selectedService === "Pulsa"){

        message = `📱 *ARDZ STORE*

Halo Admin,

Saya ingin membeli *Pulsa Reguler*.

━━━━━━━━━━━━━━

📱 Layanan :
Pulsa Reguler

📡 Operator :
${selectedOperator}

📞 Nomor Tujuan :
${customerNumber}

👤 Nama :
${customerName}

💳 Produk :
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

Mohon segera diproses.

Terima kasih 🙏`;

    }

    /* ======================================
       PAKET DATA
    ====================================== */

    else{

        message = `🌐 *ARDZ STORE*

Halo Admin,

Saya ingin membeli *Paket Data*.

━━━━━━━━━━━━━━

🌐 Layanan :
Paket Data

📡 Operator :
${selectedOperator}

📞 Nomor Tujuan :
${customerNumber}

👤 Nama :
${customerName}

📦 Paket :
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

Mohon segera diproses.

Terima kasih 🙏`;

    }

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
   PULSA.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */

const PULSA_STORAGE_KEY = "ardz_pulsa_order";

/* ==========================================
   SIMPAN DATA
========================================== */

function saveOrder(){

    const data = {

        service: selectedService,

        operator: selectedOperator,

        customerNumber: $("customerNumber")?.value || "",

        customerName: $("customerName")?.value || "",

        productId: selectedProduct ? selectedProduct.id : null,

        payment: selectedPayment,

        voucher: voucherUsed,

        discount: discount

    };

    localStorage.setItem(

        PULSA_STORAGE_KEY,

        JSON.stringify(data)

    );

}

/* ==========================================
   MUAT DATA
========================================== */

function loadOrder(){

    const data = JSON.parse(

        localStorage.getItem(PULSA_STORAGE_KEY)

    );

    if(!data) return;

    /* ==========================
       LAYANAN
    ========================== */

    selectedService = data.service || "Pulsa";

    if($("serviceType")){

        $("serviceType").value = selectedService;

        $("summaryService").textContent =
        $("serviceType").options[
            $("serviceType").selectedIndex
        ].text;

        $("service").textContent =
        $("serviceType").options[
            $("serviceType").selectedIndex
        ].text;

    }

    /* ==========================
       OPERATOR
    ========================== */

    selectedOperator = data.operator || "Telkomsel";

    if($("operator")){

        $("operator").value = selectedOperator;

        $("summaryOperator").textContent =
        selectedOperator;

        $("operatorName").textContent =
        selectedOperator;

    }

    // Render ulang produk
    renderProducts();

    /* ==========================
       CUSTOMER
    ========================== */

    if($("customerNumber")){

        $("customerNumber").value =
        data.customerNumber || "";

    }

    if($("customerName")){

        $("customerName").value =
        data.customerName || "";

    }

    if($("summaryNumber")){

        $("summaryNumber").textContent =
        data.customerNumber || "-";

    }

    if($("summaryName")){

        $("summaryName").textContent =
        data.customerName || "-";

    }

    /* ==========================
       VOUCHER
    ========================== */

    voucherUsed = data.voucher || "";

    discount = data.discount || 0;

    if($("voucher")){

        $("voucher").value = voucherUsed;

    }

    /* ==========================
       PRODUK
    ========================== */

    if(data.productId){

        const list = getCurrentProducts();

        const index = list.findIndex(

            item => item.id === data.productId

        );

        if(index !== -1){

            selectProduct(index);

        }

    }

    /* ==========================
       PEMBAYARAN
    ========================== */

    selectedPayment =
    data.payment || "QRIS";

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

/* ==========================================
   AUTO SAVE
========================================== */

[
    "customerNumber",
    "customerName",
    "serviceType",
    "operator"
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
   PULSA.JS V1
   BAGIAN 9
   LIVE ORDER + POPUP + BACK TO TOP
========================================== */

/* ==========================================
   LIVE ORDER
========================================== */

const liveOrders = [

    "🟢 Andi membeli Pulsa Telkomsel 50.000",
    "🟢 Budi membeli Paket Data XL 10 GB",
    "🟢 Rina membeli Pulsa Indosat 25.000",
    "🟢 Dika membeli Paket Data Tri 12 GB",
    "🟢 Fajar membeli Pulsa Smartfren 100.000",
    "🟢 Sinta membeli Paket Data by.U 25 GB",
    "🟢 Aldi membeli Pulsa Axis 10.000"

];

let liveIndex = 0;

function startLiveOrder(){

    const box = $("liveOrder");

    if(!box) return;

    function show(){

        box.innerHTML = liveOrders[liveIndex];

        box.classList.add("show");

        liveIndex++;

        if(liveIndex >= liveOrders.length){

            liveIndex = 0;

        }

        setTimeout(()=>{

            box.classList.remove("show");

        },4000);

    }

    show();

    setInterval(show,6000);

}

/* ==========================================
   POPUP PROMO
========================================== */

function initPromoPopup(){

    const popup = $("promoPopup");

    const close = $("closePromo");

    const use = $("promoButton");

    if(!popup) return;

    setTimeout(()=>{

        popup.classList.add("show");

    },2000);

    if(close){

        close.onclick = ()=>{

            popup.classList.remove("show");

        };

    }

    if(use){

        use.onclick = ()=>{

            if($("voucher")){

                $("voucher").value = "PULSA10";
            }

            popup.classList.remove("show");

        };

    }

}

/* ==========================================
   BACK TO TOP
========================================== */

function initBackTop(){

    const btn = $("backTop");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 300){

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
   EFEK CARD
========================================== */

function initCardEffect(){

    document
    .querySelectorAll(".product-card")
    .forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform =
            "translateY(-8px) scale(1.03)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform =
            "";

        });

    });

       }
/* ==========================================
   ARDZ STORE
   PULSA.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("==================================");
    console.log("ARDZ STORE - Pulsa & Paket Data");
    console.log("Pulsa.js V1 Loaded");
    console.log("==================================");

    // Set pembayaran default
    setDefaultPayment();

    // Aktifkan sistem pembayaran
    initPayment();

    // Render produk awal
    renderProducts();

    // Muat data LocalStorage
    loadOrder();

    // Live Order
    startLiveOrder();

    // Popup Promo
    initPromoPopup();

    // Back To Top
    initBackTop();

    // Efek Card
    initCardEffect();

    // Tombol promo otomatis
    const promoBtn = $("promoButton");

    if (promoBtn) {

        promoBtn.addEventListener("click", () => {

            if ($("voucher")) {

                $("voucher").value = "PULSA10";

                applyVoucher();

            }

        });

    }

    console.log("Semua fitur Pulsa berhasil dijalankan.");

});

/* ==========================================
   SELESAI
========================================== */
