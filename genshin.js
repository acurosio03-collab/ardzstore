/* ==========================================
   ARDZ STORE
   GENSHIN IMPACT
   GENSHIN.JS V1
========================================== */

"use strict";



/* ==========================================
   KONFIGURASI
========================================== */


// WhatsApp Admin ARDZ STORE

const ADMIN_WA = "6283185954674";



// Nama Game

const GAME_NAME = "Genshin Impact";



// Default Server

const DEFAULT_SERVER = "Asia";






/* ==========================================
   DATA PRODUK GENSHIN
========================================== */


const products = [


    // =========================
    // GENESIS CRYSTAL
    // =========================


    {
        id:1,
        nama:"60 Genesis Crystal",
        harga:15000
    },


    {
        id:2,
        nama:"300 + 30 Genesis Crystal",
        harga:75000
    },


    {
        id:3,
        nama:"980 + 110 Genesis Crystal",
        harga:150000
    },


    {
        id:4,
        nama:"1980 + 260 Genesis Crystal",
        harga:300000
    },


    {
        id:5,
        nama:"3280 + 600 Genesis Crystal",
        harga:500000
    },



    // =========================
    // WELKIN MOON
    // =========================


    {
        id:6,
        nama:"Blessing of the Welkin Moon",
        harga:75000
    },



    // =========================
    // BATTLE PASS
    // =========================


    {
        id:7,
        nama:"Gnostic Hymn Battle Pass",
        harga:150000
    },


    {
        id:8,
        nama:"Gnostic Chorus Battle Pass",
        harga:300000
    }



];






/* ==========================================
   DATA ORDER
========================================== */


let selectedProduct = null;


let selectedPayment = "QRIS";


let discount = 0;


let voucherUsed = "";
/* ==========================================
   GENSHIN.JS V1
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


    nama =
    nama.toLowerCase();



    // Genesis Crystal

    if(
        nama.includes("crystal")
    ){

        return "diamond.jpeg";

    }





    // Welkin Moon

    if(
        nama.includes("welkin")
    ){

        return "bintang.jpeg";

    }





    // Battle Pass

    if(
        nama.includes("battle")
    ){

        return "bandle.jpeg";

    }




    // Default

    return "diamond.jpeg";


}







/* ==========================================
   HITUNG TOTAL HARGA
========================================== */


function getTotalHarga(){


    if(
        selectedProduct === null
    ){

        return 0;

    }



    return (

        selectedProduct.harga

        -

        discount

    );


}







/* ==========================================
   AMBIL ELEMENT HTML
========================================== */


function $(id){


    return document.getElementById(id);


      }
/* ==========================================
   GENSHIN.JS V1
   BAGIAN 3
   RENDER PRODUK
========================================== */


