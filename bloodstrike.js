/* ==========================================
   ARDZ STORE
   BLOOD STRIKE
   BLOODSTRIKE.JS V1
========================================== */

"use strict";



/* ==========================================
   KONFIGURASI
========================================== */


// WhatsApp Admin ARDZ STORE

const ADMIN_WA = "6283185954674";



// Nama Game

const GAME_NAME = "Blood Strike";






// Produk Default

const DEFAULT_PRODUCT = "Gold";






/* ==========================================
   DATA PRODUK BLOOD STRIKE
========================================== */


const products = [



    // =========================
    // BLOOD STRIKE GOLD
    // =========================


    {
        id:1,
        nama:"100 Blood Strike Gold",
        harga:15000
    },


    {
        id:2,
        nama:"300 Blood Strike Gold",
        harga:45000
    },


    {
        id:3,
        nama:"500 Blood Strike Gold",
        harga:75000
    },


    {
        id:4,
        nama:"1000 Blood Strike Gold",
        harga:150000
    },


    {
        id:5,
        nama:"2000 Blood Strike Gold",
        harga:300000
    },




    // =========================
    // BATTLE PASS
    // =========================


    {
        id:6,
        nama:"Blood Strike Battle Pass",
        harga:120000
    },




    // =========================
    // BUNDLE
    // =========================


    {
        id:7,
        nama:"Premium Skin Bundle",
        harga:200000
    },


    {
        id:8,
        nama:"Weapon Bundle Blood Strike",
        harga:250000
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
   BLOODSTRIKE.JS V1
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





    // Gold


    if(

        nama.includes("gold")

    ){


        return "gold.jpeg";


    }






    // Battle Pass


    if(

        nama.includes("battle")

    ){


        return "bintang.jpeg";


    }







    // Bundle


    if(

        nama.includes("bundle")

    ){


        return "bandle.jpeg";


    }







    // Default


    return "gold.jpeg";


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
   BLOODSTRIKE.JS V1
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
   BLOODSTRIKE.JS V1
   BAGIAN 4
   PILIH PRODUK
========================================== */



function selectProduct(index){



    // Ambil produk yang dipilih

    selectedProduct =

    products[index];







    // Hapus semua efek active


    document

    .querySelectorAll(

        ".product-card"

    )

    .forEach(card=>{


        card.classList.remove(

            "active"

        );


    });








    // Tambahkan active ke card pilihan


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








    // Update detail pesanan



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








    // Update ringkasan checkout



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

        "Blood Strike dipilih:",

        selectedProduct.nama

    );








    // Simpan jika LocalStorage sudah aktif


    if(

        typeof saveOrder === "function"

    ){


        saveOrder();


    }



}
/* ==========================================
   BLOODSTRIKE.JS V1
   BAGIAN 5
   SISTEM VOUCHER
========================================== */



/* ==========================================
   DAFTAR VOUCHER
========================================== */


const vouchers = {


    "BLOOD10": 10,


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

            "Pilih produk Blood Strike terlebih dahulu."

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








    // Jika voucher ditemukan


    if(

        vouchers.hasOwnProperty(code)

    ){



        voucherUsed = code;



        const persen =

        vouchers[code];







        discount = Math.floor(


            selectedProduct.harga

            *

            persen

            /

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







        // Update summary


        if($("summaryTotal")){


            $("summaryTotal")

            .textContent =

            rupiah(

                getTotalHarga()

            );


        }








        if(info){



            info.textContent =


            "✅ Voucher "

            +

            code

            +

            " berhasil digunakan ("

            +

            persen

            +

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


            "❌ Voucher tidak valid.";




            info.style.color =

            "#ef4444";


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
   BLOODSTRIKE.JS V1
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







                // Tambahkan active


                card.classList.add(

                    "active"

                );








                // Ambil metode pembayaran


                selectedPayment =

                card.dataset.payment;








                // Update ringkasan


                if($("summaryPayment")){


                    $("summaryPayment")

                    .textContent =

                    selectedPayment;


                }








                // Simpan data


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







        if($("summaryPayment")){


            $("summaryPayment")

            .textContent =

            selectedPayment;


        }


    }


              }
/* ==========================================
   BLOODSTRIKE.JS V1
   BAGIAN 7
   CHECKOUT WHATSAPP
========================================== */



/* ==========================================
   CHECKOUT FUNCTION
========================================== */


function checkoutWhatsApp(){



    // Player ID

    const playerId =

    $("playerId")?.value.trim() || "";





    if(playerId === ""){


        alert(

            "Masukkan Player ID Blood Strike terlebih dahulu."

        );


        $("playerId").focus();


        return;


    }







    // Cek produk


    if(selectedProduct === null){


        alert(

            "Pilih produk Blood Strike terlebih dahulu."

        );


        return;


    }







    // Nickname


    const nickname =

    $("nickname")?.value.trim() || "-";









    // Total


    const total =

    getTotalHarga();








    // Pesan WhatsApp


    const pesan = `🔫 *ARDZ STORE*

Halo Admin,

Saya ingin melakukan Top Up Blood Strike.

━━━━━━━━━━━━━━

🎮 Game :
${GAME_NAME}


🆔 Player ID :
${playerId}


👤 Nickname :
${nickname}


🔫 Produk :
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

Mohon segera diproses 🙏

Terima kasih.

`;








    // Kirim WhatsApp


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
   BLOODSTRIKE.JS V1
   BAGIAN 8
   LOCAL STORAGE
========================================== */



const BLOOD_STORAGE_KEY =

"ardz_bloodstrike_order";







/* ==========================================
   SIMPAN ORDER
========================================== */


function saveOrder(){



    const data = {



        playerId:

        $("playerId")?.value || "",





        nickname:

        $("nickname")?.value || "",





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


        BLOOD_STORAGE_KEY,


        JSON.stringify(data)


    );





    console.log(

        "Blood Strike order tersimpan"

    );



}









/* ==========================================
   LOAD ORDER
========================================== */


function loadOrder(){



    const data =

    JSON.parse(


        localStorage.getItem(

            BLOOD_STORAGE_KEY

        )


    );





    if(!data) return;







    // Player ID


    if($("playerId")){


        $("playerId").value =

        data.playerId || "";

    }







    // Nickname


    if($("nickname")){


        $("nickname").value =

        data.nickname || "";

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

        "Blood Strike order berhasil dimuat"

    );



}









/* ==========================================
   AUTO SAVE INPUT
========================================== */


[

"playerId",

"nickname"

].forEach(id=>{



    const input =

    $(id);





    if(input){



        input.addEventListener(

            "input",

            saveOrder

        );



    }



});









/* ==========================================
   SIMPAN SEBELUM REFRESH
========================================== */


window.addEventListener(

"beforeunload",

saveOrder

);
/* ==========================================
   BLOODSTRIKE.JS V1
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
        produk:"1000 Blood Strike Gold"
    },


    {
        nama:"Fajar",
        kota:"Bandung",
        produk:"Battle Pass Blood Strike"
    },


    {
        nama:"Dimas",
        kota:"Surabaya",
        produk:"500 Blood Strike Gold"
    },


    {
        nama:"Andi",
        kota:"Medan",
        produk:"Premium Skin Bundle"
    },


    {
        nama:"Budi",
        kota:"Bekasi",
        produk:"2000 Blood Strike Gold"
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


        🔫 <b>Pesanan Baru</b>

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
   POPUP PROMO BLOOD STRIKE
========================================== */



function initPromoPopup(){



    const popup =

    $("promoPopup");





    const close =

    $("closePromo");





    const button =

    $("promoButton");






    if(!popup) return;









    setTimeout(()=>{



        popup.classList.add(

            "show"

        );



    },2500);








    if(close){



        close.onclick = ()=>{



            popup.classList.remove(

                "show"

            );



        };



    }








    if(button){



        button.onclick = ()=>{



            popup.classList.remove(

                "show"

            );







            if($("voucher")){


                $("voucher")

                .scrollIntoView({

                    behavior:"smooth"

                });


            }



        };



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

                window.scrollY > 400

            ){



                btn.style.display =

                "flex";



            }

            else{



                btn.style.display =

                "none";


            }



        }

    );







    btn.onclick = ()=>{



        window.scrollTo({


            top:0,


            behavior:"smooth"



        });


    };


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

                "translateY(-10px)";



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
   PAYMENT CARD EFFECT
========================================== */


function initPaymentEffect(){



    const cards =

    document.querySelectorAll(

        ".payment-card"

    );







    cards.forEach(card=>{



        card.addEventListener(

            "mouseenter",

            ()=>{



                card.style.transform =

                "scale(1.05)";



            }

        );







        card.addEventListener(

            "mouseleave",

            ()=>{



                card.style.transform =

                "scale(1)";



            }

        );



    });



}
   /* ==========================================
   BLOODSTRIKE.JS V1
   BAGIAN 10
   INISIALISASI FINAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🔫 ARDZ STORE Blood Strike Loaded");

    // Render semua produk
    renderProducts();

    // Muat data yang tersimpan
    loadOrder();

    // Inisialisasi pembayaran
    initPayment();

    // Pembayaran default
    setDefaultPayment();

    // Live Order
    startLiveOrder();

    // Popup Promo
    initPromoPopup();

    // Tombol Back To Top
    initBackToTop();

    // Efek Card Produk
    initCardEffect();

    // Efek Card Pembayaran
    initPaymentEffect();

    /* ======================================
       UPDATE PLAYER ID KE RINGKASAN
    ====================================== */

    const playerId = $("playerId");

    if (playerId) {

        const updatePlayer = () => {

            if ($("summaryPlayerId")) {

                $("summaryPlayerId").textContent =
                    playerId.value || "-";

            }

            if (typeof saveOrder === "function") {

                saveOrder();

            }

        };

        playerId.addEventListener("input", updatePlayer);

        updatePlayer();

    }

    /* ======================================
       UPDATE NICKNAME KE RINGKASAN
    ====================================== */

    const nickname = $("nickname");

    if (nickname) {

        const updateNickname = () => {

            if ($("summaryNickname")) {

                $("summaryNickname").textContent =
                    nickname.value || "-";

            }

            if (typeof saveOrder === "function") {

                saveOrder();

            }

        };

        nickname.addEventListener("input", updateNickname);

        updateNickname();

    }

    console.log("✅ Semua fitur Blood Strike aktif.");

});
