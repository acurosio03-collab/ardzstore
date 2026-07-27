let produk = "";
let harga = 0;

function pilihProduk(nama, total){

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

        if(item.game=="Mobile Legends"){

            let jual = Number(item.supplier)+Number(item.profit);

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
