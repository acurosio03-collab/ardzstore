let produk = "";
let harga = 0;

function pilihProduk(nama,total){

    produk = nama;
    harga = total;

    document.getElementById("produk").innerHTML = nama;
    document.getElementById("total").innerHTML =
        "Rp " + total.toLocaleString("id-ID");
}

function loadml(){

    
           let data = JSON.parse(localStorage.getItem("nominal")) || [];

function loadML(){

    let html = "";

    data.forEach(item=>{

        if(item.game.toLowerCase().includes("mobile")){

            let jual = Number(item.supplier) + Number(item.profit);

            html += `
            <div class="card" onclick="pilihProduk('${item.produk}',${jual})">

                <h3>${item.produk}</h3>

                <p>Rp ${jual.toLocaleString("id-ID")}</p>

            </div>
            `;

        }

    });

    document.getElementById("ml-products").innerHTML = html;

}

loadML();

    document.getElementById("ml-products").innerHTML = html;

}

loadml();

function checkoutml(){

    let userid=document.getElementById("userid").value;
    let payment=document.getElementById("payment").value;
    let wa=document.getElementById("nomorwa").value;

    if(userid==""){
        alert("Masukkan User ID!");
        return;
    }

    if(produk==""){
        alert("Pilih Diamond terlebih dahulu!");
        return;
    }

    let admin="6282295071107";

    let pesan=`Halo Admin ARDZ STORE

// ========================
// SIMPAN PESANAN
// ========================

let orders = JSON.parse(localStorage.getItem("orders")) || [];

orders.push({

    game: "Mobile Legends",

    userid: userid,

    zoneid: zoneid,

    produk: produk,

    total: harga,

    payment: payment,

    wa: wa,

    status: "Menunggu",

    waktu: new Date().toLocaleString("id-ID")

});

localStorage.setItem("orders", JSON.stringify(orders));

    window.open(
        "https://wa.me/"+admin+"?text="+encodeURIComponent(pesan),
        "_blank"
    );

}
