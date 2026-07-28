// =====================================
// ARDZ STORE - DASHBOARD.JS
// =====================================

// Ambil data
let nominal = JSON.parse(localStorage.getItem("nominal")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// ===============================
// TOTAL PRODUK
// ===============================

let totalProduk = document.getElementById("totalProduk");

if(totalProduk){
    totalProduk.innerHTML = nominal.length;
}

// ===============================
// TOTAL PESANAN
// ===============================

let totalPesanan = document.getElementById("totalPesanan");

if(totalPesanan){
    totalPesanan.innerHTML = orders.length;
}

// ===============================
// PRODUK TERBARU
// ===============================

let lastProducts = document.getElementById("lastProducts");

if(lastProducts){

    if(nominal.length==0){

        lastProducts.innerHTML=`
        <tr>
            <td colspan="3">
            Belum ada produk
            </td>
        </tr>
        `;

    }else{

        let html="";

        nominal.slice(-5).reverse().forEach(item=>{

            let harga =
            Number(item.supplier)+Number(item.profit);

            html+=`

            <tr>

            <td>${item.game}</td>

            <td>${item.produk}</td>

            <td>
            Rp ${harga.toLocaleString("id-ID")}
            </td>

            </tr>

            `;

        });

        lastProducts.innerHTML=html;

    }

}

// ===============================
// PESANAN TERBARU
// ===============================

let lastOrders = document.getElementById("lastOrders");

if(lastOrders){

    if(orders.length==0){

        lastOrders.innerHTML=`
        <tr>
            <td colspan="3">
            Belum ada pesanan
            </td>
        </tr>
        `;

    }else{

        let html="";

        orders.slice(-5).reverse().forEach(item=>{

            html+=`

            <tr>

            <td>${item.game}</td>

            <td>${item.produk}</td>

            <td>${item.status}</td>

            </tr>

            `;

        });

        lastOrders.innerHTML=html;

    }

}

// ===============================
// SELAMAT DATANG
// ===============================

console.log("Dashboard ARDZ STORE aktif");
