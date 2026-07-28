// ===============================
// ARDZ STORE - HONOR OF KINGS
// ===============================

// Ambil data dari panel admin
let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

let area = document.getElementById("hok-products");

let produkDipilih = "";
let hargaDipilih = 0;

// ===============================
// TAMPILKAN PRODUK
// ===============================
function tampilHarga() {

    if (!area) return;

    area.innerHTML = "";

    let dataFF = dataNominal.filter(item =>
        item.game &&
        item.game.toLowerCase().trim() === "honor of kings"
    );

    if (dataFF.length === 0) {

        area.innerHTML = `
        <div class="produk">
            <h3>Belum ada produk honor of kings</h3>
            <p>Silakan tambahkan dari Panel Admin.</p>
        </div>
        `;

        return;
    }

    dataFF.forEach((item) => {

        let harga =
            Number(item.supplier) +
            Number(item.profit);

        area.innerHTML += `

<div class="produk">

<img src="img/ff-diamond.png" class="produk-img">


<h3>${item.produk}</h3>

<p>
💎 Diamond honor of kings
</p>

<b>
Rp ${harga.toLocaleString("id-ID")}
</b>


<br><br>


<button onclick="checkout('${item.produk}', '${harga}')">
Top Up
</button>


</div>

`;

    });

}

// ===============================
// PILIH PRODUK
// ===============================
function pilihProduk(produk, harga) {

    produkDipilih = produk;
    hargaDipilih = harga;

    document.getElementById("produk").innerHTML = produk;

    document.getElementById("total").innerHTML =
        "Rp " + harga.toLocaleString("id-ID");

}

// ===============================
// CHECKOUT
// ===============================
function checkouthok() {

    let userid =
        document.getElementById("userid").value;

    let payment =
        document.getElementById("payment").value;

    let nomor =
        document.getElementById("nomorwa").value;

    if (userid == "") {
        alert("Masukkan Player ID");
        return;
    }

    if (produkDipilih == "") {
        alert("Pilih Diamond terlebih dahulu");
        return;
    }

    let pesan =
`Halo Admin ARDZ STORE

Saya ingin Top Up honor of kings

Player ID : ${userid}

Produk : ${produkDipilih}

Harga : Rp ${hargaDipilih.toLocaleString("id-ID")}

Pembayaran : ${payment}

Nomor WA : ${nomor}`;

    window.open(
        "https://wa.me/6282295071107?text=" +
        encodeURIComponent(pesan)
    );

}

// ===============================
// MULAI
// ===============================
tampilHarga();
