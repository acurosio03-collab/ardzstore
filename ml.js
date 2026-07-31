/* ==========================================
   ARDZ STORE
   MOBILE LEGENDS
   ml.js V1
========================================== */

"use strict";


/* ==========================================
   KONFIGURASI
========================================== */

const ADMIN_WA = "6283185954674";



/* ==========================================
   DATA PRODUK MOBILE LEGENDS
========================================== */

const products = [

{
id:1,
nama:"5 Diamond",
harga:2000
},

{
id:2,
nama:"12 Diamond",
harga:4000
},

{
id:3,
nama:"19 Diamond",
harga:6000
},

{
id:4,
nama:"28 Diamond",
harga:8000
},

{
id:5,
nama:"44 Diamond",
harga:12000
},

{
id:6,
nama:"59 Diamond",
harga:16000
},

{
id:7,
nama:"86 Diamond",
harga:23000
},

{
id:8,
nama:"172 Diamond",
harga:45000
},

{
id:9,
nama:"257 Diamond",
harga:67000
},

{
id:10,
nama:"344 Diamond",
harga:85000
},

{
id:11,
nama:"429 Diamond",
harga:105000
},

{
id:12,
nama:"514 Diamond",
harga:125000
},

{
id:13,
nama:"706 Diamond",
harga:170000
},

{
id:14,
nama:"878 Diamond",
harga:215000
},

{
id:15,
nama:"Weekly Diamond Pass",
harga:30000
},

{
id:16,
nama:"Twilight Pass",
harga:150000
}

];



/* ==========================================
   DATA PESANAN
========================================== */

let selectedProduct = null;

let selectedPayment = "QRIS";

let discount = 0;

let voucherUsed = "";
/* ==========================================
   ML.JS V1
   BAGIAN 2
   HELPER + RENDER PRODUK
========================================== */


/* ==========================================
   FORMAT RUPIAH
========================================== */

function rupiah(angka){

    return "Rp " + Number(angka)
    .toLocaleString("id-ID");

}



/* ==========================================
   AMBIL GAMBAR PRODUK
========================================== */

function getProductImage(nama){

    nama = nama.toLowerCase();


    if(nama.includes("weekly")){

        return "weekly.jpeg";

    }


    if(nama.includes("twilight")){

        return "star.jpeg";

    }


    return "diamond.jpeg";

}



/* ==========================================
   AMBIL ELEMENT
========================================== */

function $(id){

    return document.getElementById(id);

}




/* ==========================================
   RENDER PRODUK MOBILE LEGENDS
========================================== */