function renderProducts(){



    const productList =
    $("productList");



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
   GENSHIN.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */


function selectProduct(index){



    // Ambil produk pilihan

    selectedProduct =
    products[index];





    // Hapus efek aktif semua card

    document
    .querySelectorAll(".product-card")
    .forEach(card=>{


        card.classList.remove(
            "active"
        );


    });






    // Tambahkan efek aktif

    const cards =
    document.querySelectorAll(
        ".product-card"
    );



    if(cards[index]){


        cards[index]
        .classList.add(
            "active"
        );


    }







    // Update Detail Pesanan


    if($("produk")){


        $("produk")
        .textContent =
        selectedProduct.nama;


    }





    if($("total")){


        $("total")
        .textContent =
        rupiah(
            getTotalHarga()
        );


    }







    // Update Ringkasan Checkout



    if($("summaryProduk")){


        $("summaryProduk")
        .textContent =
        selectedProduct.nama;


    }






    if($("summaryTotal")){


        $("summaryTotal")
        .textContent =
        rupiah(
            getTotalHarga()
        );


    }








    console.log(

        "Produk Genshin dipilih:",

        selectedProduct.nama

    );





    // Simpan data jika fungsi tersedia

    if(
        typeof saveOrder === "function"
    ){


        saveOrder();


    }



      }
/* ==========================================
   GENSHIN.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */



/* ==========================================
   DAFTAR VOUCHER
========================================== */


const vouchers = {


    "GENSHIN10": 10,


    "ARDZ10": 10,


    "HEMAT20": 20


};







/* ==========================================
   APPLY VOUCHER
========================================== */


function applyVoucher(){



    // Cek produk

    if(selectedProduct === null){


        alert(
            "Pilih produk Genshin terlebih dahulu."
        );


        return;


    }





    const input =
    $("voucher");



    const info =
    $("voucherInfo");



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







    // Voucher valid


    if(
        vouchers.hasOwnProperty(code)

    ){



        voucherUsed = code;



        const persen =
        vouchers[code];





        discount = Math.floor(

            selectedProduct.harga *

            persen /

            100

        );








        // Update total detail


        if($("total")){


            $("total")
            .textContent =

            rupiah(
                getTotalHarga()
            );


        }







        // Update total summary


        if($("summaryTotal")){


            $("summaryTotal")
            .textContent =

            rupiah(
                getTotalHarga()
            );


        }







        if(info){


            info.textContent =

            "✅ Voucher " +

            code +

            " berhasil digunakan (" +

            persen +

            "% OFF)";



            info.style.color =
            "#22c55e";


        }







        if(
            typeof saveOrder === "function"

        ){


            saveOrder();


        }





    }else{





        voucherUsed = "";


        discount = 0;






        if(info){


            info.textContent =

            "❌ Voucher tidak ditemukan.";



            info.style.color =
            "#ef4444";


        }





        if($("total")){


            $("total")
            .textContent =

            rupiah(
                selectedProduct.harga
            );


        }





        if($("summaryTotal")){


            $("summaryTotal")
            .textContent =

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
   GENSHIN.JS V1
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

            "Payment card tidak ditemukan"

        );


        return;


    }








    payments.forEach(card=>{



        card.addEventListener(

            "click",

            ()=>{





                // Hapus semua active


                payments.forEach(item=>{


                    item.classList.remove(

                        "active"

                    );


                });







                // Tambah active


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








                // Simpan order


                if(

                    typeof saveOrder === "function"

                ){


                    saveOrder();


                }






            }

        );



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
   GENSHIN.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */



/* ==========================================
   CHECKOUT FUNCTION
========================================== */


function checkoutWhatsApp(){



    // Ambil UID

    const uid =

    $("uid")?.value.trim() || "";





    if(uid === ""){


        alert(

            "Masukkan UID Genshin terlebih dahulu."

        );


        $("uid").focus();


        return;


    }






    // Cek produk


    if(selectedProduct === null){


        alert(

            "Silakan pilih produk Genshin."

        );


        return;


    }







    // Nickname


    const nickname =

    $("nickname")?.value.trim() || "-";







    // Server


    const server =

    $("server")?.value ||

    DEFAULT_SERVER;







    // Total


    const total =

    getTotalHarga();









    // Pesan WhatsApp


    const pesan = `✨ *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Genshin Impact.

━━━━━━━━━━━━━━

🎮 Game :
${GAME_NAME}


🆔 UID :
${uid}


👤 Nickname :
${nickname}


🌍 Server :
${server}


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

Mohon diproses 🙏

Terima kasih.

`;







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
   GENSHIN.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */



const STORAGE_KEY = "ardz_genshin_order";





/* ==========================================
   SIMPAN ORDER
========================================== */


function saveOrder(){



    const data = {



        uid:

        $("uid")?.value || "",





        nickname:

        $("nickname")?.value || "",





        server:

        $("server")?.value ||

        DEFAULT_SERVER,






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

        "Data Genshin tersimpan"

    );



}








/* ==========================================
   LOAD ORDER
========================================== */


function loadOrder(){



    const data =

    JSON.parse(


        localStorage.getItem(

            STORAGE_KEY

        )


    );





    if(!data) return;







    // UID


    if($("uid")){


        $("uid").value =

        data.uid || "";


    }







    // Nickname


    if($("nickname")){


        $("nickname").value =

        data.nickname || "";


    }







    // Server


    if($("server")){


        $("server").value =

        data.server ||

        DEFAULT_SERVER;


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







    // Payment


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

        "Data Genshin berhasil dimuat"

    );



}








/* ==========================================
   AUTO SAVE INPUT
========================================== */


[

"uid",

"nickname",

"server"


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
   SAVE SEBELUM REFRESH
========================================== */


window.addEventListener(

"beforeunload",

saveOrder

);
/* ==========================================
   GENSHIN.JS V1
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
        produk:"980 Genesis Crystal"
    },


    {
        nama:"Fajar",
        kota:"Bandung",
        produk:"Blessing of the Welkin Moon"
    },


    {
        nama:"Dimas",
        kota:"Surabaya",
        produk:"300 + 30 Genesis Crystal"
    },


    {
        nama:"Andi",
        kota:"Medan",
        produk:"Gnostic Hymn Battle Pass"
    },


    {
        nama:"Budi",
        kota:"Bekasi",
        produk:"3280 Genesis Crystal"
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
   POPUP PROMO GENSHIN
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

            "genshin_promo_seen"

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

                    "genshin_promo_seen",

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

                    "genshin_promo_seen",

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
   GENSHIN.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("✨ ARDZ STORE Genshin Impact Loaded");

    // Render semua produk
    renderProducts();

    // Load data yang tersimpan
    loadOrder();

    // Inisialisasi sistem pembayaran
    initPayment();

    // Set pembayaran default
    setDefaultPayment();

    // Jalankan Live Order
    startLiveOrder();

    // Jalankan Popup Promo
    initPromoPopup();

    // Aktifkan tombol Back To Top
    initBackToTop();

    // Aktifkan efek card
    initCardEffect();

    // Update UID ke Ringkasan Checkout
    const uidInput = $("uid");
    if (uidInput) {
        const updateUID = () => {
            if ($("summaryUID")) {
                $("summaryUID").textContent = uidInput.value || "-";
            }
            if (typeof saveOrder === "function") {
                saveOrder();
            }
        };

        uidInput.addEventListener("input", updateUID);
        updateUID();
    }

    // Update Server ke Ringkasan Checkout
    const serverSelect = $("server");
    if (serverSelect) {
        const updateServer = () => {
            if ($("summaryServer")) {
                $("summaryServer").textContent = serverSelect.value;
            }
            if (typeof saveOrder === "function") {
                saveOrder();
            }
        };

        serverSelect.addEventListener("change", updateServer);
        updateServer();
    }

    console.log("✅ Semua fitur Genshin Impact aktif.");

});
