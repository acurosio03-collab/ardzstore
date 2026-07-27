let produk = "";
let harga = 0;

function pilihProduk(nama,total){

    produk = nama;
    harga = total;

    document.getElementById("produk").innerHTML = nama;
    document.getElementById("total").innerHTML =
        "Rp " + total.toLocaleString("id-ID");
}

function loadML(){

    let data = JSON.parse(localStorage.getItem("nominal")) || [];

    let html = "";

    data.forEach(item=>{

        if(item.game.toLowerCase().includes("mobile")){

            let jual =
                Number(item.supplier)+Number(item.profit);

            html += `
            <div class="card"
            onclick="pilihProduk('${item.produk}',${jual})">

                <h3>${item.produk}</h3>

                <p>Rp ${jual.toLocaleString("id-ID")}</p>

            </div>
            `;

        }

    });

    document.getElementById("ml-products").innerHTML = html;

}

loadML();

function checkoutML(){

    let userid =
        document.getElementById("userid").value;

    let zoneid =
        document.getElementById("zoneid").value;

    let payment =
        document.getElementById("payment").value;

    let wa =
        document.getElementById("nomorwa").value;

    if(userid==""){
        alert("Masukkan User ID");
        return;
    }

    if(zoneid==""){
        alert("Masukkan Zone ID");
        return;
    }

    if(produk==""){
        alert("Pilih Diamond");
        return;
    }

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({

        game:"Mobile Legends",

        userid:userid,

        zoneid:zoneid,

        produk:produk,

        total:harga,

        payment:payment,

        wa:wa,

        status:"Menunggu",

        waktu:new Date().toLocaleString("id-ID")

    });

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    let admin="6282295071107";

    let pesan=`Halo Admin

Game : Mobile Legends
User ID : ${userid}
Zone ID : ${zoneid}
Produk : ${produk}
Total : Rp ${harga.toLocaleString("id-ID")}
Pembayaran : ${payment}
WA : ${wa}`;

    window.open(
        "https://wa.me/"+admin+
        "?text="+encodeURIComponent(pesan),
        "_blank"
    );

}