function renderProducts(){


    console.log("💎 ML PRODUCT LOAD");


    const productList = $("productList");


    if(!productList){

        console.error(
        "Element #productList tidak ditemukan"
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

            class="btn-primary"

            type="button">


            Pilih


            </button>



        </div>


        `;


    });


}
/* ==========================================
   ML.JS V1
   BAGIAN 3
   PILIH PRODUK
========================================== */


function selectProduct(index){


    // Simpan produk yang dipilih

    selectedProduct = products[index];



    // Hapus efek card sebelumnya

    document.querySelectorAll(".product-card")
    .forEach(card=>{


        card.classList.remove("active");


    });




    // Tambahkan efek card aktif

    const cards = document.querySelectorAll(
        ".product-card"
    );



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
        rupiah(
            selectedProduct.harga - discount
        );


    }





    // Update Ringkasan Checkout


    if($("summaryProduk")){


        $("summaryProduk").textContent =
        selectedProduct.nama;


    }



    if($("summaryTotal")){


        $("summaryTotal").textContent =
        rupiah(
            selectedProduct.harga - discount
        );


    }





    if($("summaryPayment")){


        $("summaryPayment").textContent =
        selectedPayment;


    }



}




/* ==========================================
   JALANKAN SAAT HALAMAN SELESAI LOAD
========================================== */


document.addEventListener("DOMContentLoaded",()=>{


    console.log(
    "🎮 ML.JS BERHASIL AKTIF"
    );


    renderProducts();


});
/* ==========================================
   ML.JS V1
   BAGIAN 4
   SISTEM VOUCHER
========================================== */


/* ==========================================
   DAFTAR VOUCHER
========================================== */


const vouchers = {


    "ARDZ10":10,

    "ML5":5,

    "HEMAT20":20


};




/* ==========================================
   GUNAKAN VOUCHER
========================================== */


function applyVoucher(){



    if(selectedProduct === null){


        alert(
        "Pilih Diamond terlebih dahulu!"
        );


        return;


    }




    const input = $("voucher");


    const info = $("voucherInfo");



    if(!input){

        return;

    }



    const code =
    input.value
    .trim()
    .toUpperCase();





    if(code === ""){


        alert(
        "Masukkan kode voucher"
        );


        return;


    }




    if(vouchers.hasOwnProperty(code)){



        voucherUsed = code;



        const persen =
        vouchers[code];



        discount =
        Math.floor(
            selectedProduct.harga *
            persen / 100
        );





        // Update Total Pesanan


        if($("total")){


            $("total").textContent =
            rupiah(
                selectedProduct.harga -
                discount
            );


        }




        // Update Ringkasan


        if($("summaryTotal")){


            $("summaryTotal").textContent =
            rupiah(
                selectedProduct.harga -
                discount
            );


        }




        if(info){


            info.textContent =

            "✅ Voucher berhasil digunakan ("+
            persen+
            "% OFF)";


            info.style.color =
            "#22c55e";


        }




    }else{



        voucherUsed = "";


        discount = 0;



        if(info){


            info.textContent =
            "❌ Voucher tidak valid";


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
   TOMBOL VOUCHER
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
   ML.JS V1
   BAGIAN 5
   SISTEM PEMBAYARAN
========================================== */



/* ==========================================
   INISIALISASI PEMBAYARAN
========================================== */


function initPayment(){



    const paymentCards =
    document.querySelectorAll(
        ".payment-card"
    );



    paymentCards.forEach(card=>{



        card.addEventListener(
        "click",
        ()=>{



            // Hapus pilihan lama

            paymentCards.forEach(item=>{

                item.classList.remove(
                    "active"
                );

            });





            // Aktifkan pembayaran

            card.classList.add(
                "active"
            );





            // Simpan metode pembayaran

            selectedPayment =
            card.dataset.payment;





            // Update ringkasan


            if($("summaryPayment")){


                $("summaryPayment")
                .textContent =
                selectedPayment;


            }





            // Simpan order

            saveOrder();



        });



    });



}




/* ==========================================
   DEFAULT PEMBAYARAN
========================================== */


function setDefaultPayment(){



    const firstPayment =
    document.querySelector(
        ".payment-card"
    );



    if(firstPayment){


        firstPayment.classList.add(
            "active"
        );


        selectedPayment =
        firstPayment.dataset.payment;


    }



}
/* ==========================================
   ML.JS V1
   BAGIAN 6
   CHECKOUT WHATSAPP
========================================== */



function checkoutWhatsApp(){



    // Ambil data player

    const userId =
    $("userId") ?
    $("userId").value.trim() :
    "";



    const serverId =
    $("serverId") ?
    $("serverId").value.trim() :
    "";



    const nickname =
    $("nickname") ?
    $("nickname").value.trim() :
    "-";





    // Validasi User ID

    if(userId === ""){


        alert(
        "Masukkan User ID terlebih dahulu!"
        );


        $("userId").focus();


        return;

    }





    // Validasi Server ID

    if(serverId === ""){


        alert(
        "Masukkan Server ID terlebih dahulu!"
        );


        $("serverId").focus();


        return;

    }





    // Validasi Produk


    if(selectedProduct === null){


        alert(
        "Silakan pilih Diamond terlebih dahulu!"
        );


        return;


    }





    // Hitung total

    const total =
    getTotalHarga();





    // Buat pesan WhatsApp


    const pesan =

`🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Mobile Legends.

━━━━━━━━━━━━━━━━━━

🎮 Game : Mobile Legends

🆔 User ID : ${userId}

🌍 Server ID : ${serverId}

👤 Nickname : ${nickname}

💎 Produk : ${selectedProduct.nama}

💰 Harga : ${rupiah(selectedProduct.harga)}

🎁 Voucher : ${voucherUsed || "-"}

💸 Diskon : ${rupiah(discount)}

💵 Total Bayar : ${rupiah(total)}

💳 Pembayaran : ${selectedPayment}

━━━━━━━━━━━━━━━━━━

Mohon diproses ya 🙏

Terima kasih`;





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
   HUBUNGKAN TOMBOL CHECKOUT
========================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    const btn =
    $("checkoutBtn");



    if(btn){


        btn.addEventListener(
            "click",
            checkoutWhatsApp
        );


    }


});
/* ==========================================
   ML.JS V1
   BAGIAN 7
   LOCAL STORAGE PESANAN
========================================== */


const STORAGE_KEY = "ml_last_order";



/* ==========================================
   SIMPAN DATA ORDER
========================================== */


function saveOrder(){


    const data = {


        userId:
        $("userId") ?
        $("userId").value :
        "",



        serverId:
        $("serverId") ?
        $("serverId").value :
        "",



        nickname:
        $("nickname") ?
        $("nickname").value :
        "",



        payment:
        selectedPayment,



        productId:
        selectedProduct ?
        selectedProduct.id :
        null



    };



    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );


}





/* ==========================================
   LOAD DATA ORDER
========================================== */


function loadOrder(){



    const data = JSON.parse(

        localStorage.getItem(
            STORAGE_KEY
        )

    );



    if(!data){

        return;

    }





    // User ID

    if($("userId")){


        $("userId").value =
        data.userId || "";


    }





    // Server ID

    if($("serverId")){


        $("serverId").value =
        data.serverId || "";


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



        document.querySelectorAll(
            ".payment-card"
        )
        .forEach(card=>{


            card.classList.remove(
                "active"
            );



            if(
            card.dataset.payment ===
            selectedPayment
            ){


                card.classList.add(
                    "active"
                );


            }


        });



        if($("summaryPayment")){


            $("summaryPayment")
            .textContent =
            selectedPayment;


        }


    }







    // Produk terakhir

    if(data.productId){



        const index =
        products.findIndex(
            item =>
            item.id ===
            data.productId
        );



        if(index !== -1){


            selectProduct(index);


        }


    }


}







/* ==========================================
   AUTO SIMPAN INPUT
========================================== */


[
"userId",
"serverId",
"nickname"

]
.forEach(id=>{


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
   SIMPAN SAAT KELUAR HALAMAN
========================================== */


window.addEventListener(

    "beforeunload",

    saveOrder

);
/* ==========================================
   ML.JS V1
   BAGIAN 8
   LIVE ORDER + POPUP PROMO
========================================== */


/* ==========================================
   LIVE ORDER
========================================== */


const liveOrders = [


{
nama:"Budi",
kota:"Jakarta",
produk:"86 Diamond"
},


{
nama:"Andi",
kota:"Bandung",
produk:"172 Diamond"
},


{
nama:"Rizky",
kota:"Surabaya",
produk:"Weekly Diamond Pass"
},


{
nama:"Fajar",
kota:"Medan",
produk:"257 Diamond"
},


{
nama:"Agus",
kota:"Semarang",
produk:"59 Diamond"
},


{
nama:"Dimas",
kota:"Makassar",
produk:"Twilight Pass"
},


{
nama:"Rian",
kota:"Bekasi",
produk:"44 Diamond"
},


{
nama:"Aldi",
kota:"Depok",
produk:"344 Diamond"
}


];





function startLiveOrder(){



    const box =
    $("liveOrder");



    if(!box){

        return;

    }




    function showOrder(){



        const item =
        liveOrders[
            Math.floor(
            Math.random()
            *
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



        box.classList.add(
            "show"
        );



        setTimeout(()=>{


            box.classList.remove(
                "show"
            );


        },5000);



    }




    // tampil pertama

    setTimeout(
        showOrder,
        3000
    );



    // ulang setiap 12 detik

    setInterval(
        showOrder,
        12000
    );


}







/* ==========================================
   POPUP PROMO
========================================== */


function initPromoPopup(){



    const popup =
    $("promoPopup");



    const close =
    $("closePromo");



    const button =
    $("promoButton");



    if(!popup){

        return;

    }




    // cek pernah muncul

    if(
    localStorage.getItem(
        "ml_promo_seen"
    )
    ){


        popup.style.display =
        "none";


        return;

    }






    // tampil setelah 1 detik

    setTimeout(()=>{


        popup.classList.add(
            "show"
        );


    },1000);







    // tutup popup


    if(close){


        close.addEventListener(
        "click",
        ()=>{


            popup.classList.remove(
                "show"
            );


            localStorage.setItem(
                "ml_promo_seen",
                "true"
            );


        });


    }







    // tombol promo


    if(button){


        button.addEventListener(
        "click",
        ()=>{


            popup.classList.remove(
                "show"
            );


            localStorage.setItem(
                "ml_promo_seen",
                "true"
            );



            const voucher =
            $("voucher");



            if(voucher){


                voucher.scrollIntoView({

                    behavior:"smooth"

                });


            }


        });


    }



}







/* ==========================================
   EFEK CARD PRODUK
========================================== */


function initCardEffect(){



    document
    .querySelectorAll(
        ".product-card"
    )
    .forEach(card=>{



        card.addEventListener(
        "mouseenter",
        ()=>{


            card.style.transform =
            "translateY(-8px)";


        });



        card.addEventListener(
        "mouseleave",
        ()=>{


            if(
            !card.classList.contains(
                "active"
            )
            ){


                card.style.transform =
                "translateY(0)";


            }


        });



    });


              }
/* ==========================================
   ML.JS V1
   BAGIAN 9
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🎮 ML.js Loaded");

    // Tampilkan daftar produk
    renderProducts();

    // Aktifkan sistem pembayaran
    initPayment();

    // Set pembayaran default
    setDefaultPayment();

    // Muat data terakhir
    loadOrder();

    // Live Order
    startLiveOrder();

    // Popup Promo
    initPromoPopup();

    // Efek Card
    initCardEffect();

    // Tombol Back To Top
    if (typeof initBackToTop === "function") {
        initBackToTop();
    }

    console.log("✅ Mobile Legends siap digunakan.");
});
