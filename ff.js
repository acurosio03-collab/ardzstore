// ===============================
// ARDZ STORE - FREE FIRE
// ===============================

// Ambil data dari panel admin
let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

let area = document.getElementById("ff-products");

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
        item.game.toLowerCase().trim() === "free fire"
    );

    if (dataFF.length === 0) {

        area.innerHTML = `
        <div class="produk">
            <h3>Belum ada produk Free Fire</h3>
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

            <h3>${item.produk}</h3>

            <p>
            Harga :
            <b>Rp ${harga.toLocaleString("id-ID")}</b>
            </p>

            <button onclick="pilihProduk('${item.produk}',${harga})">

            Pilih

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
function checkoutFF() {

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

Saya ingin Top Up Free Fire

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
