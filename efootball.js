/* ==========================================
   ARDZ STORE
   EFOOTBALL
   EFOOTBALL.JS V1
========================================== */

"use strict";


/* ==========================================
   KONFIGURASI
========================================== */

// Nomor WhatsApp Admin
const ADMIN_WA = "6283185954674";


/* ==========================================
   DATA PRODUK EFOOTBALL
========================================== */

const products = [

    // eFootball Coins

    {
        id:1,
        nama:"130 eFootball Coins",
        harga:25000
    },

    {
        id:2,
        nama:"300 eFootball Coins",
        harga:55000
    },

    {
        id:3,
        nama:"550 eFootball Coins",
        harga:95000
    },

    {
        id:4,
        nama:"1040 eFootball Coins",
        harga:175000
    },

    {
        id:5,
        nama:"2130 eFootball Coins",
        harga:350000
    },


    // Match Pass

    {
        id:6,
        nama:"Match Pass Premium",
        harga:129000
    },


    // Bundle

    {
        id:7,
        nama:"Epic Player Pack",
        harga:99000
    },

    {
        id:8,
        nama:"Special Player Pack",
        harga:149000
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
   KONSTANTA GAME
========================================== */

const GAME_NAME = "eFootball";

const DEFAULT_REGION = "Asia";
/* ==========================================
   EFOOTBALL.JS V1
   BAGIAN 2
   HELPER FUNCTION
========================================== */


/* ==========================================
   FORMAT RUPIAH
========================================== */

function rupiah(angka){

    return "Rp " +
    Number(angka)
    .toLocaleString("id-ID");

}



/* ==========================================
   GAMBAR PRODUK
========================================== */

function getProductImage(nama){

    nama = nama.toLowerCase();


    // Coin
    if(nama.includes("coin")){

        return "bola.jpeg";

    }


    // Match Pass
    if(nama.includes("pass")){

        return "bintang.jpeg";

    }


    // Epic Player
    if(nama.includes("epic")){

        return "bandle.jpeg";

    }


    // Special Pack
    if(nama.includes("special")){

        return "bandle.jpeg";

    }


    // Default
    return "bola.jpeg";

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
   GET ELEMENT
========================================== */

function $(id){

    return document.getElementById(id);

    }
/* ==========================================
   EFOOTBALL.JS V1
   BAGIAN 3
   RENDER PRODUK
========================================== */


function renderProducts(){


    const productList = $("productList");


    if(!productList){

        console.error(
            "productList tidak ditemukan"
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



            <p class="price">

            ${rupiah(item.harga)}

            </p>



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
   EFOOTBALL.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */


function selectProduct(index){


    // Ambil produk yang dipilih

    selectedProduct = products[index];



    // Hapus active semua card

    document
    .querySelectorAll(".product-card")
    .forEach(card=>{

        card.classList.remove("active");

    });



    // Tambahkan active ke produk pilihan

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
        rupiah(
            getTotalHarga()
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
            getTotalHarga()
        );

    }



    // Simpan jika LocalStorage aktif

    if(typeof saveOrder === "function"){

        saveOrder();

    }



    console.log(
        "Produk dipilih:",
        selectedProduct.nama
    );

}
/* ==========================================
   EFOOTBALL.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */


/* ==========================================
   DAFTAR VOUCHER
========================================== */

const vouchers = {

    "ARDZ10": 10,

    "EFOOT10": 10,

    "HEMAT20": 20

};




/* ==========================================
   APPLY VOUCHER
========================================== */

function applyVoucher(){


    if(selectedProduct === null){


        alert(
            "Pilih produk eFootball terlebih dahulu."
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

            persen /

            100

        );





        // Update total

        if($("total")){


            $("total").textContent =

            rupiah(
                getTotalHarga()
            );


        }




        if($("summaryTotal")){


            $("summaryTotal").textContent =

            rupiah(
                getTotalHarga()
            );


        }





        if(info){


            info.textContent =

            "✅ Voucher berhasil digunakan " +

            "(" +

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
   BUTTON VOUCHER
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
   EFOOTBALL.JS V1
   BAGIAN 6
   SISTEM PEMBAYARAN
========================================== */


/* ==========================================
   INIT PAYMENT
========================================== */

function initPayment(){


    const payments =
    document.querySelectorAll(
        ".payment-card"
    );



    if(payments.length === 0){

        console.warn(
            "Payment card tidak ditemukan."
        );

        return;

    }




    payments.forEach(card=>{


        card.addEventListener(
        "click",
        ()=>{


            // Hapus aktif semua

            payments.forEach(item=>{

                item.classList.remove(
                    "active"
                );

            });




            // Aktifkan pilihan

            card.classList.add(
                "active"
            );




            // Simpan pembayaran

            selectedPayment =
            card.dataset.payment;




            // Update ringkasan

            if($("summaryPayment")){


                $("summaryPayment")
                .textContent =
                selectedPayment;


            }




            // Simpan data

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
    document.querySelector(
        ".payment-card"
    );



    if(first){



        first.classList.add(
            "active"
        );



        selectedPayment =
        first.dataset.payment;



        if($("summaryPayment")){


            $("summaryPayment")
            .textContent =
            selectedPayment;


        }



    }


          }
/* ==========================================
   EFOOTBALL.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */


/* ==========================================
   CHECKOUT FUNCTION
========================================== */

function checkoutWhatsApp(){


    // User ID

    const userId =
    $("userId")?.value.trim() || "";



    if(userId === ""){


        alert(
            "Masukkan User ID eFootball terlebih dahulu."
        );


        $("userId").focus();


        return;

    }




    // Cek produk

    if(selectedProduct === null){


        alert(
            "Silakan pilih produk eFootball."
        );


        return;

    }




    // Nickname

    const nickname =
    $("nickname")?.value.trim() || "-";



    // Region

    const region =
    $("region")?.value || DEFAULT_REGION;




    // Total

    const total =
    getTotalHarga();





    // Pesan WhatsApp


    const pesan = `🎮 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up eFootball.

━━━━━━━━━━━━━━

⚽ Game :
${GAME_NAME}


🆔 User ID :
${userId}


👤 Nickname :
${nickname}


🌍 Region :
${region}


💎 Produk :
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
   BUTTON CHECKOUT
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
   EFOOTBALL.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */


const STORAGE_KEY = "ardz_efootball_order";



/* ==========================================
   SIMPAN DATA ORDER
========================================== */

function saveOrder(){


    const data = {


        userId:
        $("userId")?.value || "",


        nickname:
        $("nickname")?.value || "",


        region:
        $("region")?.value || DEFAULT_REGION,



        productId:
        selectedProduct
        ?
        selectedProduct.id
        :
        null,



        payment:
        selectedPayment,



        voucher:
        voucherUsed,



        discount:
        discount



    };



    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );



    console.log(
        "Order tersimpan"
    );

}





/* ==========================================
   LOAD DATA ORDER
========================================== */


function loadOrder(){



    const data =
    JSON.parse(

        localStorage.getItem(
            STORAGE_KEY
        )

    );



    if(!data) return;




    // User ID

    if($("userId")){


        $("userId").value =
        data.userId || "";


    }




    // Nickname

    if($("nickname")){


        $("nickname").value =
        data.nickname || "";


    }





    // Region

    if($("region")){


        $("region").value =
        data.region ||
        DEFAULT_REGION;


    }





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





    // Pembayaran

    if(data.payment){


        selectedPayment =
        data.payment;



        document
        .querySelectorAll(
            ".payment-card"
        )
        .forEach(card=>{


            card.classList.remove(
                "active"
            );



            if(
                card.dataset.payment
                ===
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





    // Voucher

    voucherUsed =
    data.voucher || "";



    discount =
    data.discount || 0;



    if($("voucher")){


        $("voucher").value =
        voucherUsed;


    }



    console.log(
        "Order berhasil dimuat"
    );


}





/* ==========================================
   AUTO SAVE INPUT
========================================== */


[
"userId",
"nickname",
"region"

].forEach(id=>{


    const element =
    $(id);



    if(element){


        element.addEventListener(

            "input",

            saveOrder

        );



        element.addEventListener(

            "change",

            saveOrder

        );


    }


});





/* ==========================================
   SIMPAN SEBELUM KELUAR
========================================== */


window.addEventListener(

"beforeunload",

saveOrder

);
/* ==========================================
   EFOOTBALL.JS V1
   BAGIAN 9
   LIVE ORDER + POPUP + EFFECT
========================================== */


/* ==========================================
   LIVE ORDER
========================================== */


const liveOrders = [

    {
        nama:"Rizky",
        kota:"Jakarta",
        produk:"550 eFootball Coins"
    },

    {
        nama:"Fajar",
        kota:"Bandung",
        produk:"Match Pass Premium"
    },

    {
        nama:"Dimas",
        kota:"Surabaya",
        produk:"1040 eFootball Coins"
    },

    {
        nama:"Andi",
        kota:"Medan",
        produk:"Epic Player Pack"
    },

    {
        nama:"Budi",
        kota:"Bekasi",
        produk:"2130 eFootball Coins"
    }

];




function startLiveOrder(){


    const box =
    $("liveOrder");



    if(!box) return;




    function showOrder(){



        const order =
        liveOrders[
            Math.floor(
                Math.random()
                *
                liveOrders.length
            )
        ];



        box.innerHTML = `

        🛒 <b>Pesanan Baru</b>

        <br>

        ${order.nama}
        dari
        ${order.kota}

        membeli

        <br>

        <b>
        ${order.produk}
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




    setTimeout(

        showOrder,

        3000

    );



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



    if(!popup) return;





    if(
        localStorage.getItem(
            "efootball_promo_seen"
        )
    ){


        popup.style.display =
        "none";


        return;

    }






    setTimeout(()=>{


        popup.classList.add(
            "show"
        );


    },2000);






    if(close){


        close.addEventListener(

            "click",

            ()=>{


                popup.classList.remove(
                    "show"
                );



                localStorage.setItem(

                    "efootball_promo_seen",

                    "true"

                );


            }

        );


    }







    if(button){


        button.addEventListener(

            "click",

            ()=>{


                popup.classList.remove(
                    "show"
                );



                localStorage.setItem(

                    "efootball_promo_seen",

                    "true"

                );



                $("voucher")
                ?.scrollIntoView({

                    behavior:"smooth"

                });


            }

        );


    }


}







/* ==========================================
   BACK TO TOP
========================================== */


function initBackToTop(){


    const btn =
    $("backTop");



    if(!btn) return;





    window.addEventListener(

        "scroll",

        ()=>{


            if(
                window.scrollY > 300
            ){


                btn.style.display =
                "flex";


            }else{


                btn.style.display =
                "none";


            }


        }

    );





    btn.addEventListener(

        "click",

        ()=>{


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }

    );


}







/* ==========================================
   CARD EFFECT
========================================== */


function initCardEffect(){



    const cards =
    document.querySelectorAll(

        ".product-card"

    );



    cards.forEach(card=>{


        card.addEventListener(

            "mouseenter",

            ()=>{


                card.style.transform =
                "translateY(-8px)";


            }

        );




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


            }

        );


    });


          }
/* ==========================================
   EFOOTBALL.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    console.log(
        "⚽ ARDZ STORE eFootball Loaded"
    );



    // Render semua produk

    renderProducts();




    // Load data sebelumnya

    loadOrder();




    // Sistem pembayaran

    initPayment();




    // Default pembayaran

    setDefaultPayment();




    // Live order

    startLiveOrder();




    // Popup promo

    initPromoPopup();




    // Tombol kembali atas

    initBackToTop();




    // Efek card

    initCardEffect();




    console.log(

        "✅ Semua fitur eFootball aktif"

    );


});
